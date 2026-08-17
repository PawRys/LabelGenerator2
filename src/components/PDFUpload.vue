<script setup lang="ts">
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.min.mjs'
import type { TextItem } from 'pdfjs-dist/types/src/display/api'

async function doit(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement
  const pdfFileList = target.files as FileList
  const textFilesList = PDFtoTEXT(pdfFileList)
  console.log(textFilesList)
}

async function PDFtoTEXT(fileList: FileList) {
  let products = []
  let productSize = ''
  let productFace = ''
  let productGlue = ''
  let productPacking = ''
  let productPackCount = ''

  const skippedFiles: string[] = []

  for (const file of fileList) {
    let invoiceNum = ''
    let carriageBy = ''
    let transportDoc = ''

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

        /** Create products table */
        if (file.name.includes('Invoice No.')) {
          if (invoiceNum === '') invoiceNum = getInvoiceNum(textrow)
          if (carriageBy === '') carriageBy = getCarriageBy(textrow)
          if (transportDoc === '') transportDoc = getTransportDoc(textrow)
          if (/441233[0-9]{2}/.test(textrow)) {
            productGlue = textrow.match(/MR|WD|INT|EXT/i)?.[0] ?? ''
            productFace = textrow.replace(/birch plywood riga |, edges sealed .*/gi, '').trim()
          }

          const product =
            textrow.match(
              /([0-9]{1,2}(?:,[0-9])?x[0-9]{3,4}x[0-9]{3,4}) mm ([0-9]{1,2})x([0-9]{1,4})/,
            ) ?? []
          if (product.length) {
            const [, x, y, z] = product
            productSize = x ?? ''
            productPacking = z ?? ''
            productPackCount = y ?? ''

            products.push([
              productSize,
              productFace,
              productGlue,
              productPackCount,
              productPacking,
              invoiceNum,
              carriageBy,
              transportDoc,
            ])
          }
        }
      } // END row
    } // END page
  } // END file

  console.log(products)

  if (skippedFiles.length > 0) {
    alert(`Pominięte pliki (${skippedFiles.length}):\n\n` + skippedFiles.join('\n'))
  }
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

function getInvoiceNum(text: string): string {
  return text.match(/LF[0-9]{2} M[0-9]{6}/i)?.[0] ?? ''
}

function getCarriageBy(text: string): string {
  return text.includes('Carriage by:') ? text.replace('Carriage by:', '').trim() : ''
}

function getTransportDoc(text: string): string {
  return text.match(/CMR_[A-Z]{1}[0-9]{6}/i)?.[0] ?? ''
}
</script>

<template>
  <button>
    <label for="PDFupload-button" class="button cta">Dodaj pliki</label>
    <input
      type="file"
      name="PDFupload-button"
      id="PDFupload-button"
      multiple
      hidden
      @change="doit"
    />
  </button>
</template>

<style scoped></style>
