const round2 = (n) => Math.round(n * 100) / 100

export const byCategory = (list, cat) =>
  list.filter((item) => item.category === cat)

export const search = (list, text) => {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean)
  return list.filter(({ name, tags }) => {
    const haystack = [name, ...tags].map((s) => s.toLowerCase())
    return words.every((word) => haystack.some((s) => s.includes(word)))
  })
}

export const total = (list) =>
  round2(list.reduce((sum, { price }) => sum + price, 0))

export const top = (list, n) =>
  list.toSorted((a, b) => b.price - a.price).slice(0, n)

export const categories = (list) =>
  [...new Set(list.map(({ category }) => category))].toSorted((a, b) =>
    a.localeCompare(b, 'pt'),
  )

export const withDiscount = (list, pct) =>
  list.map((item) => ({
    ...item,
    price: round2(item.price * (1 - pct / 100)),
  }))

export const groupByCategory = (list) =>
  Object.groupBy(list, ({ category }) => category)