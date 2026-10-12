import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  byCategory,
  categories,
  groupByCategory,
  search,
  sortByPrice,
  top,
  total,
  withDiscount,
} from './src/catalog.js'

const items = JSON.parse(await readFile('./public/items.json', 'utf8'))

const sample = [
  { id: 1, name: 'Clean Code', category: 'book', price: 30, tags: ['dev', 'classic'] },
  { id: 2, name: 'Zelda', category: 'game', price: 60, tags: ['adventure'] },
  { id: 3, name: 'Refactoring', category: 'book', price: 45.5, tags: ['dev'] },
]

assert.ok(items.length >= 8)

assert.deepEqual(byCategory(sample, 'book').map((i) => i.id), [1, 3])
assert.deepEqual(byCategory(sample, 'nada'), [])

assert.deepEqual(search(sample, 'CLEAN').map((i) => i.id), [1])
assert.deepEqual(search(sample, 'dev').map((i) => i.id), [1, 3])
assert.deepEqual(search(sample, 'xyz'), [])
assert.deepEqual(search(sample, 'dev classic').map((i) => i.id), [1])
assert.deepEqual(search(sample, '').map((i) => i.id), [1, 2, 3])

assert.equal(total(sample), 135.5)
assert.deepEqual(top(sample, 2).map((i) => i.id), [2, 3])
assert.deepEqual(categories(sample), ['book', 'game'])
assert.deepEqual(withDiscount(sample, 10).map((i) => i.price), [27, 54, 40.95])
assert.deepEqual(sample.map((i) => i.price), [30, 60, 45.5])
assert.equal(groupByCategory(sample).book.length, 2)

const before = sample.map((i) => i.id)
assert.deepEqual(sortByPrice(sample, 'desc').map((i) => i.id), [2, 3, 1])
assert.deepEqual(sortByPrice(sample, 'asc').map((i) => i.id), [1, 3, 2])
assert.deepEqual(sample.map((i) => i.id), before)
assert.notEqual(sortByPrice(sample, 'asc'), sample)
assert.deepEqual(sortByPrice([], 'asc'), [])