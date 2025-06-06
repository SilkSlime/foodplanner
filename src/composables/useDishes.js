import { ref, onMounted } from 'vue'

const dishes = ref([])
const isLoading = ref(true)
const error = ref(null)

export function useDishes() {
  const loadDishes = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('/dishes.json')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      dishes.value = data
    } catch (e) {
      console.error('Failed to load dishes:', e)
      error.value = 'Failed to load dishes. Please try again later.'
      dishes.value = []
    } finally {
      isLoading.value = false
    }
  }

  const getDishById = (id) => dishes.value.find(d => d.id === id)

  onMounted(() => { if (dishes.value.length === 0) loadDishes() })

  return { dishes, isLoading, error, loadDishes, getDishById }
}
