import { createRouter, createWebHistory } from 'vue-router'
import AllDishesView from '../views/AllDishesView.vue'
import PlanWeekView from '../views/PlanWeekView.vue'
import ShoppingListView from '../views/ShoppingListView.vue'

const routes = [
  { path: '/', redirect: '/plan' },
  { path: '/dishes', name: 'AllDishes', component: AllDishesView },
  { path: '/plan', name: 'PlanWeek', component: PlanWeekView },
  { path: '/shopping-list', name: 'ShoppingList', component: ShoppingListView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { top: 0 }
  }
})

export default router
