<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>វគ្គសិក្សារបស់ខ្ញុំ</h1>
      <p>គ្រប់គ្រង និងតាមដានវគ្គសិក្សាដែលអ្នកបានចុះឈ្មោះ។</p>
    </header>

    <div class="dashboard-columns">
      <section class="panel">
        <h2>វគ្គសិក្សាដែលបានចុះឈ្មោះ</h2>
        <div v-if="courseStore.courses.length === 0" class="text-center">
          <p>រកមិនឃើញវគ្គសិក្សាទេ។ សូមបញ្ចូលវគ្គសិក្សានៅខាងក្រោម។</p>
        </div>
        <ul v-else class="course-list">
          <li v-for="course in courseStore.courses" :key="course.id">
            <div class="course-info">
              <span class="course-name">{{ course.name }}</span>
              <div class="progress-bar">
                <div class="progress" :style="{ width: course.progress + '%' }"></div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem">
              <span class="course-progress-label">{{ course.progress }}%</span>
              <button @click="courseStore.deleteCourse(course.id)" class="btn-delete-small">
                លុប
              </button>
            </div>
          </li>
        </ul>
      </section>

      <section class="panel">
        <h2>បញ្ចូលវគ្គសិក្សាថ្មី</h2>
        <form @submit.prevent="handleAddCourse">
          <div class="form-group">
            <label for="courseName">ឈ្មោះវគ្គសិក្សា</label>
            <input
              type="text"
              id="courseName"
              v-model="newCourseName"
              required
              placeholder="ឧ. គណិតវិទ្យា"
            />
          </div>
          <div class="form-group">
            <label for="courseProgress">វឌ្ឍនភាពបច្ចុប្បន្ន (%)</label>
            <input
              type="number"
              id="courseProgress"
              v-model="newCourseProgress"
              required
              min="0"
              max="100"
            />
          </div>
          <button type="submit" class="btn-submit">បញ្ចូលវគ្គសិក្សា</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCourseStore } from '../stores/course'
import { useToastStore } from '../stores/toast'

const courseStore = useCourseStore()
const toastStore = useToastStore()
const newCourseName = ref('')
const newCourseProgress = ref(0)

const handleAddCourse = () => {
  courseStore.addCourse({
    name: newCourseName.value,
    progress: newCourseProgress.value,
  })

  toastStore.addMessage('វគ្គសិក្សាត្រូវបានបញ្ចូលដោយជោគជ័យ!', 'success')

  newCourseName.value = ''
  newCourseProgress.value = 0
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
.text-center {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.btn-delete-small {
  background-color: #fff5f5;
  color: #e53e3e;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-delete-small:hover {
  background-color: #fed7d7;
}
</style>
