import { createRouter, createWebHistory } from 'vue-router'
import EventsList from '../views/EventsList.vue'
import Profile from '../views/Profile.vue'
import CreateEvent from '../views/CreateEvent.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', name: 'events', component: EventsList },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/create', name: 'create', component: CreateEvent },
  { path: '/login', name: 'login', component: Login },
]

const router = createRouter({
  history: createWebHistory('/dance-events/'),
  routes,
})
export default router