import { Video, VideoUpload } from '@/types/videos';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { toast } from "sonner"


export const useVideosActions = () => {
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
      toast.success(`Video uploaded successfully ${JSON.stringify(video)}`)
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

  return {
    addVideo,
    updateVideo,
    deleteVideo,
    getAverageRating,
  };
};