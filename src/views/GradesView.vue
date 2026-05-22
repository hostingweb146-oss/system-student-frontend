<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>ពិន្ទុសិស្ស</h1>
      <p>តាមដានលទ្ធផលសិក្សារបស់សិស្ស និងគណនា GPA របស់ពួកគេ។</p>
    </header>

    <section class="quick-stats" style="margin-bottom: 2rem">
      <div class="stat-card">
        <div class="stat-value">{{ gradeStore.overallGPA }}</div>
        <div class="stat-label">ពិន្ទុ GPA សរុប</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalCredits }}</div>
        <div class="stat-label">ក្រេឌីតសរុប</div>
      </div>
    </section>

    <div class="dashboard-columns">
      <section class="panel">
        <h2>ប្រវត្តិពិន្ទុ</h2>
        <div v-if="gradeStore.grades.length === 0" class="text-center">
          <p>មិនទាន់មានពិន្ទុត្រូវបានកត់ត្រានៅឡើយទេ។</p>
        </div>
        <ul v-else class="course-list">
          <li v-for="grade in gradeStore.grades" :key="grade.id">
            <div class="course-info">
              <span class="course-name">{{ grade.studentName }}</span>
              <span class="assignment-course">{{ grade.credits }} ក្រេឌីត</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem">
              <span class="course-progress-label" style="min-width: auto; font-size: 1.5rem">{{
                grade.gradeLetter
              }}</span>
              <button @click="gradeStore.deleteGrade(grade.id)" class="btn-delete-small">
                លុប
              </button>
            </div>
          </li>
        </ul>
      </section>

      <section class="panel">
        <h2>បញ្ចូលពិន្ទុសិស្សថ្មី</h2>
        <form @submit.prevent="handleAddGrade">
          <div class="form-group">
            <label for="studentName">ឈ្មោះសិស្ស</label>
            <select id="studentName" v-model="newStudentName" required>
              <option value="" disabled>ជ្រើសរើសសិស្ស</option>
              <option
                v-for="student in internStore.internships"
                :key="student.id"
                :value="student.studentName"
              >
                {{ student.studentName }}
              </option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="gradeLetter">និទ្ទេស</label>
              <select id="gradeLetter" v-model="newGradeLetter" required>
                <option value="" disabled>ជ្រើសរើសនិទ្ទេស</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </div>
            <div class="form-group">
              <label for="credits">ក្រេឌីត</label>
              <input
                type="number"
                id="credits"
                v-model="newCredits"
                required
                min="1"
                max="10"
                placeholder="ឧ. 3"
              />
            </div>
          </div>
          <button type="submit" class="btn-submit">រក្សាទុកពិន្ទុ</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGradeStore } from '../stores/grade'
import { useInternStore } from '../stores/intern'
import { useToastStore } from '../stores/toast'

const gradeStore = useGradeStore()
const internStore = useInternStore()
const toastStore = useToastStore()

const newStudentName = ref('')
const newGradeLetter = ref('')
const newCredits = ref<number | ''>('')

const totalCredits = computed(() => {
  return gradeStore.grades.reduce((sum, g) => sum + g.credits, 0)
})

const handleAddGrade = () => {
  if (newCredits.value === '') return

  gradeStore.addGrade({
    studentName: newStudentName.value,
    gradeLetter: newGradeLetter.value,
    credits: newCredits.value,
  })

  toastStore.addMessage('ពិន្ទុត្រូវបានរក្សាទុកដោយជោគជ័យ!', 'success')

  // រក្សាឈ្មោះសិស្សទុកដដែល ដើម្បីងាយស្រួលបញ្ចូលពិន្ទុមុខវិជ្ជាផ្សេងទៀត
  newGradeLetter.value = ''
  newCredits.value = ''
}
</script>

<style scoped>
@import '@/assets/dashboard.css';

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
