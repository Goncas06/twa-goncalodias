<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

const page = computed(() => Math.max(1, Number(route.query.page) || 1))

const { status, error, data, load } = useLoad(() => list(page.value))
watch(page, load)

const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <section>
    <h2>Pokémon</h2>

    <div class="pager">
      <button type="button" :disabled="page <= 1" @click="go(page - 1)">
        ‹ Anterior
      </button>
      <span>página {{ page }} de {{ pages }}</span>
      <button type="button" :disabled="page >= pages" @click="go(page + 1)">
        Seguinte ›
      </button>
    </div>

    <p v-if="status === 'loading'" class="status">A carregar…</p>
    <p v-else-if="status === 'error'" class="status error">
      Erro: {{ error }}
      <button type="button" @click="load">Tentar de novo</button>
    </p>
    <ul v-else class="names">
      <li v-for="p in data.results" :key="p.name">{{ p.name }}</li>
    </ul>
  </section>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.names {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 6px;
}

.names li {
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 6px;
  text-transform: capitalize;
}
</style>