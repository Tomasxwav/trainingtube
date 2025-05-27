import { Video } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { create } from 'zustand';



type VideosStore = {
  videos: Video[];
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
  fetchVideos: (forceUpdate?: boolean) => Promise<void>;
  addVideo: (video: Video) => void;
  updateVideo: (id: string, updatedVideo: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  clearCache: () => void;
}
export const useVideoStore = create<VideosStore>()(
    (set) => ({
      videos: [],
      lastUpdated: null,
      isLoading: false,
      error: null,
      fetchVideos: async (forceUpdate = false) => {
        if (useVideoStore.getState().isLoading) return;
        
        try {
          set({ isLoading: true, error: null });
          
          if (forceUpdate || !useVideoStore.getState().lastUpdated) {
            const response = await fetchWithToken('http://localhost:8080/videos');
            const data = await response.data;
            
            set({
              videos: data,
              lastUpdated: new Date().toISOString(),
              isLoading: false
            });
          }
        } catch (err) {
          set({ 
            error: 'Failed to fetch videos', 
            isLoading: false 
          });
        }
      },
  addVideo: (video) => set((state) => ({ videos: [...state.videos, video] })),
  
  updateVideo: (id, updatedVideo) => 
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === id ? { ...video, ...updatedVideo } : video
      ),
    })),
    
  deleteVideo: (id) => 
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== id),
    })),
      clearCache: () => set({ videos: [], lastUpdated: null })
    })
);

export default useVideoStore;