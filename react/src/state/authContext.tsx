import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { initBoomi, destroyBoomi, type NoncePayload } from './boomiProvider';

const API_BASE = import.meta.env.VITE_SERVER_URL as string; // your BFF (this express server)

type Session = { email: string; isAdmin: boolean } | null;

type AuthCtx = {
  session: Session;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => Promise<void>;
  ensureNonce: () => Promise<NoncePayload | null>;
};

const Ctx = createContext<AuthCtx | null>(null);

async function postJSON<T>(url: string, body?: any) {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  let data: any = null;
  if (ct.includes('application/json')) { try { data = JSON.parse(text); } catch {} }
  return { ok: res.ok, data, text };
}

async function getJSON<T>(url: string) {
  const res = await fetch(url, { credentials: 'include' });
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  let data: any = null;
  if (ct.includes('application/json')) { try { data = JSON.parse(text); } catch {} }
  return { ok: res.ok, data, text };
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session>(null);

  // Boot: if there is a valid BFF session, get a fresh nonce and init plugin.
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    (async () => {
      const me = await getJSON<{ user: { email: string; isAdmin: boolean } }>(`${API_BASE}/api/session`);
      if (!me.ok) return;

      setSession({ email: me.data.user.email, isAdmin: !!me.data.user.isAdmin });

      // get a nonce for this existing session and init plugin
      const r = await postJSON<NoncePayload>(`${API_BASE}/api/session/nonce`);
      if (r.ok && r.data?.nonce) {
        await initBoomi(r.data as NoncePayload);
      }
    })();
  }, []);

  async function login(email: string, password: string) {
    const r = await postJSON<NoncePayload>(`${API_BASE}/api/session`, { email, password });
    if (!r.ok) {
      const msg = r.data?.error || r.data?.message || r.text || 'Unable to sign in';
      return { ok: false as const, message: msg };
    }

    // You returned { serverBase, tenantId, nonce } from /api/session.
    const payload = r.data as NoncePayload;
    await initBoomi(payload);

    // Also fetch /api/session to get who we are (optional, but handy)
    const me = await getJSON<{ user: { email: string; isAdmin: boolean } }>(`${API_BASE}/api/session`);
    if (me.ok) setSession({ email: me.data.user.email, isAdmin: !!me.data.user.isAdmin });

    return { ok: true as const };
  }

  async function logout() {
    await fetch(`${API_BASE}/api/session`, { method: 'DELETE', credentials: 'include' });
    destroyBoomi();
    setSession(null);
    // optional: location.reload();
  }

  async function ensureNonce(): Promise<NoncePayload | null> {
    const r = await postJSON<NoncePayload>(`${API_BASE}/api/session/nonce`);
    if (!r.ok) return null;
    return r.data as NoncePayload;
  }

  const value = useMemo<AuthCtx>(() => ({ session, login, logout, ensureNonce }), [session]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
