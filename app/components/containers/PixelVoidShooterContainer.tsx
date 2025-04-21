import { useCallback, useEffect, useState } from "react";
import GunHand from "../sprites/GunHand";
import { Assets } from "pixi.js";
import { useApplication } from "@pixi/react";
import Crosshair from "../graphics/Crosshair";
import gunHandUrl from "/gunHand.png";
import slowMonsterJson from "/slowMonster/slowMonster.json?url";
import flyingMonsterJson from "/flyingMonster/flyingMonster.json?url";
import Monster from "../sprites/Monster/Monster";
import { FLYING_MONSTER, SLOW_MONSTER } from "../constants/monsters";
import HUD from "./HUD";
import { useAmmo } from "../hooks/useAmmo";

type Monster = {
  textureName: string;
  health: number;
  speed: number;
}

function PixelVoidShooterContainer() {
  const app = useApplication().app;
  const [areAssetsLoaded, setAreAssetsLoaded] = useState<boolean>(false);
  const { reloadAmmo } = useAmmo();

  const [monsters, setMonsters] = useState<Monster[]>([
    SLOW_MONSTER,
    FLYING_MONSTER
  ]);

  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "R":
          reloadAmmo();
          break;

        case "r":
          reloadAmmo();
          break;
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  useEffect(() => {
    const assets = [
      { alias: 'gunHand', src: gunHandUrl },
      slowMonsterJson,
      flyingMonsterJson,
      "https://pixijs.com/assets/bitmap-font/desyrel.xml"
    ];

    Assets.load(assets).then(() => {
      setAreAssetsLoaded(true);
    });

    app.stage.eventMode = "static";

    app.stage.hitArea = app.screen;
  }, []);


  const onKillMonster = useCallback(() => {
    const newMonster = Math.round(Math.random()) === 1 ? SLOW_MONSTER : FLYING_MONSTER;

    setMonsters([...monsters, newMonster]);
  }, [monsters]);

  if (areAssetsLoaded === false) return null;

  return (
    <pixiContainer>
      {monsters.map((monster, index) =>
        <Monster
          key={index}
          textureName={monster.textureName}
          health={monster.health}
          speed={monster.speed}
          onKill={onKillMonster}
        />
      )}
      <GunHand />
      <Crosshair />
      <HUD />
    </pixiContainer>
  );
}

export default PixelVoidShooterContainer;
