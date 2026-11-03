<script setup>
import { computed, onMounted, ref } from 'vue'
import { byCategory, categories, search, sortByPrice } from '../catalog.js'
import { error, items, load, status } from '../store.js'
import ItemList from '../components/ItemList.vue'

const query = ref('')
const category = ref('')
const sortDir = ref('desc')

const visible = computed(() => {
  const all = items.value ?? []
  const inCategory = category.value ? byCategory(all, category.value) : all
  return sortByPrice(search(inCategory, query.value), sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))

onMounted(() => {
  if (!items.value) load()
})
</script>

<template>
  <div class="controls">
    <input
      v-model="query"
      type="search"
      placeholder="Pesquisar por nome ou tag…"
      :disabled="!items"
    />
    <select v-model="category" :disabled="!items">
      <option value="">Todas as categorias</option>
      <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
    </select>
    <button
      type="button"
      :disabled="!items"
      @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'"
    >
      Preço {{ sortDir === 'desc' ? '↓' : '↑' }}
    </button>
  </div>

  <p v-if="status === 'error'" class="status error">
    Erro: {{ error }}
    <button type="button" @click="load">Tentar de novo</button>
  </p>
  <p v-else-if="!items" class="status">A carregar…</p>
  <p v-else-if="visible.length === 0" class="status">Nenhum resultado.</p>
  <ItemList v-else :items="visible" />
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.controls input {
  flex: 1;
}
</style>