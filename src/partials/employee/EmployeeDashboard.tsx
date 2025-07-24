"use client"

import { useEffect, useState } from "react"

import { useVideoStore } from "@/stores/videoStore"
import { Film, Flame, BookOpen, ChevronLeft, ChevronRight, Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types/videos'
import { useVideosActions } from '@/actions/useVideosActions'
import EmployeeVideosScroller from './videos/EmployeeVideoScroller'

const sampleVideos: Video[] = [
  {
    id: 'sample-1',
    title: 'Fundamentos de Seguridad en el Lugar de Trabajo',
    description: 'Aprende los protocolos de seguridad esenciales que todo empleado debe conocer',
    thumbnailUrl: 'https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/lobo.jpeg?generation=1753206775683340&alt=media',
    videoUrl: 'https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/Screencast%20from%202025-01-09%2017-08-27.webm?generation=1753206775000657&alt=media',
    uploadDate: '2023-10-01T12:00:00Z',
    department: { id: 'all', name: 'Todos los Departamentos', description: 'Todos los empleados', active: true },
    rating: 4.5,
  },
  {
    id: 'sample-2',
    title: 'Habilidades de Comunicación Efectiva',
    description: 'Domina el arte de la comunicación en el lugar de trabajo',
    thumbnailUrl: 'https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/lobo.jpeg?generation=1753206775683340&alt=media',
    videoUrl: 'https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/Screencast%20from%202025-01-09%2017-08-27.webm?generation=1753206775000657&alt=media',
    uploadDate: '2023-10-02T12:00:00Z',
    department: { id: 'hr', name: 'Recursos Humanos' , description: 'Gestión de personal y desarrollo organizacional' , active: true },
    rating: 4.7,
  },
  {
    id: 'sample-3',
    title: 'Técnicas de Gestión del Tiempo',
    description: 'Mejora tu productividad con estos consejos de gestión del tiempo',
    thumbnailUrl: 'https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/lobo.jpeg?generation=1753206775683340&alt=media',
    videoUrl: 'https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/Screencast%20from%202025-01-09%2017-08-27.webm?generation=1753206775000657&alt=media',
    uploadDate: '2023-10-03T12:00:00Z',
    department: { id: 'all', name: 'Todos los Departamentos', description: 'Todos los empleados', active: true },
    rating: 4.8,
  },
]

function VideoCarousel() {
  return (
    <div className="min-w-full px-10 flex items-center justify-center flex-col">
      <div className="text-center mb-8 mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-black rounded-full flex items-center justify-center mb-4"> 
          <Play className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-dark-900 mb-2">¡Tu contenido de capacitación llegará pronto!</h2>
        <p className="text-dark-600">Aquí tienes una vista previa del tipo de contenido atractivo al que tendrás acceso</p>
      </div>

      <Carousel className="w-fit">
        <CarouselContent>
          {sampleVideos.map((video) => (
            <CarouselItem key={video.id}>
              <div className="p-1">
                <video controls width="100%" height="100%" className="rounded-2xl">
                  <source src={video.videoUrl} type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Card className="mt-8 bg-primary/10 border-black/20 shadow-lg shadow-black">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-dark mb-2">Qué esperar</h3>
          <p className="text-dark text-sm">
            Lecciones interactivas en video, seguimiento de progreso, cuestionarios y certificados. ¡Tu biblioteca de capacitación personalizada estará disponible pronto!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EmployeeDashboard() {
  const { videos } = useVideoStore()
  const { getPendingVideos } = useVideosActions()
  const [pendingVideos, setPendingVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchPendingVideos = async () => {
      const data = await getPendingVideos()
      setPendingVideos(data)
      setLoading(false)
    }
    fetchPendingVideos()
  }, [])
  
  return (
    <div className="animate-fade-in">
      {videos.length === 0 ? (
        <div className="py-12">
          <VideoCarousel />
        </div>
      ) : (
        <div className="min-w-full p-0 md:px-6 md:py-8">
          <div className="mb-10">
            <h1 className="text-xl md:text-3xl font-bold text-dark-900 mb-2">¡Bienvenido de nuevo! 👋</h1>
            <p className="text-dark-600 text-md md:text-lg">Continúa tu camino de aprendizaje y sigue tu progreso</p>
          </div>

          {loading && <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-dark-600">Cargando tus videos pendientes...</span>
            </div>
            </div>
            }

          {pendingVideos.length > 0 && !loading ? (
            <div className="mb-12 min-w-full">
              <div className="flex items-center gap-3 mb-6 flex-wrap flex-col md:flex-row">
                <div className='flex gap-2 '>
                   <div className="flex items-center justify-center w-fit h-fit bg-primary/20 rounded-xl">
                    <BookOpen className="text-primary size-4 md:size-6 m-2" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-dark-900">Capacitación pendiente</h2>
                    <p className="text-dark-600 text-xs md:text-sm">Completa estos cursos para mantenerte en cumplimiento</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                    {pendingVideos.length} pendientes
                  </span>
                </div>
              </div>
              <div className="flex w-full gap-6">
                <EmployeeVideosScroller videos={pendingVideos} />
              </div>
            </div>
          )
          :
          !loading && 
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">¡Todavía no tienes videos pendientes! 🎉</h3>
              <p className="text-dark-600 max-w-md mx-auto">
                No tienes requisitos de capacitación pendientes. ¡Buen trabajo manteniéndote al día con tu aprendizaje!
              </p>
            </div>
          }

          <div>
            <div className="flex items-center gap-3 mb-6 flex-wrap flex-col md:flex-row">
              <div className="flex gap-2">
                <div className="flex items-center justify-center w-fit h-fit bg-primary/20 rounded-xl">
                  <Film className="text-primary size-4 md:size-6 m-2" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-dark-900">Biblioteca de capacitación</h2>
                  <p className="text-dark-600 text-xs md:text-sm">Explora todo el contenido de capacitación disponible</p>
                </div>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                  {videos.length} videos
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
