import Gun, { type IGunInstance, type GunOptions } from 'gun';
import { createContext, useMemo, type PropsWithChildren } from 'react';

const GunContext = createContext<IGunInstance | null>(null);

interface GunProviderProps extends PropsWithChildren {
  options?: GunOptions;
}

export const GunProvider = ({ children, options }: GunProviderProps) => {
  const gun = useMemo(() => Gun(options), [options]);

  if (!gun) {
    return null;
  }

  return <GunContext.Provider value={gun}>{children}</GunContext.Provider>;
};

export default GunContext;
