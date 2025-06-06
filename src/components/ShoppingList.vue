<template>
  <div class="shopping-list-container card">
    <h2 class="shopping-list-title">Shopping List for {{ activeWeek === 'week1' ? 'Current Week' : 'Next Week' }}</h2>
    <div v-if="isLoadingDishes" class="loading-message">Loading dish data...</div>
    <div v-else-if="errorDishes" class="error-message">{{ errorDishes }}</div>
    <div v-else-if="listItems.length === 0 && !isPlanEmpty" class="info-message">No ingredients found for the planned dishes. Ensure dishes have 'composition' data.</div>
    <div v-else-if="isPlanEmpty" class="info-message">No meals planned for this week. Add some dishes to generate a shopping list.</div>
    <ul v-else-if="listItems.length > 0" class="shopping-list">
      <li v-for="(item, index) in listItems" :key="index" class="shopping-list-item">
        <label :class="{ 'checked': item.checked }">
          <input type="checkbox" v-model="item.checked" @change="toggleItem(item)">
          <span class="item-name">{{ item.name }}</span>
        </label>
      </li>
    </ul>
    <div v-if="listItems.length > 0" class="shopping-list-actions">
      <BaseButton @click="uncheckAll" variant="outline">Uncheck All</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useShoppingList } from '@/composables/useShoppingList'
import { usePlanner } from '@/composables/usePlanner'
import { useDishes } from '@/composables/useDishes'
import BaseButton from './BaseButton.vue'

const { shoppingList: generatedList } = useShoppingList()
const { activeWeek, currentPlan } = usePlanner()
const { isLoading: isLoadingDishes, error: errorDishes, dishes } = useDishes()

const listItems = ref([])
const LOCAL_STORAGE_SHOPPING_LIST_CHECKED = 'mealPlanner_shoppingListChecked'

const loadCheckedStates = () => {
  const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHOPPING_LIST_CHECKED) || '{}')
  listItems.value = generatedList.value.map(item => ({ ...item, checked: stored[item.name] || false }))
}

const saveCheckedStates = () => {
  const toStore = listItems.value.reduce((acc, item) => { if (item.checked) acc[item.name] = true; return acc }, {})
  localStorage.setItem(LOCAL_STORAGE_SHOPPING_LIST_CHECKED, JSON.stringify(toStore))
}

watch([generatedList, dishes], () => { loadCheckedStates() }, { deep: true, immediate: true })

const toggleItem = () => { saveCheckedStates() }
const uncheckAll = () => { listItems.value.forEach(item => item.checked = false); saveCheckedStates() }

const isPlanEmpty = computed(() => {
  if (!currentPlan.value) return true
  return Object.values(currentPlan.value).every(day => day.length === 0)
})

onMounted(() => { if (dishes.value.length > 0) loadCheckedStates() })
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.shopping-list-container{padding:$spacing-lg;max-width:700px;margin:$spacing-lg auto;}
.shopping-list-title{font-size:$font-size-xl;color:$text-color;margin-bottom:$spacing-lg;text-align:center;}
.loading-message,.error-message,.info-message{text-align:center;padding:$spacing-lg;font-size:$font-size-base;color:$text-color-light;}
.error-message{color:#dc3545;}
.shopping-list{list-style:none;padding:0;margin:0;}
.shopping-list-item{padding:$spacing-sm 0;border-bottom:1px solid $border-color;font-size:$font-size-base;}
.shopping-list-item:last-child{border-bottom:none;}
.shopping-list-item label{display:flex;align-items:center;cursor:pointer;transition:color 0.2s ease;}
.shopping-list-item input[type="checkbox"]{margin-right:$spacing-md;width:20px;height:20px;accent-color:$primary-color;cursor:pointer;}
.shopping-list-item label .item-name{transition:opacity 0.2s ease;}
.shopping-list-item label.checked .item-name{text-decoration:line-through;opacity:0.6;}
.shopping-list-actions{margin-top:$spacing-lg;display:flex;justify-content:flex-end;}
</style>
