<script setup>
import { computed, ref, watch } from 'vue'
import { byCategory, categories, search, sortByPrice } from './catalog.js'
import { getJSON } from './api/getJSON.js'
import { useLoad } from './composables/useLoad.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

const { status, error, data: items, load } = useLoad(
  () => getJSON('/items.json'),
  [],
)

const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

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

const nextId = computed(() =>
  Math.max(0, ...items.value.map((i) => i.id)) + 1,
)

function addItem(item) {
  items.value.push({ id: nextId.value, ...item })
}

watch(query, () => {
  selectedId.value = null
})
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
      <div>
        <p v-if="status === 'loading'" class="status">A carregar…</p>
        <p v-else-if="status === 'error'" class="status error">
          Erro: {{ error }}
          <button type="button" @click="load">Tentar de novo</button>
        </p>
        <p v-else-if="visible.length === 0" class="status">Nenhum resultado.</p>
        <ItemList
          v-else
          :items="visible"
          :selected-id="selectedId"
          @select="selectedId = $event"
        />
      </div>

      <ItemDetail :item="selected" />
    </div>

    <ItemForm v-if="status === 'ready'" :cats="cats" @save="addItem" />
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
  align-items: start;
}

@media (max-width: 640px) {
  .columns {
    grid-template-columns: 1fr;
  }
}

.status {
  margin: 0;
  padding: 10px 12px;
  color: #555;
}

.status.error {
  color: #9b1c1c;
}
</style>