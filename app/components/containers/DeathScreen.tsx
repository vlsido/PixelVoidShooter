import { useApplication, useTick } from "@pixi/react";
import { AnimatedSprite, Container, Sprite, Texture, Ticker, type Graphics } from "pixi.js";
import { useCallback, useMemo, useRef } from "react";

function DeathScreen() {
  const app = useApplication().app;

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

  const onDrawDeathScreenGraphics = useCallback((graphics: Graphics) => {
    graphics
      .rect(0, 0, app.screen.width, app.screen.height)
      .fill({ color: 0x555555 });

  }, []);

  const onDrawTryAgainButtonGraphics = useCallback((graphics: Graphics) => {

    if (tryAgainContainerRef.current === null) return;
    graphics
      .rect(tryAgainContainerRef.current.x, app.screen.height / 2, 100, 100)
      .fill({ color: 0x000000 });
  }, []);

  const animateSkull = useCallback((time: Ticker) => {
    if (skullRef.current === null) return;

    if (skullRef.current.playing === false) {
      skullRef.current.play();

    }

  }, []);

  useTick(animateSkull);

  return (
    <pixiContainer

    >
      <pixiGraphics
        pivot={0.5}
        draw={onDrawDeathScreenGraphics}
      />
      <pixiAnimatedSprite
        textures={skullTextures}
        ref={skullRef}
        anchor={0.5}
        autoPlay={true}
        scale={1.5}
        x={app.screen.width / 2}
        y={app.screen.height / 3}
        animationSpeed={0.05}
      />
      <pixiContainer>
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
      </pixiContainer>
      <pixiContainer
        ref={tryAgainContainerRef}
      >
        <pixiContainer
          y={app.screen.height / 1.5}
          x={app.screen.width / 2}
          anchor={0.5}
        >
          <fancyButton
            text={"Try again?"}
            anchor={0.5}
            offset={{ x: 100 }}
          />
        </pixiContainer>
      </pixiContainer>

    </pixiContainer>
  );
}
// <pixiText
//   text={"Try again?"}
//   style={{
//
//     fontFamily: 'Minecraft',
//     fontSize: 48,
//     fontStyle: 'italic',
//     fontWeight: 'bold',
//     fill: { color: "0xFFFFFF" },
//     stroke: { color: '#4a1850', width: 5, join: 'round' },
//     wordWrap: true,
//     wordWrapWidth: 440,
//
//   }}
//   anchor={{ x: 0.5, y: 0.5 }}
//   x={app.screen.width / 2}
//   y={app.screen.height / 1.5}
//
// />
export default DeathScreen;
