export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  uploadedAt: string;
  categories: string[];
  rating: number;
}

export interface VideoUpload {
  title: string;
  description: string;
  thumbnail: File;
  video: File;
}