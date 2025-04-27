import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

export const isPausedAtom = atom<boolean>(false);

export const multiplierAtom = atom<number>(2);

export const primitiveScoreAtom = atom<number>(0);

type ScoreAction = { type: "add"; payload: number };

export const scoreAtom = atom<number, [ScoreAction], void>(
  (get) => get(primitiveScoreAtom),
  (get, set, action: { type: string; payload?: number }) => {
    switch (action.type) {
      case "add": {
        const multiplier = get(multiplierAtom);
        const currentScore = get(primitiveScoreAtom);
        if (action.payload === undefined) return;
        set(primitiveScoreAtom, currentScore + (action.payload * multiplier));
        break;
      }
      default:
        break;
    }
  }
);
