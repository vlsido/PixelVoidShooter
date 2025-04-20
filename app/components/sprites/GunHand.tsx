import { useApplication } from "@pixi/react";
import { FederatedPointerEvent, Sprite, Texture, Ticker } from "pixi.js";
import {
  useEffect,
  useMemo,
  useRef
} from "react";

function GunHand() {
  const app = useApplication().app;
  const gunHandRef = useRef<Sprite | null>(null);

  const gunHandTexture = useMemo(() => Texture.from("gunHand"), []);

  useEffect(() => {
    function copyPosition(e: FederatedPointerEvent) {
      if (gunHandRef.current === null) return;

      gunHandRef.current.x = e.globalX + 100;
    }

    app.stage.addEventListener("pointermove", copyPosition);

    return () => app.stage.removeEventListener("pointermove", copyPosition);
  }, []);

  return (
    <pixiSprite
      ref={gunHandRef}
      texture={gunHandTexture}
      x={app.screen.width - (gunHandTexture.width / 4)}
      y={app.screen.height - (gunHandTexture.height / 5)}
      scale={0.25}
    />
  );
}

export default GunHand;
