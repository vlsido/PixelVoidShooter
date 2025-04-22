import { useContext } from "react";
import { useAtomValue } from "jotai";
import { type AmmoProps } from "../types/player";
import {
  ammoAtom,
  reloadProgressAtom
} from "../atoms/playerAtoms";
import { PlayerContext } from "../contexts/PlayerContext";

export function useAmmo() {
  const {
    decrementAmmo,
    reloadAmmo
  } = useContext(PlayerContext);

  const ammo = useAtomValue<AmmoProps>(ammoAtom);
  const reloadProgress = useAtomValue(reloadProgressAtom);

  if (decrementAmmo == null
    || reloadAmmo == null) {
    throw new Error("useContext(PlayerContext) must be used under PlayContextProvider");
  }

  return {
    decrementAmmo,
    reloadAmmo,
    ammo,
    reloadProgress
  };
}
