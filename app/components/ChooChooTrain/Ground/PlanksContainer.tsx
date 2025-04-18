import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useApplication, useTick } from "@pixi/react";
import type { Graphics, Ticker } from "pixi.js";
import type { IPlankProps } from "../types";

function PlanksContainer() {
  const app = useApplication().app;

  const [planks, setPlanks] = useState<IPlankProps[]>([]);

  const plankRefs = useRef<(Graphics | null)[]>([]);

  useEffect(() => {
    const plankHeight = 10;
    const plankWidth = 40;
    const plankGap = 15;
    const plankCount = app.screen.width / (plankWidth + plankGap) + 1;
    const plankY = app.screen.height - 20 - plankHeight;

    let planksArr = [];

    for (let index = 0; index < plankCount; index++) {

      const plank: IPlankProps = {
        index: index,
        ref: null,
        width: plankWidth,
        height: 10,
        x: index * (plankWidth + plankGap),
        y: plankY
      }

      planksArr.push(plank);
    }

    setPlanks(planksArr);
  }, []);

  const onDrawGraphics = useCallback((graphics: Graphics, plank: IPlankProps) => {

    graphics.clear();
    const plankHeight = 10;
    const plankWidth = 40;
    const plankY = app.screen.height - 20 - plankHeight;

    const plankGap = 15;

    graphics
      .rect(plank.index * (plank.width + plankGap), plankY, plankWidth, plankHeight)
      .fill("brown");

  }, [app.screen.height]);

  const animatePlanks = useCallback((time: Ticker) => {
    const dx = time.deltaTime * 6;

    const plankWidth = 40;
    const plankGap = 15;
    const plankCount = app.screen.width / (plankWidth + plankGap) + 1;
    plankRefs.current.forEach((plank) => {
      if (plank == null) return;

      plank.x -= dx;

      if (plank.x <= 0) {
        plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5;
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
