import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { monthlyApplications } from '../../data'

export default function ApplicationsChart() {
  return (
    <div className="rounded-xl2 border border-surface-border bg-white p-4 shadow-card transition-shadow hover:shadow-md sm:p-5">
      <h2 className="text-[14.5px] font-bold text-surface-heading sm:text-[15px]">Student Applications per Month</h2>
      <p className="mb-4 text-[12.5px] text-slate-400 sm:text-[13px]">Monthly application trends</p>

      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={monthlyApplications} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#eef1f6" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={{ stroke: '#eef1f6' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 2]}
            tickCount={5}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            label={{
              value: 'Applications',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#94a3b8' },
              dy: 40,
            }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e7ebf1',
              fontSize: 12,
              boxShadow: '0 4px 12px rgba(16,24,40,0.08)',
            }}
          />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#2684e0"
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: '#2684e0', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
