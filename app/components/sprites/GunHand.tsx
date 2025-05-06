import {
  useEffect,
  useMemo,
  useRef
} from "react";
import { useApplication } from "@pixi/react";
import {
  AnimatedSprite,
  FederatedPointerEvent,
  Sprite,
  Texture,
} from "pixi.js";
import { useAtom } from "jotai";
import { isShootingAtom } from "../atoms/playerAtoms";

function GunHand() {
  const app = useApplication().app;

  const gunHandRef = useRef<Sprite | null>(null);

  const gunHandTexture = useMemo(() => Texture.from("gunHand"), []);

  const [isShooting, setIsShooting] = useAtom<boolean>(isShootingAtom);

  const gunSparkRef = useRef<AnimatedSprite | null>(null);

  const gunSparkTextures = useMemo(() => {
    const frames = [];

    for (let frameIndex = 0; frameIndex < 9; frameIndex++) {
      frames.push(Texture.from(`gunSpark${frameIndex}.png`));
    }

    console.log(frames);
    return frames;
  }, []);

  useEffect(() => {
    if (gunSparkRef.current) {
      if (isShooting === true) {
        gunSparkRef.current.gotoAndPlay(0);
        setIsShooting(false);
      }
    }
  }, [isShooting]);

  useEffect(() => {
    function copyPosition(e: FederatedPointerEvent) {
      if (gunHandRef.current === null || gunSparkRef.current === null) return;

      gunHandRef.current.x = e.globalX + 100;
      gunSparkRef.current.x = e.globalX - 25;
    }

    app.stage.addEventListener("pointermove", copyPosition);

    return () => app.stage.removeEventListener("pointermove", copyPosition);
  }, []);

  return (
    <pixiContainer>
      <pixiAnimatedSprite
        loop={false}
        ref={gunSparkRef}
        eventMode="none"
        textures={gunSparkTextures}
        x={app.screen.width / 2}
        y={app.screen.height - (gunHandTexture.height / 3)}
        scale={1}
      />
      <pixiSprite
        ref={gunHandRef}
        texture={gunHandTexture}
        x={app.screen.width - (gunHandTexture.width / 4)}
        y={app.screen.height - (gunHandTexture.height / 5)}
        scale={0.25}
      />
    </pixiContainer>
  );
}

export default GunHand;
