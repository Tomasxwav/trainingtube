'use client'

import VideoCard from '@/components/VideoCard';
import Navbar from '@/partials/Navbar'
import Sidebar from '@/partials/Sidebar'
import {useVideoStore} from '@/stores/videoStore';
import React, { useEffect, useState } from 'react'

export default function DashboardLayout( {
  children,
}: {
  children: React.ReactNode
}) {

  const { fetchVideos, videos } = useVideoStore();

  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  }


  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className='flex flex-row h-full'>
        <Sidebar />
      <div className='flex-1 '>
        <Navbar handleSearchChange={handleSearchChange}/>
        {searchValue ?
          <div className='p-12'>
            {videos.filter(video => video.title.toLowerCase().startsWith(searchValue.toLowerCase())).map((video) => (
            <VideoCard key={video.id} video={video} />
            ))}
          </div>
        

          : 

          children

        }
      </div>
        
    </div>
  )
}
  
