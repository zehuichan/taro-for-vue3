import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: []
})

// config router
export function setupRouter(app) {
  app.use(router)
}
