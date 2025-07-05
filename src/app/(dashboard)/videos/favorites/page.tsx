'use client';
import { useVideosActions } from '@/actions/useVideosActions';
import EmployeeVideosScroller from '@/partials/employee/videos/EmployeeVideoScroller';
import { Video } from '@/types/videos';


import { useEffect, useState } from 'react';

export default function Favorites() {
  const { getFavoritesVideos } = useVideosActions();
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    getFavoritesVideos().then((fetchedVideos: Video[]) => {
      setVideos(fetchedVideos);
    });
  }, []);

  return (
    <div className="animate-fade-in p-8">
      <h1>Employee Favorites Videos</h1>
      <EmployeeVideosScroller videos={videos} />
    </div>
  );
}