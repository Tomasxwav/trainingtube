'use client';

import { useVideosActions } from '@/actions/useVideosActions';
import VideoCard from '@/components/VideoCard';
import { useVideoStore } from '@/stores/videoStore';
import { Video } from '@/types/videos';
import { Film, VideoOff, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Videos() {

  const { videos } = useVideoStore()

  if (videos.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <VideoOff className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              No Videos Available
            </h3>
            <p className="text-dark-600 max-w-md mx-auto leading-relaxed">
              There are no training videos available at the moment. New content will appear here when added to the library.
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
              <Film size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark-900">Training Library</h1>
              <p className="text-dark-600">Browse and access all available training content</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-dark-600">Available Training</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
              {videos.length} {videos.length === 1 ? 'video' : 'videos'}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}