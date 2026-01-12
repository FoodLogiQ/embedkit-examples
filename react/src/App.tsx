import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './state/authContext'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Integrations from './pages/Integrations'
import Login from './pages/Login'
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';

const AppShell: React.FC = () => {
  return (
    <div className="grid md:grid-cols-[220px_minmax(0,1fr)] grid-cols-1 h-screen overflow-hidden">
      <SideNav />
      <main className="flex flex-col min-w-0 h-screen overflow-hidden bg-[var(--bg)]">
        <TopNav />
        <section className="flex-1 overflow-auto p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="*" element={<div className="card">Not Found</div>} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

const App: React.FC = () => {
  const { session } = useAuth()
  const authed = Boolean(session)
  return authed ? <AppShell /> : <Login />
}

export default App
