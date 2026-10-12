import './style.css'
import { byCategory, categories, search, sortByPrice } from './catalog.js'

const ITEMS_URL = '/items.json'

const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
}

const listEl = document.querySelector('#list')
const detailEl = document.querySelector('#detail')
const searchEl = document.querySelector('#search')
const categoryEl = document.querySelector('#category')
const sortEl = document.querySelector('#sort')

async function load() {
  state.status = 'loading'
  state.error = null
  render(state)
  try {
    const res = await fetch(ITEMS_URL)
    if (!res.ok) throw new Error(`O servidor respondeu ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) throw new Error('Formato inesperado dos dados')
    state.items = data
    state.status = 'ready'
  } catch (err) {
    state.status = 'error'
    state.error = err.message
  } finally {
    render(state)
  }
}

function visibleItems(s) {
  const inCategory = s.category ? byCategory(s.items, s.category) : s.items
  return sortByPrice(search(inCategory, s.query), s.sortDir)
}

function el(tag, text, className) {
  const node = document.createElement(tag)
  if (text !== undefined) node.textContent = text
  if (className) node.className = className
  return node
}

function render(s) {
  const ready = s.status === 'ready'

  searchEl.disabled = !ready
  categoryEl.disabled = !ready
  sortEl.disabled = !ready
  sortEl.textContent = `Preço ${s.sortDir === 'desc' ? '↓' : '↑'}`

  const options = [new Option('Todas as categorias', '')]
  if (ready) categories(s.items).forEach((c) => options.push(new Option(c, c)))
  categoryEl.replaceChildren(...options)
  categoryEl.value = s.category

  if (s.status === 'loading') {
    listEl.replaceChildren(el('li', 'A carregar…', 'status'))
  } else if (s.status === 'error') {
    const retry = el('button', 'Tentar de novo')
    retry.type = 'button'
    retry.dataset.action = 'retry'
    const li = el('li', `Erro: ${s.error} `, 'status error')
    li.append(retry)
    listEl.replaceChildren(li)
  } else {
    const shown = visibleItems(s)
    if (shown.length === 0) {
      listEl.replaceChildren(el('li', 'Nenhum resultado.', 'status'))
    } else {
      listEl.replaceChildren(
        ...shown.map((item) => {
          const li = el('li', `${item.name} — ${item.price.toFixed(2)} EUR`)
          li.dataset.id = item.id
          if (item.id === s.selectedId) li.classList.add('selected')
          return li
        }),
      )
    }
  }

  const selected = s.items.find((item) => item.id === s.selectedId)
  if (!selected) {
    detailEl.replaceChildren(el('p', 'Escolhe um item da lista.', 'status'))
  } else {
    detailEl.replaceChildren(
      el('h2', selected.name),
      el('p', `Preço: ${selected.price.toFixed(2)} EUR`),
      el('p', `Categoria: ${selected.category}`),
      el('p', `Tags: ${selected.tags.join(', ')}`),
      el('p', `Autor: ${selected.designer.name} (${selected.designer.country})`),
    )
  }
}

searchEl.addEventListener('input', () => {
  state.query = searchEl.value
  render(state)
})

categoryEl.addEventListener('change', () => {
  state.category = categoryEl.value
  render(state)
})

sortEl.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render(state)
})

listEl.addEventListener('click', (event) => {
  if (event.target.closest('[data-action="retry"]')) {
    load()
    return
  }
  const li = event.target.closest('li[data-id]')
  if (!li) return
  state.selectedId = Number(li.dataset.id)
  render(state)
})

load()