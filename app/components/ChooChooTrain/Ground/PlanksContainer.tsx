import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useApplication, useTick } from "@pixi/react";
import type { Graphics, Ticker } from "pixi.js";
import type { IPlankProps } from "../types";
import {
  GROUND_HEIGHT,
  PLANK_GAP,
  PLANK_HEIGHT,
  PLANK_WIDTH
} from "../constants/common";

function PlanksContainer() {
  const app = useApplication().app;

  const [planks, setPlanks] = useState<IPlankProps[]>([]);

  const plankRefs = useRef<(Graphics | null)[]>([]);

  useEffect(() => {
    const plankCount = app.screen.width / (PLANK_WIDTH + PLANK_GAP) + 1;
    const plankY = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT;

    let planksArr = [];

    for (let index = 0; index < plankCount; index++) {

      const plank: IPlankProps = {
        index: index,
        ref: null,
        width: PLANK_WIDTH,
        height: 10,
        x: index * (PLANK_WIDTH + PLANK_GAP),
        y: plankY
      }

      planksArr.push(plank);
    }

    setPlanks(planksArr);
  }, []);

  const onDrawGraphics = useCallback((graphics: Graphics, plank: IPlankProps) => {
    graphics.clear();
    const plankY = app.screen.height - GROUND_HEIGHT - PLANK_HEIGHT;
    const plankX = plank.index * (PLANK_WIDTH + PLANK_GAP);
    graphics.x = plankX;

    graphics
      .rect(0, plankY, PLANK_WIDTH, PLANK_HEIGHT)
      .fill("brown");

  }, [app.screen.height]);

  const animatePlanks = useCallback((time: Ticker) => {
    const dx = time.deltaTime * 6;

    const plankCount = app.screen.width / (PLANK_WIDTH + PLANK_GAP) + 1;

    plankRefs.current.forEach((plank) => {
      if (plank == null) return;

      plank.x -= dx;

      if (plank.x <= -(PLANK_WIDTH / 2 + PLANK_GAP)) {
        plank.x += plankCount * (PLANK_WIDTH + PLANK_GAP) + PLANK_GAP * 1.5;
      }
    });
  }, [planks]);

  useTick(animatePlanks);

  return (
    <pixiContainer>
      {planks.map((plank, index) =>
        <pixiGraphics
          key={index}
          ref={(ref) => {
            if (ref === undefined) return;
            plankRefs.current[index] = ref
          }}
          draw={(graphics) => onDrawGraphics(graphics, plank)}
        />
      )}
    </pixiContainer>
  );
}

export default PlanksContainer;
