import { createPinia } from 'pinia'

const store = createPinia()

export { useAppStore } from './modules/app'
export { useUserStore } from './modules/user'

export function setupStore(app) {
  app.use(store)
}

export { store }
