import { useApplication } from "@pixi/react";
import Moon from "./Moon";
import Mountains from "./Mountains";
import Stars from "./Stars";
import TreesContainer from "./TreesContainer";
import Rails from "./Ground/Rails";
import Ground from "./Ground/Ground";

function ChooChooTrain() {
  const app = useApplication().app;


  return (
    <pixiContainer>
      <Stars />
      <Moon />
      <Mountains />
      <Mountains x={app.screen.width} />
      <TreesContainer />
      <Ground />
    </pixiContainer>
  );
}

export default ChooChooTrain;
