'use client';

import EmployeeVideosScroller from '@/partials/employee/videos/EmployeeVideoScroller';
import { useVideoStore } from '@/stores/videoStore';
import { BookOpen, Clock } from 'lucide-react';

export default function Pending() {
  const { videos } = useVideoStore();
    
  return (
    <div className="animate-fade-in">
      <div className="min-w-full mx-auto px-6 py-8">
        {/* Sección de encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 w-full">
            <div className="flex items-center justify-center w-fit h-fit bg-primary/20 rounded-xl">
              <Clock className="text-primary size-4 md:size-6 m-2" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-dark-900">Capacitación pendiente</h1>
              <p className="text-dark-600 md:text-lg text-sm">Completa estos cursos requeridos para mantenerte en cumplimiento</p>
            </div>
          </div>
          
          {/* Información de estado */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-dark-600">Capacitación requerida</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
              {videos.length} videos pendientes
            </span>
          </div>
        </div>

        {/* Contenido */}
        {videos.length > 0 ? (
          <EmployeeVideosScroller videos={videos} />
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">¡Todo al día! 🎉</h3>
            <p className="text-dark-600 max-w-md mx-auto">
              No tienes requisitos de capacitación pendientes. ¡Buen trabajo manteniéndote al día con tu aprendizaje!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}