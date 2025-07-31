"use client"

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
import { dataRadialChart, radialChartConfig } from "../../supervisor/metrics/dataRadialChart"

export const description = "Gráfico radial de progreso de capacitación por departamento"

export default function EmployeeMetricsChart() {
  // Calcular estadísticas generales
  const totalEmployees = dataRadialChart.reduce((acc, dept) => acc + dept.totalEmployees, 0);
  const totalCompleted = dataRadialChart.reduce((acc, dept) => acc + dept.completedEmployees, 0);
  const overallPercentage = Math.round((totalCompleted / totalEmployees) * 100);
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Progreso de Capacitación por Departamento
        </CardTitle>
        <CardDescription>Estado actual de entrenamiento de empleados</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={radialChartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <RadialBarChart
            data={dataRadialChart}
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
                        <div className="font-semibold">{data.department}</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div 
                              className="h-2 w-2 rounded-full" 
                              style={{ backgroundColor: data.fill }}
                            />
                            <span>{data.percentage}% completado</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{data.completedEmployees}/{data.totalEmployees}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <RadialBar dataKey="percentage" background cornerRadius={8}>
              <LabelList
                position="insideStart"
                dataKey="department"
                className="fill-white text-xs font-medium mix-blend-luminosity"
                fontSize={10}
                formatter={(value: string) => value.split(' ')[0]} // Solo mostrar la primera palabra
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
        
        {/* Estadísticas adicionales */}
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Incremento del 12% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Monitoreo continuo del progreso de capacitación
        </div>
      </CardFooter>
    </Card>
  )
}
