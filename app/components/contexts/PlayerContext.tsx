import { createContext, useCallback, useRef, type RefObject } from "react";
import type { AmmoProps } from "../types/player";
import { useSetAtom } from "jotai";
import { ammoAtom, healthAtom, reloadProgressAtom } from "../atoms/playerAtoms";
import { PLAYER_HEALTH } from "../constants/player";

interface PlayerContextProps {
  decrementHealth: (health: number) => void;
  incrementHealth: (health: number) => void;
  restoreHealth: () => void;
  decrementAmmo: (ammo: AmmoProps) => void;
  reloadAmmo: (ammo: AmmoProps) => void;
}

export const PlayerContext = createContext<PlayerContextProps>({
  decrementHealth: (health: number) => { },
  incrementHealth: (health: number) => { },
  restoreHealth: () => { },
  decrementAmmo: (ammo: AmmoProps) => { },
  reloadAmmo: (ammo: AmmoProps) => { },
});

function PlayerContextProvider({ children }: { children: React.ReactNode }) {

  const setHealth = useSetAtom(healthAtom);

  const setAmmo = useSetAtom(ammoAtom);

  const setReloadProgress = useSetAtom(reloadProgressAtom);

  const reloadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const decrementHealth = useCallback((health: number) => {
    if (health === 0) return;

    setHealth(health - 1);
  }, []);

  const incrementHealth = useCallback((health: number) => {
    if (health === PLAYER_HEALTH) return;

    setHealth(health + 1);
  }, []);

  const restoreHealth = useCallback(() => {
    setHealth(PLAYER_HEALTH);
  }, []);

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
    decrementHealth,
    incrementHealth,
    restoreHealth,
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

