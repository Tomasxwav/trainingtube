'use client'

import { useMetricsActions } from '@/actions/useMetricsActons'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from 'recharts'

export default function EmployeeMetricsActivityChart() {
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState<{ day: string, videosCompleted: number }[]>([])
  const { getMyActivity } = useMetricsActions()
  useEffect(() => {
      setLoading(true)
      getMyActivity()
        .then((data: { day: string, videosCompleted: number }[]) => {
          const formattedData = data.map(item => ({
            ...item,
            day: new Date(item.day).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          }))
          setActivity(formattedData || [])
        })
        .finally(() => setLoading(false))
    }, [])
  
  const chartConfig = {
    videosCompleted: {
        label: "Videos Completados:.",
        color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  if (loading) return <Skeleton className="h-[300px] w-full" />

  return (
    <div className="h-fit max-h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-fit max-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={activity}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="videosCompleted"
              type="natural"
              fill="var(--color-videosCompleted)"
              fillOpacity={0.4}
              stroke="var(--color-videosCompleted)"
            />
          </AreaChart>
        </ChartContainer>
    </div>
  )
}
