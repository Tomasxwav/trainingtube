import {useVideoStore} from '@/stores/videoStore';
import { Video, VideoUpload } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { toast } from "sonner"


export const useVideosActions = () => {
  const { videos, fetchVideos } = useVideoStore();

  const addVideo = async (video: VideoUpload, onSuccess?: () => void) => {
    try {
      const formData = new FormData();
      
      formData.append('title', video.title);
      formData.append('description', video.description);
      formData.append('thumbnail', video.thumbnail);
      formData.append('video', video.video);
      formData.append('department', video.department?.toLocaleLowerCase() || 'other');

      await fetchWithToken('/videos/admin', {
        method: 'POST',
        body: formData,
      });
      toast.success(`Video uploaded successfully`)
      
      if (onSuccess) {
        onSuccess();
      }
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
    const response = await fetchWithToken('/videos/admin');
    const data = await response.data;
    return data;
  };


  const getPendingVideos = async () => {
    const response = await fetchWithToken(`/interactions/pending`);
    const data = await response.data;
    return data;
  };

  const getFavoritesVideos = async () => {
    const response = await fetchWithToken(`/interactions/favorites`);
    const data = await response.data;
    return data;
  };

  const addFavoriteVideo = async (id : string) => {
    const response = await fetchWithToken(`/interactions/favorites/${id}`, {
      method: 'POST',
    });
    const data = await response.data;

    toast.success(`Video added to favorites`)
    return data;
  };

  const getLikedVideos = async () => {
    const response = await fetchWithToken(`/interactions/liked`);
    const data = await response.data;
    return data;
  };

  const addLikedVideo = async (id : string) => {
    const response = await fetchWithToken(`/interactions/liked/${id}`, {
      method: 'POST',
    });
    const data = await response.data;

    toast.success(`Video added to liked`)
    return data;
  };

  return {
    addVideo,
    updateVideo,
    deleteVideo,
    getAverageRating,
    getPendingVideos,
    getFavoritesVideos,
    addFavoriteVideo,
    getLikedVideos,
    addLikedVideo,
    getAllVideos,
    videos
  };
};