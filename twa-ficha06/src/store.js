import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

export const items = ref(null)
export const status = ref('idle')
export const error = ref(null)

export async function load() {
  status.value = 'loading'
  error.value = null
  try {
    const data = await getJSON('/items.json')
    if (!Array.isArray(data)) throw new Error('Formato inesperado dos dados')
    items.value = data
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

export function addItem(item) {
  const id = Math.max(0, ...items.value.map((i) => i.id)) + 1
  items.value.push({ id, ...item })
  return id
}