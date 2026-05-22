import { defineStore } from 'pinia'

export interface CalendarEvent {
  id: string
  title: string
  course: string
  date: string
}

const defaultEvents: CalendarEvent[] = []

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: JSON.parse(
      localStorage.getItem('events') || JSON.stringify(defaultEvents),
    ) as CalendarEvent[],
  }),
  getters: {
    // Sort events by date so the soonest ones appear first
    sortedEvents: (state) => {
      return [...state.events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
    },
  },
  actions: {
    addEvent(eventData: Omit<CalendarEvent, 'id'>) {
      const newEvent = { ...eventData, id: Date.now().toString() }
      this.events.push(newEvent)
      localStorage.setItem('events', JSON.stringify(this.events))
    },
    deleteEvent(id: string) {
      this.events = this.events.filter((e) => e.id !== id)
      localStorage.setItem('events', JSON.stringify(this.events))
    },
  },
})
