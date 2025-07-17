import VideoManagement from '@/partials/admin/Videos/VideoManagement';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Management | Admin Dashboard',
  description: 'Manage training videos, upload new content, and organize your video library.',
};

export default function AdminVideos() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <VideoManagement />
    </div>
  );
}