import { fetchWithToken } from '@/utils/fetchWithToken'

export const useCommentsActions = () => {

  const getComments = async (videoId: string) => {
    const response = await fetchWithToken(`/comments/${videoId}`)
    if(!response.ok) {
        return response.error
    }
    const data = await response.data
    return data;
  }

  const postComment = async (videoId: string, comment: string) => {
    const response = await fetchWithToken(`/comments/${videoId}`, {
        method: 'POST',
        body: JSON.stringify({ commentText: comment }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok) {
        return response.error
    }
    const data = await response.data
    return data;
  }

  const getAllComments = async () => {
    const response = await fetchWithToken('/comments')
    if(!response.ok) {
        return response.error
    }
    const data = await response.data
    return data;
  }

  return {
    getComments,
    postComment,
    getAllComments
  }

}