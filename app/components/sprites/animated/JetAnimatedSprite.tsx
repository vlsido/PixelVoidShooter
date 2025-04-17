import { useApplication, useExtend, useTick } from "@pixi/react";
import { AnimatedSprite, Assets, Texture } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

function JetAnimatedSprite() {
  useExtend({ AnimatedSprite });
  const app = useApplication().app;
  const spriteRef = useRef<AnimatedSprite | null>(null);

  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    if (textures.length === 0) {
      Assets
        .load('https://pixijs.com/assets/spritesheet/fighter.json')
        .then(() => {
          const frames: Texture[] = [];
          for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            frames.push(Texture.from(`rollSequence00${val}.png`));
          }
          setTextures(frames);
        });


    } else {
      if (spriteRef.current) {
        spriteRef.current.x = app.screen.width / 2;
        spriteRef.current.y = app.screen.height / 2;
        spriteRef.current.anchor.set(0.5);
        spriteRef.current.animationSpeed = 0.5;
        spriteRef.current.scale = 1.5;
        spriteRef.current.play();
      }
    }
  }, [textures]);

  const animateRotation = useCallback(() => {
    if (spriteRef.current) {
      spriteRef.current.rotation -= 0.01;
    }
  }, []);

  useTick(animateRotation);

  if (textures.length === 0) return null;

  return (
    <pixiAnimatedSprite
      ref={spriteRef}
      textures={textures}
    />
  );
}

export default JetAnimatedSprite;
