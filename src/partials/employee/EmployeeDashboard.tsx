'use client';
/* 
import { useState } from 'react'; */
/* import { useVideosStore } from '@/stores/videoStore'; */
import VideoCard from '@/components/VideoCard';
import { Film, Flame, BookOpen } from 'lucide-react';
/* import { Button } from '@/components/ui/button'; */

export default function EmployeeDashboard() {
 /*  const { videos  } = useVideosStore(); */
/*   const [selectedCategory, setSelectedCategory] = useState<string | null>(null); */
  
/*   const categories = Array.from(
    new Set(videos.flatMap((video) => video.categories))
  ); */
  
/*   const filteredVideos = selectedCategory
    ? videos.filter((video) => video.categories.includes(selectedCategory))
    : videos; */
  
 /*  const departmentVideos = user?.department
    ? videos.filter((v) => v.requiredFor?.includes(user.department!))
    : []; */
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900 mb-2">Welcome back, </h1>
        <p className="text-dark-600">Access your training materials and track your progress</p>
      </div>
      
     {/*  {departmentVideos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BookOpen size={20} className="text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-dark-900">Required Training</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {departmentVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                averageRating={getAverageRating(video.id)}
              />
            ))}
          </div>
        </div>
      )} */}
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Flame size={20} className="text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold text-dark-900">Popular Training</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* {videos
            .sort((a, b) => b.views - a.views)
            .slice(0, 4)
            .map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                averageRating={video.rating}
              />
            ))} */}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Film size={20} className="text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-dark-900">All Training Videos</h2>
          </div>
          
          {/* <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-50 text-dark-700 hover:bg-dark-100'
              }`}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-50 text-dark-700 hover:bg-dark-100'
                }`}
              >
                {category}
              </Button>
            ))}
          </div> */}
        </div>
        
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              averageRating={getAverageRating(video.id)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}