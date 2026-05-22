import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '../stores/auth'
import InternDataView from '../views/InternDataView.vue'
import InternListView from '../views/InternListView.vue'
import CoursesView from '../views/CoursesView.vue'
import GradesView from '../views/GradesView.vue'
import CalendarView from '../views/CalendarView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', // Force landing on login page
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
    },
    {
      path: '/intern-data',
      name: 'intern-data',
      component: InternDataView,
    },
    {
      path: '/intern-list',
      name: 'intern-list',
      component: InternListView,
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
    },
    {
      path: '/grades',
      name: 'grades',
      component: GradesView,
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

// Navigation Guard to protect routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.currentUser

  if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
