import { useApplication, useTick } from "@pixi/react";
import { Graphics, type Ticker } from "pixi.js";
import { useCallback, useRef } from "react";

interface IMountainsProps {
  x?: number;
}

function Mountains(props: IMountainsProps) {
  const app = useApplication().app;

  const graphicsRef = useRef<Graphics | null>(null);

  const onDrawGraphics = useCallback((graphics: Graphics) => {
    graphics.clear();
    const width = app.screen.width / 2;
    const startY = app.screen.height;
    const startXLeft = 0;
    const startXMiddle = app.screen.width / 4;
    const startXRight = app.screen.width / 2;
    const heightLeft = app.screen.height / 2;
    const heightMiddle = (app.screen.height * 4) / 5;
    const heightRight = (app.screen.height * 2) / 3;
    const colorLeft = 0xc1c0c2;
    const colorMiddle = 0x7e818f;
    const colorRight = 0x8c919f;

    graphics
      // Draw the middle mountain
      .moveTo(startXMiddle, startY)
      .bezierCurveTo(
        startXMiddle + width / 2,
        startY - heightMiddle,
        startXMiddle + width / 2,
        startY - heightMiddle,
        startXMiddle + width,
        startY,
      )
      .fill({ color: colorMiddle })

      // Draw the left mountain
      .moveTo(startXLeft, startY)
      .bezierCurveTo(
        startXLeft + width / 2,
        startY - heightLeft,
        startXLeft + width / 2,
        startY - heightLeft,
        startXLeft + width,
        startY,
      )
      .fill({ color: colorLeft })

      // Draw the right mountain
      .moveTo(startXRight, startY)
      .bezierCurveTo(
        startXRight + width / 2,
        startY - heightRight,
        startXRight + width / 2,
        startY - heightRight,
        startXRight + width,
        startY,
      )
      .fill({ color: colorRight });
  }, [app.screen.height]);

  const animateMountains = useCallback((ticker: Ticker) => {
    if (graphicsRef.current === null) return;

    const dx = ticker.deltaTime * 0.5;

    graphicsRef.current.x -= dx;

    if (graphicsRef.current.x <= -app.screen.width) {
      graphicsRef.current.x += app.screen.width * 2;
    }
  }, []);

  useTick(animateMountains);

  return (
    <pixiGraphics
      ref={graphicsRef}
      draw={onDrawGraphics}
      x={props.x}
    />
  );

}

export default Mountains;
