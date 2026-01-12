import React, { useMemo } from 'react'
import { drawBarChart, drawLineChart, formatMoney, lastNDaysLabels, randomSeries, sum } from '../utils/charts'
import { useCanvas } from '../hooks/useCanvas'
import BoomiMount from '../components/BoomiMount'

const Dashboard: React.FC = () => {
  const signups7d = useMemo(()=>randomSeries(7,140,40),[])
  const revenue7d = useMemo(()=>randomSeries(7,3600,1200),[])
  const labels = useMemo(()=>lastNDaysLabels(7),[])
  const kpiRevenue = useMemo(()=>sum(revenue7d),[revenue7d])
  const kpiOrders  = useMemo(()=>Math.round(sum(revenue7d)/120),[revenue7d])
  const kpiConv    = useMemo(()=> (2.7 + Math.random()*0.8).toFixed(1),[])
  const kpiUptime  = useMemo(()=> (99.8 + Math.random()*0.2).toFixed(2),[])

  const signupsRef = useCanvas((c)=>{ c.style.height='180px'; drawLineChart(c, signups7d) })
  const revenueRef = useCanvas((c)=>{ c.style.height='180px'; drawBarChart(c, labels, revenue7d) })

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* KPIs */}
      <section className="kpi bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--muted)] text-sm">Revenue (7d)</span>
          <span className="badge positive text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full border border-[#bbf7d0] bg-[#dcfce7] text-[#14532d]">
            +{(Math.random()*8+2).toFixed(1)}%
          </span>
        </div>
        <div className="text-2xl font-bold">{formatMoney(kpiRevenue)}</div>
      </section>
      <section className="kpi bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--muted)] text-sm">Orders</span>
          <span className="badge neutral text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full border border-[#cbd5e1] bg-[#e2e8f0] text-[#334155]">~$120 avg</span>
        </div>
        <div className="text-2xl font-bold">{kpiOrders.toLocaleString()}</div>
      </section>
      <section className="kpi bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--muted)] text-sm">Conversion</span>
          <span className="badge positive text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full border border-[#bbf7d0] bg-[#dcfce7] text-[#14532d]">▲</span>
        </div>
        <div className="text-2xl font-bold">{kpiConv}%</div>
      </section>
      <section className="kpi bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--muted)] text-sm">Uptime</span>
        </div>
        <div className="text-2xl font-bold">{kpiUptime}%</div>
      </section>

      {/* Charts */}
      <section className="card col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <h3 className="text-lg mb-2">Signups (last 7 days)</h3>
        <canvas ref={signupsRef} className="w-full h-[180px]" />
      </section>
      <section className="card bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <h3 className="text-lg mb-2">Revenue by Day</h3>
        <canvas ref={revenueRef} className="w-full h-[180px]" />
      </section>

      {/* Recent activity (static sample) */}
      <section className="card col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)] p-4">
        <h3 className="text-lg mb-3">Integration History</h3>
        <BoomiMount component="Integrations" props={{ componentKey: 'integrationsDashboard' }} />
      </section>
    </div>
  )
}

export default Dashboard
