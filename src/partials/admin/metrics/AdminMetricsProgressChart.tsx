import { TrendingUp, Users, Target } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"

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
import { SupervisorMetrics } from '@/types/employees'


export default function AdminMetricsProgressChart({ dataSplitted, metrics }: { dataSplitted: SupervisorMetrics[][], metrics: SupervisorMetrics[] }) {

  const radialChartConfig = {
    averageCompletionRate: {
      label: "Porcentaje de Completitud",
      color: "hsl(var(--chart-1))",
    },
  }
  
  const totalEmployees = metrics.reduce((acc, item) => acc + item.totalEmployees, 0);
  const totalCompleted = metrics.reduce((acc, item) => acc + item.totalFinalized, 0);
  const overallPercentage = Math.round((totalCompleted / totalEmployees) * 100);

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Progreso de Capacitación por Departamento
        </CardTitle>
        <CardDescription>Estado actual de entrenamiento de empleados</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap justify-center gap-4'>

      {dataSplitted.map((chart, index)=>{
        return (
        <ChartContainer
          config={radialChartConfig}
          className="mx-8 aspect-square max-h-[280px] min-w-[280px]"
          key={`radial-chart-${index}`}
        >
          <RadialBarChart
            data={chart}
            startAngle={-90}
            endAngle={270}
            innerRadius={40}
            outerRadius={140}
          >
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <div className="grid gap-2">
                        <div className="font-semibold">{data.departmentName}</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div
                              className={`h-2 w-2 rounded-full bg-chart-${Math.floor(Math.random() * 10) + 1}`}
                            />
                            <span>{data.averageCompletionRate}% completado</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{data.totalFinalized}/{data.totalEmployees}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <RadialBar dataKey="averageCompletionRate" background cornerRadius={8} fill={`var(--chart-${Math.floor(Math.random() * 10) + 1})`}>
              <LabelList
                position="insideStart"
                dataKey="departmentName"
                className="fill-white text-xs font-medium mix-blend-luminosity text-foreground"
                fontSize={10}
                formatter={(value: string) => value.split(' ')[0]}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
        )
      })}

       
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
         <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{overallPercentage}%</div>
            <div className="text-xs text-muted-foreground">Progreso General</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{totalCompleted}/{totalEmployees}</div>
            <div className="text-xs text-muted-foreground">Empleados Capacitados</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
