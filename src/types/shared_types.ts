export interface Product {
  id: string
  timestamp: number
  size: string
  face: string
  glue: string
  packsCount: number
  piecesCount: number
  arrivalPlace?: string
  invoiceNum?: string
  truckNum?: string
  cmrNum?: string
}

export type SortFunction = 'default' | 'bytime' | 'bysize' | 'byformat' | 'bytruckandsize' | 'bytruckandformat'
