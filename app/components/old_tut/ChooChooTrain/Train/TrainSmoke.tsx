import { useApplication, useTick } from "@pixi/react";
import { Graphics, Ticker } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { BIG_WHEEL_RADIUS, GROUND_HEIGHT, PLANK_HEIGHT, SMOKE_GROUP_COUNT } from "../constants/common";

interface ISmokeGraphics extends Graphics {
  tick: number
}

function TrainSmoke() {
  const app = useApplication().app;

  const smokeRefs = useRef<(ISmokeGraphics | null)[]>([]);

  const onDrawSmokeGroup = useCallback((graphics: ISmokeGraphics, index: number) => {
    graphics.clear();
    const particleCount = 7;
    const baseX = app.screen.width / 2 + 225;
    const baseY = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT * 2 - BIG_WHEEL_RADIUS - 175;

    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 20;

      const x = (Math.random() * 2 - 1) * 40;
      const y = (Math.random() * 2 - 1) * 40;

      graphics.circle(x, y, radius);
    }

    graphics.fill({ color: 0xc9c9c9, alpha: 0.5 });
    graphics.x = baseX;
    graphics.y = baseY;
    graphics.tick = index * (1 / SMOKE_GROUP_COUNT);

  }, [app.screen.height]);

  const animateSmoke = useCallback((time: Ticker) => {
    const baseX = app.screen.width / 2 + 225;
    const baseY = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT * 2 - BIG_WHEEL_RADIUS - 175;

    const dt = time.deltaTime * 0.01;

    smokeRefs.current.forEach((group) => {
      if (!group) return;

      group.tick = (group.tick + dt) % 1;
      group.x = baseX - Math.pow(group.tick, 2) * 400;
      group.y = baseY - group.tick * 200;
      group.scale.set(Math.pow(group.tick, 0.75));
      group.alpha = 1 - Math.pow(group.tick, 0.5);
    });
  }, []);

  useTick(animateSmoke);

  return (
    <pixiContainer>
      {Array.from({ length: 5 }).map((_, i) =>
        <pixiGraphics
          key={i}
          ref={(ref: ISmokeGraphics) => {
            if (ref === undefined) return;
            smokeRefs.current[i] = ref;
          }}
          draw={(graphics) => onDrawSmokeGroup(graphics, i)}
        />
      )}
    </pixiContainer>
  );
}

export default TrainSmoke;
