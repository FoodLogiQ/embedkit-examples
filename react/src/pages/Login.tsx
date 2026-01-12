import React, { useState } from 'react'
import { useAuth } from '../state/authContext'

const Login: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await login(email.trim(), password)
    setLoading(false)
    if (!res.ok) setError(res.message || 'Unable to sign in.')
  }

  return (
    <main className="min-h-screen grid place-items-center p-6 bg-[var(--bg)]">
      <section className="w-full max-w-[380px] p-7 rounded-[16px] border border-[var(--border)] shadow-[var(--card-shadow)] bg-[var(--surface)]">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-xl font-semibold">Sign in to <span className="oem">OEM<span className="plus">+</span></span></h1>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="block mb-1 text-[var(--muted)] text-sm" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)}
                   className="w-full px-3 py-2 rounded-[10px] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder-[var(--input-ph)] outline-none"
                   placeholder="you@oemplus.dev" autoComplete="username" required />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-[var(--muted)] text-sm" htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}
                   className="w-full px-3 py-2 rounded-[10px] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder-[var(--input-ph)] outline-none"
                   placeholder="••••••••" autoComplete="current-password" required />
          </div>

          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

          <div className="grid gap-2 mt-3">
            <button type="submit" disabled={loading}
              className="px-3 py-2 rounded-[10px] border border-transparent text-white bg-[var(--primary)] hover:bg-[var(--primary-600)] shadow">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <button type="button" className="px-3 py-2 rounded-[10px] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]">
              Use SSO
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 text-[var(--muted)] text-sm">
            <label className="inline-flex items-center gap-2 select-none">
              <input type="checkbox" defaultChecked className="accent-[var(--primary)]" /> <span>Remember me</span>
            </label>
            <a className="underline underline-offset-2" href="#">Forgot password?</a>
          </div>
        </form>

        <footer className="mt-4 text-[var(--muted)] text-xs">
          By continuing, you agree to the <a className="underline underline-offset-2" href="#">Terms</a> and <a className="underline underline-offset-2" href="#">Privacy</a>.
        </footer>
      </section>
    </main>
  )
}
export default Login
