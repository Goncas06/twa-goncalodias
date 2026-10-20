<script setup>
import { computed, ref } from 'vue'
import { byCategory, categories, search, sortByPrice } from './catalog.js'

const ITEMS_URL = '/items.json'

const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

async function load() {
  status.value = 'loading'
  error.value = null
  try {
    const res = await fetch(ITEMS_URL)
    if (!res.ok) throw new Error(`O servidor respondeu ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) throw new Error('Formato inesperado dos dados')
    items.value = data
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

const visible = computed(() => {
  const inCategory = category.value
    ? byCategory(items.value, category.value)
    : items.value
  return sortByPrice(search(inCategory, query.value), sortDir.value)
})

const cats = computed(() => categories(items.value))

const selected = computed(() =>
  items.value.find((item) => item.id === selectedId.value),
)

load()
</script>

<template>
  <main>
    <h1>Catálogo de jogos</h1>

    <div class="controls">
      <input
        v-model="query"
        type="search"
        placeholder="Pesquisar por nome ou tag…"
        :disabled="status !== 'ready'"
      />
      <select v-model="category" :disabled="status !== 'ready'">
        <option value="">Todas as categorias</option>
        <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
      </select>
      <button
        type="button"
        :disabled="status !== 'ready'"
        @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'"
      >
        Preço {{ sortDir === 'desc' ? '↓' : '↑' }}
      </button>
    </div>

    <div class="columns">
      <ul class="list">
        <li v-if="status === 'loading'" class="status">A carregar…</li>
        <li v-else-if="status === 'error'" class="status error">
          Erro: {{ error }}
          <button type="button" @click="load">Tentar de novo</button>
        </li>
        <li v-else-if="visible.length === 0" class="status">Nenhum resultado.</li>
        <template v-else>
          <li
            v-for="item in visible"
            :key="item.id"
            :class="{ selected: item.id === selectedId }"
            @click="selectedId = item.id"
          >
            {{ item.name }} — {{ item.price.toFixed(2) }} €
          </li>
        </template>
      </ul>

      <section v-if="selected" class="detail">
        <h2>{{ selected.name }}</h2>
        <p>Preço: {{ selected.price.toFixed(2) }} €</p>
        <p>Categoria: {{ selected.category }}</p>
        <p>Tags: {{ selected.tags.join(', ') }}</p>
        <p>Autor: {{ selected.designer.name }} ({{ selected.designer.country }})</p>
      </section>
      <section v-else class="detail">
        <p class="status">Escolhe um item da lista.</p>
      </section>
    </div>
  </main>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #f6f6f8;
  color: #1c1c28;
}
</style>

<style scoped>
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.controls input {
  flex: 1;
}

input,
select,
button {
  font: inherit;
  padding: 8px 10px;
  border: 1px solid #c4c4d0;
  border-radius: 6px;
  background: #fff;
}

button {
  cursor: pointer;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .columns {
    grid-template-columns: 1fr;
  }
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list li {
  padding: 10px 12px;
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 6px;
  cursor: pointer;
}

.list li.selected {
  border-color: #6b1d2e;
  background: #f7eaed;
}

.list li.status {
  cursor: default;
  color: #555;
}

.list li.error {
  color: #9b1c1c;
}

.detail {
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 6px;
}

.detail h2 {
  margin-top: 0;
}

.status {
  color: #555;
}
</style>