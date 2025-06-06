<template>
  <div class="day-card card">
    <h4 class="day-card__name">{{ dayName }}</h4>
    <div v-if="plannedDishesDetails.length === 0" class="day-card__empty">No meals planned.</div>
    <ul v-else class="day-card__dish-list">
      <li v-for="dish in plannedDishesDetails" :key="dish.id" class="day-card__dish-item">
        <span>{{ dish.name }}</span>
        <BaseButton variant="danger" class="remove-dish-button" size="small" @click="$emit('remove-dish', dish.id)" aria-label="Remove dish">×</BaseButton>
      </li>
    </ul>
    <BaseButton @click="$emit('add-dish-to-day')" variant="outline" block class="mt-sm">Add Dish</BaseButton>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDishes } from '@/composables/useDishes'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  dayName: { type: String, required: true },
  plannedDishIds: { type: Array, default: () => [] }
})

defineEmits(['add-dish-to-day', 'remove-dish'])

const { getDishById } = useDishes()

const plannedDishesDetails = computed(() => {
  return props.plannedDishIds.map(id => getDishById(id)).filter(Boolean)
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.day-card{padding:$spacing-md;min-height:150px;display:flex;flex-direction:column;}
.day-card__name{font-size:$font-size-lg;color:$text-color;margin-top:0;margin-bottom:$spacing-md;text-align:center;border-bottom:1px solid $border-color;padding-bottom:$spacing-sm;}
.day-card__empty{text-align:center;color:$text-color-light;font-style:italic;flex-grow:1;display:flex;align-items:center;justify-content:center;}
.day-card__dish-list{list-style:none;padding:0;margin:0 0 $spacing-md 0;flex-grow:1;}
.day-card__dish-item{display:flex;justify-content:space-between;align-items:center;padding:$spacing-xs 0;font-size:$font-size-sm;border-bottom:1px dashed lighten($border-color,5%);}
.day-card__dish-item:last-child{border-bottom:none;}
.day-card__dish-item span{flex-grow:1;margin-right:$spacing-sm;}
.remove-dish-button{padding:2px 6px;font-size:1em;line-height:1;}
</style>
