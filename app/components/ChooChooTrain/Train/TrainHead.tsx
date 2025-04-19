import { useApplication, useTick } from "@pixi/react";
import { Graphics, Ticker } from "pixi.js";
import { useCallback, useRef } from "react";
import { BIG_WHEEL_RADIUS, GROUND_HEIGHT, PLANK_HEIGHT, SMALL_WHEEL_RADIUS } from "../constants/common";

function TrainHead() {
  const backWheelRef = useRef<Graphics | null>(null);
  const midWheelRef = useRef<Graphics | null>(null);
  const frontWheelRef = useRef<Graphics | null>(null);

  const app = useApplication().app;

  const onDrawBody = useCallback((graphics: Graphics) => {
    graphics.clear();
    const frontHeight = 100;
    const frontWidth = 140;
    const frontRadius = frontHeight / 2;

    const cabinHeight = 200;
    const cabinWidth = 150;
    const cabinRadius = 15;

    const chimneyBaseWidth = 30;
    const chimneyTopWidth = 50;
    const chimneyHeight = 70;
    const chimneyDomeHeight = 25;
    const chimneyTopOffset = (chimneyTopWidth - chimneyBaseWidth) / 2;
    const chimneyStartX = cabinWidth + frontWidth - frontRadius - chimneyBaseWidth;
    const chimneyStartY = -frontHeight;

    const roofHeight = 25;
    const roofExcess = 20;

    const doorWidth = cabinWidth * 0.7;
    const doorHeight = cabinHeight * 0.7;
    const doorStartX = (cabinWidth - doorWidth) * 0.5;
    const doorStartY = -(cabinHeight - doorHeight) * 0.5 - doorHeight;

    const windowWidth = doorWidth * 0.8;
    const windowHeight = doorHeight * 0.4;
    const offset = (doorWidth - windowWidth) / 2;

    graphics.y = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT * 2 - BIG_WHEEL_RADIUS;

    graphics
      .moveTo(chimneyStartX, chimneyStartY)
      .lineTo(chimneyStartX - chimneyTopOffset, chimneyStartY - chimneyHeight + chimneyDomeHeight)
      .quadraticCurveTo(
        chimneyStartX + chimneyBaseWidth / 2,
        chimneyStartY - chimneyHeight - chimneyDomeHeight,
        chimneyStartX + chimneyBaseWidth + chimneyTopOffset,
        chimneyStartY - chimneyHeight + chimneyDomeHeight,
      )
      .lineTo(chimneyStartX + chimneyBaseWidth, chimneyStartY)
      .fill({ color: 0x121212 })

      // Draw the head front
      .roundRect(
        cabinWidth - frontRadius - cabinRadius,
        -frontHeight,
        frontWidth + frontRadius + cabinRadius,
        frontHeight,
        frontRadius,
      )
      .fill({ color: 0x7f3333 })

      // Draw the cabin
      .roundRect(0, -cabinHeight, cabinWidth, cabinHeight, cabinRadius)
      .fill({ color: 0x725f19 })

      // Draw the roof
      .rect(-roofExcess / 2, cabinRadius - cabinHeight - roofHeight, cabinWidth + roofExcess, roofHeight)
      .fill({ color: 0x52431c })

      // Draw the door
      .roundRect(doorStartX, doorStartY, doorWidth, doorHeight, cabinRadius)
      .stroke({ color: 0x52431c, width: 3 })

      // Draw the window
      .roundRect(doorStartX + offset, doorStartY + offset, windowWidth, windowHeight, 10)
      .fill({ color: 0x848484 });

  }, [app.screen.height]);

  const onDrawWheel = useCallback((graphics: Graphics, radius: number) => {
    graphics.clear();
    const strokeThickness = radius / 3;
    const innerRadius = radius - strokeThickness;

    graphics.y = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT * 2 - radius;

    graphics
      .circle(0, 0, radius)
      // Draw the wheel
      .fill({ color: 0x848484 })
      // Draw the tyre
      .stroke({ color: 0x121212, width: strokeThickness, alignment: 1 })
      // Draw the spokes
      .rect(-strokeThickness / 2, -innerRadius, strokeThickness, innerRadius * 2)
      .rect(-innerRadius, -strokeThickness / 2, innerRadius * 2, strokeThickness)
      .fill({ color: 0x4f4f4f })

  }, [app.screen.height]);

  const animateWheels = useCallback((time: Ticker) => {

    const dr = time.deltaTime * 0.15;
    if (backWheelRef.current && midWheelRef.current && frontWheelRef.current) {


      backWheelRef.current.rotation += dr * (SMALL_WHEEL_RADIUS / BIG_WHEEL_RADIUS);
      midWheelRef.current.rotation += dr;
      frontWheelRef.current.rotation += dr;
    }
  }, []);

  useTick(animateWheels);

  return (
    <pixiContainer
      x={app.screen.width / 2}
    >
      <pixiGraphics
        draw={onDrawBody}
        x={0}
      />
      <pixiGraphics
        ref={backWheelRef}
        draw={(graphics) => onDrawWheel(graphics, BIG_WHEEL_RADIUS)}
        x={BIG_WHEEL_RADIUS}
      />
      <pixiGraphics
        ref={midWheelRef}
        draw={(graphics) => onDrawWheel(graphics, SMALL_WHEEL_RADIUS)}
        x={BIG_WHEEL_RADIUS * 2 + SMALL_WHEEL_RADIUS}
      />
      <pixiGraphics
        ref={frontWheelRef}
        draw={(graphics) => onDrawWheel(graphics, SMALL_WHEEL_RADIUS)}
        x={BIG_WHEEL_RADIUS * 2 + SMALL_WHEEL_RADIUS * 3.5}
      />
    </pixiContainer>
  );
}

export default TrainHead;
