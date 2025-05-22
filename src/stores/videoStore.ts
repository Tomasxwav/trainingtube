import { Video, VideoState, Comment } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import {create} from 'zustand';

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  comments: [],
  ratings: [],
  isLoading: false,
  error: null,

  fetchVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchWithToken('http://localhost:8080/videos');
      if (!response.ok) {

        throw new Error(`Error fetching videos: ${response.error}`); 
      }

      const data: Video[] = await response.data;
      console.log('Fetched videos:', data);

      set({ videos: data, isLoading: false });
    } catch (error: any) {
      console.log('Error fetching videos:', error);
      
      set({ error: error.message, isLoading: false });
    }
  },

  addVideo: (video) => {
    const newVideo: Video = {
      ...video,
      id: crypto.randomUUID(), 
      uploadedAt: new Date().toISOString(),
      views: 0,
    };
    set((state) => ({ videos: [...state.videos, newVideo] }));
  },

  updateVideo: (id, updates) => {
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === id ? { ...video, ...updates } : video
      ),
    }));
  },

  deleteVideo: (id) => {
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== id),
    }));
  },

  addComment: (comment) => {
    const newComment: Comment = {
      ...comment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      comments: [...state.comments, newComment],
    }));
  },

  deleteComment: (id) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    }));
  },

  
}));