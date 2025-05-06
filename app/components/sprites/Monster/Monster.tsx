import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  useApplication,
} from "@pixi/react";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Ticker
} from "pixi.js";
import { useAmmo } from "~/components/hooks/useAmmo";
import {
  FLYING_MONSTER_TEXTURE_NAME,
  SLOW_MONSTER_TEXTURE_NAME
} from "~/components/constants/monsters";
import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import { isPausedAtom } from "~/components/atoms/gameAtoms";
import SlowMonster from "./SlowMonster";
import FlyingMonster from "./FlyingMonster";
import { isShootingAtom } from "~/components/atoms/playerAtoms";

export interface MonsterProps {
  textureName: string;
  health: number;
  speed: number;
  onKill: (textureName: string) => void;
}

function Monster(props: MonsterProps) {
  const app = useApplication().app;

  const {
    ammo,
    decrementAmmo,
    reloadProgress
  } = useAmmo();

  const isPaused = useAtomValue<boolean>(isPausedAtom);

  const setIsShooting = useSetAtom(isShootingAtom);

  const monsterContainerRef = useRef<Container | null>(null);

  const monsterSpriteRef = useRef<AnimatedSprite | null>(null);

  const healthContainerRef = useRef<Container | null>(null);

  const healthPointsGraphicsRefs = useRef<(Graphics | null)[]>([]);

  const animationTimerRef = useRef<number>(0);

  const hasMadeDamageToPlayerRef = useRef<boolean>(false);

  const [
    health,
    setHealth
  ] = useAtom<number>(useMemo(() => atom<number>(props.health), []));

  useEffect(() => {
    if (health <= 0) {
      monsterContainerRef.current?.removeFromParent();
      props.onKill(props.textureName);
    }
  }, [health]);

  const onDrawHealthBar = useCallback((graphics: Graphics, index: number) => {
    graphics.clear();
    graphics
      .rect(index * 10, -10, 10, 25)
      .fill("red")
      .stroke({ color: "black", width: 2 });
  }, []);

  const takeDamage = useCallback(() => {
    if (ammo.currentBullets > 0 && reloadProgress === 0) {
      decrementAmmo(ammo);
      setIsShooting(true);
      setHealth(health - 1);
    }
  }, [ammo, health, reloadProgress]);

  const animateMoveTowardsPlayer = useCallback((ticker: Ticker, x: number) => {
    if (monsterSpriteRef.current === null || healthContainerRef.current === null) return;

    if (isPaused === true) {
      if (monsterSpriteRef.current.playing === true) {
        monsterSpriteRef.current.stop();
      }
      return;
    };

    if (monsterSpriteRef.current.playing === false) {
      monsterSpriteRef.current.play();
    }

    const monsterScaleX = monsterSpriteRef.current.scale.x;
    const posX = monsterSpriteRef.current.x;
    const posY = monsterSpriteRef.current.y;
    const centerX = app.screen.width / 2;

    const dx = ticker.deltaTime;

    if (health < healthPointsGraphicsRefs.current.length) {
      const healthPoint = healthPointsGraphicsRefs.current.at(healthPointsGraphicsRefs.current.length - 1);

      if (healthPoint != null) {
        healthPoint.y -= dx * 6;
        if (healthPoint.y < -32) {
          healthPoint.removeFromParent();
          healthPointsGraphicsRefs.current.pop();
        }
      }
    }

    if (monsterScaleX < 3.5) {

      monsterSpriteRef.current.scale.set(monsterScaleX + 0.01 * props.speed, monsterScaleX + 0.01 * props.speed);

      if (centerX < x && ((x - centerX) + x / 2) < posX) {
        monsterSpriteRef.current.x -= 0.5;
      }

      if (centerX > x && ((x + centerX) - x / 2) > posX) {

        monsterSpriteRef.current.x += 0.5;
      }

      if (posY < app.screen.height / 3) {
        monsterSpriteRef.current.y += 0.5;
      }
    }

    healthContainerRef.current.x = monsterSpriteRef.current.x;
    healthContainerRef.current.y = monsterSpriteRef.current.y - 20;
  }, [
    health,
    isPaused
  ]);

  if (health <= 0) return null;

  switch (props.textureName) {
    case SLOW_MONSTER_TEXTURE_NAME:
      return <SlowMonster
        health={health}
        containerRef={monsterContainerRef}
        spriteRef={monsterSpriteRef}
        healthContainerRef={healthContainerRef}
        healthPointsGraphicsRefs={healthPointsGraphicsRefs}
        animationTimerRef={animationTimerRef}
        hasMadeDamageToPlayerRef={hasMadeDamageToPlayerRef}
        onDrawHealthPoint={onDrawHealthBar}
        onMoveTowardsPlayer={animateMoveTowardsPlayer}
        onTakeDamage={takeDamage}
      />;
    case FLYING_MONSTER_TEXTURE_NAME:
      return <FlyingMonster
        health={health}
        containerRef={monsterContainerRef}
        spriteRef={monsterSpriteRef}
        healthContainerRef={healthContainerRef}
        healthPointsGraphicsRefs={healthPointsGraphicsRefs}
        animationTimerRef={animationTimerRef}
        hasMadeDamageToPlayerRef={hasMadeDamageToPlayerRef}
        onDrawHealthPoint={onDrawHealthBar}
        onMoveTowardsPlayer={animateMoveTowardsPlayer}
        onTakeDamage={takeDamage}
      />;
    default:
      return null;
  }
}

export default Monster;
