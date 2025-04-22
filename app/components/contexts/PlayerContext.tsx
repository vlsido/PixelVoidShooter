import { createContext, useCallback, useRef, type RefObject } from "react";
import type { AmmoProps } from "../types/player";
import { useSetAtom } from "jotai";
import { ammoAtom, reloadProgressAtom } from "../atoms/playerAtoms";

interface PlayerContextProps {
  decrementAmmo: (ammo: AmmoProps) => void;
  reloadAmmo: (ammo: AmmoProps) => void;
}

export const PlayerContext = createContext<PlayerContextProps>({
  decrementAmmo: (ammo: AmmoProps) => { },
  reloadAmmo: (ammo: AmmoProps) => { },
});

function PlayerContextProvider({ children }: { children: React.ReactNode }) {

  const setAmmo = useSetAtom(ammoAtom);

  const setReloadProgress = useSetAtom(reloadProgressAtom);

  const reloadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const decrementAmmo = useCallback((ammo: AmmoProps) => {
    if (ammo.currentBullets === 0) return;

    setAmmo({
      totalBullets: ammo.totalBullets,
      currentBullets: ammo.currentBullets - 1
    });

  }, []);

  const reloadAmmo = useCallback((ammo: AmmoProps) => {
    if (ammo.currentBullets === ammo.totalBullets || reloadIntervalRef.current !== null) return;

    let progress = 0;

    reloadIntervalRef.current = setInterval(() => {
      progress++;
      setReloadProgress(progress);

      if (progress >= 99) {
        setReloadProgress(0);
        setAmmo({
          totalBullets: ammo.totalBullets,
          currentBullets: ammo.totalBullets,
        });

        clearInterval(reloadIntervalRef.current!);
        reloadIntervalRef.current = null;
      }
    }, 16);
  }, []);

  const value = {
    decrementAmmo,
    reloadAmmo,
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;

