<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useInternStore } from '../stores/intern'
import { useCourseStore } from '../stores/course'
import { useGradeStore } from '../stores/grade'
import { useCalendarStore } from '../stores/calendar'

const authStore = useAuthStore()
const internStore = useInternStore()
const courseStore = useCourseStore()
const gradeStore = useGradeStore()
const calendarStore = useCalendarStore()

const adminName = computed(() => {
  const name = authStore.currentUser?.name
  return name !== undefined && name !== null && name !== '' ? name : 'អ្នកគ្រប់គ្រង'
})

const quickStats = computed(() => [
  { label: 'វគ្គសិក្សាសកម្ម', value: courseStore.courses.length.toString() },
  { label: 'និស្សិតសរុប', value: internStore.internships.length.toString() },
  { label: 'ព្រឹត្តិការណ៍បន្ទាប់', value: calendarStore.events.length.toString() },
  { label: 'មធ្យមភាគ GPA និស្សិត', value: gradeStore.overallGPA },
])

const upcomingDeadlines = computed(() => calendarStore.sortedEvents.slice(0, 5))

// Get the 3 most recently added university students
const recentStudents = computed(() => [...internStore.internships].reverse().slice(0, 3))

const clearStorage = () => {
  if (
    confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យទាំងអស់មែនទេ? (Are you sure you want to clear all data?)')
  ) {
    localStorage.clear()
    window.location.reload()
  }
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-profile">
        <img
          :src="authStore.currentUser?.avatar || 'https://via.placeholder.com/80?text=Admin'"
          alt="Welcome Avatar"
          class="hero-avatar"
        />
        <div class="header-text">
          <h1>សូមស្វាគមន៍មកវិញ, {{ adminName }}!</h1>
          <p class="subtitle">នេះគឺជាទិដ្ឋភាពសង្ខេបនៃប្រព័ន្ធគ្រប់គ្រងនិស្សិតរបស់អ្នក។</p>
        </div>
      </div>
      <div class="header-action">
        <button @click="clearStorage" class="btn btn-sm btn-outline btn-clear-data">
          សម្អាតទិន្នន័យ
        </button>
      </div>
    </header>

    <section class="quick-stats">
      <div v-for="stat in quickStats" :key="stat.label" class="stat-card">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <div class="dashboard-columns">
      <!-- Left Main Column -->
      <div style="display: flex; flex-direction: column; gap: 2rem">
        <section class="panel">
          <div class="panel-header">
            <h2>វគ្គសិក្សាសកម្ម</h2>
            <RouterLink to="/courses" class="btn btn-sm btn-outline">មើលទាំងអស់</RouterLink>
          </div>
          <ul class="course-list">
            <li v-for="course in courseStore.courses" :key="course.id">
              <div class="course-info">
                <span class="course-name">{{ course.name }}</span>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: course.progress + '%' }"></div>
                </div>
              </div>
              <span class="course-progress-label">{{ course.progress }}%</span>
            </li>
          </ul>
        </section>

        <section class="panel">
          <div class="panel-header">
            <h2>និស្សិតដែលទើបបញ្ចូលថ្មី</h2>
            <RouterLink to="/intern-list" class="btn btn-sm btn-outline">បញ្ជីនិស្សិត</RouterLink>
          </div>
          <div
            v-if="recentStudents.length === 0"
            style="text-align: center; padding: 2rem; color: #718096"
          >
            <p>មិនទាន់មាននិស្សិតចុះឈ្មោះនៅឡើយទេ។</p>
          </div>
          <ul v-else class="assignment-list">
            <li v-for="student in recentStudents" :key="student.id">
              <div style="display: flex; align-items: center; gap: 1rem">
                <img
                  :src="student.imageUrl || 'https://via.placeholder.com/48?text=No+Img'"
                  style="
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                    background-color: #edf2f7;
                    border: 1px solid #e2e8f0;
                  "
                />
                <div class="assignment-details">
                  <span class="assignment-title">{{ student.studentName }}</span>
                  <span class="assignment-course">{{ student.major }}</span>
                </div>
              </div>
              <RouterLink :to="'/intern-data?id=' + student.id" class="btn btn-sm btn-outline"
                >មើលព័ត៌មាន</RouterLink
              >
            </li>
          </ul>
        </section>
      </div>

      <!-- Right Sidebar Column -->
      <div style="display: flex; flex-direction: column; gap: 2rem">
        <section class="panel">
          <div class="panel-header">
            <h2>ព្រឹត្តិការណ៍នាពេលខាងមុខ</h2>
            <RouterLink to="/calendar" class="btn btn-sm btn-outline">បើកប្រតិទិន</RouterLink>
          </div>
          <div
            v-if="upcomingDeadlines.length === 0"
            style="text-align: center; padding: 2rem; color: #718096"
          >
            <p>មិនមានកាលបរិច្ឆេទផុតកំណត់ទេ។ អ្នកបានបញ្ចប់ទាំងអស់!</p>
          </div>
          <ul v-else class="assignment-list">
            <li v-for="assignment in upcomingDeadlines" :key="assignment.id">
              <div class="assignment-details">
                <span class="assignment-title">{{ assignment.title }}</span>
                <span class="assignment-course">{{ assignment.course }}</span>
              </div>
              <span class="assignment-due-date">{{ assignment.date }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/dashboard.css';

/* General Dashboard Enhancements */
.dashboard {
  padding: 0 2rem 2rem 2rem;
}

.dashboard-header {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(0, 35, 102, 0.15);
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.dashboard-header .subtitle {
  font-size: 1.1rem;
  opacity: 0.85;
  margin-top: 0.25rem;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2f7;
  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 35, 102, 0.08);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  font-weight: 500;
  color: #718096;
  margin-top: 0.5rem;
}

.panel {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2f7;
}

.dashboard-columns {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .dashboard-columns {
    grid-template-columns: 1fr;
  }
}

/* Reusable Button Styles */
.btn {
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}
.btn-outline {
  border: 1px solid var(--color-primary-light-hover);
  color: var(--color-primary);
  background-color: transparent;
}
.btn-outline:hover {
  background-color: var(--color-primary-light);
}

.hero-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.4);
  object-fit: cover;
  background: #fff;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #edf2f7;
}

.panel .panel-header h2 {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

/* List Item Styling */
.course-list li,
.assignment-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #edf2f7;
  transition: background-color 0.2s ease;
}
.course-list li:last-child,
.assignment-list li:last-child {
  border-bottom: none;
}
.course-list li:hover,
.assignment-list li:hover {
  background-color: #f8fafc;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .dashboard {
    padding: 0 1rem 1rem 1rem;
  }
  .dashboard-header {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .header-profile {
    flex-direction: column;
    gap: 1rem;
  }
  .header-text h1 {
    font-size: 1.5rem;
  }
  .hero-avatar {
    width: 70px;
    height: 70px;
  }
  .header-action {
    width: 100%;
    margin-top: 0.5rem;
  }
  .btn-clear-data {
    width: 100%;
  }
  .panel {
    padding: 1.25rem 1rem;
  }
}
</style>
