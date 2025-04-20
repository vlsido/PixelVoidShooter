import type { Graphics } from "pixi.js";
import type { Ref } from "react";

export interface ITreeProps {
  index: number;
  ref: Ref<Graphics | null>;
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface IPlankProps {
  index: number;
  ref: Ref<Graphics | null>;
  height: number;
  width: number;
  x: number;
  y: number;
}
