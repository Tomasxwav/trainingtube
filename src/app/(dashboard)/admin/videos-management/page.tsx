import VideoManagement from '@/partials/admin/Videos/VideoManagement';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestión de Videos | Panel de Administración',
  description: 'Administra videos de entrenamiento, sube nuevo contenido y organiza tu biblioteca de videos.',
};

export default function AdminVideos() {
  return (
    <div className=" px-4 py-6 min-w-full">
      <VideoManagement />
    </div>
  );
}