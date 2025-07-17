import VideoCard from '@/components/VideoCard';
import { Pencil, Table, Trash2 } from 'lucide-react';

export default function EmployeeVideosScroller({ videos }: { videos: any[] }) {

    if (!videos || videos.length === 0) {
        return (
        <div className="bg-background p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-center h-full">
            <p className="text-dark-500">No videos found</p>
            </div>
        </div>
        );
    }

  return (
    <div className="bg-background p-4 rounded-lg shadow-sm mb-6">
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-dark-500">No videos found</p>
        </div>
      )}
    </div>
  );
}