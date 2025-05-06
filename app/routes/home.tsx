import {
  CircularProgressBar,
  FancyButton
} from "@pixi/ui";
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
  Text,
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
    FancyButton,
    CircularProgressBar,
    Text,
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
      className="h-screen w-screen flex flex-col items-center justify-center bg-[url(/space.jpg)]"
    >
      <p className="font-[minecraft] text-6xl mb-8 pt-4 pl-4 pr-2 bg-black/90 rounded-xl align-[20px]">
        Pixel Void Shooter
      </p>
      <div
        ref={wrapperRef}
        className="outline-2 rounded-4xl mb-16 cursor-none overflow-hidden"
        style={{
          height: dimensions.height,
          width: dimensions.width,
        }}
      >
        <Storage>
          <Application
            resizeTo={wrapperRef}
            background={0x3c35af}
            failIfMajorPerformanceCaveat={true}
          >
            <PixelVoidShooterContainer />
          </Application>
        </Storage>
      </div>

    </div>
  );
}

