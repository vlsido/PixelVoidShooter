import {
  useCallback,
  useMemo
} from "react";
import {
  useApplication,
  useTick
} from "@pixi/react";
import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import {
  Texture,
  Ticker
} from "pixi.js";
import { healthAtom } from "~/components/atoms/playerAtoms";
import {
  SLOW_MONSTER_HEALTH,
  SLOW_MONSTER_TEXTURE_NAME,
  type AbstractMonster
} from "~/components/constants/monsters";
import { isPausedAtom } from "~/components/atoms/gameAtoms";

type SlowMonsterState = "GO" | "ATTACK_STANCE" | "ATTACK";

interface SlowMonsterProps extends AbstractMonster { }

function SlowMonster(props: SlowMonsterProps) {
  const app = useApplication().app;

  const dispatchHealth = useSetAtom(healthAtom);

  const isPaused = useAtomValue<boolean>(isPausedAtom);

  const x = useMemo(() =>
    Math.random()
    * (app.screen.width * 0.85 - app.screen.width * 0.15)
    + app.screen.width
    * 0.15, []);

  const [
    state,
    setState
  ] = useAtom<SlowMonsterState>(useMemo(() => atom<SlowMonsterState>("GO"), []));

  const textures = useMemo(() => {
    let textureState = "";
    switch (state) {
      case "GO":
        textureState = "";
        break;
      case "ATTACK_STANCE":
        textureState = "AttackStance";
        break;
      case "ATTACK":
        textureState = "Attack";
    }
    const frames = [];

    for (let frameIndex = 0; frameIndex < 3; frameIndex++) {
      frames.push(Texture.from(`${SLOW_MONSTER_TEXTURE_NAME}${textureState}${frameIndex}.png`));
    }

    return frames;
  }, [state]);

  const handleAnimation = useCallback((ticker: Ticker) => {
    props.onMoveTowardsPlayer(ticker, x);

    if (props.spriteRef.current === null || isPaused === true) return;

    const monsterScaleX = props.spriteRef.current.scale.x;

    if (monsterScaleX >= 3.5) {
      if (state === "GO") {
        setState("ATTACK_STANCE");
      }
    }

    const dx = ticker.deltaTime;

    switch (state) {
      case "ATTACK":
        props.animationTimerRef.current = props.animationTimerRef.current + dx;
        if (props.animationTimerRef.current > 45 && props.hasMadeDamageToPlayerRef.current === false) {
          props.hasMadeDamageToPlayerRef.current = true;
          dispatchHealth({ type: "remove", payload: 2 });
        } else if (props.animationTimerRef.current > 90) {
          props.animationTimerRef.current = 0;
          setState("ATTACK_STANCE");
        }
        break;
      case "ATTACK_STANCE":
        props.animationTimerRef.current = props.animationTimerRef.current + dx;
        if (props.animationTimerRef.current > 180) {
          props.hasMadeDamageToPlayerRef.current = false;
          props.animationTimerRef.current = 0;
          setState("ATTACK");
        }
    }
  }, [
    props.health,
    isPaused,
    state
  ]);

  useTick(handleAnimation);

  if (textures.length === 0) return null;

  return (
    <pixiContainer
      ref={props.containerRef}
    >
      <pixiContainer
        ref={props.healthContainerRef}
      >
        {Array.from({ length: SLOW_MONSTER_HEALTH }).map((_, index) =>
          <pixiGraphics
            key={index}
            ref={(ref) => {
              if (ref === undefined) return;

              props.healthPointsGraphicsRefs.current[index] = ref;
            }}
            draw={(graphics) => props.onDrawHealthPoint(graphics, index)}
          />
        )}
      </pixiContainer>
      <pixiAnimatedSprite
        ref={props.spriteRef}
        textures={textures}
        eventMode="static"
        onPointerDown={props.onTakeDamage}
        scale={1}
        animationSpeed={0.1}
        x={x}
      />
    </pixiContainer>
  );
}

export default SlowMonster;
