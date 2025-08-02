import { ChartConfig } from "@/components/ui/chart";
import { Employee } from "@/types/employees";

export interface EmployeeMetricsData {
  employeeName: string;
  totalVideos: number;
  pendingVideos: number;
  watchedVideos: number;
}

export const chartConfig = {
  watchedVideos: {
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

export const sampleEmployeeMetricsData: EmployeeMetricsData[] = [
  {
    employeeName: "María García",
    totalVideos: 25,
    pendingVideos: 3,
    watchedVideos: 22,
  },
  {
    employeeName: "Carlos Rodríguez",
    totalVideos: 25,
    pendingVideos: 5,
    watchedVideos: 20,
  },
  {
    employeeName: "Ana López",
    totalVideos: 25,
    pendingVideos: 7,
    watchedVideos: 18,
  },
  {
    employeeName: "Pedro Martínez",
    totalVideos: 25,
    pendingVideos: 10,
    watchedVideos: 15,
  },
  {
    employeeName: "Laura Sánchez",
    totalVideos: 25,
    pendingVideos: 12,
    watchedVideos: 13,
  },
  {
    employeeName: "Diego Fernández",
    totalVideos: 25,
    pendingVideos: 15,
    watchedVideos: 10,
  },
  {
    employeeName: "Sofia González",
    totalVideos: 25,
    pendingVideos: 18,
    watchedVideos: 7,
  },
  {
    employeeName: "Miguel Torres",
    totalVideos: 25,
    pendingVideos: 20,
    watchedVideos: 5,
  }
].sort((a, b) => b.watchedVideos - a.watchedVideos); 

export const processEmployeeMetricsData = (employees: any[]): EmployeeMetricsData[] => {
  const processedData = employees.map((employee) => {
    const totalVideos = employee.totalVideos || 0;
    const pendingVideos = employee.pendingVideos || 0;
    const watchedVideos = totalVideos - pendingVideos;

    return {
      employeeName: employee.name || employee.employeeName || "Empleado",
      totalVideos,
      pendingVideos,
      watchedVideos,
    };
  });

  return processedData.sort((a, b) => b.watchedVideos - a.watchedVideos);
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