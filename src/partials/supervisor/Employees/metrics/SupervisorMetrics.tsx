'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SupervisorMetricsEmployeesChart } from './SupervisorMetricsEmployeesChart';
import { Heart, MessageCircle, Users } from 'lucide-react';
import { getDepartmentsLatestComments } from './employeeMetricsConfig';
import { useEffect, useState } from 'react';
import { useMetricsActions } from '@/actions/useMetricsActons';
import { Skeleton } from '@/components/ui/skeleton';
import { GeneralMetrics } from '@/types/employees';

export default function SupervisorMetrics() {
  const { getDepartmentMetrics } = useMetricsActions()
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<GeneralMetrics>()
  useEffect(() => {
            setLoading(true)
            getDepartmentMetrics()
              .then((data) => {
                setMetrics(data)
              })
              .finally(() => setLoading(false))
          }, [])

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Métricas de Supervisores</h1>
      <div className="w-full grid grid-cols-5 gap-4">
        <div className="col-span-3 md:col-span-3">
          <SupervisorMetricsEmployeesChart />
        </div>      
      
          <Card className="col-span-2 md:col-span-2 h-full">
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

        <Card className='col-span-2 md:col-span-5 h-full'>
          <CardHeader className="border-b pb-4">
            <CardTitle>
              Comentarios
            </CardTitle>
            <CardDescription>
              Ultimos comentarios recibidos por los empleados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {
              getDepartmentsLatestComments().map((comment, index) => (
                <div key={index} className="border-b border-muted py-2">
                  <h2 className="text-sm font-medium text-foreground">{comment.employee} en {comment.video}</h2>
                  <p className="text-sm text-muted-foreground">{comment.textComment}</p>
                  <p className="text-xs text-muted-foreground">{comment.date}</p>
                </div>
              ))
            }
          </CardContent>
        </Card>
      
      </div>
    </div>
  )
}
