import { atom } from "jotai";
import { type AmmoProps, type GunProps } from "../types/player";

// export const playerAtom = atom<PlayerProps>();

export const healthAtom = atom<number>(5);

export const ammoAtom = atom<AmmoProps>({
  totalBullets: 13,
  currentBullets: 13,
});

export const pistolAtom = atom<GunProps>(
  {
    type: "Pistol",
    damage: 1,
    totalBullets: 13,
    currentBullets: 13
  }
);
