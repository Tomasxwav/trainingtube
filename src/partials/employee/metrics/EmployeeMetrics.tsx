import SupervisorMetricsProgressChart from '@/partials/admin/metrics/SupervisorMetricsProgressChart';
import EmployeeMetricsActivityChart from './EmployeeMetricsActivityChart';
import { SupervisorMetricsVideoCountChart } from '@/partials/admin/metrics/SupervisorMetricsVideoCountChart';
import { EmployeeMetricsVideoCount } from './EmployeeMetricsVideoCount';

export default function EmployeeMetrics() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Métricas de Empleados</h1>

        <div className="h-[300px] max-h-[300px] w-full">
          <EmployeeMetricsActivityChart />
        </div>

      <div className="w-full">
        <EmployeeMetricsVideoCount />
      </div>
        
      <h1 className="text-2xl font-bold">Métricas de Supervisores</h1>


      <h1 className="text-2xl font-bold">Métricas de Admins</h1>
        <div className=" w-full">
          <SupervisorMetricsProgressChart />
        </div>

        <div className="w-full h-[300px] max-h-[300px]">
          <SupervisorMetricsVideoCountChart />
        </div>
        
    </div>
  )
}
