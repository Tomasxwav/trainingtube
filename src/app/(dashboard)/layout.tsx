'use client'

import VideoCard from '@/components/VideoCard';
import Navbar from '@/partials/Navbar'
import Sidebar from '@/partials/Sidebar'
import {useVideoStore} from '@/stores/videoStore';
import {useDepartmentStore} from '@/stores/departmentStore';
import React, { useEffect, useState } from 'react'
import { useSessionStore } from '@/stores/sessionStore';

export default function DashboardLayout( {
  children,
}: {
  children: React.ReactNode
}) {

  const { fetchVideos, videos } = useVideoStore();
  const { fetchDepartments } = useDepartmentStore();
  const { fetchEmployee } = useSessionStore();

  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  }


  useEffect(() => {
    fetchVideos();
    fetchDepartments();
    fetchEmployee();
  }, [fetchVideos]);

  return (
    <div className='flex flex-row h-full'>
        <Sidebar />
      <div className='flex-1 '>
        <Navbar handleSearchChange={handleSearchChange}/>
        {searchValue ?
          <div className='p-12 space-y-6'>
            {videos.filter(video => video.title.toLowerCase().startsWith(searchValue.toLowerCase())).map((video) => (
            <VideoCard key={video.id} video={video} type='large' />
            ))}
          </div>
        

          : 

          children

        }
      </div>
        
    </div>
  )
}
  
