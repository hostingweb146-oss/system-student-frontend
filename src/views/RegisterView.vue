<template>
  <div class="prime-container">
    <div class="prime-side">
      <div class="prime-branding">
        <img src="/rule.png" alt="RULE Logo" class="auth-logo" />
        <h1>សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្រ្តនិងវិទ្យាសាស្រ្តសេដ្ឋកិច្ច</h1>
        <p>
          បង្កើតគណនីថ្មីដើម្បីចូលរួមក្នុងប្រព័ន្ធ និងគ្រប់គ្រងទិន្នន័យនិស្សិត
          ប្រកបដោយភាពងាយស្រួលនិងសុវត្ថិភាព។
        </p>
      </div>
    </div>

    <div class="prime-form-side">
      <form @submit.prevent="handleRegister" class="prime-form">
        <h2>ចុះឈ្មោះ</h2>
        <div class="form-group">
          <label for="name">ឈ្មោះពេញ</label>
          <input type="text" id="name" v-model="name" required placeholder="ឧ. សុខ ម៉ានី" />
        </div>
        <div class="form-group">
          <label for="email">អាសយដ្ឋានអ៊ីមែល</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="ឧ. sok@example.com"
          />
        </div>
        <div class="form-group">
          <label for="avatar">រូបថតប្រវត្តិរូប (Profile Image)</label>
          <input type="file" id="avatar" accept="image/*" @change="handleImageUpload" required />
          <div v-if="avatar !== ''" class="avatar-preview">
            <img :src="avatar" alt="Profile Preview" />
          </div>
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

        <button type="submit">ចុះឈ្មោះគណនី</button>

        <p class="message">មានគណនីរួចហើយ? <RouterLink to="/login">ចូលគណនី</RouterLink></p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'

interface ExtendedAuthStore {
  register(name: string, email: string, pass: string, avatar: string): boolean
}

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const avatar = ref('')
const authStore = useAuthStore()
const toastStore = useToastStore()

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files !== null && target.files.length > 0) {
    const selectedFile = target.files.item(0)
    if (selectedFile !== null) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 150
          const MAX_HEIGHT = 150
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          avatar.value = canvas.toDataURL('image/jpeg', 0.7)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(selectedFile)
    }
  }
}

const handleRegister = () => {
  // បន្ថែមលក្ខខណ្ឌតម្រូវឱ្យមានរូបថតមុននឹងអាចចុះឈ្មោះបាន
  if (avatar.value === '') {
    toastStore.addMessage('សូមជ្រើសរើសរូបថតប្រវត្តិរូបរបស់អ្នកជាចាំបាច់!', 'error')
    return
  }

  // បញ្ជូន avatar ទៅកាន់ authStore. អ្នកត្រូវចូលទៅកែប្រែ function register ក្នុង stores/auth.ts ដើម្បីទទួលយករូបភាពនេះ!
  const success = (authStore as unknown as ExtendedAuthStore).register(
    name.value,
    email.value,
    password.value,
    avatar.value,
  )
  if (success) {
    // ដំណោះស្រាយបណ្តោះអាសន្ន: បង្ខំរក្សាទុករូបថតដោយផ្ទាល់ចូលទៅកាន់ localStorage
    try {
      const users: { email: string; avatar?: string }[] = JSON.parse(
        localStorage.getItem('users') || '[]',
      )
      const currentUser = users.find((u) => u.email === email.value)
      if (currentUser) {
        currentUser.avatar = avatar.value
        localStorage.setItem('users', JSON.stringify(users))
      }

      // សម្អាតទិន្នន័យ LocalStorage ចាស់ៗ ដើម្បីឱ្យគណនីថ្មីមាន Dashboard ទទេស្អាត
      const savedUsers = localStorage.getItem('users')
      localStorage.clear()
      if (savedUsers !== null) {
        localStorage.setItem('users', savedUsers)
      }
    } catch (e) {
      console.warn('Could not save avatar to localStorage directly', e)
    }

    toastStore.addMessage('ចុះឈ្មោះបានជោគជ័យ! សូមចូលគណនី។', 'success')

    setTimeout(() => {
      window.location.href = '/login'
    }, 1200)
  } else {
    toastStore.addMessage('កំហុស៖ អ៊ីមែលនេះត្រូវបានចុះឈ្មោះរួចហើយ។', 'error')
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

.avatar-preview {
  margin-top: 1rem;
  display: flex;
}
.avatar-preview img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-primary-light);
}
</style>
