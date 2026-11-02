import { onMounted, ref } from 'vue'

export function useLoad(fetcher, initial = null) {
  const status = ref('loading')
  const error = ref(null)
  const data = ref(initial)

  async function load() {
    status.value = 'loading'
    error.value = null
    try {
      data.value = await fetcher()
      status.value = 'ready'
    } catch (err) {
      status.value = 'error'
      error.value = err.message
    }
  }

  onMounted(load)

  return { status, error, data, load }
}