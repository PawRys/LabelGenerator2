export const weight = (text: string, count: number): number => {
  const size = text.match(/([0-9]{1,2}(?:,[0-9])?x[0-9]{2,4}x[0-9]{2,4})/i)?.[0] || '1x1x1'
  return (
    size
      .replace(/,/g, '.')
      .split('x')
      .reduce<number>((acc, item) => (acc * Number(item)) / 1000, 1) *
    count *
    720
  )
}
