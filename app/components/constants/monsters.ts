import type { AnimatedSprite, Container, Graphics, Texture, Ticker } from "pixi.js";
import type { RefObject } from "react";

export const SLOW_MONSTER_TEXTURE_NAME = "slowMonster";

export const SLOW_MONSTER_HEALTH = 4;

export const SLOW_MONSTER = {
  textureName: SLOW_MONSTER_TEXTURE_NAME,
  health: SLOW_MONSTER_HEALTH,
  speed: 1,
};

export const SLOW_MONSTER_SCORE = 150;

export const FLYING_MONSTER_TEXTURE_NAME = "flyingMonster";

export const FLYING_MONSTER_HEALTH = 2;

export const FLYING_MONSTER = {
  textureName: FLYING_MONSTER_TEXTURE_NAME,
  health: FLYING_MONSTER_HEALTH,
  speed: 3,
};

export const FLYING_MONSTER_SCORE = 100;

// x: 15 for 32x32, 30 for 64x64...
// y: 10 for 32x32, 20 for 64x64
export const FLYING_MONSTER_LEFT_EYE_CENTER = { x: 30, y: 20 };

// x: 19 for 32x32, 38 for 64x64...
// y: 10 for 32x32, 20 for 64x64
export const FLYING_MONSTER_RIGHT_EYE_CENTER = { x: 38, y: 20 };

export interface AbstractMonster {
  health: number;
  containerRef: RefObject<Container | null>;
  healthContainerRef: RefObject<Container | null>;
  healthPointsGraphicsRefs: RefObject<(Graphics | null)[]>;
  spriteRef: RefObject<AnimatedSprite | null>;
  animationTimerRef: RefObject<number>;
  hasMadeDamageToPlayerRef: RefObject<boolean>;
  onDrawHealthPoint: (graphics: Graphics, index: number) => void;
  onMoveTowardsPlayer: (ticker: Ticker, x: number) => void;
  onTakeDamage: () => void;
}
