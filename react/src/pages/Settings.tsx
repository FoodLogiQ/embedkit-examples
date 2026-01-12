import React, { useMemo } from 'react'
import { drawDonut, drawLineChart, randomSeries } from '../utils/charts'
import { useCanvas } from '../hooks/useCanvas'
import { useAuth } from '../state/authContext'

const Settings: React.FC = () => {
  const { session } = useAuth()
  const usage = useMemo(()=> Math.round(45 + Math.random()*40), [])
  const activity = useMemo(()=> randomSeries(14, 90, 25), [])
  const donutRef = useCanvas((c)=>{ c.style.height='220px'; drawDonut(c, [
    { label: 'Used', value: usage },
    { label: 'Free', value: 100-usage },
  ])})
  const activityRef = useCanvas((c)=>{ c.style.height='180px'; drawLineChart(c, activity) })

  return (
    <div className="grid grid-cols-2 gap-4">
      <section className="card p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--card-shadow)]">
        <h3 className="text-lg mb-3">Profile</h3>
        <p><strong>Email:</strong> {session?.email || 'unknown'}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <button className="btn btn-ghost border border-[var(--border)] rounded-[10px] px-3 py-2">Change password</button>
          <button className="btn btn-ghost border border-[var(--border)] rounded-[10px] px-3 py-2">Manage sessions</button>
        </div>
      </section>

      <section className="card p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)]">
        <h3 className="text-lg mb-2">Plan Usage</h3>
        <canvas ref={donutRef} className="w-full h-[220px]" />
      </section>

      <section className="card p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)]">
        <h3 className="text-lg mb-2">Activity (last 14 days)</h3>
        <canvas ref={activityRef} className="w-full h-[180px]" />
      </section>
    </div>
  )
}
export default Settings
