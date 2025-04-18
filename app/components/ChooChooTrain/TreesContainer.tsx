import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useApplication, useTick } from "@pixi/react";
import type { Graphics, Ticker } from "pixi.js";
import type { ITreeProps } from "./types";

function TreesContainer() {
  const app = useApplication().app;

  const [trees, setTrees] = useState<ITreeProps[]>([]);

  const treesRefs = useRef<(Graphics | null)[]>([]);

  useEffect(() => {
    const treeWidth = 200;
    const spacing = 15;
    const count = app.screen.width / (treeWidth + spacing) + 1;

    let treesArr = [];

    for (let index = 0; index < count; index++) {
      const treeHeight = 225 + Math.random() * 50;
      const tree: ITreeProps = {
        index: index,
        ref: null,
        width: treeWidth,
        height: treeHeight,
        x: index * (treeWidth + spacing),
        y: 0
      };

      treesArr.push(tree);
    }

    setTrees(treesArr);
  }, []);

  const onDrawGraphics = useCallback((graphics: Graphics, tree: ITreeProps) => {
    graphics.clear();
    graphics.y = app.screen.height - 20;
    const trunkWidth = 30;
    const trunkHeight = tree.height / 4;
    const trunkColor = 0x563929;
    graphics.rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight)
      .fill({ color: trunkColor });

    const crownHeight = tree.height - trunkHeight;
    const crownLevels = 4;
    const crownLevelHeight = crownHeight / crownLevels;
    const crownWidthIncrement = tree.width / crownLevels;
    const crownColor = 0x264d3d;

    for (let index = 0; index < crownLevels; index++) {
      const y = -trunkHeight - crownLevelHeight * index;
      const levelWidth = tree.width - crownWidthIncrement * index;
      const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0;

      graphics
        .moveTo(-levelWidth / 2, y)
        .lineTo(0, y - crownLevelHeight - offset)
        .lineTo(levelWidth / 2, y)
        .fill({ color: crownColor });

    }
  }, [app.screen.height]);

  const animateTrees = useCallback((time: Ticker) => {
    const dx = time.deltaTime * 3;

    const treeWidth = 200;
    const spacing = 15;
    const count = app.screen.width / (treeWidth + spacing) + 1;
    treesRefs.current.forEach((tree) => {
      if (tree == null) return;

      tree.x -= dx;

      if (tree.x <= -(treeWidth / 2 + spacing)) {
        tree.x += count * (treeWidth + spacing) + spacing * 3;
      }
    });
  }, [trees]);

  useTick(animateTrees);


  return (
    <pixiContainer>
      {trees.map((tree, index) =>
        <pixiGraphics
          key={index}
          ref={(ref) => {
            if (ref === undefined) return;
            treesRefs.current[index] = ref
          }}
          draw={(graphics) => onDrawGraphics(graphics, tree)}
          x={tree.x}
          y={tree.y}
        />
      )}
    </pixiContainer>
  );
}

export default TreesContainer;
