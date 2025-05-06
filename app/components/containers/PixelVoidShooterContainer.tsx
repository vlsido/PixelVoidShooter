import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import GunHand from "../sprites/GunHand";
import { Assets } from "pixi.js";
import { useApplication } from "@pixi/react";
import minecraftFontUrl from "/Minecraft.ttf";
import gunHandUrl from "/gunHand.png";
import gunSparkJson from "/gunSpark/gunSpark.json?url";
import pauseUrl from "/pause.png";
import hellUrl from "/hell.png";
import heartJson from "/heart/heart.json?url";
import skullJson from "/skull/skull.json?url";
import slowMonsterJson from "/slowMonster/slowMonster.json?url";
import slowMonsterAttackStanceJson from "/slowMonsterAttackStance/slowMonsterAttackStance.json?url";
import slowMonsterAttackJson from "/slowMonsterAttack/slowMonsterAttack.json?url";
import flyingMonsterJson from "/flyingMonster/flyingMonster.json?url";
import flyingMonsterAttackStanceJson from "/flyingMonsterAttackStance/flyingMonsterAttackStance.json?url";
import flyingMonsterAttackJson from "/flyingMonsterAttack/flyingMonsterAttack.json?url";
import HUD from "./HUD";
import { useAmmo } from "../hooks/useAmmo";
import Background from "./Background";
import DeathScreen from "./DeathScreen";
import Menu from "./Menu";
import { atom, useAtom, useAtomValue } from "jotai";
import { isPausedAtom } from "../atoms/gameAtoms";
import { type AmmoProps } from "../types/player";
import MonstersContainer from "./MonstersContainer";
import { healthAtom } from "../atoms/playerAtoms";


function PixelVoidShooterContainer() {
  const app = useApplication().app;

  const [areAssetsLoaded, setAreAssetsLoaded] = useAtom<boolean>(useMemo(() => atom<boolean>(false), []));

  const health = useAtomValue<number>(healthAtom);

  const [isPaused, setIsPaused] = useAtom<boolean>(isPausedAtom);

  const isPausedRef = useRef<boolean>(isPaused);

  isPausedRef.current = isPaused;

  const { ammo, reloadAmmo } = useAmmo();

  const ammoRef = useRef<AmmoProps>(ammo);

  ammoRef.current = ammo;

  const keyDown = useCallback((e: KeyboardEvent) => {
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
  }, []);

  useEffect(() => {
    const fonts = [
      { alias: "Minecraft", src: minecraftFontUrl }
    ];

    Assets.addBundle("fonts", fonts);

    const assets = [
      { alias: 'gunHand', src: gunHandUrl },
      { alias: "pause", src: pauseUrl },
      { alias: "hell", src: hellUrl },
      gunSparkJson,
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

    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  if (areAssetsLoaded === false) return null;

  if (health <= 0) return <DeathScreen />

  return (
    <pixiContainer
      cursor="crosshair"
    >
      <pixiContainer>
        <Background />
        <MonstersContainer />
        <GunHand />
        <HUD />
      </pixiContainer>
      <Menu />
    </pixiContainer>
  );
}

export default PixelVoidShooterContainer;
