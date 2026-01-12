// src/components/BoomiMount.tsx
import React, { useEffect, useId, useRef } from 'react';
import type { KnownComponent, ComponentPropsMap } from '@boomi/embedkit';
import { initBoomi, isBoomiReady, renderBoomiComponent } from '../state/boomiProvider';
import { useAuth } from '../state/authContext';

type BoomiMountProps<K extends KnownComponent = KnownComponent> = {
  component: K;
  props?: Partial<ComponentPropsMap[K]>;
  hostId?: string;
  componentKey?: string;
};

const BoomiMount = <K extends KnownComponent,>({
  component,
  props,
  hostId,
  componentKey,
}: BoomiMountProps<K>) => {
  const { ensureNonce } = useAuth();
  const autoId = useId();
  const idRef = useRef(hostId || `boomi-${autoId.replace(/:/g, '-')}`);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // If plugin isn't ready (cold tab or app just booted), get a nonce and init.
      if (!isBoomiReady()) {
        const payload = await ensureNonce();
        if (payload) await initBoomi(payload);
      }
      if (cancelled) return;
      renderBoomiComponent({ hostId: idRef.current, component, props });
    })();

    return () => { cancelled = true; }; // do NOT destroy here (StrictMode)
  }, [component, JSON.stringify(props), ensureNonce]);

  return <div id={idRef.current} />;
};

export default BoomiMount;
