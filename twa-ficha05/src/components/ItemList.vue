<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null },
})
const emit = defineEmits(['select'])
</script>

<template>
  <ul class="list">
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} — {{ item.price.toFixed(2) }} €
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
</style>