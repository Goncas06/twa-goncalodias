<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ul class="list">
    <li v-for="item in items" :key="item.id">
      <RouterLink :to="`/items/${item.id}`">
        {{ item.name }} — {{ item.price.toFixed(2) }} €
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list li {
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 6px;
}

.list a {
  display: block;
  padding: 10px 12px;
  color: inherit;
  text-decoration: none;
}
</style>
