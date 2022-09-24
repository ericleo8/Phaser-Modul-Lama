import Phaser from "./lib/phaser.js";

import CollectingStarsScene from "./scenes/CollectingStarsScene.js";
export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [CollectingStarsScene],
  //   scale: {
  //     mode: Phaser.Scale.FIT,
  //     autoCenter: Phaser.Scale.CENTER_BOTH,
  //   },
});
