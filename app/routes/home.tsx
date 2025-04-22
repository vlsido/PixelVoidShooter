import { CircularProgressBar } from "@pixi/ui";
import type { Route } from "./+types/home";
import {
  Application,
  useExtend
} from "@pixi/react";
import { AsciiFilter } from "pixi-filters";
import {
  AnimatedSprite,
  BitmapText,
  Container,
  DisplacementFilter,
  Graphics,
  Sprite,
  TilingSprite
} from "pixi.js";
import {
  useRef,
  useState
} from "react";
import PixelVoidShooterContainer from "~/components/containers/PixelVoidShooterContainer";
import Storage from "~/components/contexts/Storage";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PixelVoidShooter" },
    { name: "description", content: "Welcome to PixelVoidShooter!" },
  ];
}

export default function Home() {
  useExtend({
    Sprite,
    AnimatedSprite,
    TilingSprite,
    CircularProgressBar,
    BitmapText,
    DisplacementFilter,
    AsciiFilter,
    Graphics,
    Container,
  });

  const wrapperRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center"
    >
      Pixel Void Shooter?
      <div
        ref={wrapperRef}
        className="outline-2 rounded-4xl cursor-none overflow-hidden"
        style={{
          height: dimensions.height,
          width: dimensions.width,
        }}
      >
        <Storage>
          <Application
            resizeTo={wrapperRef}
            background={"#555555"}
            failIfMajorPerformanceCaveat={true}
          >
            <PixelVoidShooterContainer />
          </Application>
        </Storage>
      </div>
    </div>
  );
}

