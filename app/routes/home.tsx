import type { Route } from "./+types/home";
import { Application, extend, useExtend } from "@pixi/react";
import { AsciiFilter } from "pixi-filters";
import { Container, DisplacementFilter, Graphics, Sprite, TilingSprite } from "pixi.js";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ChooChooTrain from "~/components/ChooChooTrain/ChooChooTrain";
import FishPond from "~/components/FishPond/FishPond";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PixelVoidShooter" },
    { name: "description", content: "Welcome to PixelVoidShooter!" },
  ];
}

export default function Home() {
  useExtend({
    Sprite,
    TilingSprite,
    DisplacementFilter,
    AsciiFilter,
    Graphics,
    Container,
  });

  const wrapperRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resize = useCallback(() => {
    const height = window.innerHeight / 2;
    const width = height * 2;
    setDimensions({ width, height });
  }, []);

  useLayoutEffect(() => {
    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center"
    >
      Pixel Void Shooter?
      <div
        ref={wrapperRef}
        className="outline-2 rounded-4xl overflow-hidden"
        style={{
          height: dimensions.height,
          width: dimensions.width
        }}
      >
        <Application
          resizeTo={wrapperRef}
          background={"#021f4b"}
          failIfMajorPerformanceCaveat={true}
        >
          <ChooChooTrain />
        </Application>
      </div>
    </div>
  );
}

