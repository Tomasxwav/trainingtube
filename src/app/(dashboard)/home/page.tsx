import EmployeeDashboard from '@/partials/employee/EmployeeDashboard'

export default function Home() {
  return (
    <div className='flex flex-col w-full'>
      <div className='p-8'>
        <EmployeeDashboard />
      </div>
    </div>
  )
}
