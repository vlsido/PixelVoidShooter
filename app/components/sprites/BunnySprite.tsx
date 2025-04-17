import {
  Assets,
  Sprite,
  Texture,
  Ticker,
} from 'pixi.js';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useApplication, useTick } from '@pixi/react';

export function BunnySprite() {

  const spriteRef = useRef<Sprite | null>(null)

  const app = useApplication().app;

  const [texture, setTexture] = useState<Texture>(Texture.EMPTY)
  const [isHovered, setIsHover] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)

  const angleRef = useRef<number>(0);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load('https://pixijs.com/assets/bunny.png')
        .then((result) => {
          setTexture(result)
        });

      if (spriteRef.current) {
        spriteRef.current.anchor.set(0.5);
        spriteRef.current.x = app.screen.width / 2;
        spriteRef.current.y = app.screen.height / 2;
      }
    }
  }, [texture]);

  const animateRotation = useCallback((time: Ticker) => {
    if (spriteRef.current) {
      angleRef.current += 0.02 * time.deltaTime;
      const angle = angleRef.current;
      spriteRef.current.x = (app.screen.width / 2) + 150 * Math.sin(angle);
      spriteRef.current.y = (app.screen.height / 2) + 175 * Math.sin(angle) * Math.cos(angle);

      spriteRef.current.rotation -= 0.01 * time.deltaTime;
    }
  }, []);

  useTick((time) => animateRotation(time));

  return (
    <pixiContainer>
      <pixiSprite
        ref={spriteRef}
        anchor={0.5}
        eventMode={'static'}
        onClick={(event) => setIsActive(!isActive)}
        onPointerOver={(event) => setIsHover(true)}
        onPointerOut={(event) => setIsHover(false)}
        scale={isActive ? 2 : 4}
        texture={texture}
        x={100}
        y={100} />
      <pixiGraphics draw={(graphics) => {
        graphics.clear();
        graphics.setFillStyle({ color: 'red' });
        graphics.roundRect(20, 20, 200, 20, 60);
        graphics.fill();
      }} />
    </pixiContainer>
  );
}

