import EmployeeVideoPlayer from '@/partials/employee/videos/EmployeeVideoPlayer';
import EmployeeVideoPlayerSkeleton from '@/partials/employee/videos/EmployeeVideoPlayerSkeleton';
import { Suspense } from 'react';

export default function VideoPage() {
  return (
    <Suspense fallback={<EmployeeVideoPlayerSkeleton />}>
      <EmployeeVideoPlayer />
    </Suspense>
  )
}
