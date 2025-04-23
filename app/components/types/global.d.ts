import { type PixiReactElementProps } from "@pixi/react"
import { type FancyButton, type CircularProgressBar } from "@pixi/ui"

declare module "@pixi/react" {
  interface PixiElements {
    circularProgressBar: PixiReactElementProps<typeof CircularProgressBar>;
    fancyButton: PixiReactElementProps<typeof FancyButton>;
  }
}
