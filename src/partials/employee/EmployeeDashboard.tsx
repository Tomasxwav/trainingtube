"use client"

import { useEffect, useState } from "react"

import { useVideoStore } from "@/stores/videoStore"
import { Film, Flame, BookOpen, ChevronLeft, ChevronRight, Play } from "lucide-react"
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

const sampleVideos: Video[] = [
  {
    id: 'sample-1',
    title: 'Workplace Safety Fundamentals',
    description: 'Learn the essential safety protocols every employee should know',
    thumbnailUrl: '	https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/enano.jpg?generation=1752620895077816&alt=media',
    videoUrl: 'gs://trainidb.appspot.com/Screencast from 2025-01-09 17-08-27.webm',
    uploadDate: '2023-10-01T12:00:00Z',
    department: 'all',
    rating: 4.5,
  },
  {
    id: 'sample-2',
    title: 'Effective Communication Skills',
    description: 'Master the art of communication in the workplace',
    thumbnailUrl: '	https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/enano.jpg?generation=1752620895077816&alt=media',
    videoUrl: 'gs://trainidb.appspot.com/Screencast from 2025-01-09 17-08-27.webm',
    uploadDate: '2023-10-02T12:00:00Z',
    department: 'all',
    rating: 4.7,
  },
  {
    id: 'sample-3',
    title: 'Time Management Techniques',
    description: 'Boost your productivity with these time management tips',
    thumbnailUrl: '	https://storage.googleapis.com/download/storage/v1/b/trainidb.appspot.com/o/enano.jpg?generation=1752620895077816&alt=media',
    videoUrl: 'gs://trainidb.appspot.com/Screencast from 2025-01-09 17-08-27.webm',
    uploadDate: '2023-10-03T12:00:00Z',
    department: 'all',
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
        <h2 className="text-2xl font-bold text-dark-900 mb-2">Your Training Content is Coming Soon!</h2>
        <p className="text-dark-600">Here's a preview of the type of engaging content you'll have access to</p>
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
          <h3 className="font-semibold text-dark mb-2">What to Expect</h3>
          <p className="text-dark text-sm">
            Interactive video lessons, progress tracking, quizzes, and certificates. Your personalized training library
            will be available soon!
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

  useEffect(() => {
    const fetchPendingVideos = async () => {
      const data = await getPendingVideos()
      setPendingVideos(data)
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
        <div className="min-w-full px-6 py-8">
          {/* Welcome Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-dark-900 mb-2">Welcome back! 👋</h1>
            <p className="text-dark-600 text-lg">Continue your learning journey and track your progress</p>
          </div>

          {/* Required Training Section */}
          {pendingVideos.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-xl">
                  <BookOpen size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-dark-900">Required Training</h2>
                  <p className="text-dark-600 text-sm">Complete these courses to stay compliant</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                    {pendingVideos.length} pending
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pendingVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {/* All Training Videos Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-xl">
                <Film size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-dark-900">Training Library</h2>
                <p className="text-dark-600 text-sm">Explore all available training content</p>
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
