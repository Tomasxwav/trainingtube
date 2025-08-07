"use client"

import { TrendingUp, Video, BarChart3 } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

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

export const description = "Gráfico de distribución de videos por departamento"

export function AdminMetricsVideoCountChart({metrics}: { metrics: SupervisorMetrics[] }) {
  if (!metrics || metrics.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Distribución de Videos por Departamento
          </CardTitle>
          <CardDescription>No hay datos disponibles</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 h-fit">
          <div className="text-center text-muted-foreground py-8">
            No hay métricas de departamentos para mostrar
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalVideosSummary = metrics.reduce((acc, dept) => acc + dept.totalVideos, 0);
  const departmentWithMostVideos = metrics.reduce((prev, current) => 
    prev.totalVideos > current.totalVideos ? prev : current
  );

  const pieChartConfig = {
    videoCount: {
      label: "Total de Videos",
    },
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Distribución de Videos por Departamento
        </CardTitle>
        <CardDescription>Total de contenido de capacitación disponible</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-fit">
         <ChartContainer
          config={pieChartConfig}
          className="mx-auto h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <div className="flex gap-2">
                        <div className="font-semibold flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          {data.departmentName}
                        </div>
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>Videos:</span>
                            <span className="font-medium">{data.totalVideos}</span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span>Porcentaje: </span>
                            <span className="font-medium"> {(data.totalVideos/totalVideosSummary) * 100}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie 
              data={metrics} 
              dataKey="totalVideos" 
              nameKey="departmentName"
              className='text-white'
              cx="50%" 
              cy="50%" 
              outerRadius={100}
              label={({ departmentName, totalVideos }) => totalVideos > 0 ? `${departmentName.split(' ')[0]} (${(totalVideos/totalVideosSummary) * 100}%)` : ''}
              labelLine={false}
              
            >
              {metrics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`var(--color-chart-${Math.floor(Math.random()) * 10 + 1})`} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        
        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{totalVideosSummary}</div>
            <div className="text-xs text-muted-foreground">Videos Totales</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-primary">{departmentWithMostVideos.departmentName.split(' ')[0]}</div>
            <div className="text-xs text-muted-foreground">Departamento Líder</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-center mb-3">Desglose por Departamento</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {metrics.map((dept, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                <div 
                  className="h-3 w-3 rounded-full flex-shrink-0" 
                 /*  style={{ 
                    backgroundColor: dept.fill.replace('var(--color-', 'hsl(var(--chart-').replace(')', '))') 
                  }} */
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{dept.departmentName}</div>
                  <div className="text-muted-foreground">{dept.totalVideos} videos</div>
                </div>
              </div>
            ))}
          </div>
        </div> 
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Crecimiento del 8% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Contenido actualizado semanalmente
        </div>
      </CardFooter>
    </Card>
  )
}
