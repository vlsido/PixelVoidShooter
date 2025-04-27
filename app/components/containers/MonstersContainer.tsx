import {
  useCallback,
  useMemo
} from "react";
import {
  atom,
  useAtom,
  useSetAtom
} from "jotai";
import {
  FLYING_MONSTER,
  FLYING_MONSTER_SCORE,
  FLYING_MONSTER_TEXTURE_NAME,
  SLOW_MONSTER,
  SLOW_MONSTER_SCORE,
  SLOW_MONSTER_TEXTURE_NAME
} from "../constants/monsters";
import Monster from "../sprites/Monster/Monster";
import { scoreAtom } from "../atoms/gameAtoms";

type TMonster = {
  textureName: string;
  health: number;
  speed: number;
}

function MonstersContainer() {
  const [monsters, setMonsters] = useAtom<TMonster[]>(
    useMemo(() => atom<TMonster[]>([
      SLOW_MONSTER,
      FLYING_MONSTER
    ]), []));

  const dispatchScore = useSetAtom(scoreAtom);

  const onKillMonster = useCallback((textureName: string) => {
    switch (textureName) {
      case SLOW_MONSTER_TEXTURE_NAME:
        dispatchScore({ type: "add", payload: SLOW_MONSTER_SCORE });
        break;
      case FLYING_MONSTER_TEXTURE_NAME:
        dispatchScore({ type: "add", payload: FLYING_MONSTER_SCORE });
        break;
    }

    const newMonster = Math.round(Math.random()) === 1
      ? SLOW_MONSTER
      : FLYING_MONSTER;

    setMonsters([...monsters, newMonster]);
  }, [monsters]);

  return (
    <pixiContainer>
      {
        monsters.map((monster, index) =>
          <Monster
            key={index}
            textureName={monster.textureName}
            health={monster.health}
            speed={monster.speed}
            onKill={onKillMonster}
          />
        )
      }
    </pixiContainer>
  );
}

export default MonstersContainer;
