import Link from 'next/link'; 
import Image from 'next/image'
import { Star, Calendar } from 'lucide-react';
import { Video } from '@/types/videos';

import { sinceDate } from '@/utils/sinceDate';
import clsx from 'clsx';

export default function VideoCard({video, type = 'default' }: {video: Video, type?: string}) {
  const { id, title, thumbnailUrl, videoUrl, duration, views, uploadDate, department } = video;
  

  return (
    <div className={clsx(
      "w-full bg-transparent rounded-lg overflow-hidden duration-300",
      type === 'default' && 'w-[20vw] ',
      type === 'large' && 'max-w-full'
    )}>
      <Link href={`/video?url=${encodeURIComponent(videoUrl)}`} className={clsx(type === 'default' && 'block', type === 'large' && 'sm:flex block')}> 
        {/* Thumbnail Container */}
        <div className={clsx('relative aspect-video overflow-hidden rounded-2xl', type === 'large' && 'sm:w-[30%]')}>
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title}
            className="hover:scale-105 transition-transform duration-300 min-w-[40%]" 
            fill
          />
          {/* Duration overlay - hardcoded por ahora */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            12:34
          </div>
        </div>

        {/* Content */}
        <div className={clsx("p-2 flex justify-between min-h-full min-w-[70%]", type === 'large' && 'px-8')}>
           {/* Title & Department */}
         <div>
          <h3 
            className={clsx(
              "font-semibold text-foreground line-clamp-2  leading-5 mb-2 hover:text-blue-600 transition-colors",
              type === 'default' && 'text-sm',
              type === 'large' && 'text-lg'
            )}
          >
            {title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{department.name.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-gray-600 font-medium">{department.name}</span>
          </div>
         </div>

          {/* Rating and Date */}
          <div className="text-xs text-gray-500 min-h-full flex flex-col justify-between items-end ">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="ml-1 font-medium">4.2</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{sinceDate(uploadDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
  