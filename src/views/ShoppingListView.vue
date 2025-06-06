<template>
  <div class="shopping-list-view container">
    <header class="view-header">
      <h1>Your Shopping List</h1>
      <p>Here's what you need for your planned meals for the <strong>{{ activeWeek === 'week1' ? 'Current Week' : 'Next Week' }}</strong>. Check off items as you shop!</p>
    </header>
    <ShoppingList />
  </div>
</template>

<script setup>
import ShoppingList from '@/components/ShoppingList.vue'
import { usePlanner } from '@/composables/usePlanner'

const { activeWeek } = usePlanner()
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.view-header{margin-bottom:$spacing-lg;padding-bottom:$spacing-md;border-bottom:1px solid $border-color;text-align:center;}
.view-header h1{font-size:$font-size-xxl;color:$text-color;}
.view-header p{font-size:$font-size-base;color:$text-color-light;max-width:700px;margin-left:auto;margin-right:auto;}
</style>
