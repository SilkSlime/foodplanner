import { computed } from 'vue'
import { usePlanner } from './usePlanner'
import { useDishes } from './useDishes'

export function useShoppingList() {
  const { activeWeek, week1Plan, week2Plan } = usePlanner()
  const { getDishById, dishes } = useDishes()

  const shoppingList = computed(() => {
    const planToUse = activeWeek.value === 'week1' ? week1Plan.value : week2Plan.value
    const aggregatedIngredients = {}

    if (dishes.value.length === 0) return []

    Object.values(planToUse).forEach(dayDishes => {
      dayDishes.forEach(dishId => {
        const dish = getDishById(dishId)
        if (dish && dish.composition) {
          dish.composition.forEach(ingredient => {
            if (!aggregatedIngredients[ingredient]) {
              aggregatedIngredients[ingredient] = { name: ingredient, checked: false }
            }
          })
        }
      })
    })

    return Object.values(aggregatedIngredients).sort((a,b) => a.name.localeCompare(b.name))
  })

  return { shoppingList }
}
