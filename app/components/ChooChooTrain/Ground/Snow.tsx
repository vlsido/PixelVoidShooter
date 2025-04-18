import { useApplication } from "@pixi/react";
import type { Graphics } from "pixi.js";
import { useCallback } from "react";

function Snow() {
  const app = useApplication().app;


  const onDrawGraphics = useCallback((graphics: Graphics) => {
    graphics.clear();
    const snowHeight = 20;
    graphics
      .rect(0, app.screen.height - snowHeight, app.screen.width, snowHeight)
      .fill("white");

  }, [app.screen.width]);

  return (
    <pixiGraphics
      width={app.screen.width}
      height={20}
      draw={onDrawGraphics}
    />
  );
}

export default Snow;
