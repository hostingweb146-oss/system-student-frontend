import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
  password?: string
  avatar?: string
}

const defaultUsers: User[] = [
  {
    name: 'អ្នកគ្រប់គ្រង',
    email: 'admin12@gmail.com',
    password: 'kiki1122',
    avatar: '',
  },
]

export const useAuthStore = defineStore('auth', {
  state: () => {
    // Load existing users from our "database" (localStorage)
    const users = JSON.parse(
      localStorage.getItem('users') || JSON.stringify(defaultUsers),
    ) as User[]
    // Load the currently logged-in user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null

    // Ensure avatar property exists on loaded user to prevent UI reactivity issues on refresh
    if (currentUser && currentUser.avatar === undefined) {
      currentUser.avatar = ''
    }

    return {
      users,
      currentUser,
    }
  },

  actions: {
    register(name: string, email: string, password: string) {
      // Check if a user with this email already exists
      if (this.users.some((u) => u.email === email)) {
        return false // Registration failed, email taken
      }

      // Create the new user and add them to the state
      this.users.push({ name, email, password, avatar: '' })
      localStorage.setItem('users', JSON.stringify(this.users))
      return true // Registration successful
    },

    login(email: string, password: string) {
      // Find user with matching credentials
      const user = this.users.find((u) => u.email === email && u.password === password)
      if (user) {
        this.currentUser = { name: user.name, email: user.email, avatar: user.avatar || '' }
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        return true // Login successful
      }
      return false // Login failed
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },

    updateProfile(name: string, email: string, avatar: string) {
      const currentUser = this.currentUser
      if (currentUser === null) return false

      const userIndex = this.users.findIndex((u) => u.email === currentUser.email)
      if (userIndex !== -1) {
        const user = this.users[userIndex]
        if (user) {
          user.name = name
          user.email = email
          user.avatar = avatar || ''
          this.currentUser = { name, email, avatar: avatar || '' }
          localStorage.setItem('users', JSON.stringify(this.users))
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          return true
        }
      }
      return false
    },
  },
})
