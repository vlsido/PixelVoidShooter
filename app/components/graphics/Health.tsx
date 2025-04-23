import { Graphics, loadTextures, Sprite, Texture } from "pixi.js";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { PLAYER_HEALTH } from "../constants/player";
import { useApplication } from "@pixi/react";

function Health() {
  const app = useApplication().app;

  const { health } = usePlayer();

  const healthPointsRefs = useRef<(Sprite | null)[]>([]);

  const loadTextures = useCallback(() => {
    const loadedTextures = [];
    for (let index = 0; index < 3; index++) {
      loadedTextures.push(Texture.from(`heart${index}.png`));
    }
    return loadedTextures;
  }, []);

  const textures = useMemo(loadTextures, []);

  useEffect(() => {
    const wholeHearts = Math.floor(health / 3);

    healthPointsRefs.current.forEach((ref, index) => {
      if (ref === null) return;

      if (index + 1 <= wholeHearts) {
        ref.alpha = 1;
        ref.texture = textures[0];
        return;
      }

      if (index + 1 >= wholeHearts + 1) {

        ref.alpha = 0;
        return;
      };

      if (health % 3 === 2) {
        ref.alpha = 1;
        ref.texture = textures[1];
      } else if (health % 3 === 1) {
        ref.alpha = 1;
        ref.texture = textures[2];
      }
    });
  }, [health]);

  return (
    <pixiContainer>
      {Array.from({ length: PLAYER_HEALTH / 3 }).map((_, index) =>
        <pixiSprite
          key={index}
          texture={textures[0]}
          ref={(ref) => {
            if (ref === undefined) return;

            healthPointsRefs.current[index] = ref;
          }}
          x={(index * 64) + app.screen.width * 0.05}
        />
      )}
    </pixiContainer>
  );
}

export default Health;
