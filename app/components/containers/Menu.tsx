import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { isPausedAtom } from "../atoms/gameAtoms";
import type { Graphics } from "pixi.js";
import { useApplication } from "@pixi/react";

function Menu() {
  const app = useApplication().app;

  const isPaused = useAtomValue<boolean>(isPausedAtom);

  const onDrawMenuBackgroundGraphics = useCallback((graphics: Graphics) => {
    graphics.rect(0, 0, app.screen.width, app.screen.height)
      .fill({ color: 0x212221, alpha: 0.5 });
  }, []);

  if (isPaused === false) return null;

  return (
    <pixiContainer>
      <pixiGraphics
        draw={onDrawMenuBackgroundGraphics}
      />
    </pixiContainer>
  );
}

export default Menu;
