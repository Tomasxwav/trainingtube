import SupervisorMetricsProgressChart from '@/partials/supervisor/metrics/SupervisorMetricsProgressChart';
import EmployeeMetricsActivityChart from './EmployeeMetricsActivityChart';
import { SupervisorMetricsVideoCountChart } from '@/partials/supervisor/metrics/SupervisorMetricsVideoCountChart';

export default function EmployeeMetrics() {
  return (
    <div className="p-8 space-y-8">
        EmployeeMetrics
        <div className="h-[300px] max-h-[300px] w-full">
          <EmployeeMetricsActivityChart />
        </div>
        
        <div className=" w-full">
          <SupervisorMetricsProgressChart />
        </div>

        <div className="w-full h-[300px] max-h-[300px]">
          <SupervisorMetricsVideoCountChart />
        </div>
        
    </div>
  )
}
