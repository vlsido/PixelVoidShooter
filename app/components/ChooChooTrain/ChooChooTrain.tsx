import { useApplication } from "@pixi/react";
import Moon from "./Moon";
import Mountains from "./Mountains";
import Stars from "./Stars";
import TreesContainer from "./TreesContainer";
import Ground from "./Ground/Ground";
import TrainHead from "./Train/TrainHead";
import TrainSmoke from "./Train/TrainSmoke";

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
      <pixiContainer>
        <TrainHead />
        <TrainSmoke />
      </pixiContainer>
    </pixiContainer>
  );
}

export default ChooChooTrain;
