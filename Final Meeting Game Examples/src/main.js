import Phaser from "./lib/phaser.js";
import Game from "./scenes/Game.js";

const height = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  pixelArt: false,
  roundPixels: false,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "canvas-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Game],
};

const game = new Phaser.Game(config);
