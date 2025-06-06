<template>
  <div class="dish-card card">
    <div class="dish-card__image-container">
      <img v-if="dish.picture" :src="dish.picture" :alt="dish.name" class="dish-card__image" />
      <div v-else class="dish-card__image-placeholder">No Image</div>
    </div>
    <div class="dish-card__content">
      <h3 class="dish-card__name">{{ dish.name }}</h3>
      <div class="dish-card__kbzhu" v-if="dish.kbzhu">
        <span>{{ dish.kbzhu.calories }} kcal</span>
        <span>P: {{ dish.kbzhu.protein }}g</span>
        <span>F: {{ dish.kbzhu.fat }}g</span>
        <span>C: {{ dish.kbzhu.carbs }}g</span>
      </div>
      <p class="dish-card__composition" v-if="dish.composition && dish.composition.length">
        <strong>Main Ingredients:</strong> {{ dish.composition.slice(0,3).join(', ') }}{{ dish.composition.length > 3 ? '...' : '' }}
      </p>
    </div>
    <div class="dish-card__actions">
      <BaseButton @click="$emit('view-details', dish)" variant="outline">View Recipe</BaseButton>
      <slot name="actions" :dish="dish"></slot>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({ dish: { type: Object, required: true } })
defineEmits(['view-details'])
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.dish-card{display:flex;flex-direction:column;overflow:hidden;height:100%;}
.dish-card__image-container{width:100%;height:200px;background-color:#e9ecef;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.dish-card__image{width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;}
.dish-card:hover .dish-card__image{transform:scale(1.05);}
.dish-card__image-placeholder{color:$text-color-light;font-size:$font-size-base;}
.dish-card__content{padding:$spacing-md;flex-grow:1;}
.dish-card__name{font-size:$font-size-lg;margin-top:0;margin-bottom:$spacing-sm;color:$text-color;}
.dish-card__kbzhu{font-size:$font-size-sm;color:$text-color-light;margin-bottom:$spacing-sm;display:flex;flex-wrap:wrap;gap:$spacing-sm;}
.dish-card__kbzhu span{white-space:nowrap;}
.dish-card__composition{font-size:$font-size-sm;color:$text-color-light;margin-bottom:$spacing-md;line-height:1.4;}
.dish-card__actions{padding:0 $spacing-md $spacing-md;display:flex;gap:$spacing-sm;align-items:center;flex-wrap:wrap;}
.dish-card__actions .base-button{flex-grow:1;min-width:120px;}
</style>
