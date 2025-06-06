<template>
  <header class="app-header">
    <div class="container header-content">
      <router-link to="/" class="logo">Meal Planner</router-link>
      <nav class="main-nav">
        <router-link to="/plan">Plan Weeks</router-link>
        <router-link to="/dishes">All Dishes</router-link>
        <router-link to="/shopping-list">Shopping List</router-link>
      </nav>
      <div class="active-week-display" v-if="route.path === '/plan' || route.path === '/shopping-list'">
        Active: <strong>{{ activeWeek === 'week1' ? 'Current Week' : 'Next Week' }}</strong>
      </div>
    </div>
  </header>
</template>

<script setup>
import { usePlanner } from '@/composables/usePlanner'
import { useRoute } from 'vue-router'

const { activeWeek } = usePlanner()
const route = useRoute()
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.app-header{background-color:$card-background-color;padding:$spacing-md 0;box-shadow:0 2px 4px rgba(0,0,0,0.05);margin-bottom:$spacing-lg;position:sticky;top:0;z-index:100;}
.header-content{display:flex;justify-content:space-between;align-items:center;}
.logo{font-size:$font-size-xl;font-weight:bold;color:$primary-color;text-decoration:none;}
.logo:hover{text-decoration:none;}
.main-nav{display:flex;gap:$spacing-lg;}
.main-nav a{color:$text-color-light;text-decoration:none;padding:$spacing-sm $spacing-xs;border-radius:$border-radius-sm;position:relative;font-weight:500;}
.main-nav a:hover{color:$primary-color;text-decoration:none;}
.main-nav a.exact-active-link{color:$primary-color;font-weight:600;}
.main-nav a.exact-active-link::after{content:'';position:absolute;bottom:-($spacing-sm / 2);left:50%;transform:translateX(-50%);width:6px;height:6px;background-color:$primary-color;border-radius:50%;}
.active-week-display{font-size:$font-size-sm;color:$text-color-light;}
.active-week-display strong{color:$text-color;}
</style>
