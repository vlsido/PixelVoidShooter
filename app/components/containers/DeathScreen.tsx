import {
  useApplication,
  useTick
} from "@pixi/react";
import { useSetAtom } from "jotai";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Text,
  Texture,
  Ticker
} from "pixi.js";
import {
  useCallback,
  useMemo,
  useRef
} from "react";
import { healthAtom } from "../atoms/playerAtoms";

function DeathScreen() {
  const app = useApplication().app;

  const dispatchHealth = useSetAtom(healthAtom);

  const skullRef = useRef<AnimatedSprite | null>(null);

  const skullTextures = useMemo(() => {
    const textures = [];

    for (let index = 0; index < 4; index++) {
      const texture = Texture.from(`skull${index}.png`);

      textures.push(texture);
    }

    return textures;
  }, []);

  const tryAgainContainerRef = useRef<Container | null>(null);

  const hellTexture = useMemo(() => Texture.from("hell"), []);

  const onDrawDeathScreenGraphics = useCallback((graphics: Graphics) => {
    graphics
      .rect(0, 0, app.screen.width, app.screen.height)
      .fill({ color: 0x555555 });

  }, []);

  const animateSkull = useCallback((time: Ticker) => {
    if (skullRef.current === null) return;

    if (skullRef.current.playing === false) {
      skullRef.current.play();
    }

  }, []);

  useTick(animateSkull);

  const tryAgainButtonContainer = useMemo(() => {

    const graphics = new Graphics()
      .roundRect(0, 0, 150, 75, 30)
      .fill({ color: 0xFFFFFF })

    return graphics;
  }
    , []);

  const tryAgainButtonContainerHover = useMemo(() => new Graphics()
    .roundRect(0, 0, 150, 75, 30)
    .fill({ color: 0xFFFCCC }), []);

  const tryAgainButtonText = useMemo(() => {
    return new Text({
      text: "Try again?",
      style: {
        fontFamily: 'Minecraft',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: { color: "0xFFFFFF" },
        stroke: { color: '#4a1850', width: 5, join: 'round' },
      },
    });
  }, []);

  const handleRestoreHealth = useCallback(() => {
    dispatchHealth({ type: "restore" });
  }, []);

  return (
    <pixiContainer
    >
      <pixiGraphics
        pivot={0.5}
        draw={onDrawDeathScreenGraphics}
      />
      <pixiSprite
        texture={hellTexture}
      />
      <pixiAnimatedSprite
        textures={skullTextures}
        ref={skullRef}
        anchor={0.5}
        autoPlay={true}
        scale={2.5}
        x={app.screen.width / 2}
        y={app.screen.height / 3}
        animationSpeed={0.05}
      />
      <pixiText
        text={"YOU DIED"}
        style={{
          fontFamily: 'Minecraft',
          fontSize: 48,
          fontWeight: 'bold',
          fill: { color: "0xFFFFFF" },
          stroke: { color: '#4a1850', width: 5, join: 'round' },

        }}
        anchor={{ x: 0.5, y: 0.5 }}
        x={app.screen.width / 2}
        y={app.screen.height * 0.1}

      />
      <pixiContainer
        ref={tryAgainContainerRef}
        anchor={0.5}
        y={app.screen.height / 1.5}
        x={app.screen.width / 2 - 75}
      >
        <fancyButton
          anchor={0.5}
          // BUG: Fix type error
          textView={tryAgainButtonText}
          onPointerDown={handleRestoreHealth}
          defaultView={tryAgainButtonContainer}
          hoverView={tryAgainButtonContainerHover}
        />
      </pixiContainer>

    </pixiContainer>
  );
}
export default DeathScreen;
