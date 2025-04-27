import Health from "../graphics/Health";
import Ammo from "../text/Ammo";
import Score from "../text/Score";

function HUD() {

  return (
    <pixiContainer>
      <Ammo />
      <Health />
      <Score />
    </pixiContainer>
  );
}

export default HUD;
