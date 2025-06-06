import { ref, watch, computed } from 'vue'

const LOCAL_STORAGE_KEYS = {
  WEEK1_PLAN: 'mealPlanner_week1Plan',
  WEEK2_PLAN: 'mealPlanner_week2Plan',
  ACTIVE_WEEK: 'mealPlanner_activeWeek'
}

const DAYS_OF_WEEK = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const createEmptyWeekPlan = () => {
  return DAYS_OF_WEEK.reduce((acc, day) => { acc[day] = []; return acc }, {})
}

const week1Plan = ref(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WEEK1_PLAN)) || createEmptyWeekPlan())
const week2Plan = ref(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WEEK2_PLAN)) || createEmptyWeekPlan())
const activeWeek = ref(localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_WEEK) || 'week1')

watch(week1Plan, newPlan => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.WEEK1_PLAN, JSON.stringify(newPlan))
}, { deep: true })

watch(week2Plan, newPlan => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.WEEK2_PLAN, JSON.stringify(newPlan))
}, { deep: true })

watch(activeWeek, newVal => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_WEEK, newVal)
})

export function usePlanner() {
  const setActiveWeek = weekName => {
    if (weekName === 'week1' || weekName === 'week2') activeWeek.value = weekName
  }

  const addDishToDay = (weekName, day, dishId) => {
    const plan = weekName === 'week1' ? week1Plan : week2Plan
    if (plan.value[day] && !plan.value[day].includes(dishId)) plan.value[day].push(dishId)
  }

  const removeDishFromDay = (weekName, day, dishId) => {
    const plan = weekName === 'week1' ? week1Plan : week2Plan
    if (plan.value[day]) plan.value[day] = plan.value[day].filter(id => id !== dishId)
  }

  const clearDay = (weekName, day) => {
    const plan = weekName === 'week1' ? week1Plan : week2Plan
    if (plan.value[day]) plan.value[day] = []
  }

  const clearWeek = (weekName) => {
    const plan = weekName === 'week1' ? week1Plan : week2Plan
    plan.value = createEmptyWeekPlan()
  }

  const currentPlan = computed(() => activeWeek.value === 'week1' ? week1Plan.value : week2Plan.value)

  return { week1Plan, week2Plan, activeWeek, setActiveWeek, addDishToDay, removeDishFromDay, clearDay, clearWeek, currentPlan, DAYS_OF_WEEK }
}
