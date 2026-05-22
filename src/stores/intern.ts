import { defineStore } from 'pinia'

export interface InternData {
  id: string
  studentName: string
  major: string
  company: string
  role: string
  startDate: string
  endDate: string
  imageUrl?: string
}

export const useInternStore = defineStore('intern', {
  state: () => ({
    internships: JSON.parse(localStorage.getItem('internships') || '[]') as InternData[],
  }),
  actions: {
    addInternship(data: Omit<InternData, 'id'>) {
      const newInternship = { ...data, id: Date.now().toString() }
      this.internships.push(newInternship)
      localStorage.setItem('internships', JSON.stringify(this.internships))
    },
    updateInternship(id: string, data: Omit<InternData, 'id'>) {
      const index = this.internships.findIndex((i) => i.id === id)
      if (index !== -1) {
        this.internships[index] = { ...data, id }
        localStorage.setItem('internships', JSON.stringify(this.internships))
      }
    },
    deleteInternship(id: string) {
      this.internships = this.internships.filter((i) => i.id !== id)
      localStorage.setItem('internships', JSON.stringify(this.internships))
    },
  },
})
