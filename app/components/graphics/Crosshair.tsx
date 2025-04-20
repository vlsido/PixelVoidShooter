import type { Graphics } from "pixi.js";
import { useCallback } from "react";

function Crosshair() {

  const onDrawCrosshair = useCallback((graphics: Graphics) => {
  }, []);

  return (
    <pixiGraphics
      draw={onDrawCrosshair}
    />
  );
}

export default Crosshair;
