<template>
  <BaseModal :show="show" @close="$emit('close')" max-width="700px">
    <template #header>
      <h2 v-if="dish">{{ dish.name }}</h2>
      <h2 v-else>Dish Details</h2>
    </template>
    <template #body>
      <div v-if="dish" class="dish-detail-content">
        <img v-if="dish.picture" :src="dish.picture" :alt="dish.name" class="dish-detail__image" />
        <div class="dish-detail__section">
          <h3>KBZhU (per serving)</h3>
          <p v-if="dish.kbzhu">Calories: {{ dish.kbzhu.calories }} kcal | Protein: {{ dish.kbzhu.protein }}g | Fat: {{ dish.kbzhu.fat }}g | Carbs: {{ dish.kbzhu.carbs }}g</p>
          <p v-else>KBZhU information not available.</p>
        </div>
        <div class="dish-detail__section">
          <h3>Composition</h3>
          <ul v-if="dish.composition && dish.composition.length" class="composition-list">
            <li v-for="(item, index) in dish.composition" :key="index">{{ item }}</li>
          </ul>
          <p v-else>Composition not available.</p>
        </div>
        <div class="dish-detail__section">
          <h3>Recipe</h3>
          <div v-if="dish.recipe" class="recipe-markdown" v-html="compiledMarkdown"></div>
          <p v-else>Recipe not available.</p>
        </div>
      </div>
      <div v-else>
        <p>No dish selected or details are missing.</p>
      </div>
    </template>
    <template #footer>
      <BaseButton @click="$emit('close')" variant="secondary">Close</BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({ show: Boolean, dish: Object })

defineEmits(['close'])

const compiledMarkdown = computed(() => {
  if (props.dish && props.dish.recipe) return marked(props.dish.recipe)
  return ''
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
.dish-detail-content h3{font-size:$font-size-lg;color:$primary-color;margin-top:$spacing-lg;margin-bottom:$spacing-sm;border-bottom:1px solid $border-color;padding-bottom:$spacing-xs;}
.dish-detail-content p,.dish-detail-content ul,.dish-detail-content div.recipe-markdown{font-size:$font-size-base;line-height:1.7;color:$text-color;}
.dish-detail__image{width:100%;max-height:300px;object-fit:cover;border-radius:$border-radius-md;margin-bottom:$spacing-lg;box-shadow:$soft-shadow;}
.dish-detail__section{margin-bottom:$spacing-lg;}
.composition-list{list-style-type:disc;padding-left:$spacing-lg;}
.composition-list li{margin-bottom:$spacing-xs;}
.recipe-markdown :deep(h1),.recipe-markdown :deep(h2),.recipe-markdown :deep(h3),.recipe-markdown :deep(h4),.recipe-markdown :deep(h5),.recipe-markdown :deep(h6){margin-top:$spacing-md;margin-bottom:$spacing-sm;font-weight:600;}
.recipe-markdown :deep(h1){font-size:1.8em;}
.recipe-markdown :deep(h2){font-size:1.5em;}
.recipe-markdown :deep(h3){font-size:1.3em;}
.recipe-markdown :deep(p){margin-bottom:$spacing-md;}
.recipe-markdown :deep(ul),.recipe-markdown :deep(ol){margin-bottom:$spacing-md;padding-left:$spacing-lg;}
.recipe-markdown :deep(li){margin-bottom:$spacing-xs;}
.recipe-markdown :deep(strong){font-weight:600;}
.recipe-markdown :deep(em){font-style:italic;}
.recipe-markdown :deep(code){background-color:#f0f0f0;padding:2px 4px;border-radius:$border-radius-sm;font-family:monospace;}
.recipe-markdown :deep(pre){background-color:#f0f0f0;padding:$spacing-md;border-radius:$border-radius-sm;overflow-x:auto;}
.recipe-markdown :deep(blockquote){border-left:4px solid $border-color;padding-left:$spacing-md;margin-left:0;margin-bottom:$spacing-md;color:$text-color-light;}
</style>
