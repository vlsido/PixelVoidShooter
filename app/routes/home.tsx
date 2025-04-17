import type { Route } from "./+types/home";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import FishPond from "~/components/FishPond/FishPond";
import JetAnimatedSprite from "~/components/sprites/animated/JetAnimatedSprite";
import { BunnySprite } from "~/components/sprites/BunnySprite";

extend({
  Sprite,
  Graphics,
  Container
})

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PixelVoidShooter" },
    { name: "description", content: "Welcome to PixelVoidShooter!" },
  ];
}

export default function Home() {
  return (
    <Application
      background={"#1099bb"}
    >
      <FishPond />
    </Application>
  );
}

