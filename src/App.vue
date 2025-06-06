<template>
  <div id="app-container">
    <AppHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} Meal Planner. Vue 3 & Vite.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style lang="scss">
@use './assets/styles/variables' as *;
#app-container{display:flex;flex-direction:column;min-height:100vh;}
.main-content{flex-grow:1;padding-top:$spacing-lg;padding-bottom:$spacing-xl;}
.app-footer{background-color:darken($background-color,3%);color:$text-color-light;padding:$spacing-md 0;text-align:center;font-size:$font-size-sm;border-top:1px solid $border-color;}
.fade-enter-active,.fade-leave-active{transition:opacity 0.2s ease;}
.fade-enter-from,.fade-leave-to{opacity:0;}
</style>
