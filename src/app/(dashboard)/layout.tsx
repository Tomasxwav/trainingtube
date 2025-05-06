import Sidebar from '@/partials/Sidebar'
import React from 'react'

export default function DashboardLayout( {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-row'>
    <div>
        <Sidebar />
    </div>
        {children}
    </div>
  )
}
