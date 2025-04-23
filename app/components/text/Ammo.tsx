import {
  useEffect,
  useRef
} from "react";
import { BitmapText } from "pixi.js";
import { useApplication } from "@pixi/react";
import { CircularProgressBar } from "@pixi/ui";
import { useAmmo } from "../hooks/useAmmo";

function Ammo() {
  const app = useApplication().app;

  const bitmapRef = useRef<BitmapText | null>(null);

  const progressRef = useRef<CircularProgressBar | null>(null);

  const { ammo, reloadProgress } = useAmmo();

  useEffect(() => {
    if (bitmapRef.current === null) return;

    bitmapRef.current.text = `${ammo.currentBullets}/${ammo.totalBullets}`;
    bitmapRef.current.style =
    {
      fontSize: 36,
      align: "center"
    }

  }, [ammo]);

  useEffect(() => {
    if (progressRef.current === null) return;
    if (reloadProgress === 0) {
      progressRef.current.alpha = 0;
    }

    if (reloadProgress > 0 && reloadProgress < 100) {
      progressRef.current.alpha = 1;
      progressRef.current.progress = reloadProgress;
    }
    progressRef.current.x = app.screen.width * 0.1;
    progressRef.current.y = app.screen.height - 100;

  }, [reloadProgress]);

  return (
    <pixiContainer>
      <circularProgressBar
        ref={progressRef}
        backgroundColor={0x000000}
        backgroundAlpha={0.1}
        lineWidth={10}
        fillAlpha={1}
        fillColor={0xffffff}
        radius={30}
        cap="butt"
      />
      <pixiBitmapText
        ref={bitmapRef}
        text="13/13"
        x={app.screen.width * 0.06}
        y={app.screen.height - 50}
      />
    </pixiContainer>
  );
}

export default Ammo;
