import Link from 'next/link'; 
import Image from 'next/image'
import { Star, Calendar } from 'lucide-react';
import { Video } from '@/types/videos';

import { sinceDate } from '@/utils/sinceDate';

export default function VideoCard({video} : {video: Video}) {
  const { id, title, thumbnailUrl, videoUrl, duration, views, uploadDate, department } = video;
  

  return (
    <div className="w-full max-w-[20vw] bg-transparent rounded-lg overflow-hiddenduration-300 ">
      <Link href={`/video?url=${encodeURIComponent(videoUrl)}`} className="block">
        {/* Thumbnail Container */}
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 13vw"
          />
          {/* Duration overlay - hardcoded por ahora */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            12:34
          </div>
        </div>

        {/* Content */}
        <div className="p-2 flex justify-between min-h-full">
           {/* Title & Department */}
         <div>
          <h3 className="font-semibold text-foreground line-clamp-2 text-sm leading-5 mb-2 hover:text-blue-600 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{department?.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-gray-600 text-sm font-medium">{department}</span>
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
  