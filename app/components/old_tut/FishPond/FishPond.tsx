import { Assets, DisplacementFilter, Sprite } from "pixi.js";
import {
  useEffect,
  useState
} from "react";
import FishPondBackground from "./FishPondBackground";
import FishContainer from "./FishContainer";
import WaterOverlay from "./WaterOverlay";
import { AsciiFilter } from "pixi-filters";
import { useApplication } from "@pixi/react";


function FishPond() {

  const app = useApplication().app;
  const [areAssetsLoaded, setAreAssetsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const assets = [
      { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
      { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
      { alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
      { alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
      { alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
      { alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
      { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
      { alias: 'displacement', src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png' },
    ];
    Assets.load(assets).then(() => {
      setAreAssetsLoaded(true);

      const sprite = Sprite.from("displacement");
      const filter = new DisplacementFilter({ sprite, scale: 50 });
      const asciiFilter = new AsciiFilter({});

      app.stage.filters = [filter];
    });

  }, []);

  if (areAssetsLoaded === false) return null;

  return (
    <pixiContainer>
      <FishPondBackground />
      <FishContainer />
      <WaterOverlay />
    </pixiContainer>
  );
}

export default FishPond;

