import React, { useMemo } from 'react'
import { drawBarChart, drawDonut, drawLineChart, monthLabels, randomSeries } from '../utils/charts'
import { useCanvas } from '../hooks/useCanvas'

const Reports: React.FC = () => {
  const rev12 = useMemo(()=>randomSeries(12,120000,25000),[])
  const orders12 = useMemo(()=>randomSeries(12,2200,700),[])
  const months = useMemo(()=>monthLabels(12),[])
  const sources = [
    { label: 'Organic', value: 42 },
    { label: 'Paid', value: 28 },
    { label: 'Referral', value: 18 },
    { label: 'Email', value: 12 },
  ]

  const revRef = useCanvas((c)=>{ c.style.height='220px'; drawLineChart(c, rev12) })
  const ordRef = useCanvas((c)=>{ c.style.height='220px'; drawBarChart(c, months, orders12) })
  const donutRef = useCanvas((c)=>{ c.style.height='220px'; drawDonut(c, sources) })

  return (
    <div className="grid grid-cols-2 gap-4">
      <section className="card p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)]">
        <h3 className="text-lg mb-2">Revenue (last 12 months)</h3>
        <canvas ref={revRef} className="w-full h-[220px]" />
      </section>
      <section className="card p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)]">
        <h3 className="text-lg mb-2">Orders (last 12 months)</h3>
        <canvas ref={ordRef} className="w-full h-[220px]" />
      </section>
      <section className="card p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)]">
        <h3 className="text-lg mb-2">Traffic Sources</h3>
        <canvas ref={donutRef} className="w-full h-[220px]" />
        <div className="flex flex-wrap gap-2 mt-2 text-[var(--muted)] text-sm">
          {sources.map((s,i)=>(
            <span key={i} className="inline-flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'var(--text)' }}></span>
              {s.label} • {s.value}%
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
export default Reports
