<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../catalog.js'
import { addItem, error, items, load, status } from '../store.js'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()

const cats = computed(() => categories(items.value ?? []))

onMounted(() => {
  if (!items.value) load()
})

function onSave(item) {
  const id = addItem(item)
  router.push(`/items/${id}`)
}
</script>

<template>
  <p v-if="status === 'error'" class="status error">
    Erro: {{ error }}
    <button type="button" @click="load">Tentar de novo</button>
  </p>
  <p v-else-if="!items" class="status">A carregar…</p>
  <ItemForm v-else :cats="cats" @save="onSave" />
</template>