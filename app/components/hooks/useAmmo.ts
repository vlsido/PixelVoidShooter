import { useAtom } from "jotai";
import { type AmmoProps } from "../types/player";
import { ammoAtom } from "../atoms/playerAtoms";
import { useCallback, useEffect } from "react";

export function useAmmo() {
  const [ammo, setAmmo] = useAtom<AmmoProps>(ammoAtom);

  const decrementAmmo = useCallback(() => {
    if (ammo.currentBullets === 0) return;

    setAmmo({
      totalBullets: ammo.totalBullets,
      currentBullets: ammo.currentBullets - 1
    });

  }, [ammo]);

  const reloadAmmo = useCallback(() => {
    setAmmo({
      totalBullets: ammo.totalBullets,
      currentBullets: ammo.totalBullets
    });
  }, [ammo.totalBullets]);




  return { ammo, decrementAmmo, reloadAmmo };
}
