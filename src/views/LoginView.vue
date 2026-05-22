<template>
  <div class="prime-container">
    <div class="prime-side">
      <div class="prime-branding">
        <img src="/rule.png" alt="RULE Logo" class="auth-logo" />
        <h1>សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្រ្តនិងវិទ្យាសាស្រ្តសេដ្ឋកិច្ច</h1>
        <p>
          ចូលគណនីរបស់អ្នកដើម្បីគ្រប់គ្រងទិន្នន័យនិស្សិត តាមដានវឌ្ឍនភាពនៃការសិក្សា
          និងរៀបចំកាលវិភាគប្រកបដោយប្រសិទ្ធភាព។
        </p>
      </div>
    </div>

    <div class="prime-form-side">
      <form @submit.prevent="handleLogin" class="prime-form">
        <h2>ចូលគណនី</h2>
        <div class="form-group">
          <label for="email">អាសយដ្ឋានអ៊ីមែល</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="ឧ. admin@school.com"
          />
        </div>
        <div class="form-group">
          <label for="password">ពាក្យសម្ងាត់</label>
          <div class="password-input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="••••••••"
            />
            <button
              type="button"
              class="btn-toggle-password"
              @click="showPassword = !showPassword"
              title="បង្ហាញ/លាក់ពាក្យសម្ងាត់"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                ></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>

        <button type="submit">ចូលគណនី</button>

        <p class="message">
          មិនទាន់មានគណនីមែនទេ? <RouterLink to="/register">បង្កើតគណនីថ្មី</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const handleLogin = () => {
  const success = authStore.login(email.value, password.value)
  if (success) {
    toastStore.addMessage('ចូលគណនីបានជោគជ័យ!', 'success')
    router.push('/dashboard')
  } else {
    toastStore.addMessage('អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។', 'error')
  }
}
</script>

<style scoped>
@import '@/assets/forms.css';

.prime-branding h1 {
  font-size: 2.25rem; /* Adjust font size for long university name */
  margin-bottom: 1.5rem; /* បន្ថែមគម្លាតពីក្រោមចំណងជើង */
}

.auth-logo {
  width: 80px;
  height: auto;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper input {
  padding-right: 2.5rem; /* Make room for the eye icon */
}

.btn-toggle-password {
  position: absolute;
  right: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  margin: 0;
  box-shadow: none; /* Override default button styles from global CSS */
}

.btn-toggle-password:hover {
  color: var(--color-primary);
}
</style>
