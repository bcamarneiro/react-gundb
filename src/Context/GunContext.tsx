import { createContext, useMemo } from "react";
import type { ReactNode, FC } from "react";
import Gun, { type IGunInstance, type GunOptions } from "gun";
import "gun/sea";

const GunContext = createContext<IGunInstance | null>(null);

interface GunProviderProps {
  options?: GunOptions;
  debug?: boolean;
  children?: ReactNode;
}

export const GunProvider: FC<GunProviderProps> = ({
  children,
  options,
  debug,
}) => {
  const gunInstance = useMemo(() => Gun(options), [options]);

  if (debug) {
    console.debug("GunProvider", options);
  }

  if (!gunInstance) {
    console.error("GunProvider", "gunInstance is null");
    return null;
  }

  if (debug) {
    console.debug("GunProvider", gunInstance);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (window as any).gun = gunInstance;
  }

  return (
    <GunContext.Provider value={gunInstance}>{children}</GunContext.Provider>
  );
};

export default GunContext;
