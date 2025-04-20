import { useApplication } from "@pixi/react";
import type { Graphics } from "pixi.js";
import { useCallback } from "react";
import { GROUND_HEIGHT } from "../constants/common";

function Snow() {
  const app = useApplication().app;


  const onDrawGraphics = useCallback((graphics: Graphics) => {
    graphics.clear();
    graphics
      .rect(0, app.screen.height - GROUND_HEIGHT, app.screen.width, GROUND_HEIGHT)
      .fill("white");

  }, [app.screen.width]);

  return (
    <pixiGraphics
      width={app.screen.width}
      draw={onDrawGraphics}
    />
  );
}

export default Snow;
