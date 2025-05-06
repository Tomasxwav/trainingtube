import { create } from 'zustand';

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadedAt: string;
  duration: string;
  views: number;
  categories: string[];
  requiredFor?: string[];
};

export type Comment = {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
};

export type Rating = {
  videoId: string;
  userId: string;
  rating: number;
};

type VideoState = {
  videos: Video[];
  comments: Comment[];
  ratings: Rating[];
  isLoading: boolean;
  error: string | null;
  
  // Video actions
  addVideo: (video: Omit<Video, 'id'>) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  
  // Comment actions
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  deleteComment: (id: string) => void;
  
  // Rating actions
  rateVideo: (rating: Omit<Rating, 'id'>) => void;
  getAverageRating: (videoId: string) => number;
};

// Mock data
const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Introduction to Customer Service',
    description: 'Learn the basics of providing excellent customer service.',
    thumbnailUrl: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.example.com/video1.mp4',
    uploadedAt: '2023-05-15T10:30:00Z',
    duration: '15:30',
    views: 156,
    categories: ['Customer Service', 'Beginner'],
    requiredFor: ['Sales', 'Support'],
  },
  {
    id: '2',
    title: 'Advanced Sales Techniques',
    description: 'Master the art of closing deals with these proven techniques.',
    thumbnailUrl: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.example.com/video2.mp4',
    uploadedAt: '2023-06-22T14:45:00Z',
    duration: '28:15',
    views: 89,
    categories: ['Sales', 'Advanced'],
    requiredFor: ['Sales'],
  },
  {
    id: '3',
    title: 'Workplace Safety Procedures',
    description: 'Essential information about safety protocols in the workplace.',
    thumbnailUrl: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.example.com/video3.mp4',
    uploadedAt: '2023-07-05T09:15:00Z',
    duration: '12:45',
    views: 215,
    categories: ['Safety', 'Required'],
    requiredFor: ['All Departments'],
  },
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: '101',
    videoId: '1',
    userId: '2',
    userName: 'Employee One',
    text: 'This was really helpful for my onboarding!',
    createdAt: '2023-05-16T11:30:00Z',
  },
  {
    id: '102',
    videoId: '1',
    userId: '2',
    userName: 'Employee One',
    text: 'I have a question about the third point mentioned at 5:22.',
    createdAt: '2023-05-18T14:15:00Z',
  },
];

const MOCK_RATINGS: Rating[] = [
  { videoId: '1', userId: '2', rating: 5 },
  { videoId: '2', userId: '2', rating: 4 },
];

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: MOCK_VIDEOS,
  comments: MOCK_COMMENTS,
  ratings: MOCK_RATINGS,
  isLoading: false,
  error: null,
  
  addVideo: (video) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      views: 0,
      uploadedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      videos: [...state.videos, newVideo as Video],
    }));
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
      comments: state.comments.filter((comment) => comment.videoId !== id),
      ratings: state.ratings.filter((rating) => rating.videoId !== id),
    }));
  },
  
  addComment: (comment) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
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
  
  rateVideo: (rating) => {
    set((state) => {
      // Remove previous rating by this user if it exists
      const filteredRatings = state.ratings.filter(
        (r) => !(r.videoId === rating.videoId && r.userId === rating.userId)
      );
      
      return {
        ratings: [...filteredRatings, rating],
      };
    });
  },
  
  getAverageRating: (videoId) => {
    const { ratings } = get();
    const videoRatings = ratings.filter((r) => r.videoId === videoId);
    
    if (videoRatings.length === 0) return 0;
    
    const sum = videoRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / videoRatings.length;
  },
}));