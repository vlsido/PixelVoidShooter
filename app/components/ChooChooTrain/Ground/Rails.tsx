import { useApplication, useTick } from "@pixi/react";
import { Graphics, Ticker } from "pixi.js";
import { useCallback, useRef } from "react";

function Rails() {

  const app = useApplication().app;

  const graphicsRef = useRef<Graphics | null>(null);

  const onDrawGraphics = useCallback((graphics: Graphics) => {
    graphics.clear();
    const plankHeight = 10;

    const plankY = app.screen.height - 20 - plankHeight;

    graphics
      .rect(0, plankY - 10, app.screen.width, 10)
      .fill({ color: 0x5c5c5c });
  }, [app.screen.height]);


  return (
    <pixiContainer>
      <pixiGraphics
        ref={graphicsRef}
        draw={onDrawGraphics}
        height={20}
        width={20}
        x={0}
      />

    </pixiContainer>
  );
}


export default Rails;
