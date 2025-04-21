import type { Route } from "./+types/home";
import { Application, useExtend } from "@pixi/react";
import { AsciiFilter } from "pixi-filters";
import { AnimatedSprite, BitmapText, Container, DisplacementFilter, Graphics, Sprite, Text, TilingSprite } from "pixi.js";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import PixelVoidShooterContainer from "~/components/containers/PixelVoidShooterContainer";

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
    BitmapText,
    DisplacementFilter,
    AsciiFilter,
    Graphics,
    Container,
  });

  const wrapperRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });

  // const resize = useCallback(() => {
  //   const height = window.innerHeight / 2;
  //   const width = height * 2;
  //   setDimensions({ width, height });
  // }, []);

  // useLayoutEffect(() => {
  //   resize();
  //
  //   window.addEventListener("resize", resize);
  //
  //   return () => window.removeEventListener("resize", resize);
  // }, []);

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
        <Application
          resizeTo={wrapperRef}
          background={"#555555"}
          failIfMajorPerformanceCaveat={true}
        >
          <PixelVoidShooterContainer />
        </Application>
      </div>
    </div>
  );
}

