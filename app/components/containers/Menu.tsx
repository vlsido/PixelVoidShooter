import { useCallback } from "react";

function Menu() {

  const onDrawMenuBackgroundGraphics = useCallback(() => { }, []);

  return (
    <pixiContainer>
      <pixiGraphics
        draw={onDrawMenuBackgroundGraphics}
      />
    </pixiContainer>
  );
}

export default Menu;
