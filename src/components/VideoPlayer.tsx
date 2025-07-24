'use client';

import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Pause, Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onFinish: () => void;
  onProgress?: (progress: number) => void;
  progress: number;
}

export default function VideoPlayer({videoUrl, onFinish, onProgress, progress} : VideoPlayerProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentVideo = e.currentTarget;
    e.currentTarget.currentTime = Math.round((progress / 100) * (currentVideo.duration || 0));
    console.log('Setting video time to:', Math.round((progress / 100) * (currentVideo.duration || 0)));
  }

  const handlePlay = () => {
    const currentVideo = video.current;
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  }


  const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    
    if (!isValidUrl(videoUrl)) return < div className="h-full w-full">Video no encontrado</div>

  const handleUpdateProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentVideo = e.currentTarget;
    const currentProgress = (currentVideo.currentTime / currentVideo.duration) * 100;
    
    if (currentProgress >= 95) {
      console.log('video terminado');
      onFinish();
      return;
    }
    if (progress < currentProgress - 5 ) {
      console.log('ha avanzado 5%');      
      onProgress?.(currentProgress);
    }
  }

    return (
    <div className="relative h-full w-full flex justify-center items-center">
        <video
          width="100%"
          height="100%"
          style={{ maxHeight: '70vh' }}
          className="rounded-2xl"
          ref={video}
          onLoadedMetadata={(e) => {
            handleLoad(e);
          }}
          onTimeUpdate={(e) => {
            handleUpdateProgress(e);
          }}
          >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <Button
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={handlePlay}
        >
          {isPlaying ? <Pause/> : <Play/>}
        </Button>
        
    </div>
  );
}