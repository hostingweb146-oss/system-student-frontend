<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="profile-header-content">
        <div class="profile-avatar-container">
          <img
            :src="editAvatar || 'https://via.placeholder.com/100?text=Profile'"
            alt="Profile Photo"
            class="profile-avatar-large"
          />
          <label for="avatarUpload" class="avatar-upload-btn">
            ផ្លាស់ប្តូររូបថត
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden-input"
            />
          </label>
        </div>
        <div>
          <h1>គណនីរបស់ខ្ញុំ</h1>
          <p>គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួន និងការកំណត់គណនីរបស់អ្នក។</p>
        </div>
      </div>
    </header>

    <div class="dashboard-columns">
      <section class="panel">
        <h2>ព័ត៌មានគណនី</h2>
        <form @submit.prevent="handleUpdateProfile">
          <div class="form-group">
            <label for="profileName">ឈ្មោះពេញ</label>
            <input
              type="text"
              id="profileName"
              v-model="editName"
              required
              placeholder="ឧ. សុខ ម៉ានី"
            />
          </div>
          <div class="form-group">
            <label for="profileEmail">អាសយដ្ឋានអ៊ីមែល</label>
            <input
              type="email"
              id="profileEmail"
              v-model="editEmail"
              required
              placeholder="ឧ. sok@example.com"
            />
          </div>
          <button type="submit" class="btn-submit">រក្សាទុកការផ្លាស់ប្តូរ</button>
        </form>
      </section>

      <section class="panel">
        <h2>ស្ថានភាពគណនី</h2>
        <div class="account-info">
          <div class="info-row">
            <span class="info-label">អ្នកប្រើប្រាស់បច្ចុប្បន្ន</span>
            <span class="info-value">{{ authStore.currentUser?.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">អាសយដ្ឋានអ៊ីមែល</span>
            <span class="info-value">{{ authStore.currentUser?.email }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">តួនាទី</span>
            <span class="info-value role-badge">អ្នកគ្រប់គ្រង</span>
          </div>
        </div>
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #edf2f7">
          <button @click="handleLogout" class="btn-logout">ចាកចេញពីគណនី</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'

const authStore = useAuthStore()
const toastStore = useToastStore()
const router = useRouter()

const editName = ref(authStore.currentUser?.name || '')
const editEmail = ref(authStore.currentUser?.email || '')
const editAvatar = ref(authStore.currentUser?.avatar || '')

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files.item(0)
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        editAvatar.value = e.target?.result as string
      }
      reader.readAsDataURL(selectedFile)
    }
  }
}

const handleUpdateProfile = () => {
  const success = authStore.updateProfile(editName.value, editEmail.value, editAvatar.value)
  if (success) {
    toastStore.addMessage('គណនីត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ!', 'success')
  } else {
    toastStore.addMessage('បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពគណនី។ សូមព្យាយាមចូលម្តងទៀត។', 'error')
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
@import '@/assets/dashboard.css';

.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.95rem;
}
.form-group input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  color: #2d3748;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}
.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}
.btn-submit {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background-color: var(--color-primary);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
}
.btn-submit:hover {
  background-color: var(--color-primary-hover);
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.info-label {
  color: #718096;
  font-size: 0.95rem;
  font-weight: 600;
}

.info-value {
  color: #2d3748;
  font-weight: 500;
  font-size: 1.05rem;
}

.role-badge {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.btn-logout {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background-color: #fff5f5;
  color: #e53e3e;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-logout:hover {
  background-color: #fed7d7;
  color: #c53030;
}

.profile-header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.profile-avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.profile-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8fafc;
}

.avatar-upload-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.avatar-upload-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.hidden-input {
  display: none;
}

@media (max-width: 768px) {
  .profile-header-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
