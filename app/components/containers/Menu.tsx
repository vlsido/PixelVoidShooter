import { useAtom, useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { isPausedAtom } from "../atoms/gameAtoms";
import { Texture, type Graphics } from "pixi.js";
import { useApplication } from "@pixi/react";

function Menu() {
  const app = useApplication().app;

  const [isPaused, setIsPaused] = useAtom<boolean>(isPausedAtom);

  const pauseTexture = useMemo(() => Texture.from("pause"), []);

  const onDrawMenuBackgroundGraphics = useCallback((graphics: Graphics) => {
    graphics.rect(0, 0, app.screen.width, app.screen.height)
      .fill({ color: 0x212221, alpha: 0.5 });
  }, []);

  console.log("isPaused", isPaused);

  if (isPaused === false) return null;

  return (
    <pixiContainer>
      <pixiGraphics
        draw={onDrawMenuBackgroundGraphics}
      />
      <pixiText
        text={"PAUSED"}
        style={{
          fontFamily: "Minecraft",
          fontSize: 48,
          fill: { color: "0xFFFFFF" },
          stroke: { color: '#4a1850', width: 5, join: 'round' },

        }}
        x={app.screen.width / 2}
        y={50}
        anchor={0.5}
      />
      <pixiSprite
        onPointerDown={() => setIsPaused(false)}
        eventMode="static"
        texture={pauseTexture}
        x={app.screen.width / 2}
        y={app.screen.height / 2}
        anchor={0.5}
      />
    </pixiContainer>
  );
}

export default Menu;
