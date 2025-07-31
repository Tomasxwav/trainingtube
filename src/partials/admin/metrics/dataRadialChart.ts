export const dataRadialChart = [
  { 
    department: "Recursos Humanos", 
    percentage: 85, 
    completedEmployees: 17,
    totalEmployees: 20,
    fill: "var(--color-chart-1)" 
  },
  { 
    department: "Tecnología", 
    percentage: 78, 
    completedEmployees: 23,
    totalEmployees: 30,
    fill: "var(--color-chart-2)" 
  },
  { 
    department: "Ventas", 
    percentage: 92, 
    completedEmployees: 46,
    totalEmployees: 50,
    fill: "var(--color-chart-3)" 
  },
  { 
    department: "Marketing", 
    percentage: 67, 
    completedEmployees: 20,
    totalEmployees: 30,
    fill: "var(--color-chart-4)"
  },
  { 
    department: "Finanzas", 
    percentage: 88, 
    completedEmployees: 22,
    totalEmployees: 25,
    fill: "var(--color-chart-5)"
  },
  { 
    department: "Operaciones", 
    percentage: 74, 
    completedEmployees: 37,
    totalEmployees: 50,
    fill: "var(--color-chart-1)" 
  }
];

export const radialChartConfig = {
  percentage: {
    label: "Porcentaje de Completitud",
  },
  hr: {
    label: "Recursos Humanos",
    color: "hsl(var(--chart-1))",
  },
  tech: {
    label: "Tecnología",
    color: "hsl(var(--chart-2))",
  },
  sales: {
    label: "Ventas",
    color: "hsl(var(--chart-3))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  finance: {
    label: "Finanzas",
    color: "hsl(var(--chart-5))",
  },
  operations: {
    label: "Operaciones",
    color: "hsl(var(--chart-6))",
  },
};
