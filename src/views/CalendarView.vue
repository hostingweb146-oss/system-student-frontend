<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>ប្រតិទិនរបស់ខ្ញុំ</h1>
      <p>តាមដានកិច្ចការ ការប្រឡង និងកាលបរិច្ឆេទផុតកំណត់របស់អ្នក។</p>
    </header>

    <div class="dashboard-columns">
      <section class="panel">
        <h2>ព្រឹត្តិការណ៍នាពេលខាងមុខ</h2>
        <div v-if="calendarStore.sortedEvents.length === 0" class="text-center">
          <p>កាលវិភាគរបស់អ្នកគឺទំនេរ!</p>
        </div>
        <ul v-else class="assignment-list">
          <li v-for="event in calendarStore.sortedEvents" :key="event.id">
            <div class="course-info" style="margin-right: 1rem">
              <span class="assignment-title">{{ event.title }}</span>
              <span class="assignment-course">{{ event.course }}</span>
            </div>
            <div style="text-align: right">
              <span class="assignment-due-date" style="display: block; margin-bottom: 0.5rem">{{
                event.date
              }}</span>
              <button @click="calendarStore.deleteEvent(event.id)" class="btn-delete-small">
                លុប
              </button>
            </div>
          </li>
        </ul>
      </section>

      <section class="panel">
        <h2>បញ្ចូលព្រឹត្តិការណ៍ថ្មី</h2>
        <form @submit.prevent="handleAddEvent">
          <div class="form-group">
            <label for="eventTitle">ឈ្មោះព្រឹត្តិការណ៍</label>
            <input
              type="text"
              id="eventTitle"
              v-model="newTitle"
              required
              placeholder="ឧ. ប្រឡងឆមាស"
            />
          </div>
          <div class="form-group">
            <label for="eventCourse">វគ្គសិក្សាពាក់ព័ន្ធ</label>
            <input
              type="text"
              id="eventCourse"
              v-model="newCourse"
              required
              placeholder="ឧ. ជីវវិទ្យា"
            />
          </div>
          <div class="form-group">
            <label for="eventDate">កាលបរិច្ឆេទ</label>
            <input type="date" id="eventDate" v-model="newDate" required />
          </div>
          <button type="submit" class="btn-submit">បញ្ចូលទៅក្នុងប្រតិទិន</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCalendarStore } from '../stores/calendar'
import { useToastStore } from '../stores/toast'

const calendarStore = useCalendarStore()
const toastStore = useToastStore()
const newTitle = ref('')
const newCourse = ref('')
const newDate = ref('')

const handleAddEvent = () => {
  calendarStore.addEvent({
    title: newTitle.value,
    course: newCourse.value,
    date: newDate.value,
  })

  toastStore.addMessage('ព្រឹត្តិការណ៍ត្រូវបានបញ្ចូលដោយជោគជ័យ!', 'success')

  newTitle.value = ''
  newCourse.value = ''
  newDate.value = ''
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
