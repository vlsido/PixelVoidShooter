import type { PixiElements } from "@pixi/react";
import type { Graphics } from "pixi.js";

export const GROUND_HEIGHT = 20;

export const PLANK_WIDTH = 40;
export const PLANK_HEIGHT = 5;
export const PLANK_GAP = 30;

export const BIG_WHEEL_RADIUS = 55;
export const SMALL_WHEEL_RADIUS = 30;

export const SMOKE_GROUP_COUNT = 5;

export type SmokeGraphics = PixiElements["pixiGraphics"] & {
  tick?: number;
};
