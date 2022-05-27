import Phaser from "phaser";



// import HelloWorldScene from './scenes/HelloWorldScene'
import amongUsScene from "./scenes/amongUs";
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [amongUsScene],
};

export default new Phaser.Game(config);
