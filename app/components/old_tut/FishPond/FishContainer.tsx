import {
  useApplication,
  useTick
} from "@pixi/react";
import {
  Sprite,
  Texture,
  Ticker
} from "pixi.js";
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

interface FishProps {
  speed: number;
  direction: number;
  turnSpeed: number;
  x: number;
  y: number;
  rotation: number;
  texture: Texture;
}

function FishContainer() {
  const app = useApplication().app;
  const [fishes, setFishes] = useState<FishProps[]>([]);
  const fishesRefs = useRef<(Sprite | null)[]>([]);
  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  useEffect(() => {
    if (fishes.length === 0) {
      const fishCount = 20;
      const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];

      const loadedFishes: FishProps[] = [];
      for (let i = 0; i < fishCount; i++) {
        const asset = fishAssets[i % fishAssets.length];
        const texture = Texture.from(asset);

        const loadedFish: FishProps = {
          speed: 2 + Math.random() * 2,
          direction: Math.random() * Math.PI * 2,
          turnSpeed: Math.random() - 0.8,
          x: Math.random() * app.screen.width,
          y: Math.random() * app.screen.height,
          rotation: Math.random() * 2,
          texture
        }

        loadedFishes.push(loadedFish);
      }

      setFishes(loadedFishes);
    }
  }, []);

  const animateFishes = useCallback((ticker: Ticker) => {

    fishes.forEach((fishObj, index) => {
      if (fishesRefs.current.length === 0) return;

      const fish = fishesRefs.current[index];

      if (fish === null) return;

      fishObj.direction += fishObj.turnSpeed * 0.01;
      fish.x += Math.sin(fishObj.direction) * fishObj.speed;
      fish.y += Math.cos(fishObj.direction) * fishObj.speed;
      fish.rotation = -fishObj.direction - Math.PI / 2;
      if (fish.x < -stagePadding) {
        fish.x += boundWidth;
      }
      if (fish.x > app.screen.width + stagePadding) {
        fish.x -= boundWidth;
      }
      if (fish.y < -stagePadding) {
        fish.y += boundHeight;
      }
      if (fish.y > app.screen.height + stagePadding) {
        fish.y -= boundHeight;
      }
    });

  }, [fishes]);

  const changeDirection = useCallback((index: number) => {
    const fish = fishes.at(index);

    if (fish === undefined) return;

    fish.direction *= -1;
    fish.speed *= 200;
  }, []);

  useTick((ticker) => animateFishes(ticker));

  if (fishes.length === 0) return null;

  return (
    <pixiContainer>
      {fishes.map((fish, index) =>
        <pixiSprite
          key={index}
          ref={(ref) => {
            if (ref === undefined) return;
            (fishesRefs.current[index] = ref)
          }}
          eventMode={"static"}
          onClick={() => changeDirection(index)}
          texture={fish.texture}
          anchor={0.5}
          x={fish.x}
          y={fish.y}
          rotation={fish.rotation}
          scale={0.5 + Math.random() * 0.2}
        />
      )}
    </pixiContainer>
  );
}

export default FishContainer;
