import Gun, { type IGunInstance, type GunOptions } from 'gun';
import { createContext, useMemo, type PropsWithChildren } from 'react';
import 'gun/sea';

const GunContext = createContext<IGunInstance | null>(null);

interface GunProviderProps extends PropsWithChildren {
  gun?: IGunInstance;
  options?: GunOptions;
  debug?: boolean;
}

export const GunProvider = ({ children, options, gun, debug }: GunProviderProps) => {
  if (debug) {
    console.debug('GunProvider', options, gun);
  }

  const gunInstance = useMemo(() => gun ? gun : Gun(options), [options, gun]);

  if (!gunInstance) {
    console.error('GunProvider', 'gunInstance is null');
    return null;
  }

  if (debug) {
    console.debug('GunProvider', gunInstance);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (window as any).gun = gunInstance;
  }

  return <GunContext.Provider value={gunInstance}>{children}</GunContext.Provider>;
};
export default GunContext;
