import { Texture } from "pixi.js";
import { useMemo } from "react";

function GunHand() {

  const gunHandTexture = useMemo(() => Texture.from("gunHand"), []);

  return (
    <pixiSprite
      texture={gunHandTexture}
    />
  );
}

export default GunHand;
