<template>
  <div class="week-planner">
    <div class="week-controls">
      <h3>{{ weekTitle }}</h3>
      <div class="actions">
        <BaseButton @click="toggleActive" :variant="isActive ? 'primary' : 'outline'" :disabled="isActive">
          {{ isActive ? 'Active Week' : 'Set Active' }}
        </BaseButton>
        <BaseButton @click="clearThisWeek" variant="danger" class="ml-sm">Clear Week</BaseButton>
      </div>
    </div>
    <div class="days-grid">
      <DayCard v-for="day in DAYS_OF_WEEK" :key="day" :dayName="day" :plannedDishIds="plan[day] || []" @add-dish-to-day="handleAddDishToDay(day)" @remove-dish="dishId => handleRemoveDish(day, dishId)" />
    </div>
    <BaseModal :show="isDishSelectionModalVisible" @close="closeDishSelectionModal" max-width="800px">
      <template #header>
        <h3>Select a Dish for {{ currentDayForAdding }}</h3>
      </template>
      <template #body>
        <div class="dish-selection-list">
          <div v-for="dish in allDishes" :key="dish.id" class="dish-selection-item card" @click="selectDishForDay(dish.id)">
            <img v-if="dish.picture" :src="dish.picture" :alt="dish.name" class="dish-selection-item__image" />
            <div v-else class="dish-selection-item__image-placeholder"></div>
            <span class="dish-selection-item__name">{{ dish.name }}</span>
          </div>
          <p v-if="allDishesLoading">Loading dishes...</p>
          <p v-if="!allDishesLoading && allDishes.length === 0">No dishes available.</p>
        </div>
      </template>
      <template #footer>
        <BaseButton @click="closeDishSelectionModal" variant="secondary">Cancel</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlanner } from '@/composables/usePlanner'
import { useDishes } from '@/composables/useDishes'
import DayCard from './DayCard.vue'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  weekName: { type: String, required: true },
  weekTitle: { type: String, required: true },
  plan: { type: Object, required: true }
})

const { activeWeek, setActiveWeek, addDishToDay, removeDishFromDay, clearWeek, DAYS_OF_WEEK } = usePlanner()
const { dishes: allDishes, isLoading: allDishesLoading } = useDishes()

const isActive = computed(() => activeWeek.value === props.weekName)
const toggleActive = () => { if (!isActive.value) setActiveWeek(props.weekName) }
const clearThisWeek = () => { if (confirm(`Are you sure you want to clear all meals for ${props.weekTitle}?`)) clearWeek(props.weekName) }

const isDishSelectionModalVisible = ref(false)
const currentDayForAdding = ref(null)
const handleAddDishToDay = (day) => { currentDayForAdding.value = day; isDishSelectionModalVisible.value = true }
const closeDishSelectionModal = () => { isDishSelectionModalVisible.value = false; currentDayForAdding.value = null }
const selectDishForDay = (dishId) => { if (currentDayForAdding.value && dishId) addDishToDay(props.weekName, currentDayForAdding.value, dishId); closeDishSelectionModal() }
const handleRemoveDish = (day, dishId) => { removeDishFromDay(props.weekName, day, dishId) }
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.week-planner{background-color:$card-background-color;padding:$spacing-lg;border-radius:$border-radius-lg;box-shadow:$soft-shadow;margin-bottom:$spacing-xl;}
.week-controls{display:flex;justify-content:space-between;align-items:center;margin-bottom:$spacing-lg;padding-bottom:$spacing-md;border-bottom:1px solid $border-color;}
.week-controls h3{margin:0;font-size:$font-size-xl;color:$text-color;}
.week-controls .actions{display:flex;gap:$spacing-sm;}
.days-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:$spacing-lg;}
.dish-selection-list{max-height:60vh;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:$spacing-md;padding:$spacing-sm;}
.dish-selection-item{padding:$spacing-sm;cursor:pointer;transition:$transition-base;display:flex;flex-direction:column;align-items:center;text-align:center;border:1px solid $border-color;}
.dish-selection-item:hover{border-color:$primary-color;background-color:lighten($primary-color,45%);}
.dish-selection-item__image{width:100px;height:70px;object-fit:cover;border-radius:$border-radius-sm;margin-bottom:$spacing-sm;}
.dish-selection-item__image-placeholder{width:100px;height:70px;background-color:#e9ecef;border-radius:$border-radius-sm;margin-bottom:$spacing-sm;}
.dish-selection-item__name{font-size:$font-size-sm;font-weight:500;}
</style>
