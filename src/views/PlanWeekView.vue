<template>
  <div class="plan-week-view container">
    <header class="view-header">
      <h1>Plan Your Meals</h1>
      <p>Organize your meals for the current week and the next week. Set one week as active to generate its shopping list.</p>
    </header>
    <WeekPlanner weekName="week1" weekTitle="Current Week Plan" :plan="week1Plan" />
    <WeekPlanner weekName="week2" weekTitle="Next Week Plan" :plan="week2Plan" />
  </div>
</template>

<script setup>
import WeekPlanner from '@/components/WeekPlanner.vue'
import { usePlanner } from '@/composables/usePlanner'

const { week1Plan, week2Plan } = usePlanner()
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.view-header{margin-bottom:$spacing-lg;padding-bottom:$spacing-md;border-bottom:1px solid $border-color;}
.view-header h1{font-size:$font-size-xxl;color:$text-color;}
.view-header p{font-size:$font-size-base;color:$text-color-light;max-width:700px;}
</style>
