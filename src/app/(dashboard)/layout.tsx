'use client'

import Navbar from '@/partials/Navbar'
import Sidebar from '@/partials/Sidebar'
import {useVideoStore} from '@/stores/videoStore';
import React, { useEffect } from 'react'

export default function DashboardLayout( {
  children,
}: {
  children: React.ReactNode
}) {

  const { fetchVideos } = useVideoStore();
  
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className='flex flex-row h-full'>
        <Sidebar />
      <div className='flex-1 '>
        <Navbar />
        {children}
      </div>
        
    </div>
  )
}
  
