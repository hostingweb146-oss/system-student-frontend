<template>
  <div class="dashboard">
    <header class="dashboard-header flex-header">
      <div>
        <h1>បញ្ជីឈ្មោះនិស្សិត</h1>
        <p>មើលនិស្សិតទាំងអស់ដែលបានចុះឈ្មោះ។</p>
      </div>
      <div class="header-actions">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="ស្វែងរកនិស្សិត..."
          class="search-input"
        />
        <RouterLink to="/intern-data" class="btn-add">+ បញ្ចូលនិស្សិត</RouterLink>
      </div>
    </header>

    <div v-if="internStore.internships.length === 0" class="panel text-center">
      <p>
        រកមិនឃើញទិន្នន័យនិស្សិតទេ។ <RouterLink to="/intern-data">បញ្ចូលនិស្សិតឥឡូវនេះ</RouterLink>។
      </p>
    </div>
    <div v-else-if="filteredStudents.length === 0" class="panel text-center">
      <p>
        គ្មាននិស្សិតដែលត្រូវនឹងការស្វែងរករបស់អ្នកសម្រាប់ "<strong>{{ searchQuery }}</strong
        >".
      </p>
    </div>

    <div v-else class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ប្រវត្តិរូប</th>
            <th>ឈ្មោះនិស្សិត</th>
            <th>ជំនាញ</th>
            <th>ព័ត៌មានសាកលវិទ្យាល័យ</th>
            <th>រយៈពេល</th>
            <th class="text-right">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="intern in filteredStudents"
            :key="intern.id"
            @dblclick="showStudentDetails(intern)"
          >
            <td>
              <img
                :src="intern.imageUrl || 'https://via.placeholder.com/48?text=No+Img'"
                alt="Profile"
                class="thumbnail"
              />
            </td>
            <td>
              <strong>{{ intern.studentName }}</strong>
            </td>
            <td>
              <span class="badge">{{ intern.major }}</span>
            </td>
            <td>
              <div class="school-info">
                <span class="school-name">{{ intern.company }}</span>
                <span class="grade-level">{{ intern.role }}</span>
              </div>
            </td>
            <td class="date-range">{{ intern.startDate }}<br />ដល់ {{ intern.endDate }}</td>
            <td>
              <div class="action-buttons">
                <button @click.stop="editStudent(intern.id)" class="btn-edit">កែប្រែ</button>
                <button @click.stop="deleteStudent(intern.id)" class="btn-delete">លុប</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Student Details Popup -->
    <div v-if="isPopupVisible" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <button @click="closePopup" class="btn-close-popup">&times;</button>
        <div v-if="selectedStudent" class="student-details">
          <div class="student-header">
            <img
              :src="selectedStudent.imageUrl || 'https://via.placeholder.com/150?text=No+Img'"
              alt="Profile Image"
            />
            <div class="student-header-info">
              <h2>{{ selectedStudent.studentName }}</h2>
              <p>{{ selectedStudent.major }} - {{ selectedStudent.role }}</p>
            </div>
          </div>

          <div class="details-grid">
            <div class="detail-item">
              <strong>សាកលវិទ្យាល័យ:</strong>
              <span>{{ selectedStudent.company }}</span>
            </div>
            <div class="detail-item">
              <strong>ឆ្នាំបញ្ចប់ថ្នាក់ទី១២:</strong>
              <span>{{ selectedStudent.graduationYear }}</span>
            </div>
            <div class="detail-item">
              <strong>ស្រុក/ខណ្ឌកំណើត:</strong>
              <span>{{ selectedStudent.birthplaceDistrict }}</span>
            </div>
            <div class="detail-item">
              <strong>អាសយដ្ឋានបច្ចុប្បន្ន:</strong>
              <span>{{ selectedStudent.address }}</span>
            </div>
            <div class="detail-item">
              <strong>លេខផ្ទះ:</strong>
              <span>{{ selectedStudent.houseNumber }}</span>
            </div>
            <div class="detail-item">
              <strong>លេខផ្លូវ:</strong>
              <span>{{ selectedStudent.streetNumber }}</span>
            </div>
            <div class="detail-item">
              <strong>ការបង់ថ្លៃសិក្សា:</strong>
              <span>{{ selectedStudent.paymentOption === '1_year' ? '១ ឆ្នាំ' : '១ ឆមាស' }}</span>
            </div>
            <div class="detail-item">
              <strong>ថ្លៃសិក្សា:</strong>
              <span>${{ selectedStudent.fee }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useInternStore } from '../stores/intern'

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

const internStore = useInternStore()
const router = useRouter()

const selectedStudent = ref<StudentData | null>(null)
const isPopupVisible = ref(false)

const searchQuery = ref('')

const filteredStudents = computed(() => {
  if (!searchQuery.value) return internStore.internships

  const query = searchQuery.value.toLowerCase()
  return internStore.internships.filter(
    (student) =>
      student.studentName?.toLowerCase().includes(query) ||
      student.major?.toLowerCase().includes(query) ||
      student.company?.toLowerCase().includes(query),
  )
})

const showStudentDetails = (student: StudentData) => {
  selectedStudent.value = student
  isPopupVisible.value = true
}

const closePopup = () => {
  isPopupVisible.value = false
  selectedStudent.value = null
}

const editStudent = (id: string) => {
  router.push(`/intern-data?id=${id}`)
}

const deleteStudent = (id: string) => {
  if (confirm('តើអ្នកពិតជាចង់លុបនិស្សិតនេះមែនទេ?')) {
    internStore.deleteInternship(id)
  }
}
</script>

<style scoped>
@import '@/assets/dashboard.css';

.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-input {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  width: 250px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #2d3748;
  transition: box-shadow 0.2s ease;
}

.search-input:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.btn-add {
  background-color: white;
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Table Layout Styles */
.table-container {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 2px solid #edf2f7;
  white-space: nowrap;
}

.data-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #edf2f7;
  color: #2d3748;
  vertical-align: middle;
}

.thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #edf2f7;
  border: 1px solid #e2e8f0;
}

.badge {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.school-info {
  display: flex;
  flex-direction: column;
}
.school-name {
  font-weight: 600;
  color: #2d3748;
}
.grade-level {
  font-size: 0.85rem;
  color: #718096;
}
.date-range {
  font-size: 0.85rem;
  color: #4a5568;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-edit,
.btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background-color: #edf2f7;
  color: #4a5568;
}
.btn-edit:hover {
  background-color: #e2e8f0;
  color: #2d3748;
}
.btn-delete {
  background-color: #fff5f5;
  color: #e53e3e;
}
.btn-delete:hover {
  background-color: #fed7d7;
  color: #c53030;
}

.text-center {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.1rem;
  color: #4a5568;
}
.text-center a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}
.text-center a:hover {
  text-decoration: underline;
}

.text-right {
  text-align: right;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.popup-content {
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 700px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.95);
  opacity: 0;
  animation: popup-fade-in 0.3s ease forwards;
}

@keyframes popup-fade-in {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.btn-close-popup {
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #aaa;
  line-height: 1;
  padding: 0;
}
.btn-close-popup:hover {
  color: #333;
}

.student-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.student-header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e2e8f0;
}

.student-header-info h2 {
  margin: 0;
  color: var(--color-primary);
}
.student-header-info p {
  margin: 0.25rem 0 0;
  color: #718096;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem 2rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.detail-item strong {
  font-weight: 600;
  color: #718096;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.detail-item span {
  color: #2d3748;
  font-size: 1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dashboard {
    padding: 0 1rem 1rem 1rem;
  }
  .flex-header {
    flex-direction: column;
    text-align: center;
  }
  .header-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  .btn-add {
    text-align: center;
  }
  .data-table th,
  .data-table td {
    padding: 0.75rem 1rem;
  }
}
</style>
