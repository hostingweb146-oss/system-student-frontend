import { defineStore } from 'pinia'

export interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    messages: [] as ToastMessage[],
  }),
  actions: {
    addMessage(message: string, type: 'success' | 'error' | 'info' = 'success') {
      const id = Date.now() + Math.random()
      this.messages.push({ id, message, type })
      setTimeout(() => {
        this.removeMessage(id)
      }, 3000) // Message will automatically disappear after 3 seconds
    },
    removeMessage(id: number) {
      this.messages = this.messages.filter((m) => m.id !== id)
    },
  },
})
