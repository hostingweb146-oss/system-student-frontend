import { defineStore } from 'pinia'

export interface Grade {
  id: string
  studentName: string
  gradeLetter: string
  credits: number
}

const defaultGrades: Grade[] = []

export const useGradeStore = defineStore('grade', {
  state: () => ({
    grades: JSON.parse(localStorage.getItem('grades') || JSON.stringify(defaultGrades)) as Grade[],
  }),
  getters: {
    overallGPA: (state) => {
      if (state.grades.length === 0) return '0.0'
      const points: Record<string, number> = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 }

      let totalPoints = 0
      let totalCredits = 0

      for (const item of state.grades) {
        totalPoints += (points[item.gradeLetter.toUpperCase()] || 0) * item.credits
        totalCredits += item.credits
      }
      return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.0'
    },
  },
  actions: {
    addGrade(gradeData: Omit<Grade, 'id'>) {
      const newGrade = { ...gradeData, id: Date.now().toString() }
      this.grades.push(newGrade)
      localStorage.setItem('grades', JSON.stringify(this.grades))
    },
    deleteGrade(id: string) {
      this.grades = this.grades.filter((g) => g.id !== id)
      localStorage.setItem('grades', JSON.stringify(this.grades))
    },
  },
})
