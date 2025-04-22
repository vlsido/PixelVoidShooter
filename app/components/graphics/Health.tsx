import { Graphics, loadTextures, Sprite, Texture } from "pixi.js";
import { useCallback, useMemo, useRef } from "react";

function Health() {

  const healthPointsRefs = useRef<(Sprite | null)[]>([]);

  const textures = useMemo(() => {
    const loadedTextures = [];
    for (let index = 0; index < 3; index++) {
      const texture = Texture.from(`heart${index}.png`);
      loadedTextures.push(texture);
    }
    return loadTextures;
  }, []);


  return (
    <pixiContainer>
      {Array.from({ length: 5 }).map((_, index) =>
        <pixiSprite
          key={index}
          ref={(ref) => {
            if (ref === undefined) return;

            healthPointsRefs.current[index] = ref;
          }}
        />
      )}
    </pixiContainer>
  );
}

export default Health;
