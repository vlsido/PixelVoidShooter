import { useApplication, useTick } from "@pixi/react";
import { useSetAtom } from "jotai";
import { AnimatedSprite, Container, Graphics, Texture, Ticker } from "pixi.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ammoAtom } from "~/components/atoms/playerAtoms";
import { useAmmo } from "~/components/hooks/useAmmo";

export interface MonsterProps {
  textureName: string;
  health: number;
  speed: number;
  onKill: () => void;
}

function Monster(props: MonsterProps) {
  const app = useApplication().app;

  const { ammo, decrementAmmo } = useAmmo();

  const monsterRef = useRef<Container | null>(null);
  const monsterSpriteRef = useRef<AnimatedSprite | null>(null);
  const healthBarRef = useRef<Container | null>(null);
  const healthPointsRefs = useRef<(Graphics | null)[]>([]);

  const x = useMemo(() => Math.random() * (app.screen.width * 0.85 - app.screen.width * 0.15) + app.screen.width * 0.15, []);

  const [health, setHealth] = useState<number>(props.health);

  const loadTextures = useCallback(() => {
    const frames = [];

    for (let frameIndex = 0; frameIndex < 2; frameIndex++) {
      frames.push(Texture.from(`${props.textureName}${frameIndex}.png`));
    }

    return frames;
  }, []);

  const [textures] = useState<Texture[]>(loadTextures);

  useEffect(() => {
    monsterSpriteRef.current?.play();
  }, []);

  useEffect(() => {
    if (health <= 0) {
      monsterRef.current?.removeFromParent();
      props.onKill();
    }
  }, [health]);

  const onDrawHealthBar = useCallback((graphics: Graphics, index: number) => {
    graphics.clear();
    graphics
      .rect(index * 10, -10, 10, 25)
      .fill("red")
      .stroke({ color: "black", width: 2 });
  }, []);

  const dealDamage = useCallback(() => {
    if (ammo.currentBullets > 0) {
      decrementAmmo();
      setHealth(health - 1);
    }
  }, [ammo, health]);

  const animateMonster = useCallback((time: Ticker) => {
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
      monsterSpriteRef.current.stop();
    }

    healthBarRef.current.x = monsterSpriteRef.current.x;
    healthBarRef.current.y = monsterSpriteRef.current.y - 20;

  }, [health]);

  useTick(animateMonster);

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
    </pixiContainer>
  );
}

export default Monster;
