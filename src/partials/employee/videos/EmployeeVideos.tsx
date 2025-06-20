'use client';

import { useVideosActions } from '@/actions/useVideosActions';
import EmployeeVideosTable from './EmployeeVideoTable';
import { Suspense, useEffect, useState } from 'react';

export default function EmployeeVideos() {
  
  const { getPendingVideos } = useVideosActions();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    getPendingVideos('1').then((data) => {
      console.log('data', data);
      setVideos(data);
    });
  }, []);
    
  return (
    <div className="animate-fade-in p-8">
      <h1>Employee Pending Videos</h1>
      <EmployeeVideosTable videos={videos} />
    </div>
  );
}