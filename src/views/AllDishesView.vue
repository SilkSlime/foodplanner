<template>
  <div class="all-dishes-view container">
    <header class="view-header">
      <h1>All Available Dishes</h1>
      <p>Browse through all available dishes. Click on any dish to see its full recipe and details.</p>
    </header>
    <DishList />
  </div>
</template>

<script setup>
import DishList from '@/components/DishList.vue'
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.view-header{margin-bottom:$spacing-lg;padding-bottom:$spacing-md;border-bottom:1px solid $border-color;}
.view-header h1{font-size:$font-size-xxl;color:$text-color;}
.view-header p{font-size:$font-size-base;color:$text-color-light;max-width:700px;}
</style>
