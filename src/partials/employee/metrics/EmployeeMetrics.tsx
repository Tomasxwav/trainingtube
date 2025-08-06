'use client'

import { useEffect, useState } from 'react';
import EmployeeMetricsActivityChart from './EmployeeMetricsActivityChart';
import { EmployeeMetricsVideoCount } from './EmployeeMetricsVideoCount';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, Users } from 'lucide-react';
import { useMetricsActions } from '@/actions/useMetricsActons';
import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeeMetrics() {
  const [loading, setLoading] = useState(true) 
  const [metrics, setMetrics] = useState<{totalComments: number, totalVideos: number, totalFavorites: number, totalInteractions: number, pendingVideos: number}>()
  const { getMyMetrics } = useMetricsActions()

  useEffect(() => {
        setLoading(true)
        getMyMetrics()
          .then((data: {totalComments: number, totalVideos: number, totalFavorites: number, totalInteractions: number, pendingVideos: number}) => {
            setMetrics(data)
            console.log("Metrics data:", data);
          })
          .finally(() => setLoading(false))
      }, [])


  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Métricas de Empleados</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
        <div className="col-span-1 md:col-span-2">
          <EmployeeMetricsActivityChart />
        </div>

        <div className="col-span-1 ">
          {loading ? (
            <Skeleton className="h-[300px] w-full"/>
          ) : (
            <EmployeeMetricsVideoCount pendingVideos={metrics?.pendingVideos || 0} totalVideos={metrics?.totalVideos || 0} />
          )}
        </div>

        <Card>
          <CardHeader >
            <CardTitle className="flex items-center gap-2 text-2xl">
              Interacciones
            </CardTitle>
            <CardDescription>Total de interacciones en los ultimos 30 días</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de comentarios</p>
                {
                  loading ? (
                    <Skeleton className="w-full h-6"/>
                  ) : (
                    <p className="text-xl font-bold text-foreground">{metrics?.totalComments}</p>
                  )
                }
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageCircle className="h-5 w-5 text-blue-500" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de favoritos</p>
                {
                  loading ? (
                    <Skeleton className="w-full h-6"/>
                  ) : (
                    <p className="text-xl font-bold text-foreground">{metrics?.totalFavorites}</p>
                  )
                }
              </div>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de interacciones</p>
                {
                  loading ? (
                    <Skeleton className="w-full h-6"/>
                  ) : (
                    <p className="text-xl font-bold text-foreground">{metrics?.totalInteractions}</p>
                  )
                }
              </div>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Users className="h-5 w-5 text-red-500" />
              </div>
            </div>
            
          </CardContent>
          
        </Card>
      </div>
    </div>
  )
}
