import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  useApplication,
  useTick
} from "@pixi/react";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Texture,
  Ticker
} from "pixi.js";
import { useAmmo } from "~/components/hooks/useAmmo";
import { FLYING_MONSTER_LEFT_EYE_CENTER, FLYING_MONSTER_RIGHT_EYE_CENTER, FLYING_MONSTER_TEXTURE_NAME, SLOW_MONSTER_TEXTURE_NAME } from "~/components/constants/monsters";
import { type Position } from "~/components/types/common";
import { usePlayer } from "~/components/hooks/usePlayer";
import { useAtomValue } from "jotai";
import { isPausedAtom } from "~/components/atoms/gameAtoms";

export interface MonsterProps {
  textureName: string;
  health: number;
  speed: number;
  onKill: () => void;
}



type MonsterState = "GO" | "ATTACK_STANCE" | "ATTACK";

function Monster(props: MonsterProps) {
  const app = useApplication().app;

  const {
    health: playerHealth,
    decrementHealth
  } = usePlayer();

  const {
    ammo,
    decrementAmmo,
    reloadProgress
  } = useAmmo();

  const isPaused = useAtomValue<boolean>(isPausedAtom);

  const monsterRef = useRef<Container | null>(null);
  const monsterSpriteRef = useRef<AnimatedSprite | null>(null);
  const healthBarRef = useRef<Container | null>(null);
  const healthPointsRefs = useRef<(Graphics | null)[]>([]);

  const laserGraphicsRef = useRef<Graphics | null>(null);

  const laserLinePositionRef = useRef<Position>({ x: 0, y: 0 });

  const actionTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const x = useMemo(() => Math.random() * (app.screen.width * 0.85 - app.screen.width * 0.15) + app.screen.width * 0.15, []);

  const [state, setState] = useState<MonsterState>("GO");

  const [health, setHealth] = useState<number>(props.health);

  // PERF: likely not the right way to do that, as it does not unload previous textures
  const loadTextures = useCallback(() => {
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
      frames.push(Texture.from(`${props.textureName}${textureState}${frameIndex}.png`));
    }

    return frames;
  }, [state]);

  const textures = useMemo(loadTextures, [state]);

  useEffect(() => {
    if (isPaused) {
      monsterSpriteRef.current?.stop();
      return;
    }

    monsterSpriteRef.current?.play();
  }, [textures, isPaused]);

  useEffect(() => {
    if (health <= 0) {
      if (actionTimeoutId.current !== null) {
        clearTimeout(actionTimeoutId.current);
        actionTimeoutId.current = null;
      }
      monsterRef.current?.removeFromParent();
      props.onKill();
    }
  }, [health]);


  useEffect(() => {
    if (isPaused) {
      if (actionTimeoutId.current !== null) {
        clearTimeout(actionTimeoutId.current);
      }
      return;
    }
    switch (state) {
      case "ATTACK_STANCE":
        actionTimeoutId.current = setTimeout(() => {
          setState("ATTACK");
        }, 3000);
        break;
      case "ATTACK":
        decrementHealth(playerHealth);
        actionTimeoutId.current = setTimeout(() => {
          laserGraphicsRef.current?.clear();
          laserLinePositionRef.current = { x: 0, y: 0 };
          setState("ATTACK_STANCE");
        }, 1500);
        break;
    }
  }, [state, isPaused]);

  const onDrawHealthBar = useCallback((graphics: Graphics, index: number) => {
    graphics.clear();
    graphics
      .rect(index * 10, -10, 10, 25)
      .fill("red")
      .stroke({ color: "black", width: 2 });
  }, []);

  const dealDamage = useCallback(() => {
    console.log('reload', reloadProgress);
    if (ammo.currentBullets > 0 && reloadProgress === 0) {
      decrementAmmo(ammo);
      setHealth(health - 1);
    }
  }, [ammo, health, reloadProgress]);


  const attackAnimation = useCallback(() => {
    switch (props.textureName) {
      case SLOW_MONSTER_TEXTURE_NAME:
        break;
      case FLYING_MONSTER_TEXTURE_NAME:
        if (
          laserGraphicsRef.current == null
          || monsterSpriteRef.current == null
        ) return;

        laserGraphicsRef.current.clear();

        const laserWidth = 10;

        const startPosition: Position = {
          x: monsterSpriteRef.current.x + (FLYING_MONSTER_LEFT_EYE_CENTER.x * monsterSpriteRef.current.scale.x) - laserWidth / 2,
          y: monsterSpriteRef.current.y + (FLYING_MONSTER_LEFT_EYE_CENTER.y * monsterSpriteRef.current.scale.x) - laserWidth / 2
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
            monsterSpriteRef.current.x + (FLYING_MONSTER_RIGHT_EYE_CENTER.x * monsterSpriteRef.current.scale.x) - laserWidth / 2,
            monsterSpriteRef.current.y + (FLYING_MONSTER_RIGHT_EYE_CENTER.y * monsterSpriteRef.current.scale.x) - laserWidth / 2)
          .lineTo(
            laserLinePositionRef.current.x + 20,
            laserLinePositionRef.current.y)
          .stroke({ color: 0xa30707, width: 10, cap: "round" });
        break;
    }
  }, []);

  const animateMonster = useCallback((time: Ticker) => {
    if (isPaused) return;

    if (monsterSpriteRef.current === null || healthBarRef.current === null) return;

    const monsterScaleX = monsterSpriteRef.current.scale.x;
    const posX = monsterSpriteRef.current.x;
    const posY = monsterSpriteRef.current.y;
    const centerX = app.screen.width / 2;

    const dx = time.deltaTime;

    if (health < healthPointsRefs.current.length) {
      const healthPoint = healthPointsRefs.current.at(healthPointsRefs.current.length - 1);

      if (healthPoint != null) {
        healthPoint.y -= dx * 6;
        if (healthPoint.y < -32) {
          healthPoint.removeFromParent();
          healthPointsRefs.current.pop();
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
    } else {
      if (state === "GO") {
        setState("ATTACK_STANCE");
      }
    }

    healthBarRef.current.x = monsterSpriteRef.current.x;
    healthBarRef.current.y = monsterSpriteRef.current.y - 20;


    if (state === "ATTACK") {
      attackAnimation();
    }

  }, [health, state, isPaused]);


  useTick(animateMonster);

  const onDrawLaserGraphics = useCallback((graphics: Graphics) => {
    if (monsterSpriteRef.current == null) return;

    if (props.textureName !== FLYING_MONSTER_TEXTURE_NAME) return;

    graphics
      .moveTo(monsterSpriteRef.current.x, monsterSpriteRef.current.y)
      .lineTo(monsterSpriteRef.current.x, monsterSpriteRef.current.y + 300)
      .stroke({ color: 0xff0855, width: 5, cap: "round" });
  }, []);

  if (textures.length === 0 || health <= 0) return null;

  return (
    <pixiContainer
      ref={monsterRef}
    >
      <pixiContainer
        ref={healthBarRef}
      >
        {Array.from({ length: props.health }).map((_, index) =>
          <pixiGraphics
            key={index}
            ref={(ref) => {
              if (ref === undefined) return;

              healthPointsRefs.current[index] = ref;
            }}
            draw={(graphics) => onDrawHealthBar(graphics, index)}
          />
        )}
      </pixiContainer>
      <pixiAnimatedSprite
        ref={monsterSpriteRef}
        textures={textures}
        eventMode="static"
        onPointerDown={dealDamage}
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

export default Monster;
