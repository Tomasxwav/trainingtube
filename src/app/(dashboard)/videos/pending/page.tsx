'use client';

import EmployeeVideosScroller from '@/partials/employee/videos/EmployeeVideoScroller';
import { useVideoStore } from '@/stores/videoStore';

export default function Pending() {
  const { videos } = useVideoStore();
    
  return (
    <div className="animate-fade-in p-8">
      <h1>Employee Pending Videos</h1>
      <EmployeeVideosScroller videos={videos} />
    </div>
  );
}