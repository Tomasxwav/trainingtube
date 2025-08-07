"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { 
  getShortEmployeeName,
} from "./employeeMetricsConfig"
import { useEffect, useState } from 'react'
import { useMetricsActions } from '@/actions/useMetricsActons'
import { Skeleton } from '@/components/ui/skeleton'

export const description = "Gráfico de barras que muestra videos vistos por empleado"

export function SupervisorMetricsEmployeesChart() {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<{videosCompleted: number, employeeName: string}[]>([])
  const { getDepartmentProgress } = useMetricsActions()

   useEffect(() => {
          setLoading(true)
          getDepartmentProgress()
            .then((data) => {
              setMetrics(data)
              console.log(data)
            })
            .finally(() => setLoading(false))
        }, [])


  const chartData = metrics || [];
  const chartConfig = {
  videosCompleted: {
    label: "videos vistos",
    color: "hsl(var(--chart-1))",
  },
  pendingVideos: {
    label: "Videos Pendientes", 
    color: "hsl(var(--chart-2))",
  },
  totalVideos: {
    label: "Total Videos",
    color: "hsl(var(--chart-3))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

  const totalWatchedVideos = metrics?.reduce((sum, employee) => sum + employee.videosCompleted, 0) || 0;
  const averageWatched = chartData.length > 0 ? Math.round(totalWatchedVideos / chartData.length) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Videos Vistos por Empleado</CardTitle>
        <CardDescription>
          Progreso de visualización ordenado de mayor a menor
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] w-full">
            <Skeleton className="h-[300px] w-full"/>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
            maxBarSize={30}
            barCategoryGap={0}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="employeeName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={getShortEmployeeName}
            />
            <XAxis 
              dataKey="videosCompleted" 
              type="number" 
              hide 
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm flex">
                      <div className='bg-blue-800/50 min-h-full w-1 rounded mr-2'></div>
                      <div className="grid">
                        <div className="flex items-center gap-2 text-sm">
                          <span className=" font-medium">Empleado: </span>{label}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Videos vistos: </span>
                          <span>{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            /> 
            <Bar
              dataKey="videosCompleted"
              layout="vertical"
              fill="var(--color-chart-1)"
              radius={4}
            >
              <LabelList
                dataKey="employeeName"
                position="insideLeft"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={getShortEmployeeName}
              />
              <LabelList
                dataKey="videosCompleted"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => {
                  if (value === 0) return ''
                  if (value === 1) return `${value} video visto`
                  return `${value} videos vistos`
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Promedio: {averageWatched} videos vistos por empleado
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Datos basados en videos totales menos videos pendientes
        </div>
      </CardFooter>
    </Card>
  )
}
