import PlanksContainer from "./PlanksContainer";
import Rails from "./Rails";
import Snow from "./Snow";

function Ground() {


  return (
    <pixiContainer>
      <Rails />
      <PlanksContainer />
      <Snow />
    </pixiContainer>
  );
}

export default Ground;
