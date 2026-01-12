// singleton.booi.ts
type BoomiRegistry = {
  state: 'idle' | 'initializing' | 'ready';
  promise: Promise<void> | null;
  renderNonce: number;
};

const KEY = Symbol.for('boomi.embedkit.registry');

declare global {
  var __BOOMI_REGISTRY__: Record<string | symbol, BoomiRegistry>;
}

const store = (globalThis.__BOOMI_REGISTRY__ ||= {} as any);

export function getBoomiRegistry(): BoomiRegistry {
  if (!store[KEY]) {
    store[KEY] = { state: 'idle', promise: null, renderNonce: 0 };
  }
  return store[KEY];
}
