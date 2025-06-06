<template>
  <div class="dish-list-container">
    <div v-if="isLoading" class="loading-message">Loading dishes...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!isLoading && !error && dishes.length === 0" class="empty-message">No dishes found. Try adding some to <code>public/dishes.json</code>.</div>
    <div class="dish-grid" v-if="!isLoading && !error && dishes.length > 0">
      <DishCard v-for="dish in dishes" :key="dish.id" :dish="dish" @view-details="openDetailsModal">
        <template #actions="{ dish: currentDish }" v-if="showAddButton">
          <BaseButton @click="$emit('add-dish-to-plan', currentDish)" variant="primary" class="add-to-plan-button">Add to Plan</BaseButton>
        </template>
      </DishCard>
    </div>
    <DishDetailModal :show="isModalVisible" :dish="selectedDish" @close="closeDetailsModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDishes } from '@/composables/useDishes'
import DishCard from './DishCard.vue'
import DishDetailModal from './DishDetailModal.vue'
import BaseButton from './BaseButton.vue'

defineProps({ showAddButton: { type: Boolean, default: false } })
defineEmits(['add-dish-to-plan'])

const { dishes, isLoading, error } = useDishes()
const isModalVisible = ref(false)
const selectedDish = ref(null)

const openDetailsModal = (dish) => { selectedDish.value = dish; isModalVisible.value = true }
const closeDetailsModal = () => { isModalVisible.value = false; selectedDish.value = null }
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.dish-list-container{padding:$spacing-md 0;}
.loading-message,.error-message,.empty-message{text-align:center;padding:$spacing-xl;font-size:$font-size-lg;color:$text-color-light;}
.error-message{color:#dc3545;}
.dish-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:$spacing-lg;}
.add-to-plan-button{width:100%;}
</style>
