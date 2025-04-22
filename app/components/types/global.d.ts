import { type PixiReactElementProps } from "@pixi/react"
import { type CircularProgressBar } from "@pixi/ui"

declare module "@pixi/react" {
  interface PixiElements {
    circularProgressBar: PixiReactElementProps<typeof CircularProgressBar>;
  }
}
