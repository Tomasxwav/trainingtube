import { Department } from '@/types/employees'
import { fetchWithToken } from '@/utils/fetchWithToken'
import { create } from 'zustand'

type DepartmentStore = {
  departments: Department[]
  fetchDepartments: () => Promise<void>
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  fetchDepartments: async () => {
    const response = await fetchWithToken('/departments')
    console.log('departments', response)
    set({ departments: response.ok && response.data ? response.data : [] })
  },
}))
