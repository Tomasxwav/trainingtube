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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { 
  chartConfig, 
  getShortEmployeeName,
  sampleEmployeeMetricsData
} from "./employeeMetricsConfig"

export const description = "Gráfico de barras que muestra videos vistos por empleado"

export function SupervisorMetricsEmployeesChart() {
  const chartData = sampleEmployeeMetricsData;

  const totalWatchedVideos = chartData.reduce((sum, employee) => sum + employee.watchedVideos, 0);
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
              dataKey="watchedVideos" 
              type="number" 
              hide 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                indicator="line" 
                nameKey="employeeName"
                labelFormatter={(label) => `Empleado: ${label}`}
              />}
            />
            <Bar
              dataKey="watchedVideos"
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
                dataKey="watchedVideos"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value} vistos`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
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
