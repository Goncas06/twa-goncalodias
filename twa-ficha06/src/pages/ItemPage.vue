<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { error, items, load, status } from '../store.js'
import ItemDetail from '../components/ItemDetail.vue'

const route = useRoute()

const id = computed(() => Number(route.params.id))
const item = computed(() => items.value?.find((i) => i.id === id.value))

onMounted(() => {
  if (!items.value) load()
})
</script>

<template>
  <p><RouterLink to="/">← Catálogo</RouterLink></p>

  <p v-if="status === 'error'" class="status error">
    Erro: {{ error }}
    <button type="button" @click="load">Tentar de novo</button>
  </p>
  <p v-else-if="!items" class="status">A carregar…</p>
  <ItemDetail v-else-if="item" :item="item" />
  <p v-else class="status">Item não encontrado.</p>
</template>