import EmployeeDashboard from '@/partials/employee/EmployeeDashboard'
import Navbar from '@/partials/Navbar'

export default function Home() {
  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <div className='p-8'>
        <EmployeeDashboard />
      </div>
    </div>
  )
}
