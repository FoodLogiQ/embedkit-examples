import '@boomi/embedkit/index.css';
import './style.css';
import uiConfig from '../boomi.config';
import BoomiPlugin, { RenderComponent, DestroyPlugin } from '@boomi/embedkit';

const APP_KEY = 'demo_auth_token';
let boomiReady = null;                        

/* =========================
 * Server helpers
* ========================*/
async function serverLogin(email, password) {
  const res = await fetch(`${import.meta.env?.VITE_SERVER_URL}/api/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const ct = res.headers.get('content-type') || '';
  const raw = await res.text();            
  let data = null;
  if (ct.includes('application/json')) {
    try { data = JSON.parse(raw); } catch {}
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || raw?.slice(0, 200) || 'Unable to sign in.';
    return { ok: false, message: msg };
  }

  return { ok: true, data };
}

async function serverLogout() {
  try {
    await fetch(`${import.meta.env?.VITE_SERVER_URL}/api/session`, {
       method: 'DELETE',
       credentials: 'include',
     });
  } catch {}
}

async function hasServerSession() {
  const res = await fetch(`${import.meta.env?.VITE_SERVER_URL}/api/session`, { credentials: 'include' });
  return res.ok;
}

/* =========================
 * Initialize EmbedKit Plugin
 * ========================*/
async function initBoomiFromServer(res) {
  console.log('Initializing Boomi Plugin with server data:', uiConfig);
  BoomiPlugin({
    serverBase: res.serverBase,
    tenantId: res.tenantId,
    nonce: res.nonce,
    boomiConfig: uiConfig, 
  });

  boomiReady = new Promise((resolve) => requestAnimationFrame(resolve));
  return boomiReady;
}

function runAfterBoomiReady(fn) {
  (boomiReady || Promise.resolve()).then(fn);
}

let __boomiRenderNonce = 0;
function renderBoomiComponent({ hostId, component, props = {} }) {
  __boomiRenderNonce += 1;
  runAfterBoomiReady(() =>
    RenderComponent({
      hostId,
      component,
      props: { ...props, __refresh__: __boomiRenderNonce },
    })
  );
}

/* ========== tiny DOM helpers ========== */
const el = {
  mount: () => document.getElementById('app'),
  on: (target, type, handler) => target.addEventListener(type, handler),
  qs: (sel, root = document) => root.querySelector(sel),
  qsa: (sel, root = document) => Array.from(root.querySelectorAll(sel)),
};

/* ========== auth (client-side session shell) ========== */
function isAuthed() {
  return Boolean(localStorage.getItem(APP_KEY));
}
function setLocalSession({ email, isAdmin, tenantId }) {
  const payload = {
    email,
    isAdmin: !!isAdmin,
    at: Date.now(),
    tenantId: tenantId || null,
  };
  localStorage.setItem(APP_KEY, JSON.stringify(payload));
}
function clearLocalSession() {
  localStorage.removeItem(APP_KEY);
}

/* gets a nonce from the server */
async function getServerNonce() {
  const res = await fetch(`${import.meta.env?.VITE_SERVER_URL}/api/session/nonce`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to connect to server.');
  return res.json(); 
}

/* Login based on server side calls */
async function login(email, password) {
  if (!email || !password)
    return { ok: false, message: 'Email and password are required.' };

  const res = await serverLogin(email, password);
  if (!res.ok) return res;

  setLocalSession({
    email,
    isAdmin: false,
    tenantId: res.data.tenantId,
  });
  await initBoomiFromServer(res.data);
  return { ok: true };
}

async function logout() {
  boomiReady = null;
  clearLocalSession();
  await serverLogout();
  DestroyPlugin({ removeHost: true, clearTheme: true, clearAuth: true });
  window.location.reload();
}

/* ========== chart utils (vanilla Canvas) ========== */
const ChartRegistry = [];
const COLORS = [
  '#2563eb',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#a855f7',
];

function debounce(fn, ms = 120) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
function resetCharts() {
  ChartRegistry.length = 0;
}
function registerChart(canvas, drawFn) {
  ChartRegistry.push({ canvas, drawFn });
  drawFn();
}
window.addEventListener(
  'resize',
  debounce(() => {
    ChartRegistry.forEach(({ canvas, drawFn }) => drawFn(canvas));
  })
);

function px(n, dpr) {
  return Math.round(n * dpr);
}
function setCanvasSize(c) {
  const dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth;
  const h = c.clientHeight;
  c.width = px(w, dpr);
  c.height = px(h, dpr);
  const ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h, dpr };
}

function drawGrid(ctx, x0, y0, x1, y1, steps = 4) {
  ctx.save();
  ctx.strokeStyle = 'rgba(100,116,139,0.18)';
  ctx.lineWidth = 1;
  const dy = (y1 - y0) / steps;
  for (let i = 0; i <= steps; i++) {
    const y = y1 - i * dy;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
  }
  ctx.restore();
}

function niceMinMax(values) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const pad = (max - min) * 0.1;
  return [Math.floor(min - pad), Math.ceil(max + pad)];
}

function drawLineChart(canvas, values) {
  const { ctx, w, h } = setCanvasSize(canvas);
  const margin = { left: 36, right: 10, top: 14, bottom: 24 };
  const x0 = margin.left,
    y0 = margin.top;
  const x1 = w - margin.right,
    y1 = h - margin.bottom;
  ctx.clearRect(0, 0, w, h);

  const [min, max] = niceMinMax(values);
  const dx = (x1 - x0) / (values.length - 1 || 1);
  const scaleY = (v) => y1 - ((v - min) / (max - min)) * (y1 - y0);

  drawGrid(ctx, x0, y0, x1, y1, 4);

  const grad = ctx.createLinearGradient(0, y0, 0, y1);
  grad.addColorStop(0, 'rgba(37,99,235,0.28)');
  grad.addColorStop(1, 'rgba(37,99,235,0.02)');

  ctx.beginPath();
  values.forEach((v, i) => {
    const x = x0 + i * dx;
    const y = scaleY(v);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(x1, y1);
  ctx.lineTo(x0, y1);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  values.forEach((v, i) => {
    const x = x0 + i * dx;
    const y = scaleY(v);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = COLORS[0];
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.strokeStyle = COLORS[0];
  values.forEach((v, i) => {
    const x = x0 + i * dx;
    const y = scaleY(v);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
}

function roundRect(ctx, x, y, w, h, r = 8) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawBarChart(canvas, labels, values) {
  const { ctx, w, h } = setCanvasSize(canvas);
  const margin = { left: 36, right: 10, top: 14, bottom: 28 };
  const x0 = margin.left,
    y0 = margin.top;
  const x1 = w - margin.right,
    y1 = h - margin.bottom;
  ctx.clearRect(0, 0, w, h);

  const [min, max] = niceMinMax(values);
  const N = values.length;
  const band = (x1 - x0) / (N || 1);
  const barW = Math.max(10, band * 0.58);
  const scaleY = (v) => y1 - ((v - min) / (max - min)) * (y1 - y0);

  drawGrid(ctx, x0, y0, x1, y1, 4);

  values.forEach((v, i) => {
    const cx = x0 + i * band + band / 2;
    const y = scaleY(v);
    const x = cx - barW / 2;
    const hBar = Math.max(4, y1 - y);
    ctx.fillStyle = COLORS[i % COLORS.length];
    roundRect(ctx, x, y, barW, hBar, 6);
    ctx.fill();
  });

  ctx.fillStyle = 'rgba(100,116,139,0.8)';
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto';
  ctx.textAlign = 'center';
  labels.forEach((lab, i) => {
    const cx = x0 + i * band + band / 2;
    ctx.fillText(lab, cx, y1 + 18);
  });
}

function drawDonut(canvas, segments) {
  const { ctx, w, h } = setCanvasSize(canvas);
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2,
    cy = h / 2,
    r = Math.min(w, h) * 0.36,
    innerR = r * 0.6;

  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let ang = -Math.PI / 2;
  segments.forEach((s, i) => {
    const frac = s.value / total;
    const end = ang + frac * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, ang, end);
    ctx.closePath();
    ctx.fillStyle = s.color || COLORS[i % COLORS.length];
    ctx.fill();
    ang = end;
  });

  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const main = segments[0]?.value ?? 0;
  ctx.fillStyle = 'var(--text)';
  ctx.font = '600 16px system-ui, -apple-system, Segoe UI, Roboto';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round((main / total) * 100)}%`, cx, cy + 6);
}

/* ========== fake data helpers ========== */
function randomSeries(n, base = 100, spread = 25) {
  let x = base + (Math.random() * spread - spread / 2);
  return Array.from({ length: n }, () => {
    x = x + (Math.random() * spread - spread / 2);
    return Math.max(0, Math.round(x));
  });
}
function sum(a) {
  return a.reduce((x, y) => x + y, 0);
}
function formatMoney(n) {
  return `$${n.toLocaleString()}`;
}
function lastNDaysLabels(n) {
  const d = new Date();
  return Array.from({ length: n }).map((_, i) => {
    const t = new Date(d);
    t.setDate(d.getDate() - (n - 1 - i));
    return t.toLocaleDateString(undefined, { weekday: 'short' });
  });
}
function monthLabels(n = 12) {
  const d = new Date();
  return Array.from({ length: n }).map((_, i) => {
    const t = new Date(d);
    t.setMonth(d.getMonth() - (n - 1 - i));
    return t.toLocaleString(undefined, { month: 'short' });
  });
}

/* ========== routing + views ========== */
function setActiveNav(route) {
  el.qsa('.nav-item').forEach((a) =>
    a.classList.toggle('active', a.dataset.route === route)
  );
}

function navigate(route) {
  const r = route || (location.hash ? location.hash.slice(1) : 'dashboard');
  if (location.hash.slice(1) !== r) location.hash = r;

  const titleMap = {
    dashboard: 'Dashboard',
    reports: 'Reports',
    settings: 'Settings',
    integrations: 'Integrations',
    agents: 'Agents',
  };
  const titleEl = el.qs('#pageTitle');
  if (titleEl) titleEl.textContent = titleMap[r] || 'App';

  setActiveNav(r);
  const content = el.qs('#content');
  if (!content) return;

  resetCharts();
  content.classList.remove('content--integrations');
  if (r === 'dashboard') renderDashboard(content);
  else if (r === 'reports') renderReports(content);
  else if (r === 'settings') renderSettings(content);
  else if (r === 'integrations') renderIntegrations(content);
  else if (r === 'agents') renderAgents(content);
  else
    content.innerHTML = `<section class="card"><h3>Not Found</h3><p>The page "${r}" does not exist.</p></section>`;

  const sidebar = el.qs('#sidebar');
  const backdrop = el.qs('#backdrop');
  if (sidebar && backdrop && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    backdrop.classList.add('hidden');
  }
}

/* ----- Dashboard ----- */
function renderDashboard(node) {
  const signups7d = randomSeries(7, 140, 40);
  const revenue7d = randomSeries(7, 3600, 1200);
  const kpiRevenue = sum(revenue7d);
  const kpiOrders = Math.round(sum(revenue7d) / 120);
  const kpiConv = (2.7 + Math.random() * 0.8).toFixed(1);
  const kpiUptime = (99.8 + Math.random() * 0.2).toFixed(2);

  node.innerHTML = `
    <div class="grid kpi-grid">
      <section class="kpi">
        <div class="kpi-top">
          <span class="kpi-label">Revenue (7d)</span>
          <span class="badge positive">+${(Math.random() * 8 + 2).toFixed(1)}%</span>
        </div>
        <div class="kpi-value">${formatMoney(kpiRevenue)}</div>
      </section>
      <section class="kpi">
        <div class="kpi-top">
          <span class="kpi-label">Orders</span>
          <span class="badge neutral">~$120 avg</span>
        </div>
        <div class="kpi-value">${kpiOrders.toLocaleString()}</div>
      </section>
      <section class="kpi">
        <div class="kpi-top">
          <span class="kpi-label">Conversion</span>
          <span class="badge positive">▲</span>
        </div>
        <div class="kpi-value">${kpiConv}%</div>
      </section>
      <section class="kpi">
        <div class="kpi-top">
          <span class="kpi-label">Uptime</span>
        </div>
        <div class="kpi-value">${kpiUptime}%</div>
      </section>
    </div>

    <div class="grid" style="grid-column: 1 / -1;">
      <section class="card chart">
        <h3>Signups (last 7 days)</h3>
        <canvas id="chartSignups" class="chart-canvas"></canvas>
      </section>

      <section class="card chart">
        <h3>Revenue by Day</h3>
        <canvas id="chartRevenue" class="chart-canvas"></canvas>
      </section>

      <section class="card card--full">
        <h3>Recent Activity</h3>
        <table class="table">
          <thead><tr><th>Time</th><th>Event</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>09:14</td><td>Payment received</td><td><span class="badge positive"><span class="msr">trending_up</span></span></td><td>${formatMoney(289)}</td></tr>
            <tr><td>08:52</td><td>New signup</td><td><span class="badge info"><span class="msr">info</span>User</span></td><td>—</td></tr>
            <tr><td>08:31</td><td>Payout processed</td><td><span class="badge neutral"><span class="msr">schedule</span>Queued</span></td><td>${formatMoney(1800)}</td></tr>
            <tr><td>08:12</td><td>Subscription renewed</td><td><span class="badge positive"><span class="msr">check_circle</span>Success</span></td><td>${formatMoney(49)}</td></tr>
          </tbody>
        </table>
      </section>

      <section class="card card--full no-raise">
        <h3>Integration History</h3>
        <div id="boomi-dashboard">
          <p>Load Integration History Here....</p>
        </div>
      </section>
      <div id="boomi-agent"></div>
    </div>
  `;

  const c1 = el.qs('#chartSignups');
  const c2 = el.qs('#chartRevenue');
  const labels = lastNDaysLabels(7);
  registerChart(c1, () => drawLineChart(c1, signups7d));
  registerChart(c2, () => drawBarChart(c2, labels, revenue7d));

  const dashBoomi = el.qs('#boomi-dashboard');
  if (dashBoomi) {
    renderBoomiComponent({
      hostId: 'boomi-dashboard',
      component: 'Integrations',
      props: { componentKey: 'integrationsDashboard' },
    });
    renderBoomiComponent({
      hostId: 'boomi-agent',
      component: 'Agent',
      props:{
        componentKey: '24852eb6-d471-4fe2-bf36-fe8e2acd014b',
        integrationPackId: '24852eb6-d471-4fe2-bf36-fe8e2acd014b'
      }
    });
  }
}

/* ----- Reports ----- */
function renderReports(node) {
  const rev12 = randomSeries(12, 120000, 25000);
  const orders12 = randomSeries(12, 2200, 700);
  const months = monthLabels(12);
  const sources = [
    { label: 'Organic', value: 42, color: COLORS[0] },
    { label: 'Paid', value: 28, color: COLORS[2] },
    { label: 'Referral', value: 18, color: COLORS[5] },
    { label: 'Email', value: 12, color: COLORS[1] },
  ];

  node.innerHTML = `
    <div class="grid">
      <section class="card chart">
        <h3>Revenue (last 12 months)</h3>
        <canvas id="chartRev12" class="chart-canvas tall"></canvas>
      </section>

      <section class="card chart">
        <h3>Orders (last 12 months)</h3>
        <canvas id="chartOrders12" class="chart-canvas tall"></canvas>
      </section>

      <section class="card chart">
        <h3>Traffic Sources</h3>
        <canvas id="chartDonut" class="chart-canvas donut"></canvas>
        <div class="legend">
          ${sources
            .map(
              (s) => `
            <span class="legend-item">
              <span class="swatch" style="background:${s.color}"></span>${s.label} • ${s.value}%
            </span>`
            )
            .join('')}
        </div>
      </section>

      <section class="card">
        <h3>Top Products</h3>
        <table class="table">
          <thead><tr><th>Product</th><th class="num">Units</th><th class="num">Revenue</th><th>Trend</th></tr></thead>
          <tbody id="productsBody"></tbody>
        </table>
      </section>
    </div>
  `;

  const c1 = el.qs('#chartRev12');
  const c2 = el.qs('#chartOrders12');
  const c3 = el.qs('#chartDonut');
  registerChart(c1, () => drawLineChart(c1, rev12));
  registerChart(c2, () => drawBarChart(c2, months, orders12));
  registerChart(c3, () => drawDonut(c3, sources));

  const products = [
    { name: 'Aurora Headphones', units: 1432, revenue: 186400, trend: randomSeries(14, 120, 20) },
    { name: 'Nimbus Keyboard', units: 998, revenue: 149700, trend: randomSeries(14, 90, 25) },
    { name: 'Zephyr Mouse', units: 1840, revenue: 110400, trend: randomSeries(14, 140, 30) },
    { name: 'Solar Charger', units: 620, revenue: 55800, trend: randomSeries(14, 70, 18) },
  ];
  const tbody = el.qs('#productsBody');
  tbody.innerHTML = products.map((p, i) => `
    <tr>
      <td>${p.name}</td>
      <td class="num">${p.units.toLocaleString()}</td>
      <td class="num">${formatMoney(p.revenue)}</td>
      <td><canvas class="spark" id="spark${i}"></canvas></td>
    </tr>
  `).join('');

  products.forEach((p, i) => {
    const c = el.qs(`#spark${i}`);
    c.style.width = '120px';
    c.style.height = '32px';
    registerChart(c, () => drawLineChart(c, p.trend));
  });
}

/* ----- Settings ----- */
function renderSettings(node) {
  const user = JSON.parse(localStorage.getItem(APP_KEY) || '{}');
  const usage = Math.round(45 + Math.random() * 40);
  const activity = randomSeries(14, 90, 25);

  node.innerHTML = `
    <div class="grid">
      <section class="card">
        <h3>Profile</h3>
        <p><strong>Email:</strong> ${user.email || 'unknown'}</p>
        <div class="row gap">
          <button class="btn btn-ghost">Change password</button>
          <button class="btn btn-ghost">Manage sessions</button>
        </div>
      </section>

      <section class="card chart">
        <h3>Plan Usage</h3>
        <canvas id="chartUsage" class="chart-canvas donut"></canvas>
        <div class="legend">
          <span class="legend-item"><span class="swatch" style="background:${COLORS[0]}"></span>Used • ${usage}%</span>
          <span class="legend-item"><span class="swatch" style="background:${COLORS[5]}"></span>Free • ${100 - usage}%</span>
        </div>
      </section>

      <section class="card chart">
        <h3>Activity (last 14 days)</h3>
        <canvas id="chartActivity" class="chart-canvas"></canvas>
      </section>

      <section class="card">
        <h3>Preferences</h3>
        <div class="pref">
          <label class="switch">
            <input type="checkbox" checked>
            <span class="slider"></span>
          </label>
          <div>Email notifications</div>
        </div>
        <div class="pref">
          <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
          <div>Weekly summary</div>
        </div>
        <div class="pref">
          <label class="switch">
            <input type="checkbox" checked>
            <span class="slider"></span>
          </label>
          <div>Dark mode (auto)</div>
        </div>
      </section>
    </div>
  `;

  const donutSegs = [
    { label: 'Used', value: usage, color: COLORS[0] },
    { label: 'Free', value: 100 - usage, color: COLORS[5] },
  ];
  const c1 = el.qs('#chartUsage');
  const c2 = el.qs('#chartActivity');
  registerChart(c1, () => drawDonut(c1, donutSegs));
  registerChart(c2, () => drawLineChart(c2, activity));
}

/* ----- Integrations ----- */
function renderIntegrations(node) {
  node.classList.add('content--integrations');
  node.innerHTML = `
    <div id="boomi-integrations">
    </div>
  `;
  renderBoomiComponent({
    hostId: 'boomi-integrations',
    component: 'Integrations',
    props: { componentKey: 'integrationsPage' },
  });
}

/* ----- Agents ----- */
function renderAgents(node) {
  node.classList.add('content--agents');
  node.innerHTML = `
    <div id="boomi-agents">
    </div>
  `;
  renderBoomiComponent({
    hostId: 'boomi-agents',
    component: 'Integrations',
    props: { componentKey: 'agentsPage' },
  });
}


/* ========== app shell ========== */
function renderApp() {
  const mount = el.mount();
  mount.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar" aria-label="Sidebar navigation">
        <div class="brand">
          <h1 class="auth-title" id="auth-title">
            <span class="oem">OEM<span class="plus">+</span></span>
          </h1>
        </div>
        <nav class="nav" id="nav">
          <a class="nav-item" data-route="dashboard" href="#dashboard">
            <span class="msr">home</span><span>Dashboard</span>
          </a>
          <a class="nav-item" data-route="reports" href="#reports">
            <span class="msr">bar_chart_4_bars</span><span>Reports</span>
          </a>
          <a class="nav-item" data-route="settings" href="#settings">
            <span class="msr">settings</span><span>Settings</span>
          </a>
          <a class="nav-item" data-route="integrations" href="#integrations">
            <span class="msr">sync_alt</span><span>Integrations</span>
          </a>
          <a class="nav-item" data-route="agents" href="#agents">
            <span class="msr">robot</span><span>Agents</span>
          </a>
        </nav>
        <div class="sidebar-footer">
          <button class="btn btn-ghost" id="logoutBtn" type="button">
            <span class="msr">logout</span> Log out
          </button>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <button class="icon-btn" id="menuBtn" aria-label="Toggle menu" title="Menu">☰</button>
          <div class="topbar-title" id="pageTitle">Dashboard</div>
        </header>
        <section class="content boomi-scroll" id="content"></section>
      </main>
    </div>
    <div class="backdrop hidden" id="backdrop"></div>
  `;

  const nav = el.qs('#nav');
  el.on(nav, 'click', (e) => {
    const link = e.target.closest('.nav-item');
    if (!link) return;
    e.preventDefault();
    navigate(link.dataset.route);
  });

  el.on(el.qs('#logoutBtn'), 'click', () => {
    logout();
  });

  const sidebar = el.qs('#sidebar');
  const backdrop = el.qs('#backdrop');
  const menuBtn = el.qs('#menuBtn');
  el.on(menuBtn, 'click', () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('hidden', !sidebar.classList.contains('open'));
  });
  el.on(backdrop, 'click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.add('hidden');
  });

  el.on(window, 'hashchange', () => navigate(location.hash.slice(1)));
  navigate();
}

function renderLogin() {
  const mount = el.mount();
  mount.innerHTML = `
    <main class="auth-wrap">
      <section class="auth-card auth-card--elevated" role="dialog" aria-labelledby="auth-title">
        <div class="auth-brand">
          <div class="brand-copy">
            <h1 class="auth-title" id="auth-title">
              Sign in to <span class="oem">OEM<span class="plus">+</span></span>
            </h1>
            <p class="auth-subtitle">Fast, clean, and simple access to your dashboard.</p>
          </div>
        </div>

        <form id="loginForm" novalidate>
          <div class="form-group">
            <label for="email">Email</label>
            <input class="input" id="email" name="email" type="email" autocomplete="username" placeholder="you@oemplus.dev" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input class="input" id="password" name="password" type="password" autocomplete="current-password" placeholder="••••••••" required />
          </div>

          <div id="formError" class="error hidden" role="alert"></div>

          <div class="auth-actions">
            <button class="btn btn-primary btn-block" type="submit" id="loginBtn">Sign in</button>
            <button type="button" class="btn btn-ghost btn-block" id="altBtn">Use SSO</button>
          </div>

          <div class="auth-meta">
            <label class="remember">
              <input type="checkbox" checked />
              <span>Remember me</span>
            </label>
            <a class="link" href="#">Forgot password?</a>
          </div>
        </form>

        <footer class="auth-footer">
          By continuing, you agree to the <a href="#">Terms</a> and <a href="#">Privacy</a>.
        </footer>
      </section>
    </main>
  `;

  const form = el.qs('#loginForm');
  const errorEl = el.qs('#formError');
  el.on(form, 'submit', async (e) => {
    e.preventDefault();
    const email = el.qs('#email').value.trim();
    const password = el.qs('#password').value;

    const { ok, message } = await login(email, password);
    if (!ok) {
      errorEl.textContent = message || 'Unable to sign in.';
      errorEl.classList.remove('hidden');
      return;
    }
    renderApp();
  });

  el.qs('#email').focus();
}

/* ========== boot ========== */
(async () => {
  if (await hasServerSession()) {
    try {
      const noncePayload = await getServerNonce();
      await initBoomiFromServer(noncePayload);

      // Ensure minimal local state for your Settings page etc.
      const existing = JSON.parse(localStorage.getItem(APP_KEY) || 'null');
      if (!existing) setLocalSession({ email: '(session)', isAdmin: false });

      renderApp();
    } catch {
      renderLogin();
    }
  } else {
    renderLogin();
  }
})();
