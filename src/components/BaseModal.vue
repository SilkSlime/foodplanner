<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container card" :style="{ maxWidth: maxWidth }">
        <header class="modal-header">
          <slot name="header"><h3>Default Header</h3></slot>
          <BaseButton variant="outline" class="modal-close-button" @click="$emit('close')" aria-label="Close modal">×</BaseButton>
        </header>
        <section class="modal-body">
          <slot name="body">Default body content.</slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

const props = defineProps({
  show: { type: Boolean, required: true },
  maxWidth: { type: String, default: '600px' }
})

defineEmits(['close'])
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.modal-overlay{
  position:fixed;
  top:0; left:0; width:100%; height:100%;
  background-color:rgba(0,0,0,0.6);
  display:flex; justify-content:center; align-items:center;
  z-index:1000; padding:$spacing-md;
}

.modal-container{
  background-color:$card-background-color;
  border-radius:$border-radius-lg;
  box-shadow:0 10px 30px rgba(0,0,0,0.2);
  display:flex; flex-direction:column; width:100%;
  max-height:90vh; overflow:hidden;
}

.modal-header{
  padding:$spacing-md $spacing-lg;
  border-bottom:1px solid $border-color;
  display:flex; justify-content:space-between; align-items:center;
  h3{margin-bottom:0;font-size:$font-size-lg;}
}

.modal-close-button{
  padding:$spacing-xs;
  font-size:$font-size-xl;
  line-height:1;
  border:none;
  background:transparent;
  color:$text-color-light;
  &:hover{color:$text-color;background-color:transparent;}
}

.modal-body{padding:$spacing-lg;overflow-y:auto;flex-grow:1;}
.modal-footer{padding:$spacing-md $spacing-lg;border-top:1px solid $border-color;display:flex;justify-content:flex-end;gap:$spacing-sm;}

.modal-fade-enter-active, .modal-fade-leave-active{transition:opacity 0.3s ease;}
.modal-fade-enter-from, .modal-fade-leave-to{opacity:0;}
.modal-fade-enter-active .modal-container, .modal-fade-leave-active .modal-container{transition:transform 0.3s ease;}
.modal-fade-enter-from .modal-container, .modal-fade-leave-to .modal-container{transform:translateY(-30px) scale(0.95);}
</style>
