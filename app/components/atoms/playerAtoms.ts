import { atom } from "jotai";
import {
  type AmmoProps,
  type GunProps
} from "../types/player";
import { PLAYER_HEALTH } from "../constants/player";

// export const playerAtom = atom<PlayerProps>();

export const primitiveHealthAtom = atom<number>(PLAYER_HEALTH);

type HealthAction = { type: "add" | "remove" | "restore"; payload?: number };

export const healthAtom = atom<number, [HealthAction], void>(
  (get) => get(primitiveHealthAtom),
  (get, set, action: { type: string; payload?: number }) => {
    const currentHealth = get(primitiveHealthAtom);
    switch (action.type) {
      case "add":
        if (action.payload === undefined) return;
        set(primitiveHealthAtom, currentHealth + action.payload);
        break;
      case "remove":
        if (action.payload === undefined) return;
        set(primitiveHealthAtom, currentHealth - action.payload);
        break;
      case "restore":
        set(primitiveHealthAtom, PLAYER_HEALTH);
        break;

      default:
        break;
    }
  }
);
export const ammoAtom = atom<AmmoProps>({
  totalBullets: 13,
  currentBullets: 13,
});

export const reloadProgressAtom = atom<number>(0);

export const pistolAtom = atom<GunProps>(
  {
    type: "Pistol",
    damage: 1,
    totalBullets: 13,
    currentBullets: 13
  }
);
