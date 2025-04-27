import { useApplication, useTick } from "@pixi/react";
import { useAtom, useAtomValue } from "jotai";
import {
  Container,
  Graphics,
  Sprite,
  Text,
  type BitmapText,
  type Ticker
} from "pixi.js";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import { scoreAtom } from "../atoms/gameAtoms";

const MAX_DIGIT = "9";

function Score() {
  const app = useApplication().app;
  const score = useAtomValue<number>(scoreAtom);
  const maskRef = useRef<Graphics | null>(null);
  const containerRef = useRef<Container | null>(null);
  const bitmapCurrRef = useRef<BitmapText | null>(null);
  const bitmapCurrStartY = useRef<number>(0);
  const bitmapNextRef = useRef<BitmapText | null>(null);
  const bitmapNextStartY = useRef<number>(0);
  const textRef = useRef<Text | null>(null);

  const onDrawFrame = useCallback((graphics: Graphics) => {
    graphics.rect(0, 0, 208, 208)
      .fill(0x666666)
      .stroke({ color: 0xffffff, width: 4, alignment: 0 });
  }, []);

  const onDrawMask = useCallback((graphics: Graphics) => {
    // graphics.rect(0, 0, 200, 36)
    //   .fill(0xffffff);
  }, []);


  useEffect(() => {
    if (bitmapCurrRef.current === null) return;

    if (score < 10) {
      bitmapCurrRef.current.text = "00000" + score.toString();
    } else if (score < 100) {
      bitmapCurrRef.current.text = "0000" + score.toString();
    } else if (score < 1000) {
      bitmapCurrRef.current.text = "000" + score.toString();
    } else if (score < 10000) {
      bitmapCurrRef.current.text = "00" + score.toString();
    } else if (score < 100000) {
      bitmapCurrRef.current.text = "0" + score.toString();
    } else if (score < 1000000) {
      bitmapCurrRef.current.text = score;
    }
  }, [score]);

  // const animateScore = useCallback((time: Ticker) => {
  //   if (bitmapCurrRef.current === null || bitmapNextRef.current === null) return;
  //   if (containerRef.current === null || maskRef.current === null) return;
  //   containerRef.current.mask = maskRef.current;
  //   elapsed += time.deltaTime;
  //   console.log(bitmapCurrRef.current.text);
  //   if (bitmapCurrRef.current.text !== score.toString()) {
  //     bitmapCurrRef.current.y -= 5;
  //     bitmapNextRef.current.y -= 5;
  //
  //     if (bitmapCurrRef.current.y < -24) {
  //       bitmapCurrRef.current.y = 24;
  //       const nextNum = parseInt(bitmapCurrRef.current.text) + 1;
  //       if (nextNum > 9) {
  //         bitmapCurrRef.current.text = 0;
  //       } else {
  //         bitmapCurrRef.current.text = nextNum;
  //       }
  //     }
  //
  //     if (bitmapNextRef.current.y < -24) {
  //       bitmapNextRef.current.y = 24;
  //       const nextNum = parseInt(bitmapNextRef.current.text) + 1;
  //       if (nextNum > 9) {
  //         bitmapNextRef.current.text = 1;
  //       } else {
  //         bitmapNextRef.current.text = nextNum;
  //       }
  //     }
  //
  //     // bitmapCurrStartY.current = bitmapCurrRef.current.y; 
  //
  //     // if (bitmapCurrRef.current.text === MAX_DIGIT) {
  //     //   bitmapNextRef.current.text = 0;
  //     // } else {
  //     //   bitmapNextRef.current.text = parseInt(bitmapCurrRef.current.text) + 1;
  //     // }
  //
  //
  //   }
  //   // textRef.current.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100.0;
  //   // console.log(textRef.current.y);
  // }, []);

  // const animateScore = useCallback(() => {
  //   if (bitmapCurrRef.current === null || bitmapNextRef.current === null) return;
  //
  //
  //   const displayedScore = parseInt(bitmapCurrRef.current.text);
  //
  //   if (displayedScore < score) {
  //     bitmapCurrRef.current.y -= 5;
  //     bitmapNextRef.current.y -= 5;
  //
  //     if (bitmapCurrRef.current.y < -24) {
  //       bitmapCurrRef.current.y = 24;
  //
  //       bitmapCurrRef.current.text = score;
  //
  //     }
  //
  //     if (bitmapNextRef.current.y < -24) {
  //       bitmapNextRef.current.y = 24;
  //
  //       bitmapNextRef.current.text = score;
  //
  //     }
  //
  //   }
  // }, [score]);

  // useTick(animateScore);

  return (
    <pixiContainer
      ref={containerRef}
      position={{ x: app.screen.width * 0.8, y: 4 }}
    >
      <pixiGraphics
        ref={maskRef}
        draw={onDrawMask}
      />
      <pixiBitmapText
        ref={bitmapCurrRef}
        text={'000000'}
        style={
          {
            fontSize: 36,
            fontFamily: "Minecraft",
            wordWrap: true,
            wordWrapWidth: 180,
            fill: 0xffffff,
            stroke: { color: 0x000000, width: 1, join: 'round' },
          }
        }
        x={10}
      />
    </pixiContainer>
  );
  return (
    <pixiContainer
      ref={containerRef}
      position={{ x: app.screen.width * 0.8, y: 4 }}
    >
      <pixiGraphics
        ref={maskRef}
        draw={onDrawMask}
      />
      <pixiBitmapText
        ref={bitmapCurrRef}
        text={'000000'}
        style={
          {
            fontSize: 36,
            fill: 0x212221,
            wordWrap: true,
            wordWrapWidth: 180
          }
        }
        x={10}
      />
    </pixiContainer>
  );
}
// <pixiBitmapText
// ref={bitmapNextRef}
// text={'000000'}
// style={
//   {
//     fontSize: 24,
//     fill: 0x1010ff,
//     wordWrap: true,
//     wordWrapWidth: 180
//   }
// }
// x={10}
// y={24}
// />

export default Score;
