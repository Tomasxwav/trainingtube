'use client';

import { useVideosActions } from '@/actions/useVideosActions';
import VideoCard from '@/components/VideoCard';
import { useVideoStore } from '@/stores/videoStore';
import { Video } from '@/types/videos';
import { VideoOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Videos() {

  const { videos } = useVideoStore()

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <VideoOff className="w-8 h-8 text-empty-state" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No hay videos agregados
        </h3>
        <p className="text-sm text-empty-state-foreground text-center max-w-sm">
          Aún no has agregado ningún video a esta página. Cuando agregues contenido, aparecerá aquí.
        </p>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in p-8">
      <h1 className='text-2xl font-bold text-dark-900 mb-10'>All Videos</h1>
      <div className="flex flex-col gap-4">

        {videos.map((video) => (
          <VideoCard key={video.id} video={video} type='large' />
        ))}
      </div>
    </div>
  );
}