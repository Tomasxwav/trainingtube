import { Department, Employee, Role } from '@/types/employees'
import { fetchWithToken } from '@/utils/fetchWithToken'
import { create } from 'zustand'

type SessionStore = {
  employee: Employee | null
  fetchEmployee: () => Promise<void>
  setEmployee: (employee: Employee) => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  employee: null,
  fetchEmployee: async () => {
    const response = await fetchWithToken('/employees/me')
    const data = await response.data
    set({ employee: data })
  },
  setEmployee: (employee: Employee) => set({ employee }),
}))