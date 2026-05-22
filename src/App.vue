<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useToastStore } from './stores/toast'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  closeMobileMenu()
  router.push('/login')
}
</script>

<template>
  <header v-if="authStore.currentUser">
    <nav>
      <div class="brand-logo">
        <img
          src="/rule.png"
          alt="RULE Logo"
          class="logo-icon"
          title="សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្រ្តនិងវិទ្យាសាស្រ្តសេដ្ឋកិច្ច"
        />
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle Menu">
        <svg
          v-if="!isMobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Navigation Links -->
      <div class="nav-links" :class="{ 'is-open': isMobileMenuOpen }">
        <RouterLink to="/dashboard" @click="closeMobileMenu">ផ្ទាំងគ្រប់គ្រង</RouterLink>
        <RouterLink to="/courses" @click="closeMobileMenu">វគ្គសិក្សា</RouterLink>
        <RouterLink to="/grades" @click="closeMobileMenu">ពិន្ទុនិស្សិត</RouterLink>
        <RouterLink to="/schedule" @click="closeMobileMenu">កាលវិភាគ</RouterLink>
        <RouterLink to="/intern-list" @click="closeMobileMenu">និស្សិត</RouterLink>
        <RouterLink to="/intern-data" @click="closeMobileMenu">បញ្ចូលនិស្សិត</RouterLink>
        <RouterLink to="/calendar" @click="closeMobileMenu">ប្រតិទិន</RouterLink>
        <RouterLink to="/profile" @click="closeMobileMenu">គណនី</RouterLink>
        <a href="#" @click.prevent="handleLogout" class="logout">ចាកចេញ</a>
      </div>
    </nav>
  </header>

  <RouterView v-slot="{ Component }">
    <transition name="page-slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <!-- Toast Notification Container -->
  <div class="toast-container">
    <div
      v-for="toast in toastStore.messages"
      :key="toast.id"
      class="toast-message"
      :class="`toast-${toast.type}`"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<style>
/* Color Theme Variables */
:root {
  --color-primary: #002366; /* RULE Navy Blue */
  --color-primary-hover: #001a4d; /* Darker blue for hover */
  --color-primary-light: rgba(0, 35, 102, 0.1);
  --color-primary-light-hover: rgba(0, 35, 102, 0.2);
  --color-primary-ring: rgba(0, 35, 102, 0.25);
  --color-accent: #d4af37; /* RULE Gold */
  --color-accent-hover: #c09b2d; /* Darker Gold for hover */
  --color-gradient-start: #002366;
  --color-gradient-end: #001a4d;
}

/* Global resets to fix default Vue styling interfering with our layout */
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  font-family:
    'Kantumruy Pro',
    'Battambang',
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  background-color: #f8fafc;
  color: #2d3748;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

input,
button,
select,
textarea {
  font-family: inherit;
}

#app {
  max-width: 100% !important; /* Overrides default Vue max-width */
  padding: 0 !important; /* Overrides default Vue padding */
  margin: 0 !important; /* Overrides default Vue margin */
  font-weight: normal;
  display: block !important; /* Fixes Vite's default grid/flex display */
  width: 100%;
  min-height: 100vh;
}

/* Force all dashboard pages to be full width */
.dashboard {
  max-width: 100% !important;
  width: 100% !important;
}

.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast-message {
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out forwards;
}

.toast-success {
  background-color: #10b981;
}
.toast-error {
  background-color: #ef4444;
}
.toast-info {
  background-color: var(--color-primary);
}

/* Mobile Toast Adjustments */
@media (max-width: 600px) {
  .toast-container {
    right: 1rem;
    left: 1rem;
    bottom: max(1rem, env(safe-area-inset-bottom));
  }
  .toast-message {
    text-align: center;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Page Transition Animations */
.page-slide-enter-active,
.page-slide-leave-active {
  /* Using a smoother cubic-bezier curve for a more refined feel */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>

<style scoped>
header {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 35, 102, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}

nav {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.8rem 2rem;
  position: relative;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-primary);
}

.logo-icon {
  height: 55px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
}
.brand-logo:hover .logo-icon {
  transform: scale(1.08) rotate(-1deg);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  flex-wrap: wrap;
  flex: 1;
  margin-left: 4rem;
}

nav a {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-1px);
}

nav a.router-link-exact-active {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px var(--color-primary-ring);
}

nav .nav-links .logout {
  margin-left: auto;
  background-color: #fff1f2;
  color: #e11d48;
}

nav .nav-links .logout:hover {
  background-color: #ffe4e6;
  color: #be123c;
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.15);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  padding: 0.25rem;
}

/* Responsive Breakpoints */
@media (max-width: 768px) {
  nav {
    padding: 0.8rem 1.2rem;
  }
  .brand-logo {
    margin-left: 0;
  }
  .logo-icon {
    height: 45px;
  }
  .mobile-menu-btn {
    display: block;
    z-index: 1001;
  }
  .nav-links {
    display: flex;
    position: absolute;
    top: 100%;
    left: 1rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 35, 102, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.05);
    flex-direction: column;
    padding: 1rem;
    margin-left: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px) scale(0.98);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }
  .nav-links.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  nav .nav-links a {
    width: 100%;
    text-align: left;
    padding: 0.85rem 1.2rem;
    border-radius: 10px;
  }
  nav .nav-links .logout {
    margin-left: 0;
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
  }
  nav .nav-links .logout:hover {
    transform: none;
  }
}
</style>
