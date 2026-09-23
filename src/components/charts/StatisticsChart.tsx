import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { statisticsData } from '../../data'

export default function StatisticsChart() {
  return (
    <div className="rounded-xl2 border border-surface-border bg-white p-4 shadow-card transition-shadow hover:shadow-md sm:p-5">
      <h2 className="text-[14.5px] font-bold text-surface-heading sm:text-[15px]">Statistics</h2>
      <p className="mb-4 text-[12.5px] text-slate-400 sm:text-[13px]">Eligibility checks and appointments over time</p>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={statisticsData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="appointmentsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="eligibilityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2684e0" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2684e0" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#eef1f6" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={{ stroke: '#eef1f6' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e7ebf1',
              fontSize: 12,
              boxShadow: '0 4px 12px rgba(16,24,40,0.08)',
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 12 }}
          />
          <Area
            type="monotone"
            dataKey="appointments"
            name="Appointments"
            stroke="#f59e0b"
            strokeWidth={2.25}
            fill="url(#appointmentsFill)"
          />
          <Area
            type="monotone"
            dataKey="eligibility"
            name="Eligibility checks"
            stroke="#2684e0"
            strokeWidth={2.25}
            fill="url(#eligibilityFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
