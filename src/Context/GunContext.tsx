import Gun, { type IGunInstance, type GunOptions } from 'gun';
import { createContext, useMemo, type PropsWithChildren } from 'react';

const GunContext = createContext<IGunInstance | null>(null);

interface GunProviderProps extends PropsWithChildren {
  gun?: IGunInstance;
  options?: GunOptions;
}

export const GunProvider = ({ children, options, gun }: GunProviderProps) => {
  const gunInstance = useMemo(() => gun ? gun : Gun(options), [options, gun]);

  if (!gunInstance) {
    return null;
  }

  return <GunContext.Provider value={gunInstance}>{children}</GunContext.Provider>;
};

export default GunContext;
