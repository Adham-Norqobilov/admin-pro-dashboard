import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: "/",
          component: ()=> import('@/views/DashboardView.vue')
        },
        {
          path: "/users",
          component: () => import('@/views/UsersView.vue')
        },
        {
          path: "/settings",
          component: () => import('@/views/SettingsView.vue')
        }
      ]
    }
  ],
})

export default router
