'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCard from '@/components/VideoCard';
import { ChevronLeft, ChevronRight, VideoOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EmployeeVideosScroller({ videos }: { videos: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current || videos.length === 0) return;

    const container = scrollContainerRef.current;

    // Handle horizontal scroll with mouse wheel
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const scrollAmount = e.deltaY > 0 ? 320 : -320;
      const currentScrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const newScrollLeft = Math.max(0, Math.min(maxScrollLeft, currentScrollLeft + scrollAmount));
      
      gsap.to(container, {
        scrollLeft: newScrollLeft,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [videos]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      gsap.to(scrollContainerRef.current, {
        scrollLeft: scrollContainerRef.current.scrollLeft - 320,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      gsap.to(scrollContainerRef.current, {
        scrollLeft: scrollContainerRef.current.scrollLeft + 320,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <VideoOff className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">No hay videos disponibles</h3>
          <p className="text-dark-600">No hay videos para mostrar en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-background rounded-xl border border-dark-400 p-6 shadow-sm w-full">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={scrollLeft}
          className="w-8 h-8 p-0 bg-background/80 hover:bg-background border-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={scrollRight}
          className="w-8 h-8 p-0 bg-background/80 hover:bg-background border-gray-300"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] "
      >
        <div
          ref={scrollContentRef}
          className="flex gap-6 pb-2 max-w-[70vw] w-full"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-full md:w-60 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards] "
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <VideoCard video={video} />
            </div>
          ))}

          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-full md:w-60 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards] "
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-4">
        <div className="flex gap-1">
          {Array.from({ length: Math.ceil(videos.length / 3) }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}