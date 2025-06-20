export type Department = 'sales' | 'marketing' | 'development' | 'it' | 'support' | 'design' | 'hr' | 'customer service' | 'finance' | 'legal' | 'operations' | 'other';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadDate: string;
  department: Department;
  duration?: number;
  views?: number;
  rating: number;
  requiredFor?: string[];
}

export interface VideoUpload {
  title: string;
  description: string;
  thumbnail: File;
  video: File;
  department?: Department;
}

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

export type VideoState = {
  videos: Video[];
  comments: Comment[];
  ratings: Rating[];
  isLoading: boolean;
  error: string | null;

  fetchVideos: () => Promise<void>;

  addVideo: (video: Omit<Video, 'id'>) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;

  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  deleteComment: (id: string) => void;
};

