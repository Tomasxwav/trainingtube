import Link from 'next/link'; 
import Image from 'next/image'
import { Star, Clock } from 'lucide-react';
import { Video } from '@/stores/videoStore';

type VideoCardProps = {
  video: Video;
  showCategory?: boolean;
  averageRating: number;
};

export default function VideoCard({ video, showCategory = true, averageRating }: VideoCardProps) {
  const { id, title, thumbnailUrl, duration, views, uploadedAt, categories } = video;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <Link href={`/video/${id}`} className="group">
      <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white animate-fade-in">
        <div className="relative">
          <Image 

            src={thumbnailUrl} 
            alt={title}
            width={400}
            height={300}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2 bg-dark-900 bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {duration}
            </span>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-dark-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-dark-600">
              {views} views • {formatDate(uploadedAt)}
            </div>
            
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`${
                    star <= averageRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-dark-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {showCategory && categories.length > 0 && (
            <div className="mt-2">
              <span className="inline-block bg-dark-50 text-dark-700 text-xs px-2 py-1 rounded">
                {categories[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}