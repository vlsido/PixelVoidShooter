import { useEffect, useState } from "react";
import GunHand from "../sprites/GunHand";
import { Assets } from "pixi.js";
import { useApplication } from "@pixi/react";
import Crosshair from "../graphics/Crosshair";

function PixelVoidShooterContainer() {

  const app = useApplication().app;
  const [areAssetsLoaded, setAreAssetsLoaded] = useState<boolean>(false);

  useEffect(() => {

    const assets = [
      { alias: 'gunHand', src: './gunHand.png' },
    ];

    Assets.load(assets).then(() => {
      setAreAssetsLoaded(true);
    });
  }, []);

  if (areAssetsLoaded === false) return null;

  return (
    <pixiContainer>
      <GunHand />
      <Crosshair />
    </pixiContainer>
  );
}

export default PixelVoidShooterContainer;
