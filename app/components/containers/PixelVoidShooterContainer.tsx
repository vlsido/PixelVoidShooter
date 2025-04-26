import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import GunHand from "../sprites/GunHand";
import { Assets, Container } from "pixi.js";
import { useApplication } from "@pixi/react";
import crosshair from "/crosshair.png";
import minecraftFontUrl from "/Minecraft.ttf";
import gunHandUrl from "/gunHand.png";
import pauseUrl from "/pause.png";
import heartJson from "/heart/heart.json?url";
import skullJson from "/skull/skull.json?url";
import slowMonsterJson from "/slowMonster/slowMonster.json?url";
import slowMonsterAttackStanceJson from "/slowMonsterAttackStance/slowMonsterAttackStance.json?url";
import slowMonsterAttackJson from "/slowMonsterAttack/slowMonsterAttack.json?url";
import flyingMonsterJson from "/flyingMonster/flyingMonster.json?url";
import flyingMonsterAttackStanceJson from "/flyingMonsterAttackStance/flyingMonsterAttackStance.json?url";
import flyingMonsterAttackJson from "/flyingMonsterAttack/flyingMonsterAttack.json?url";
import Monster from "../sprites/Monster/Monster";
import {
  FLYING_MONSTER,
  SLOW_MONSTER
} from "../constants/monsters";
import HUD from "./HUD";
import { useAmmo } from "../hooks/useAmmo";
import Background from "./Background";
import DeathScreen from "./DeathScreen";
import { usePlayer } from "../hooks/usePlayer";
import Menu from "./Menu";
import { useAtom } from "jotai";
import { isPausedAtom } from "../atoms/gameAtoms";
import { type AmmoProps } from "../types/player";

type TMonster = {
  textureName: string;
  health: number;
  speed: number;
}

function PixelVoidShooterContainer() {
  const app = useApplication().app;

  const [areAssetsLoaded, setAreAssetsLoaded] = useState<boolean>(false);

  const [monsters, setMonsters] = useState<TMonster[]>([
    SLOW_MONSTER,
    FLYING_MONSTER
  ]);

  const { health } = usePlayer();

  const [isPaused, setIsPaused] = useAtom<boolean>(isPausedAtom);

  const isPausedRef = useRef<boolean>(isPaused);

  isPausedRef.current = isPaused;

  const { ammo, reloadAmmo } = useAmmo();

  const ammoRef = useRef<AmmoProps>(ammo);

  ammoRef.current = ammo;

  useEffect(() => {

    const fonts = [
      { alias: "Minecraft", src: minecraftFontUrl }
    ];

    Assets.addBundle("fonts", fonts);

    const assets = [
      { alias: 'gunHand', src: gunHandUrl },
      { alias: "crosshair", src: crosshair },
      { alias: "pause", src: pauseUrl },
      heartJson,
      skullJson,
      slowMonsterJson,
      slowMonsterAttackStanceJson,
      slowMonsterAttackJson,
      flyingMonsterJson,
      flyingMonsterAttackStanceJson,
      flyingMonsterAttackJson,
      "https://pixijs.com/assets/bitmap-font/desyrel.xml"
    ];

    Assets.loadBundle("fonts").then(() => {
      Assets.load(assets).then(() => {
        setAreAssetsLoaded(true);
      });
    });

    app.renderer.events.cursorStyles.default = "crosshair";
    app.renderer.events.setCursor("crosshair");

    app.stage.eventMode = "static";

    app.stage.hitArea = app.screen;
  }, []);

  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          setIsPaused(!isPausedRef.current);
          break;

        case "R":
          if (isPausedRef.current === false) {
            reloadAmmo(ammoRef.current);
          }
          break;

        case "r":
          if (isPausedRef.current === false) {
            reloadAmmo(ammoRef.current);
          }
          break;
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  const onKillMonster = useCallback(() => {
    const newMonster = Math.round(Math.random()) === 1
      ? SLOW_MONSTER
      : FLYING_MONSTER;

    setMonsters([...monsters, newMonster]);
  }, [monsters]);

  if (areAssetsLoaded === false) return null;

  if (health <= 0) return <DeathScreen />

  return (
    <pixiContainer
      cursor="crosshair"
    >
      <pixiContainer>
        <Background />
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
        <HUD />
      </pixiContainer>
      <Menu />
    </pixiContainer>
  );
}

export default PixelVoidShooterContainer;
