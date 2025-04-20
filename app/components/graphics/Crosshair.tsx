import { useApplication } from "@pixi/react";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { useCallback, useEffect, useRef } from "react";

function Crosshair() {
  const app = useApplication().app;

  const crosshairRef = useRef<Graphics | null>(null);

  useEffect(() => {
    function copyPosition(e: FederatedPointerEvent) {
      crosshairRef.current?.position.copyFrom(e.global);
    }

    app.stage.addEventListener("pointermove", copyPosition);

    return () => app.stage.removeEventListener("pointermove", copyPosition);
  }, []);

  const onDrawCrosshair = useCallback((graphics: Graphics) => {
    graphics.clear();
    graphics.x = app.screen.width / 2;
    graphics.y = app.screen.height / 2;

    graphics
      .circle(0, 0, 8)
      .fill({ color: "white" })
      .stroke({ color: "green" })
  }, []);

  return (
    <pixiGraphics
      ref={crosshairRef}
      draw={onDrawCrosshair}
      eventMode="none"
    />
  );
}

export default Crosshair;
