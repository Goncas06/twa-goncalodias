<script setup>
defineProps({
  item: { type: Object, default: null },
})
</script>

<template>
  <section class="detail">
    <template v-if="item">
      <h2>{{ item.name }}</h2>
      <p>Preço: {{ item.price.toFixed(2) }} €</p>
      <p>Categoria: {{ item.category }}</p>
      <p>Tags: {{ item.tags.join(', ') }}</p>
      <p v-if="item.designer">
        Autor: {{ item.designer.name }} ({{ item.designer.country }})
      </p>
    </template>
    <p v-else class="empty">Escolhe um item da lista.</p>
  </section>
</template>

<style scoped>
.detail {
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 6px;
}

h2 {
  margin-top: 0;
}

.empty {
  color: #555;
}
</style>