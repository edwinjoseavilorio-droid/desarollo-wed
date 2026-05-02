import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductoForm from '@/components/ProductoForm.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/productos', component: ProductoForm }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
