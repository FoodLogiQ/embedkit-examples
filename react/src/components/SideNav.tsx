import React, { useId } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './ui/LogoutButton';

const SideNav: React.FC<any> = () => {
  const id = useId().replace(/:/g, '')

  return (
    <aside className="flex flex-col gap-3 p-4 text-[var(--sidebar-fg)] bg-[var(--sidebar-bg)] border-r border-[var(--border)]">
      <div className="brand text-5xl font-bold text-center bg-gradient-to-b from-white/10 to-transparent rounded-[10px] py-2">
        <span className="oem">OEM<span className="plus">+</span></span>
      </div>
      <nav className="flex flex-col gap-1 mt-2">
        <Link className="nav-item flex items-center gap-2 p-2 rounded-[10px] hover:bg-white/10" to="/"> <span className="msr">home</span> Dashboard</Link>
        <Link className="nav-item flex items-center gap-2 p-2 rounded-[10px] hover:bg-white/10" to="/reports"> <span className="msr">bar_chart_4_bars</span> Reports</Link>
        <Link className="nav-item flex items-center gap-2 p-2 rounded-[10px] hover:bg-white/10" to="/settings"> <span className="msr">settings</span> Settings</Link>
        <Link className="nav-item flex items-center gap-2 p-2 rounded-[10px] hover:bg-white/10" to="/integrations"> <span className="msr">sync_alt</span> Integrations</Link>
      </nav>
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  )
}

export default SideNav
