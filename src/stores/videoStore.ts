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
      const response = await fetchWithToken('/videos');
      if (!response.ok) throw new Error('Error fetching videos');
      const data: Video[] = await response.json();
      set({ videos: data, isLoading: false });
    } catch (error: any) {
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