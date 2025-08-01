'use client'

import { DailyData } from './chartData'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from 'recharts'

export default function EmployeeMetricsActivityChart() {

  const chartData = DailyData
  
  const chartConfig = {
    interactions: {
        label: "Interactions",
        color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <div className="h-fit max-h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-fit max-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
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
              tickFormatter={(value) => value.slice(0, 3)}
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
              dataKey="interactions"
              type="natural"
              fill="var(--color-interactions)"
              fillOpacity={0.4}
              stroke="var(--color-interactions)"
            />
          </AreaChart>
        </ChartContainer>
    </div>
  )
}
