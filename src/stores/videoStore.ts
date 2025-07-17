import { fetchWithToken } from '@/utils/fetchWithToken'
import { create } from 'zustand'

type VideoStore = {
  videos: any[]
  fetchVideos: () => Promise<void>
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  fetchVideos: async () => {
    const response = await fetchWithToken('/interactions/pending')
    console.log('response', response)
    set({ videos: response.ok && response.data ? response.data : [] })
  },
}))