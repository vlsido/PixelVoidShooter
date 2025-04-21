// export interface PlayerProps {
//
// }

export interface StatsProps {
  /**
  * @description Kill count 
  */
  kills: number;
  /**
  * @description Total score 
  */
  score: number;
}

export interface GunProps extends AmmoProps {
  /**
  * @description The gun type
  */
  type: "Pistol" | "Shotgun";
  /**
  * @description Damage dealt with each shot
  */
  damage: number;
}

export interface AmmoProps {
  /**
  * @description Total number of bullets 
  */
  totalBullets: number;
  /**
  * @description Current number of bullets 
  */
  currentBullets: number;
}
