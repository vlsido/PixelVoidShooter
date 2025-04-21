import {
  useEffect,
  useRef
} from "react";
import { BitmapText } from "pixi.js";
import { useAmmo } from "../hooks/useAmmo";
import { useApplication } from "@pixi/react";

function Ammo() {
  const app = useApplication().app;

  const bitmapRef = useRef<BitmapText | null>(null);

  const { ammo } = useAmmo();

  useEffect(() => {
    if (bitmapRef.current != null) {
      bitmapRef.current.text = `${ammo.currentBullets}/${ammo.totalBullets}`;
      bitmapRef.current.style =
      {
        fontSize: 55,
        align: "center"
      }
    }
  }, [ammo]);

  return (
    <pixiBitmapText
      ref={bitmapRef}
      text="13/13"
      x={app.screen.width * 0.05}
    />
  );
}

export default Ammo;
