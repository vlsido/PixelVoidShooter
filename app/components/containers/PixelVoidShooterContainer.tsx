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

type Monster = {
  textureName: string;
  health: number;
  speed: number;
}

function PixelVoidShooterContainer() {

  const app = useApplication().app;
  const [areAssetsLoaded, setAreAssetsLoaded] = useState<boolean>(false);

  const [monsters, setMonsters] = useState<Monster[]>([
    {
      textureName: "slowMonster",
      health: 4,
      speed: 1
    },
    {
      textureName: "flyingMonster",
      health: 3,
      speed: 1
    },
  ]);

  useEffect(() => {
    const assets = [
      { alias: 'gunHand', src: gunHandUrl },
      slowMonsterJson,
      flyingMonsterJson
    ];

    Assets.load(assets).then(() => {
      setAreAssetsLoaded(true);
    });

    app.stage.eventMode = "static";

    app.stage.hitArea = app.screen;
  }, []);


  const onKillMonster = useCallback(() => {

    const newMonsters = [...monsters];

    newMonsters.push(Math.round(Math.random()) === 1 ? SLOW_MONSTER : FLYING_MONSTER);

    setMonsters(newMonsters);
  }, [monsters]);

  useEffect(() => {
    console.log('m', monsters);
  }, [monsters]);

  if (areAssetsLoaded === false) return null;

  return (
    <pixiContainer
    >
      {monsters.map((monster, index) =>
        <Monster
          textureName={monster.textureName}
          health={monster.health}
          speed={monster.speed}
          onKill={onKillMonster}
        />
      )}
      <GunHand />
      <Crosshair />
    </pixiContainer>
  );
}

export default PixelVoidShooterContainer;
