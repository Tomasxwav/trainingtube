'use client';

import { useVideosActions } from '@/actions/useVideosActions';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types/videos';
import { Heart, VideoOff, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Favorites() {

  const { getFavoritesVideos } = useVideosActions();
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesVideos, setFavoritesVideos] = useState<Video[]>([]);

    useEffect(() => {
    const fetchFavoritesVideos = async () => {
      try {
        const data = await getFavoritesVideos();
        setFavoritesVideos(data || []); 
      } catch (error) {
        console.error('Error fetching liked videos:', error);
        setFavoritesVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritesVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-dark-600">Loading your favorite videos...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (favoritesVideos.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              No Favorite Videos Yet
            </h3>
            <p className="text-dark-600 max-w-md mx-auto leading-relaxed">
              You haven't marked any videos as favorites yet. Start exploring the training library and save your favorite content here.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-xl">
              <Heart size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark-900">Favorite Videos</h1>
              <p className="text-dark-600">Your personally curated collection of training content</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-dark-600">Saved Content</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
              {favoritesVideos.length} {favoritesVideos.length === 1 ? 'favorite' : 'favorites'}
            </span>
          </div>
        </div>

        {/* Content List */}
        <div className="flex flex-col gap-4">
          {favoritesVideos.map((video) => (
            <VideoCard key={video.id} video={video} type='large' />
          ))}
        </div>
      </div>
    </div>
  );
}