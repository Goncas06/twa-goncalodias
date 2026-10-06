import assert from 'node:assert/strict'
import { items } from './data.js'
import {
  byCategory,
  categories,
  groupByCategory,
  search,
  top,
  total,
  withDiscount,
} from './catalog.js'

const sample = [
  { id: 1, name: 'Clean Code', category: 'book', price: 30, tags: ['dev', 'classic'] },
  { id: 2, name: 'Zelda', category: 'game', price: 60, tags: ['adventure'] },
  { id: 3, name: 'Refactoring', category: 'book', price: 45.5, tags: ['dev'] },
]

// dados: >= 8 itens com os campos pedidos e um objeto aninhado
assert.ok(items.length >= 8)
items.forEach((item) => {
  assert.equal(typeof item.id, 'number')
  assert.equal(typeof item.name, 'string')
  assert.equal(typeof item.category, 'string')
  assert.equal(typeof item.price, 'number')
  assert.ok(Array.isArray(item.tags))
  assert.equal(typeof item.designer, 'object')
})

// byCategory
assert.deepEqual(byCategory(sample, 'book').map((i) => i.id), [1, 3])
assert.deepEqual(byCategory(sample, 'nada'), [])

// search: nome ou tags, sem distinguir maiúsculas
assert.deepEqual(search(sample, 'CLEAN').map((i) => i.id), [1])
assert.deepEqual(search(sample, 'dev').map((i) => i.id), [1, 3])
assert.deepEqual(search(sample, 'adventure').map((i) => i.id), [2])
assert.deepEqual(search(sample, 'xyz'), [])
assert.deepEqual(search(sample, 'dev classic').map((i) => i.id), [1])

// total
assert.equal(total(sample), 135.5)
assert.equal(total([]), 0)

// top: n mais caros, desc., sem alterar o original
const before = sample.map((i) => i.id)
assert.deepEqual(top(sample, 2).map((i) => i.id), [2, 3])
assert.deepEqual(sample.map((i) => i.id), before)

// categories: únicas e ordenadas
assert.deepEqual(categories(sample), ['book', 'game'])

// withDiscount: itens novos, originais intactos
const discounted = withDiscount(sample, 10)
assert.deepEqual(discounted.map((i) => i.price), [27, 54, 40.95])
assert.deepEqual(sample.map((i) => i.price), [30, 60, 45.5])
assert.notEqual(discounted[0], sample[0])

// bónus: groupByCategory
const groups = groupByCategory(sample)
assert.deepEqual(Object.keys(groups).toSorted(), ['book', 'game'])
assert.equal(groups.book.length, 2)