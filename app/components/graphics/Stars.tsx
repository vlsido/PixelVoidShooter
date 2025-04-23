import { useApplication } from "@pixi/react";
import type { Graphics } from "pixi.js";
import { useCallback } from "react";

function Stars() {
  const app = useApplication().app;

  const onDrawGraphics = useCallback((graphics: Graphics) => {
    graphics.clear();
    const starCount = 30;
    for (let index = 0; index < starCount; index++) {
      const x = (index * 0.78695 * Math.random() * app.screen.width) % app.screen.width;
      const y = (index * 0.9382 * Math.random() * app.screen.height) % app.screen.height;
      const radius = 2 + Math.random() * 3;
      const rotation = Math.random() * Math.PI * 2;

      graphics.star(x, y, 5, radius, 0, rotation).fill({ color: 0xffdf00, alpha: radius / 5 });
    }
  }, [app.screen.height]);

  return (
    <pixiGraphics
      draw={onDrawGraphics}
    />
  );
}

export default Stars;
