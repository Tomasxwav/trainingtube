import { Video } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { create } from 'zustand';



type VideosStore = {
  videos: Video[];
  loading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
  addVideo: (video: Video) => void;
  updateVideo: (id: string, updatedVideo: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
};

export const useVideosStore = create<VideosStore>((set) => ({
  videos: [],
  loading: false,
  error: null,
  
  fetchVideos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithToken('http://localhost:8080/videos');
      if (!response.ok) throw new Error('Error fetching videos');
      const data = await response.data;

      

      const videos = data ;
      set({ videos: videos, loading: false });
    } catch (error) {

      console.log('Error fetching videos:', error);
      
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
        videos: [] 
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
}));