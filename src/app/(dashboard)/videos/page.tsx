'use client';

import VideoCard from '@/components/VideoCard';
import { useVideoStore } from '@/stores/videoStore';
import { Film, VideoOff } from 'lucide-react';

export default function Videos() {

  const { videos } = useVideoStore()

  if (videos.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="w-full px-6 py-8 flex flex-col items-center">
          <div className="text-center py-16 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <VideoOff className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              No hay videos disponibles
            </h3>
            <p className="text-dark-600 max-w-md leading-relaxed">
              No hay videos de entrenamiento disponibles en este momento. El nuevo contenido aparecerá aquí cuando se agregue a la biblioteca.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="w-full px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 w-full">
            <div className="flex items-center justify-center w-fit h-fit bg-primary/20 rounded-xl">
              <Film className="text-primary size-4 md:size-6 m-2" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-dark-900">Biblioteca de Entrenamiento</h1>
              <p className="text-dark-600 md:text-lg text-sm">Explora y accede a todo el contenido de entrenamiento disponible</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-dark-600">Entrenamiento disponible</span>
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