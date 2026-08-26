export interface Product {
  id: string
  timestamp: number
  title: string
  desc: string
  note: string
  glue: string
  weight: string
  packsCount: number
  piecesCount: number
  arrivalPlace: string
  truckNum: string
  cmrNum: string
}

export type SortFunction = 'default' | 'bytime' | 'bysize' | 'byformat' | 'bytruckandsize' | 'bytruckandformat'
