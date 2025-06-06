<template>
  <button :class="['base-button', `base-button--${variant}`, sizeClass, { 'base-button--block': block }]" :type="type" @click="$emit('click', $event)" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue"
const props = defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
  disabled: { type: Boolean, default: false }
})
const sizeClass = computed(() => props.size === 'small' ? 'base-button--small' : '')

defineEmits(['click'])
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.base-button {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:$spacing-sm $spacing-md;
  border:1px solid transparent;
  border-radius:$border-radius-md;
  font-size:$font-size-base;
  font-weight:500;
  text-align:center;
  cursor:pointer;
  transition:$transition-base;
  white-space:nowrap;
  user-select:none;

  &:disabled {
    opacity:0.65;
    cursor:not-allowed;
  }

  &--block { display:block;width:100%; }

  &--primary {
    background-color:$primary-color;
    color:$card-background-color;
    border-color:$primary-color;
    &:hover:not(:disabled) { background-color:darken($primary-color,8%); border-color:darken($primary-color,8%); }
  }

  &--secondary {
    background-color:$text-color-light;
    color:$card-background-color;
    border-color:$text-color-light;
    &:hover:not(:disabled){ background-color:darken($text-color-light,8%); border-color:darken($text-color-light,8%); }
  }

  &--danger {
    background-color:#dc3545;
    color:$card-background-color;
    border-color:#dc3545;
    &:hover:not(:disabled){ background-color:darken(#dc3545,8%); border-color:darken(#dc3545,8%); }
  }

  &--outline {
    background-color:transparent;
    color:$primary-color;
    border-color:$primary-color;
    &:hover:not(:disabled){ background-color:rgba($primary-color,0.1); }
  }

  &--small { padding:$spacing-xs $spacing-sm; font-size:$font-size-sm; border-radius:$border-radius-sm; }
}
</style>
