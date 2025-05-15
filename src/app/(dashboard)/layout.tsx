import Navbar from '@/partials/Navbar'
import Sidebar from '@/partials/Sidebar'
import React from 'react'

export default function DashboardLayout( {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-row'>
        <Sidebar />
      <div className='flex-1 '>
        <Navbar />
        {children}
      </div>
        
    </div>
  )
}
