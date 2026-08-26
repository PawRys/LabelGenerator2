<script setup lang="ts">
import type { Product } from '@/types/shared_types'
import { productsSchema } from '@/types/shared_types'
import { useProductStore } from '@/stores/products_store'
import { correctText, weight } from '@/exports/shared_script'
import { ref } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.min.mjs'

const productStore = useProductStore()
const fileInput = ref<HTMLInputElement | null>(null)

const LFregex = new RegExp(/Invoice No\. LF\d\d M\d{6}/i)
const STregex = new RegExp(/Invoice[ _]DR[ _]\d+[ _]PO/i)

function openFile() {
  fileInput.value?.click()
}

async function doit(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement
  const pdfFilesList = target.files as FileList
  const validFilesList = await validateFiles(pdfFilesList)
  const products = await processFiles(validFilesList)

  products.forEach((item) => productStore.addProduct(item))
}

async function validateFiles(fileList: FileList): Promise<File[]> {
  const skippedFiles: string[] = []
  const validFiles: File[] = []

  for (const file of fileList) {
    const isPdf = file.type === 'application/pdf'

    const validPatterns = [LFregex, STregex]
    const hasValidName = validPatterns.some((pattern) => pattern.test(file.name))

    if (isPdf && hasValidName) {
      validFiles.push(file)
      continue
    }

    const isJson = file.type === 'application/json' || file.name.toLowerCase().endsWith('.json')

    if (isJson) {
      try {
        const data: unknown = JSON.parse(await file.text())

        if (productsSchema.safeParse(data).success) {
          validFiles.push(file)
        } else {
          skippedFiles.push(file.name)
        }
      } catch {
        skippedFiles.push(file.name)
      }

      continue
    }

    skippedFiles.push(file.name)
  }

  if (skippedFiles.length > 0) {
    console.log(`Pominięte pliki (${skippedFiles.length}):\n\n` + skippedFiles.join('\n'))
  }

  return validFiles
}

async function processFiles(fileList: File[]) {
  let result: Product[] = []

  for (const file of fileList) {
    const isJson = file.type === 'application/json' || file.name.toLowerCase().endsWith('.json')

    if (isJson) {
      const products: Product[] = JSON.parse(await file.text())
      result.push(...products)
      continue
    }

    const TEXTrows = await PDFtoTEXT(file)

    if (LFregex.test(file.name)) {
      result.push(...getLatvijasProducts(TEXTrows))
      continue
    }

    if (STregex.test(file.name)) {
      result.push(...getStigaProducts(TEXTrows))
    }
  }

  return result
}

async function PDFtoTEXT(file: File): Promise<string[]> {
  let TEXTrows: string[] = []

  const pdf = await pdfjsLib.getDocument({
    data: await file.arrayBuffer(),
  }).promise

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const TOLERANCE = 3
    const page = await pdf.getPage(pageNum)
    const { items } = await page.getTextContent()
    const rows: {
      y: number
      items: { text: string; x: number }[]
    }[] = []

    for (const item of items) {
      if (!('str' in item)) continue

      const [, , , , x, y] = item.transform

      let row = rows.find((r) => Math.abs(r.y - y) <= TOLERANCE)

      if (!row) {
        row = { y, items: [] }
        rows.push(row)
      }

      row.items.push({ text: item.str, x })
    }

    rows.sort((a, b) => b.y - a.y)

    for (const row of rows) {
      // const textrow = row.items
      //   .sort((a, b) => a.x - b.x)
      //   .map((item) => correctText(item.text))
      //   .join('')

      const CHAR_WIDTH = 6
      let currentColumn = 0
      const textrow = row.items
        .sort((a, b) => a.x - b.x)
        .map((item) => {
          const text = correctText(item.text)
          const column = Math.round(item.x / CHAR_WIDTH)
          const spaces = Math.max(0, column - currentColumn)

          currentColumn = column + text.length
          return ' '.repeat(spaces) + text
        })
        .join('')
        .replace(/[ ]{2,4}/g, '\t')

      TEXTrows.push(textrow)
    } // END row
  } // END page

  console.log(TEXTrows.join('\n'))
  return TEXTrows
}

function getLatvijasProducts(TEXTrows: string[]): Product[] {
  const results: Product[] = []

  const sizeT_re = String.raw`(\d{1,2}(?:[,.]\d)?)` // Capture group
  const sizeA_re = String.raw`(\d{3,4})` // Capture group
  const sizeB_re = String.raw`(\d{3,4})` // Capture group
  const packsQty_re = String.raw`(\d{1,2})` // Capture group
  const pcsQty_re = String.raw`(\d{1,3})` // Capture group
  const full_regexp = new RegExp(String.raw`${sizeT_re}x${sizeA_re}x${sizeB_re} mm\s+${packsQty_re}x${pcsQty_re}`, 'i')

  let idNum = ''
  let idCounter = 0
  let itemSize = ''
  let itemFace = ''
  let itemGlue = ''
  let itemWeight = 0
  let itemPiecesCount = 0
  let itemPacksCount = 1
  let arrivalPlace = ''
  let invoiceNum = ''
  let truckNum = ''
  let CMRNum = ''

  TEXTrows.forEach((textrow) => {
    arrivalPlace = getArrivalPlace(textrow) || arrivalPlace
    invoiceNum = getInvoiceNum(textrow) || invoiceNum
    truckNum = getTruckNum(textrow) || truckNum
    CMRNum = getCMRNum(textrow) || CMRNum

    // console.log(textrow.match(full_regexp))

    if (/441233[0-9]{2}/.test(textrow)) {
      itemGlue = textrow.match(/MR|WD|INT|EXT/i)?.[0] ?? ''
      itemFace = textrow
        .replace(/Birch plywood RIGA |PLY|TEX|FORM|MEL|/gi, '')
        .replace(/, edges sealed .*|,[^,]*441233[0-9]{2}.*/gi, '')
        .replace(/ \(without \*\)/gi, '')
        .replace(/(\w) (I)/g, '$1 $2')
        .replace(/,/i, ' ')
        .trim()
    }

    const [, sizeT, sizeA, sizeB, packsQty, pcsQty] = textrow.match(full_regexp) ?? []

    if (sizeT && sizeA && sizeB && packsQty && pcsQty) {
      idNum = `${CMRNum || '_id'}_${(++idCounter).toString().padStart(3, '0')}`
      itemSize = `${sizeT}x${sizeA}x${sizeB}`
      itemWeight = weight(`${itemSize} ${itemFace}`, +pcsQty || 0)
      itemPacksCount = Number(packsQty) ?? 0
      itemPiecesCount = Number(pcsQty) ?? 0

      results.push({
        id: idNum,
        timestamp: Date.now(),
        title: itemSize,
        desc: itemFace,
        note: invoiceNum,
        glue: itemGlue || `${itemWeight.toFixed(0)} kg`,
        weight: itemWeight,
        packsCount: itemPacksCount,
        piecesCount: itemPiecesCount,
        arrivalPlace: arrivalPlace,
        truckNum: truckNum,
        cmrNum: CMRNum,
      })
    }
  })
  return results
}

function getStigaProducts(TEXTrows: string[]): Product[] {
  const results: Product[] = []

  const id_re = String.raw`\d{1,2}`
  const sizeA_re = String.raw`(\d{3,4})` // Capture group
  const sizeB_re = String.raw`(\d{3,4})` // Capture group
  const sizeT_re = String.raw`(\d{1,2}(?:[,.]\d)?)` // Capture group
  const face_re = String.raw`((?:BB|B|CP|C|F|W) ?(?:1|2|II|I)?\/(?:BB|B|CP|C|F|W) ?(?:1|2|II|I)?(?: Sanded)?)` // Capture group
  const pcsQty_re = String.raw`(\d{1,3})` // Capture group
  const packsQty_re = String.raw`(\d{1,2})` // Capture group
  const full_regexp = new RegExp(
    String.raw`${id_re}\s+${sizeA_re}\s+${sizeB_re}\s+${sizeT_re}\s+${face_re}\s+${pcsQty_re}\s+${packsQty_re}`,
    'i',
  )

  let idNum = ''
  let idCounter = 0
  let itemSize = ''
  let itemFace = ''
  let itemGlue = ''
  let itemWeight = 0
  let itemPiecesCount = 0
  let itemPacksCount = 1
  let arrivalPlace = ''
  let invoiceNum = ''
  let truckNum = ''
  let CMRNum = ''

  TEXTrows.forEach((textrow, i) => {
    arrivalPlace = getArrivalPlace(textrow) || arrivalPlace
    invoiceNum = getInvoiceNum(textrow) || invoiceNum
    truckNum = getInvoiceNum(textrow) || truckNum
    CMRNum = getInvoiceNum(textrow) || CMRNum

    const sanded = textrow.match(/^C\/C$/i)
    let fixedrow = ''

    if (sanded) {
      const words = TEXTrows[i + 1]!.split(' ')
      words.splice(4, 0, `${TEXTrows[i]?.trim()} ${TEXTrows[i + 2]?.trim()}`)
      fixedrow = words.join(' ')
    }

    const [id, sizeA, sizeB, sizeT, face, pcsQty, packsQty] = (fixedrow || textrow).match(full_regexp) ?? []

    if (id && sizeA && sizeB && sizeT && face && pcsQty && packsQty) {
      idNum = `${CMRNum || '_STG'}_${(++idCounter).toString().padStart(3, '0')}`
      itemSize = `${sizeT}x${sizeA}x${sizeB}`
      itemFace = face ?? ''
      itemGlue = 'WD'
      itemWeight = weight(`${itemSize} ${itemFace}`, +pcsQty || 0)
      itemPacksCount = Number(packsQty) ?? 0
      itemPiecesCount = Number(pcsQty) ?? 0

      results.push({
        id: idNum,
        timestamp: Date.now(),
        title: itemSize,
        desc: itemFace,
        note: invoiceNum,
        glue: itemGlue || `${itemWeight.toFixed(0)} kg`,
        weight: itemWeight,
        packsCount: itemPacksCount,
        piecesCount: itemPiecesCount,
        arrivalPlace: arrivalPlace,
        truckNum: truckNum,
        cmrNum: CMRNum,
      })
    }
  })

  // console.log(results)
  return results
}

function getArrivalPlace(text: string): string {
  const LF = text.includes('Terms of delivery:') ? text.replace('Terms of delivery:', '').trim() : ''
  const ST = /100\s*%\s*Prepayment\s*DAP/i.test(text) ? text.replace(/100\s*%\s*Prepayment/i, '').trim() : ''

  if (LF) return LF
  if (ST) return ST
  return ''
}

function getInvoiceNum(text: string): string {
  const LF = text.match(/(LF[0-9]{2} M[0-9]{6})/i)
  const ST = text.match(/(DR[0-9]+)/i)

  if (LF) return LF[1]!
  if (ST) return ST[1]!
  return ''
}

function getTruckNum(text: string): string {
  return text.includes('Carriage by:') ? text.replace('Carriage by:', '').trim() : ''
}

function getCMRNum(text: string): string {
  return text.match(/CMR_[A-Z]{1}[0-9]{6}/i)?.[0] ?? ''
}
</script>

<template>
  <button class="btn-primary" type="button" @click="openFile">
    <slot>Dodaj z faktury</slot>
    <input ref="fileInput" type="file" multiple hidden @change="doit" />
  </button>
</template>

<style scoped>
input[type='file'] {
  display: none;
}
label[for='PDFupload-button'] {
  cursor: pointer;
}
</style>
