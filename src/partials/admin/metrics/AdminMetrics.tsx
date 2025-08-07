'use client'


import { useEffect, useState } from 'react';
import AdminMetricsProgressChart from './AdminMetricsProgressChart';
import { AdminMetricsVideoCountChart } from './AdminMetricsVideoCountChart';
import { SupervisorMetrics } from '@/types/employees';
import { useMetricsActions } from '@/actions/useMetricsActons';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminMetrics() {
  const [loading, setLoading] = useState(true);
  const [dataSplitted, setDataSplitted] = useState<SupervisorMetrics[][]>([]);
  const [metrics, setMetrics] = useState<SupervisorMetrics[]>([]);
  
    const { getAdminMetrics } = useMetricsActions();
    useEffect(() => {
      setLoading(true)
      getAdminMetrics()
        .then((data: SupervisorMetrics[]) => {
          const allowedData = data.filter((item: SupervisorMetrics) => item.totalEmployees > 0)

          console.log(allowedData)

          if (allowedData.length <= 7) {
            setDataSplitted([allowedData]);
            setMetrics(data || [])
          } else {
            const numberOfCharts = Math.ceil(allowedData.length / 7);
            const itemsPerChart = Math.ceil(allowedData.length / numberOfCharts);
          
            const splitCount = Math.ceil(allowedData.length/itemsPerChart)
            const splitData : SupervisorMetrics[][] = []
            for(let i = 0; i < splitCount; i++) {
              splitData.push(allowedData.slice(i*itemsPerChart, i*itemsPerChart+itemsPerChart))
            }
            setDataSplitted(splitData)
            setMetrics(data || [])
          }
        })
        .finally(() => setLoading(false))
    }, [])
  
  
  
  return (
    <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold ">Métricas de Admins</h1>
        <div className="grid gap-4">
          <div className=" w-full col-span-1">
            {loading ?
              <Skeleton className="h-[300px] w-full"/>
              :
              <AdminMetricsProgressChart dataSplitted={dataSplitted} metrics={metrics} />
            }
          </div>

          <div className="w-full h-[300px] max-h-[300px] col-span-1">
            {loading ?
              <Skeleton className="h-[300px] w-full"/>
              :
              <AdminMetricsVideoCountChart metrics={metrics} />
            }
          </div>

        </div>
    </div>
  )
}
