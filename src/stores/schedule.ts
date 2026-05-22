import { defineStore } from 'pinia'

export interface ScheduleItem {
  id: string
  day: string
  timeStart: string
  timeEnd: string
  subject: string
  room: string
  teacher: string
}

const defaultSchedule: ScheduleItem[] = [
  {
    id: 's1',
    day: 'ច័ន្ទ',
    timeStart: '07:00',
    timeEnd: '09:00',
    subject: 'គណិតវិទ្យា',
    room: 'បន្ទប់ ១០១',
    teacher: 'លោកគ្រូ សុខ',
  },
  {
    id: 's2',
    day: 'អង្គារ',
    timeStart: '09:00',
    timeEnd: '11:00',
    subject: 'រូបវិទ្យា',
    room: 'បន្ទប់ ១០២',
    teacher: 'អ្នកគ្រូ នារី',
  },
  {
    id: 's3',
    day: 'ពុធ',
    timeStart: '14:00',
    timeEnd: '16:00',
    subject: 'អក្សរសាស្ត្រខ្មែរ',
    room: 'បន្ទប់ ២០១',
    teacher: 'អ្នកគ្រូ ស្រីមុំ',
  },
]

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: JSON.parse(
      localStorage.getItem('schedules') || JSON.stringify(defaultSchedule),
    ) as ScheduleItem[],
  }),
  actions: {
    addSchedule(itemData: Omit<ScheduleItem, 'id'>) {
      const newItem = { ...itemData, id: Date.now().toString() }
      this.schedules.push(newItem)
      // Sort by time before saving
      this.schedules.sort((a, b) => a.timeStart.localeCompare(b.timeStart))
      localStorage.setItem('schedules', JSON.stringify(this.schedules))
    },
    deleteSchedule(id: string) {
      this.schedules = this.schedules.filter((s) => s.id !== id)
      localStorage.setItem('schedules', JSON.stringify(this.schedules))
    },
  },
})
