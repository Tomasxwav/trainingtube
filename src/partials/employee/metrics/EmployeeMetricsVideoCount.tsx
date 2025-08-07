"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

export const description = "Gráfico radial de progreso de videos"

export function EmployeeMetricsVideoCount({pendingVideos, totalVideos}: {pendingVideos: number, totalVideos: number}) {
  const completedVideos = totalVideos - pendingVideos

  const videoChartConfig = {
      completed: {
          label: "Videos Finalizados",
          color: "var(--chart-1)",
      },
      pending: {
          label: "Videos Pendientes", 
          color: "var(--chart-2)",
      },
  }

  const chartData = [
    {
      category: "videos",
      completed: completedVideos,
      pending: pendingVideos
    }
  ]

  return (
    <Card className="flex flex-col max-h-full h-full overflow-hidden">
      <CardHeader className="items-center pb-0">
        <CardTitle>Progreso de Videos</CardTitle>
        <CardDescription>Videos completados vs pendientes</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 ">
        <ChartContainer
          config={videoChartConfig}
          className="mx-auto w-full max-w-[250px] "
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            cy={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {completedVideos}/{totalVideos}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total Videos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="pending"
              fill="var(--color-pending)"
              stackId="a"
              cornerRadius={5}
            />
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-completed)"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Videos en progreso <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Progreso de finalización de videos de entrenamiento
        </div>
      </CardFooter>
    </Card>
  )
}
