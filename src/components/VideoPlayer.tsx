'use client'

import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Fullscreen, Pause, Play, Volume2, VolumeOff } from 'lucide-react'
import { Slider } from './ui/slider'

interface VideoPlayerProps {
  videoUrl: string
  onFinish: () => void
  onProgress?: (progress: number) => void
  progress: number
}

export default function VideoPlayer({
  videoUrl,
  onFinish,
  onProgress,
  progress,
}: VideoPlayerProps) {
  const video = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(progress === 100)
  const [volume, setVolume] = useState(50)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(progress)

  const handleLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentVideo = e.currentTarget
    if (!isFinished) {
      e.currentTarget.currentTime = Math.round(
        (progress / 100) * (currentVideo.duration || 0)
      )
    }
    currentVideo.volume = volume / 100
  }

  const togglePlay = () => {
    const currentVideo = video.current
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause()
      } else {
        currentVideo.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleChangeProgress = (value: number) => {
    const currentVideo = video.current
    if (currentVideo) {
      currentVideo.pause()
      currentVideo.currentTime = currentVideo.duration * (value / 100)
      setCurrentProgress(value)
      currentVideo.play()
      setIsPlaying(true)
    }
  }

  const handleFullScreen = () => {
    const currentVideo = video.current
    currentVideo?.requestFullscreen().catch((err) => {
      console.error('Error attempting to enable full-screen mode:', err)
    })
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    const currentVideo = video.current
    if (currentVideo) {
      currentVideo.volume = newVolume / 100
    }
  }

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider)
  }

  const handleUpdateProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentVideo = e.currentTarget
    const calculatedProgress =
      (currentVideo.currentTime / currentVideo.duration) * 100

    setCurrentProgress(calculatedProgress)

    const savingPercentage = 200 / Math.pow(currentVideo.duration, 0.5)
    if (!isFinished && progress >= 100 - savingPercentage) {
      console.log('video terminado')
      setIsFinished(true)
      onFinish()
      return
    }

    if (!isFinished && progress < calculatedProgress - savingPercentage) {
      console.log('ha avanzado ', savingPercentage, ' %')
      onProgress?.(calculatedProgress)
    }
  }

  const handleMute = () => {
    const currentVideo = video.current
    if (currentVideo) {
      currentVideo.muted = !currentVideo.muted
      setVolume(currentVideo.muted ? 0 : 100)
    }
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  if (!isValidUrl(videoUrl))
    return <div className='h-full w-full'>Video no encontrado</div>

  return (
    <div className='relative h-full w-full flex justify-center items-center'>
      <video
        width='100%'
        height='100%'
        style={{ maxHeight: '70vh' }}
        className='rounded-2xl'
        ref={video}
        onLoadedMetadata={(e) => {
          handleLoad(e)
        }}
        onTimeUpdate={(e) => {
          handleUpdateProgress(e)
        }}
      >
        <source src={videoUrl} type='video/mp4' />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* controles de video */}
      <div className='absolute bottom-4 w-full'>
        <div className='flex justify-between items-center gap-2 w-full px-4'>
          <Button
            className=' bg-black bg-opacity-50 text-white p-2 rounded-full left-0 '
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Slider
            disabled={!isFinished}
            min={0}
            max={100}
            className='w-full'
            value={[currentProgress]}
            onValueChange={(value) => handleChangeProgress(value[0])}
          />

          <div className='flex items-center gap-2'>
            <div className='relative flex items-center justify-center'>
              {showVolumeSlider && (
                <div
                  className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex justify-center p-4 bg-foreground/10 rounded-full'
                  onMouseLeave={toggleVolumeSlider}
                >
                  <Slider
                    orientation='vertical'
                    min={0}
                    max={100}
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    className='cursor-pointer'
                  />
                </div>
              )}
              <Button
                className='bg-black bg-opacity-50 text-white p-2 rounded-full'
                onMouseEnter={toggleVolumeSlider}
                onClick={handleMute}
              >
                {volume !== 0 ? (
                  <Volume2 className='w-4 h-4' />
                ) : (
                  <VolumeOff className='w-4 h-4' />
                )}
              </Button>
            </div>

            <Button
              className='bg-black bg-opacity-50 text-white p-2 rounded-full'
              onClick={handleFullScreen}
            >
              <Fullscreen className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
