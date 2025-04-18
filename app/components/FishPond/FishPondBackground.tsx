import { useApplication } from "@pixi/react";
import { Sprite, Texture } from "pixi.js";
import { useEffect, useMemo, useRef } from "react";

function FishPondBackground() {
  const app = useApplication().app;

  const spriteRef = useRef<Sprite | null>(null);

  const backgroundTexture = useMemo(() => Texture.from("background"), []);

  useEffect(() => {
    if (spriteRef.current) {
      if (app.screen.width > app.screen.height) {
        spriteRef.current.width = app.screen.width * 1.2;
        spriteRef.current.scale.y = spriteRef.current.scale.x;
      } else {
        spriteRef.current.height = app.screen.height * 1.2;
        spriteRef.current.scale.x = spriteRef.current.scale.y;
      }
    }
  }, [spriteRef]);

  return (
    <pixiSprite
      ref={spriteRef}
      texture={backgroundTexture}
      anchor={0.5}
      x={app.screen.width / 2}
      y={app.screen.height / 2}
    />
  );
}

export default FishPondBackground;
