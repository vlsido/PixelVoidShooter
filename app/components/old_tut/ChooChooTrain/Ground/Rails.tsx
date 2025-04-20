import { useApplication, useTick } from "@pixi/react";
import { Graphics, Ticker } from "pixi.js";
import { useCallback, useRef } from "react";
import { GROUND_HEIGHT, PLANK_HEIGHT } from "../constants/common";

function Rails() {

  const app = useApplication().app;

  const graphicsRef = useRef<Graphics | null>(null);

  const onDrawGraphics = useCallback((graphics: Graphics) => {
    graphics.clear();

    const railHeight = PLANK_HEIGHT * 2;

    const plankY = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT;

    graphics
      .rect(0, plankY - railHeight, app.screen.width, railHeight)
      .fill({ color: 0x5c5c5c });
  }, [app.screen.height]);


  return (
    <pixiContainer>
      <pixiGraphics
        ref={graphicsRef}
        draw={onDrawGraphics}
      />
    </pixiContainer>
  );
}


export default Rails;
