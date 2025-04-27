import {
  useEffect,
  useRef
} from "react";
import { useApplication } from "@pixi/react";
import { useAtomValue } from "jotai";
import {
  Container,
  type BitmapText,
} from "pixi.js";
import { scoreAtom } from "../atoms/gameAtoms";

function Score() {
  const app = useApplication().app;
  const score = useAtomValue<number>(scoreAtom);
  const containerRef = useRef<Container | null>(null);
  const bitmapCurrRef = useRef<BitmapText | null>(null);

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

  return (
    <pixiContainer
      ref={containerRef}
      position={{ x: app.screen.width * 0.8, y: 4 }}
    >
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

}


export default Score;
