// src/boomi.ts
import BoomiPlugin, { RenderComponent, DestroyPlugin } from '@boomi/embedkit';
import uiConfig from '../../boomi.config';

export type NoncePayload = {
  serverBase: string;
  tenantId: string;
  nonce: string;
};

let status: 'idle' | 'initializing' | 'ready' = 'idle';
let readyP: Promise<void> | null = null;
let renderNonce = 0;

export async function initBoomi(payload: NoncePayload) {
  if (status === 'ready') return;
  if (status === 'initializing' && readyP) return readyP;

  status = 'initializing';
  readyP = (async () => {
    BoomiPlugin({
      serverBase: payload.serverBase,
      tenantId: payload.tenantId,
      nonce: payload.nonce,
      boomiConfig: uiConfig,
    });
    // allow the plugin one animation frame to wire up
    await new Promise<void>(r => requestAnimationFrame(() => r()));
    status = 'ready';
  })();

  try {
    await readyP;
  } catch (e) {
    status = 'idle';
    readyP = null;
    throw e;
  }
}

export function isBoomiReady() {
  return status === 'ready';
}

export function renderBoomiComponent(args: { hostId: string; component: string; props?: any }) {
  renderNonce += 1;
  RenderComponent({ ...args, props: { ...(args.props || {}), __refresh__: renderNonce } });
}

export function destroyBoomi() {
  status = 'idle';
  readyP = null;
  renderNonce = 0;
  DestroyPlugin({ removeHost: true, clearAuth: true });
}
