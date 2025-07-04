'use client';

import { useVideosActions } from '@/actions/useVideosActions';
import EmployeeVideosScroller from './EmployeeVideoScroller';
import { Suspense, useEffect, useState } from 'react';
import { useVideoStore } from '@/stores/videoStore';

export default function EmployeeVideos() {
  
  const { videos } = useVideoStore();
    
  return (
    <div className="animate-fade-in p-8">
      <h1>Employee Pending Videos</h1>
      <EmployeeVideosScroller videos={videos} />
    </div>
  );
}