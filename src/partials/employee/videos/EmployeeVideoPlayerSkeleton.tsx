import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeeVideoPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8  2xl:gap-12 p-2 md:p-8">

      {/* Video Player */}
      <div className="lg:col-span-5 flex lg:gap-8 flex-col xl:flex-row gap-4">
        
        <Skeleton className="w-full h-full rounded-2xl" />

        {/* Rating Section */}
        <Skeleton className='gap-2 m-0 p-0 md:py-4 '/>
        
      </div>


      {/* Description Section */}
      <Skeleton className='lg:col-span-3'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </Skeleton>

      {/* Comments Section */}
      <Skeleton className='bg-card rounded-lg  lg:col-span-2'>
      </Skeleton>
    </div>
  )
}
