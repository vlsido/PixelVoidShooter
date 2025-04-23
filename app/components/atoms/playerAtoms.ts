import { atom } from "jotai";
import {
  type AmmoProps,
  type GunProps
} from "../types/player";
import { PLAYER_HEALTH } from "../constants/player";

// export const playerAtom = atom<PlayerProps>();

export const healthAtom = atom<number>(PLAYER_HEALTH);

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
