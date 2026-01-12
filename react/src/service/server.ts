const base = import.meta.env.VITE_SERVER_URL as string;

export async function serverLogin(email: string, password: string) {
  const res = await fetch(`${base}/api/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const ct = res.headers.get('content-type') || '';
  const raw = await res.text();
  let data: any = null;
  if (ct.includes('application/json')) {
    try { data = JSON.parse(raw); } catch {}
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || raw?.slice(0, 200) || 'Unable to sign in.';
    return { ok: false as const, message: msg };
  }

  return { ok: true as const, data };
}

export async function serverLogout() {
  try {
    await fetch(`${base}/api/session`, { method: 'DELETE', credentials: 'include' });
  } catch {}
}

export async function hasServerSession() {
  const res = await fetch(`${base}/api/session`, { credentials: 'include' });
  return res.ok;
}

export async function getServerNonce() {
  const res = await fetch(`${base}/api/session/nonce`, { method: 'POST', credentials: 'include' });
  if (!res.ok) throw new Error('Failed to connect to server.');
  return res.json();
}
