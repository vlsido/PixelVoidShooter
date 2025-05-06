import {
  useCallback,
  useMemo,
  useRef
} from "react";
import {
  useApplication,
  useTick
} from "@pixi/react";
import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import {
  Texture,
  type Graphics,
  type Ticker
} from "pixi.js";
import {
  FLYING_MONSTER_HEALTH,
  FLYING_MONSTER_LEFT_EYE_CENTER,
  FLYING_MONSTER_RIGHT_EYE_CENTER,
  FLYING_MONSTER_TEXTURE_NAME,
  type AbstractMonster
} from "~/components/constants/monsters";
import type { Position } from "~/components/types/common";
import { healthAtom } from "~/components/atoms/playerAtoms";
import { isPausedAtom } from "~/components/atoms/gameAtoms";

type FlyingMonsterState = "GO" | "ATTACK_STANCE" | "ATTACK";

interface FlyingMonsterProps extends AbstractMonster { }

function FlyingMonster(props: FlyingMonsterProps) {
  const app = useApplication().app;

  const dispatchHealth = useSetAtom(healthAtom);

  const isPaused = useAtomValue<boolean>(isPausedAtom);

  const x = useMemo(() =>
    Math.random()
    * (app.screen.width * 0.85 - app.screen.width * 0.15)
    + app.screen.width
    * 0.15, []);

  const [
    state,
    setState
  ] = useAtom<FlyingMonsterState>(useMemo(() => atom<FlyingMonsterState>("GO"), []));

  const textures = useMemo(() => {
    let textureState = "";
    switch (state) {
      case "GO":
        textureState = "";
        break;
      case "ATTACK_STANCE":
        textureState = "AttackStance";
        break;
      case "ATTACK":
        textureState = "Attack";
    }
    const frames = [];

    for (let frameIndex = 0; frameIndex < 3; frameIndex++) {
      frames.push(Texture.from(`${FLYING_MONSTER_TEXTURE_NAME}${textureState}${frameIndex}.png`));
    }

    return frames;
  }, [state]);

  const laserGraphicsRef = useRef<Graphics | null>(null);

  const laserLinePositionRef = useRef<Position>({ x: 0, y: 0 });

  const onDrawLaserGraphics = useCallback((graphics: Graphics) => {
    if (props.spriteRef.current == null) return;

    graphics
      .moveTo(props.spriteRef.current.x, props.spriteRef.current.y)
      .lineTo(props.spriteRef.current.x, props.spriteRef.current.y + 300)
      .stroke({ color: 0xff0855, width: 5, cap: "round" });
  }, []);

  const attackAnimation = useCallback(() => {
    if (
      laserGraphicsRef.current == null
      || props.spriteRef.current == null
    ) return;

    laserGraphicsRef.current.clear();

    const laserWidth = 10;

    const startPosition: Position = {
      x: props.spriteRef.current.x + (FLYING_MONSTER_LEFT_EYE_CENTER.x * props.spriteRef.current.scale.x) - laserWidth / 2,
      y: props.spriteRef.current.y + (FLYING_MONSTER_LEFT_EYE_CENTER.y * props.spriteRef.current.scale.x) - laserWidth / 2
    };

    if (
      laserLinePositionRef.current.x === 0
      && laserLinePositionRef.current.y === 0
    ) {
      laserLinePositionRef.current = {
        x: startPosition.x,
        y: startPosition.y
      }
    }

    if (laserLinePositionRef.current.x < app.screen.width / 2) {
      laserLinePositionRef.current.x = laserLinePositionRef.current.x + (app.screen.width / 2 - startPosition.x) * 0.2;
    }

    if (laserLinePositionRef.current.y < app.screen.height) {
      laserLinePositionRef.current.y = laserLinePositionRef.current.y + (app.screen.height - startPosition.y) * 0.2;
    }

    laserGraphicsRef.current
      .moveTo(
        startPosition.x,
        startPosition.y)
      .lineTo(
        laserLinePositionRef.current.x,
        laserLinePositionRef.current.y)
      .stroke({ color: 0xa30707, width: 10, cap: "round" });

    laserGraphicsRef.current
      .moveTo(
        props.spriteRef.current.x + (FLYING_MONSTER_RIGHT_EYE_CENTER.x * props.spriteRef.current.scale.x) - laserWidth / 2,
        props.spriteRef.current.y + (FLYING_MONSTER_RIGHT_EYE_CENTER.y * props.spriteRef.current.scale.x) - laserWidth / 2)
      .lineTo(
        laserLinePositionRef.current.x + 20,
        laserLinePositionRef.current.y)
      .stroke({ color: 0xa30707, width: 10, cap: "round" });
  }, []);


  const handleAnimation = useCallback((ticker: Ticker) => {
    props.onMoveTowardsPlayer(ticker, x);

    if (props.spriteRef.current === null || isPaused === true) return;

    const monsterScaleX = props.spriteRef.current.scale.x;

    if (monsterScaleX >= 3.5) {
      if (state === "GO") {
        setState("ATTACK_STANCE");
      }
    }

    const dx = ticker.deltaTime;

    switch (state) {
      case "ATTACK":
        attackAnimation();
        props.animationTimerRef.current = props.animationTimerRef.current + dx;
        if (props.animationTimerRef.current > 45 && props.hasMadeDamageToPlayerRef.current === false) {
          props.hasMadeDamageToPlayerRef.current = true;
          dispatchHealth({ type: "remove", payload: 1 });
        } else if (props.animationTimerRef.current > 90) {
          laserGraphicsRef.current?.clear();
          laserLinePositionRef.current = { x: 0, y: 0 };
          props.animationTimerRef.current = 0;
          setState("ATTACK_STANCE");
        }
        break;
      case "ATTACK_STANCE":
        props.animationTimerRef.current = props.animationTimerRef.current + dx;
        if (props.animationTimerRef.current > 180) {
          props.hasMadeDamageToPlayerRef.current = false;
          props.animationTimerRef.current = 0;
          setState("ATTACK");
        }
    }
  }, [
    props.health,
    isPaused,
    state
  ]);

  useTick(handleAnimation);

  if (textures.length === 0) return null;

  return (
    <pixiContainer
      ref={props.containerRef}
    >
      <pixiContainer
        ref={props.healthContainerRef}
      >
        {Array.from({ length: FLYING_MONSTER_HEALTH }).map((_, index) =>
          <pixiGraphics
            key={index}
            ref={(ref) => {
              if (ref === undefined) return;

              props.healthPointsGraphicsRefs.current[index] = ref;
            }}
            draw={(graphics) => props.onDrawHealthPoint(graphics, index)}
          />
        )}
      </pixiContainer>
      <pixiAnimatedSprite
        ref={props.spriteRef}
        textures={textures}
        eventMode="static"
        onPointerDown={props.onTakeDamage}
        scale={1}
        animationSpeed={0.1}
        x={x}
      />
      <pixiGraphics
        ref={laserGraphicsRef}
        draw={onDrawLaserGraphics}
      />
    </pixiContainer>
  );
}

export default FlyingMonster;
