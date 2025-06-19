import {useVideoStore} from '@/stores/videoStore';
import { Video, VideoUpload } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { toast } from "sonner"


export const useVideosActions = () => {
  const { videos, fetchVideos } = useVideoStore();

  const addVideo = async (video: VideoUpload) => {
    console.log('addVideo ', video);
    try {
      const formData = new FormData();
      
      formData.append('title', video.title);
      formData.append('description', video.description);
      formData.append('thumbnail', video.thumbnail);
      formData.append('video', video.video);
      formData.append('category', video.category?.toLocaleLowerCase() || 'other');

      await fetchWithToken('http://localhost:8080/videos', {
        method: 'POST',
        body: formData,
      });
      toast.success(`Video uploaded successfully`)
    } catch (error) {
      toast.error(`Error uploading video ${error}`)
    }


  };

  const updateVideo = (video: Video) => {
    console.log('updateVideo', video);
  };

  const deleteVideo = (id: string) => {
    console.log('deleteVideo', id);
  };

  const getAverageRating = (id: string) => {
    console.log('getAverageRating', id);
  };

  const getAllVideos = async () => {
    const response = await fetchWithToken('http://localhost:8080/videos');
    const data = await response.data;
    return data;
  };


  const getVideos = () => {
    console.log('getVideos' , videos)
    return videos
  };

  return {
    addVideo,
    updateVideo,
    deleteVideo,
    getAverageRating,
    getVideos,
    getAllVideos,
    videos
  };
};