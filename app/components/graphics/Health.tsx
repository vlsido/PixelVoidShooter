import {
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import {
  Sprite,
  Texture
} from "pixi.js";
import { PLAYER_HEALTH } from "../constants/player";
import { useApplication } from "@pixi/react";
import { useAtomValue } from "jotai";
import { healthAtom } from "../atoms/playerAtoms";

function Health() {
  const app = useApplication().app;

  const health = useAtomValue<number>(healthAtom);

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
    const wholeHearts = Math.floor(health / 2);

    healthPointsRefs.current.forEach((ref, index) => {
      if (ref === null) return;

      if (index < wholeHearts) {
        ref.texture = textures[0];
      } else if (index === wholeHearts && health % 2 === 1) {
        ref.texture = textures[1];
      } else {
        ref.texture = textures[2];

      }

    });
  }, [health]);

  return (
    <pixiContainer>
      {Array.from({ length: PLAYER_HEALTH / 2 }).map((_, index) =>
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
