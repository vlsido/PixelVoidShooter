import Health from "../graphics/Health";
import Ammo from "../text/Ammo";

function HUD() {

  return (
    <pixiContainer>
      <Ammo />
      <Health />
    </pixiContainer>
  );
}

export default HUD;
