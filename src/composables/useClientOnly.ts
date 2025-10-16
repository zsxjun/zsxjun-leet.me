import { onMounted, ref } from 'vue'

export function useClientOnly() {
  const isClient = ref(false)

  onMounted(() => {
    isClient.value = true
  })

  return { isClient }
}
