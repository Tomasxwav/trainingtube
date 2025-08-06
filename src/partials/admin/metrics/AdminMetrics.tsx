import AdminMetricsProgressChart from './AdminMetricsProgressChart';
import { AdminMetricsVideoCountChart } from './AdminMetricsVideoCountChart';

export default function AdminMetrics() {
  return (
    <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold ">Métricas de Admins</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className=" w-full col-span-1">
            <AdminMetricsProgressChart />
          </div>

          <div className="w-full h-[300px] max-h-[300px] col-span-1">
            <AdminMetricsVideoCountChart />
          </div>

        </div>
    </div>
  )
}
