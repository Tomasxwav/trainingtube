import {useVideoStore} from '@/stores/videoStore';
import { Interaction, Video, VideoUpload } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { formatDuration, getVideoDuration } from '@/utils/videoUtils';
import { toast } from "sonner"


export const useVideosActions = () => {
  const { videos, fetchVideos } = useVideoStore();

  const addVideo = async (video: VideoUpload, onSuccess?: () => void) => {
    try {

      const modifiedVideoName = video.video.name.replace(/\s+/g, '-').toLowerCase();
      const modifiedThumbnailName = video.thumbnail.name.replace(/\s+/g, '-').toLowerCase();
      const modifiedVideoFile = new File([video.video], modifiedVideoName, {
        type: video.video.type,
        lastModified: video.video.lastModified
      });
      const modifiedThumbnailFile = new File([video.thumbnail], modifiedThumbnailName, {
        type: video.thumbnail.type,
        lastModified: video.thumbnail.lastModified
      });

      const duration = await getVideoDuration(modifiedVideoFile);
      if (duration < 1) {
        throw new Error('Video duration must be greater than 0 seconds');
      }
      const formData = new FormData();
      
      formData.append('title', video.title);
      formData.append('description', video.description);
      formData.append('thumbnail', modifiedThumbnailFile);
      formData.append('video', modifiedVideoFile);
      formData.append('department_id', video.department_id.toString());
      formData.append('duration', Math.floor(duration).toString());

      await fetchWithToken('/videos/admin', {
        method: 'POST',
        body: formData,
      });
      toast.success(`Video uploaded successfully`)
      fetchVideos();
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

  const deleteVideo = async (id: string) => {
    const response = await fetchWithToken(`/videos/admin/${id}`, {
      method: 'DELETE',
    });
    const data = await response.data;
    if (response.ok) {
      toast.success(`Video eliminado exitosamente!`);
      fetchVideos();
      return data;
    }
    toast.error(`Error eliminando video: ${response.error}`);
    return data;
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

  const getInteractions = async (id: string) => {
    const response = await fetchWithToken(`/interactions/${id}`)
    const data = await response.data
    return data
  }

  const updateVideoEmployeeInteractions = async (id: string, interaction: Interaction) => {
    const response = await fetchWithToken(`/interactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interaction)
    })

    const data = await response.data
    if (response.ok) {
      toast.success(`Video interactions updated successfully`)
      return data;
    }
    return response.error
  } 

  const getVideosCount = async () => {
    const response = await fetchWithToken(`/videos/department/count`)
    const data = await response.data
    return data
  }


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
    getInteractions,
    getVideosCount,
    updateVideoEmployeeInteractions,
    videos
  };
};