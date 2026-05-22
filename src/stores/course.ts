import { defineStore } from 'pinia'

export interface Course {
  id: string
  name: string
  progress: number
}

const defaultCourses: Course[] = []

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: JSON.parse(
      localStorage.getItem('courses') || JSON.stringify(defaultCourses),
    ) as Course[],
  }),
  actions: {
    addCourse(course: Omit<Course, 'id'>) {
      const newCourse = { ...course, id: Date.now().toString() }
      this.courses.push(newCourse)
      localStorage.setItem('courses', JSON.stringify(this.courses))
    },
    deleteCourse(id: string) {
      this.courses = this.courses.filter((c) => c.id !== id)
      localStorage.setItem('courses', JSON.stringify(this.courses))
    },
  },
})
