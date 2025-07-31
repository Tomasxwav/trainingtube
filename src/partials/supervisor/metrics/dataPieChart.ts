export const dataPieChart = [
  { 
    department: "Recursos Humanos", 
    videoCount: 45,
    percentage: 18.5,
    fill: "var(--color-chart-1)"
  },
  { 
    department: "Tecnología", 
    videoCount: 72,
    percentage: 29.6,
    fill: "var(--color-chart-2)"
  },
  { 
    department: "Ventas", 
    videoCount: 38,
    percentage: 15.6,
    fill: "var(--color-chart-3)" 
  },
  { 
    department: "Marketing", 
    videoCount: 56,
    percentage: 23.0,
    fill: "var(--color-chart-4)" 
  },
  { 
    department: "Finanzas", 
    videoCount: 21,
    percentage: 8.6,
    fill: "var(--color-chart-5)" 
  },
  { 
    department: "Operaciones", 
    videoCount: 11,
    percentage: 4.5,
    fill: "var(--color-chart-2)" 
  }
];

export const pieChartConfig = {
  videoCount: {
    label: "Total de Videos",
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
