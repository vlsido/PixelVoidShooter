import { useApplication, useTick } from "@pixi/react";
import { Texture, Ticker, TilingSprite } from "pixi.js";
import { useCallback, useMemo, useRef } from "react";

function WaterOverlay() {
  const app = useApplication().app;

  const tileRef = useRef<TilingSprite | null>(null);

  const overlayTexture = useMemo(() => Texture.from("overlay"), []);

  const animateTile = useCallback((ticker: Ticker) => {
    if (tileRef.current) {
      tileRef.current.tilePosition.x -= ticker.deltaTime;
      tileRef.current.tilePosition.y -= ticker.deltaTime;
    }
  }, []);

  useTick((ticker) => animateTile(ticker));

  return (
    <pixiTilingSprite
      ref={tileRef}
      texture={overlayTexture}
      width={app.screen.width}
      height={app.screen.height}
    />
  );
}

export default WaterOverlay;
