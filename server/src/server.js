/**
 * Simple Express-based API server for EmbedKit demo
 * - single-tenant (config via env)
 * - no DB (hardcoded user)
 */
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import fetch from 'node-fetch';

/* ------------ env ------------ */
const {
  PORT = 8080,
  NODE_ENV,
  JWT_SECRET,
  CORS_ORIGINS,
  COOKIE_DOMAIN,
  EMBEDKIT_SERVER_BASE,
  API_URL,
  API_ACCOUNT_ID,
  API_USERNAME,
  API_TOKEN,
  API_AUTH_USER,
  API_ACCOUNT_GROUP
} = process.env;

/* ------------ due to no db ------------ */
let iEmail;


/* ------------ app ------------ */
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'same-site' } }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'tiny'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

/* ------------ CORS (multi-origin, credentialed) ------------ */
const ALLOW_ORIGINS = new Set(
  (CORS_ORIGINS ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOW_ORIGINS.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* ------------ rate limit ------------ */
const limiter = new RateLimiterMemory({ points: 100, duration: 60 });
app.use(async (req, res, next) => {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch {
    return res.status(429).json({ error: 'rate_limited' });
  }
});

/* ------------ cookie helpers ------------ */
function cookieOptions(req) {
  const origin = req.headers.origin || '';
  const allow = origin && ALLOW_ORIGINS.has(origin);
  const isProd = NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: allow || isProd,          // required when SameSite=None
    sameSite: allow ? 'none' : 'lax', // cross-site vs same-site
    path: '/',
    domain: COOKIE_DOMAIN || undefined,
  };
}

/* ------------ session helpers ------------ */
function setSession(req, res, claims) {
  if (!claims || typeof claims !== 'object') {
    return res.status(500).json({ error: 'internal_no_claims' });
  }
  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'server_misconfigured' });
  }
  const token = jwt.sign(claims, JWT_SECRET, { expiresIn: '2h' });
  res.cookie('sid', token, { ...cookieOptions(req), maxAge: 2 * 60 * 60 * 1000 });
}

function requireAuth(req, res, next) {
  const c = req.cookies?.sid;
  if (!c) return res.status(401).json({ error: 'unauthorized' });
  try {
    req.user = jwt.verify(c, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'unauthorized' });
  }
}

/* ------------ routes ------------ */

// Health
app.get('/api/ping', (_req, res) => res.json({ ok: true }));

// get a valid session token back
app.post('/api/session', async (req, res) => {
  console.log('[login] Login attempt');
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email_and_password_required' });
  }
  iEmail = String(email).toLowerCase();
  console.log(`[login] Authenticating user: ${email}`);

  // 1) Authenticate against DB (demo: plain compare; hash in prod)
  console.log(`[login] User logged in: ${email}`);

  // 2) Set app session cookie (host app session)
  setSession(req, res, {
    sub: String(email.toLowerCase()),
    email: email.toLowerCase(),
    isAdmin: false,
  });

  // Build the Boomi credential payload for BFF (server-to-server only)
  const boomiPayload = {
    url: API_URL,
    parentAccountId: API_ACCOUNT_ID,
    apiUserName: API_USERNAME,
    apiToken: API_TOKEN,
    childAccountId: API_AUTH_USER || undefined,
    accountGroup: API_ACCOUNT_GROUP || undefined,
  };

  // 4) Call EmbedKit Server /auth/login to get a NONCE (bind nonce to the browser's Origin)
  try {
    const origin = req.headers.origin || '';
    console.log('Request Session Origin:', origin, API_ACCOUNT_ID);
    const r = await fetch(`${EMBEDKIT_SERVER_BASE}/auth/admin/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin,
        'X-Tenant-Id': API_ACCOUNT_ID || '',
      },
      body: JSON.stringify(boomiPayload),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => '');
      console.error('EmbedKit Server login failed:', r.status, errText);
      return res.status(r.status).json({ error: 'Login Failed', detail: errText });
    }

    const { nonce, ttlSec } = await r.json();
    // 5) Return only the Nonce to the UI
    return res.json({ nonce, ttlSec, serverBase: EMBEDKIT_SERVER_BASE, tenantId: API_ACCOUNT_ID });
  } catch (e) {
    console.error('Error connecting to EmbedKit Server:', e);
    return res.status(502).json({ error: 'embedkit_server_unreachable' });
  }
});


// does the user have a session
app.get('/api/session', requireAuth, async (req, res) => {

  const summary = {
    id: String(iEmail),
    email: iEmail,
    isAdmin: false,
  };

  return res.json({ ok: true, user: summary });
});

// Logout (host app)
app.delete('/api/session', (req, res) => {
  res.clearCookie('sid', cookieOptions(req));
  res.json({ ok: true });
});

/* for existing auth users */
app.post('/api/session/nonce', requireAuth, async (req, res) => {
  const boomiPayload = {
    url: API_URL,
    parentAccountId: API_ACCOUNT_ID,
    apiUserName: API_USERNAME,
    apiToken: API_TOKEN,
    childAccountId: API_AUTH_USER || undefined,
    accountGroup: API_ACCOUNT_GROUP || undefined,
  };

  try {
    const origin = req.headers.origin || '';
    console.log('Request Nonce Origin:', origin);
    const r = await fetch(`${EMBEDKIT_SERVER_BASE}/auth/admin/login`, {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Id': API_ACCOUNT_ID || '',
      },
      body: JSON.stringify(boomiPayload),
    });
    if (!r.ok) {
      const errText = await r.text().catch(() => '');
      return res.status(r.status).json({ error: 'embedkit_server_login_failed', detail: errText });
    }
    const { nonce, ttlSec } = await r.json();
    return res.json({ serverBase: EMBEDKIT_SERVER_BASE, nonce, ttlSec, tenantId: API_ACCOUNT_ID  });
  } catch {
    return res.status(502).json({ error: 'embedkit_server_unreachable' });
  }
});

/* ------------ start ------------ */
app.listen(Number(PORT), () => {
  console.log(`API listening on :${PORT}`);
  console.log('Allowed origins:', [...ALLOW_ORIGINS].join(', ') || '(none)');
});
