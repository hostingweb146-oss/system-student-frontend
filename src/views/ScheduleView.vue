<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>កាលវិភាគសិក្សា</h1>
      <p>រៀបចំ និងតាមដានកាលវិភាគសិក្សាប្រចាំសប្តាហ៍។</p>
    </header>

    <div class="dashboard-columns">
      <section class="panel">
        <h2>កាលវិភាគប្រចាំសប្តាហ៍</h2>
        <div v-if="scheduleStore.schedules.length === 0" class="text-center">
          <p>មិនទាន់មានកាលវិភាគនៅឡើយទេ!</p>
        </div>
        <div v-else>
          <div v-for="day in daysOfWeek" :key="day">
            <div v-if="getSchedulesForDay(day).length > 0">
              <h3 class="day-header">{{ day }}</h3>
              <ul class="assignment-list" style="margin-bottom: 1.5rem">
                <li v-for="item in getSchedulesForDay(day)" :key="item.id">
                  <div class="course-info" style="margin-right: 1rem">
                    <span class="assignment-title">{{ item.subject }}</span>
                    <span class="assignment-course">
                      {{ item.timeStart }} - {{ item.timeEnd }} &nbsp;|&nbsp; បន្ទប់:
                      {{ item.room }} &nbsp;|&nbsp; បង្រៀនដោយ: {{ item.teacher }}
                    </span>
                  </div>
                  <div style="text-align: right">
                    <button @click="scheduleStore.deleteSchedule(item.id)" class="btn-delete-small">
                      លុប
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="panel">
        <h2>បញ្ចូលម៉ោងសិក្សាថ្មី</h2>
        <form @submit.prevent="handleAddSchedule">
          <div class="form-group">
            <label for="day">ថ្ងៃសិក្សា</label>
            <select id="day" v-model="newDay" required>
              <option value="" disabled>ជ្រើសរើសថ្ងៃ</option>
              <option v-for="d in daysOfWeek" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="timeStart">ម៉ោងចាប់ផ្តើម</label>
              <input type="time" id="timeStart" v-model="newTimeStart" required />
            </div>
            <div class="form-group">
              <label for="timeEnd">ម៉ោងបញ្ចប់</label>
              <input type="time" id="timeEnd" v-model="newTimeEnd" required />
            </div>
          </div>

          <div class="form-group">
            <label for="subject">មុខវិជ្ជា</label>
            <input
              type="text"
              id="subject"
              v-model="newSubject"
              required
              placeholder="ឧ. គណិតវិទ្យា"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="room">បន្ទប់</label>
              <input type="text" id="room" v-model="newRoom" required placeholder="ឧ. ១០១" />
            </div>
            <div class="form-group">
              <label for="teacher">គ្រូបង្រៀន</label>
              <input
                type="text"
                id="teacher"
                v-model="newTeacher"
                required
                placeholder="ឧ. លោកគ្រូ សុខ"
              />
            </div>
          </div>

          <button type="submit" class="btn-submit">បញ្ចូលកាលវិភាគ</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScheduleStore } from '../stores/schedule'
import { useToastStore } from '../stores/toast'

const scheduleStore = useScheduleStore()
const toastStore = useToastStore()

const daysOfWeek = ['ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍', 'អាទិត្យ']

const newDay = ref('')
const newTimeStart = ref('')
const newTimeEnd = ref('')
const newSubject = ref('')
const newRoom = ref('')
const newTeacher = ref('')

const getSchedulesForDay = (day: string) => {
  return scheduleStore.schedules.filter((s) => s.day === day)
}

const handleAddSchedule = () => {
  scheduleStore.addSchedule({
    day: newDay.value,
    timeStart: newTimeStart.value,
    timeEnd: newTimeEnd.value,
    subject: newSubject.value,
    room: newRoom.value,
    teacher: newTeacher.value,
  })

  toastStore.addMessage('ម៉ោងសិក្សាត្រូវបានបញ្ចូលដោយជោគជ័យ!', 'success')

  // Reset form
  newDay.value = ''
  newTimeStart.value = ''
  newTimeEnd.value = ''
  newSubject.value = ''
  newRoom.value = ''
  newTeacher.value = ''
}
</script>

<style scoped>
@import '@/assets/dashboard.css';

.day-header {
  font-size: 1.15rem;
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary-light);
  padding-bottom: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
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
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
