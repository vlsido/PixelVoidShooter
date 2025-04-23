import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { useAtomValue } from "jotai";
import { healthAtom } from "../atoms/playerAtoms";

export function usePlayer() {
  const {
    decrementHealth,
    incrementHealth,
    restoreHealth
  } = useContext(PlayerContext);

  const health = useAtomValue<number>(healthAtom);

  if (decrementHealth == null
    || incrementHealth == null
    || restoreHealth == null) {
    throw new Error("useContext(PlayerContext) must be used under PlayContextProvider");
  }

  return {
    health,
    decrementHealth,
    incrementHealth,
    restoreHealth
  }
} 
