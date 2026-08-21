<script setup lang="ts">
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.min.mjs'
import { useProductStore } from '@/stores/products_store'
import type { Product } from '@/types/shared_types'

const productStore = useProductStore()

async function doit(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement
  const pdfFileList = target.files as FileList
  const TEXTrows = PDFtoTEXT(pdfFileList)
  getLatvijasProducts(await TEXTrows)
}

async function PDFtoTEXT(fileList: FileList) {
  let TEXTrows: string[] = []
  const skippedFiles: string[] = []

  for (const file of fileList) {
    const isPdf = file.type === 'application/pdf'
    const hasValidName = file.name.includes('Invoice No.')

    if (!isPdf || !hasValidName) {
      skippedFiles.push(file.name)
      continue
    }

    const pdf = await pdfjsLib.getDocument({
      data: await file.arrayBuffer(),
    }).promise

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const { items } = await page.getTextContent()

      const rows: {
        y: number
        items: { text: string; x: number }[]
      }[] = []

      for (const item of items) {
        if (!('str' in item)) continue

        const [, , , , x, y] = item.transform

        let row = rows.find((r) => Math.abs(r.y - y) <= 3)

        if (!row) {
          row = { y, items: [] }
          rows.push(row)
        }

        row.items.push({ text: item.str, x })
      }

      rows.sort((a, b) => b.y - a.y)

      for (const row of rows) {
        row.items.sort((a, b) => a.x - b.x)
        const textrow = row.items.map((item) => correctText(item.text)).join('')
        TEXTrows.push(textrow)
      } // END row
    } // END page
  } // END file

  // if (skippedFiles.length > 0) {
  //   alert(`Pominięte pliki (${skippedFiles.length}):\n\n` + skippedFiles.join('\n'))
  // }

  return TEXTrows
}

function getLatvijasProducts(TEXTrows: string[]) {
  const products: Product[] = []
  let idNum = ''
  let idCounter = 0
  let itemSize = ''
  let itemFace = ''
  let itemGlue = ''
  let itemPiecesCount = 0
  let itemPacksCount = 1
  let arrivalPlace = ''
  let invoiceNum = ''
  let truckNum = ''
  let CMRNum = ''

  // console.log(TEXTrows.join('\n'))

  TEXTrows.forEach((textrow) => {
    arrivalPlace = getArrivalPlace(textrow) || arrivalPlace
    invoiceNum = getInvoiceNum(textrow) || invoiceNum
    truckNum = getTruckNum(textrow) || truckNum
    CMRNum = getCMRNum(textrow) || CMRNum

    if (/441233[0-9]{2}/.test(textrow)) {
      itemGlue = textrow.match(/MR|WD|INT|EXT/i)?.[0] ?? ''
      itemFace = textrow
        .replace(/Birch plywood RIGA |PLY|TEX|FORM|MEL|/gi, '')
        .replace(/, edges sealed .*|,[^,]*441233[0-9]{2}.*/gi, '')
        .trim()
    }

    const product = textrow.match(/([0-9]{1,2}(?:,[0-9])?x[0-9]{2,4}x[0-9]{2,4}) mm ([0-9]{1,2})x([0-9]{1,4})/) ?? []
    if (product.length) {
      idNum = `${CMRNum || '_id'}_${(++idCounter).toString().padStart(3, '0')}`
      const [, x, y, z] = product
      itemSize = x ?? ''
      itemPacksCount = Number(y) ?? 0
      itemPiecesCount = Number(z) ?? 0

      productStore.addProduct({
        id: idNum,
        timestamp: Date.now(),
        size: itemSize,
        face: itemFace,
        glue: itemGlue,
        packsCount: itemPacksCount,
        piecesCount: itemPiecesCount,
        arrivalPlace: arrivalPlace,
        invoiceNum: invoiceNum,
        truckNum: truckNum,
        cmrNum: CMRNum,
      })
    }
  })
  // console.log(productStore.products)
  // return products
}

const charMap: { [key: string]: string } = {
  ą: 'ą',
  ü: 'ć',
  Ċ: 'ę',
  á: 'ł',
  Ĕ: 'ń',
  ó: 'ó',
  Ğ: 'ś',
  Ī: 'ż',
  Ĩ: 'ź',
  Ą: 'Ą',
  û: 'Ć',
  ĉ: 'Ę',
  à: 'Ł',
  ē: 'Ń',
  Ó: 'Ó',
  ĝ: 'Ś',
  ĩ: 'Ż',
  ħ: 'Ź',
}

const correctText = (input: string): string => {
  return input
    .split('')
    .map((char) => charMap[char] || char)
    .join('')
}

function getArrivalPlace(text: string): string {
  return text.includes('Terms of delivery:') ? text.replace('Terms of delivery:', '').trim() : ''
}

function getInvoiceNum(text: string): string {
  return text.match(/LF[0-9]{2} M[0-9]{6}/i)?.[0] ?? ''
}

function getTruckNum(text: string): string {
  return text.includes('Carriage by:') ? text.replace('Carriage by:', '').trim() : ''
}

function getCMRNum(text: string): string {
  return text.match(/CMR_[A-Z]{1}[0-9]{6}/i)?.[0] ?? ''
}
</script>

<template>
  <button class="btn-primary">
    <label for="PDFupload-button"><slot>Dodaj z faktury</slot></label>
    <input type="file" name="PDFupload-button" id="PDFupload-button" multiple hidden @change="doit" />
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
