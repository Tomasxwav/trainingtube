import { ChartConfig } from "@/components/ui/chart";
import { Employee } from "@/types/employees";

export interface EmployeeMetricsData {
  employeeName: string;
  totalVideos: number;
  pendingVideos: number;
  videosCompleted: number;
}

export const chartConfig = {
  videosCompleted: {
    label: "Videos Vistos",
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

export const processEmployeeMetricsData = (employees: any[]): EmployeeMetricsData[] => {
  const processedData = employees.map((employee) => {
    const totalVideos = employee.totalVideos || 0;
    const pendingVideos = employee.pendingVideos || 0;
    const videosCompleted = totalVideos - pendingVideos;

    return {
      employeeName: employee.name || employee.employeeName || "Empleado",
      totalVideos,
      pendingVideos,
      videosCompleted,
    };
  });

  return processedData.sort((a, b) => b.videosCompleted - a.videosCompleted);
};

export const getShortEmployeeName = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1].charAt(0)}.`;
  }
  return name.length > 12 ? `${name.substring(0, 12)}...` : name;
};


export const getDepartmentsLatestComments = () => {
  return [
    {
      textComment: "Hola, este es un comentario de prueba",
      date: "2023-03-01",
      employee: "María García",
      video: "Video 1",
    },
    {
      textComment: "Hola, este es un comentario de prueba",
      date: "2023-03-02",
      employee: "María García",
      video: "Video 2",
    },
    {
      textComment: "Hola, este es un comentario de prueba",
      date: "2023-03-03",
      employee: "María García",
      video: "Video 3",
    },
    {
      textComment: "Hola, este es un comentario de prueba",
      date: "2023-03-04",
      employee: "Carlos Rodríguez",
      video: "Video 4",
    },
    {
      textComment: "Este es un comentario de prueba",
      date: "2023-03-05",
      employee: "Carlos Rodríguez",
      video: "Video 4",
    },
  ];

};