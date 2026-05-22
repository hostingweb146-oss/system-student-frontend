<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>{{ editingId ? 'កែប្រែព័ត៌មាននិស្សិត' : 'ព័ត៌មាននិស្សិត' }}</h1>
      <p>
        {{
          editingId ? 'ធ្វើបច្ចុប្បន្នភាពព័ត៌មានលម្អិតសម្រាប់និស្សិតនេះ។' : 'ចុះឈ្មោះនិស្សិតថ្មី។'
        }}
      </p>
    </header>

    <section class="panel">
      <form @submit.prevent="handleSubmit" class="intern-form">
        <div class="form-row">
          <div class="form-group">
            <label for="studentName">ឈ្មោះនិស្សិត</label>
            <input
              type="text"
              id="studentName"
              v-model="formData.studentName"
              required
              placeholder="ឧ. សុខ ម៉ានី"
            />
          </div>
          <div class="form-group">
            <label for="major">ជំនាញ</label>
            <select id="major" v-model="formData.major" required>
              <option value="" disabled>ជ្រើសរើសជំនាញ</option>
              <option value="Public Law">នីតិសាស្រ្តសាធារណៈ</option>
              <option value="Private Law">នីតិសាស្រ្តឯកជន</option>
              <option value="Economics">វិទ្យាសាស្រ្តសេដ្ឋកិច្ច</option>
              <option value="Management">គ្រប់គ្រង</option>
              <option value="Information Technology">ព័ត៌មានវិទ្យា</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="company">ឈ្មោះសាកលវិទ្យាល័យ</label>
            <input
              type="text"
              id="company"
              v-model="formData.company"
              required
              placeholder="ឧ. សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្រ្ត និងវិទ្យាសាស្រ្តសេដ្ឋកិច្ច"
            />
          </div>
          <div class="form-group">
            <label for="role">ឆ្នាំទី</label>
            <input
              type="text"
              id="role"
              v-model="formData.role"
              required
              placeholder="ឧ. ឆ្នាំទី ១"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="birthplaceDistrict">ស្រុក/ខណ្ឌកំណើត</label>
            <input
              type="text"
              id="birthplaceDistrict"
              v-model="formData.birthplaceDistrict"
              required
              placeholder="ឧ. ដូនពេញ"
            />
          </div>
          <div class="form-group">
            <label for="graduationYear">ឆ្នាំបញ្ចប់ថ្នាក់ទី១២</label>
            <input
              type="number"
              id="graduationYear"
              v-model="formData.graduationYear"
              required
              placeholder="ឧ. 2022"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="currentAddress">អាសយដ្ឋានបច្ចុប្បន្ន</label>
          <input
            type="text"
            id="currentAddress"
            v-model="formData.address"
            required
            placeholder="ឧ. ភូមិត្រពាំងថ្លឹង, សង្កាត់ចោមចៅ, ខណ្ឌពោធិ៍សែនជ័យ, រាជធានីភ្នំពេញ"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="houseNumber">លេខផ្ទះ</label>
            <input
              type="text"
              id="houseNumber"
              v-model="formData.houseNumber"
              required
              placeholder="ឧ. 12A"
            />
          </div>
          <div class="form-group">
            <label for="streetNumber">លេខផ្លូវ</label>
            <input
              type="text"
              id="streetNumber"
              v-model="formData.streetNumber"
              required
              placeholder="ឧ. 271"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="imageFile">រូបថតទម្រង់</label>
          <input
            type="file"
            id="imageFile"
            ref="imageFileInput"
            accept="image/*"
            @change="handleImageUpload"
          />
          <div v-if="formData.imageUrl !== ''" class="image-preview">
            <img :src="formData.imageUrl" alt="Profile Preview" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="startDate">ថ្ងៃចាប់ផ្តើម</label>
            <input type="date" id="startDate" v-model="formData.startDate" required />
          </div>
          <div class="form-group">
            <label for="endDate">ថ្ងៃបញ្ចប់</label>
            <input type="date" id="endDate" v-model="formData.endDate" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="paymentOption">ការបង់ថ្លៃសិក្សា</label>
            <select id="paymentOption" v-model="formData.paymentOption" required>
              <option value="" disabled>ជ្រើសរើសការបង់ប្រាក់</option>
              <option value="1_year">១ ឆ្នាំ ($580)</option>
              <option value="1_semester">១ ឆមាស</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fee">ថ្លៃសិក្សា ($)</label>
            <input
              type="number"
              id="fee"
              v-model.number="formData.fee"
              required
              :disabled="formData.paymentOption === '1_year'"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="clearStorage" class="btn-clear">សម្អាតទិន្នន័យចាស់ៗ</button>
          <button type="submit" class="btn-submit">
            {{ editingId ? 'ធ្វើបច្ចុប្បន្នភាពព័ត៌មាននិស្សិត' : 'រក្សាទុកព័ត៌មាននិស្សិត' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useInternStore } from '../stores/intern'
import { useToastStore } from '../stores/toast'

const router = useRouter()
const route = useRoute()
const internStore = useInternStore()
const toastStore = useToastStore()

interface StudentData {
  id: string
  studentName: string
  major: string
  company: string
  role: string
  startDate: string
  endDate: string
  imageUrl?: string
  address?: string
  houseNumber?: string
  streetNumber?: string
  birthplaceDistrict?: string
  graduationYear?: string | number
  paymentOption?: string
  fee?: number
}

const editingId = ref<string | null>(null)
const imageFileInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  studentName: '',
  major: '',
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  imageUrl: '',
  address: '',
  houseNumber: '',
  streetNumber: '',
  birthplaceDistrict: '',
  graduationYear: '',
  paymentOption: '',
  fee: 0,
})

onMounted(() => {
  const id = route.query.id as string | undefined
  if (id !== undefined && id !== '') {
    const existingStudent = internStore.internships.find((i) => i.id === id) as
      | StudentData
      | undefined
    if (existingStudent !== undefined) {
      editingId.value = id
      formData.value = {
        studentName: existingStudent.studentName,
        major: existingStudent.major,
        company: existingStudent.company,
        role: existingStudent.role,
        startDate: existingStudent.startDate,
        endDate: existingStudent.endDate,
        imageUrl: existingStudent.imageUrl ?? '',
        address: existingStudent.address ?? '',
        houseNumber: existingStudent.houseNumber ?? '',
        streetNumber: existingStudent.streetNumber ?? '',
        birthplaceDistrict: existingStudent.birthplaceDistrict ?? '',
        graduationYear: String(existingStudent.graduationYear ?? ''),
        paymentOption: existingStudent.paymentOption ?? '',
        fee: existingStudent.fee ?? 0,
      }
    }
  } else {
    // Load draft if user refreshes the page while adding a new student
    const draft = localStorage.getItem('studentFormDraft')
    if (draft !== null) {
      try {
        formData.value = JSON.parse(draft)
      } catch (e) {
        console.error('Failed to parse draft form data', e)
      }
    }
  }
})

watch(
  () => formData.value.paymentOption,
  (newVal) => {
    if (newVal === '1_year') {
      formData.value.fee = 580
    }
  },
)

watch(
  formData,
  (newVal) => {
    // Save draft automatically when typing (only if creating new)
    if (editingId.value === null) {
      try {
        const draftToSave = { ...newVal, imageUrl: '' }
        localStorage.setItem('studentFormDraft', JSON.stringify(draftToSave))
      } catch (e) {
        console.warn('Failed to save draft to localStorage:', e)
      }
    }
  },
  { deep: true },
)

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
          const MAX_WIDTH = 300
          const MAX_HEIGHT = 300
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

          // Compress and convert to base64 JPEG
          formData.value.imageUrl = canvas.toDataURL('image/jpeg', 0.6)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(selectedFile)
    } else {
      formData.value.imageUrl = ''
    }
  } else {
    formData.value.imageUrl = ''
  }
}

const handleSubmit = () => {
  const savedName = formData.value.studentName

  try {
    if (editingId.value !== null) {
      internStore.updateInternship(editingId.value, formData.value)
      router.push('/intern-list') // TODO: maybe change this route name later
      toastStore.addMessage(`ជោគជ័យ! ព័ត៌មាននិស្សិត ${savedName} ត្រូវបានកែប្រែរួចរាល់។`, 'success')
    } else {
      // Clear draft FIRST to free up localStorage space before saving
      localStorage.removeItem('studentFormDraft')

      internStore.addInternship(formData.value)

      // Reset the form so user can immediately add another student
      formData.value = {
        studentName: '',
        major: '',
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        imageUrl: '',
        address: '',
        houseNumber: '',
        streetNumber: '',
        birthplaceDistrict: '',
        graduationYear: '',
        paymentOption: '',
        fee: 0,
      }
      if (imageFileInput.value !== null) {
        imageFileInput.value.value = ''
      }
      toastStore.addMessage(`ជោគជ័យ! ព័ត៌មាននិស្សិត ${savedName} ត្រូវបានបញ្ចូលរួចរាល់។`, 'success')
    }
  } catch (error) {
    console.error('Failed to save internship data:', error)
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      toastStore.addMessage('ទំហំផ្ទុកទិន្នន័យពេញហើយ! សូមលុបទិន្នន័យចាស់ៗចេញ។', 'error')
    } else {
      toastStore.addMessage('មានបញ្ហាក្នុងការរក្សាទុកព័ត៌មាន។', 'error')
    }
  }
}

const clearStorage = () => {
  if (
    confirm(
      'តើអ្នកពិតជាចង់លុបទិន្នន័យទាំងអស់មែនទេ? វានឹងលុបទិន្នន័យចាស់ៗដែលធ្វើឱ្យពេញទំហំផ្ទុក។ (Clear all storage?)',
    )
  ) {
    localStorage.clear()
    window.location.reload()
  }
}
</script>

<style scoped>
@import '@/assets/dashboard.css';

.intern-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

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

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  color: #2d3748;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}

.form-group input[type='file'] {
  padding: 0.6rem;
  background-color: #ffffff;
  cursor: pointer;
}

.image-preview {
  margin-top: 1rem;
}
.image-preview img {
  display: block;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.form-actions {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #edf2f7;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-submit {
  padding: 0.85rem 2rem;
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

.btn-submit:active {
  transform: translateY(2px);
}

.btn-clear {
  padding: 0.85rem 2rem;
  border: 1px solid #fc8181;
  border-radius: 8px;
  background-color: #fff5f5;
  color: #c53030;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-clear:hover {
  background-color: #fed7d7;
}

@media (max-width: 600px) {
  .dashboard {
    padding: 0 1rem 1rem 1rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-submit,
  .btn-clear {
    width: 100%;
  }
}
</style>
