<script setup>
import { computed, reactive } from 'vue'

defineProps({
  cats: { type: Array, default: () => [] },
})
const emit = defineEmits(['save'])

const emptyDraft = () => ({ name: '', category: '', price: '', tags: '' })
const draft = reactive(emptyDraft())

const errors = computed(() => {
  const e = {}
  if (!draft.name) e.name = 'O nome é obrigatório.'
  if (!draft.category) e.category = 'A categoria é obrigatória.'
  if (typeof draft.price !== 'number' || draft.price <= 0) {
    e.price = 'O preço tem de ser maior que 0.'
  }
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

function save() {
  if (!isValid.value) return
  emit('save', {
    name: draft.name,
    category: draft.category,
    price: draft.price,
    tags: draft.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  })
  Object.assign(draft, emptyDraft())
}
</script>

<template>
  <form class="form" @submit.prevent="save">
    <h2>Adicionar jogo</h2>

    <label>
      Nome
      <input v-model.trim="draft.name" type="text" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </label>

    <label>
      Categoria
      <input v-model.trim="draft.category" type="text" list="form-cats" />
      <datalist id="form-cats">
        <option v-for="c in cats" :key="c" :value="c" />
      </datalist>
      <span v-if="errors.category" class="error">{{ errors.category }}</span>
    </label>

    <label>
      Preço (€)
      <input v-model.number="draft.price" type="number" step="0.01" />
      <span v-if="errors.price" class="error">{{ errors.price }}</span>
    </label>

    <label>
      Tags (separadas por vírgulas)
      <input v-model.trim="draft.tags" type="text" />
    </label>

    <button type="submit" :disabled="!isValid">Adicionar</button>
  </form>
</template>

<style scoped>
.form {
  margin-top: 24px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 6px;
  display: grid;
  gap: 10px;
}

h2 {
  margin: 0;
}

label {
  display: grid;
  gap: 4px;
}

input,
button {
  font: inherit;
  padding: 8px 10px;
  border: 1px solid #c4c4d0;
  border-radius: 6px;
  background: #fff;
}

button {
  cursor: pointer;
  justify-self: start;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.error {
  color: #9b1c1c;
  font-size: 0.9em;
}
</style>