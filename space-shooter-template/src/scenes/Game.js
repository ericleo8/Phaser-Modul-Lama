import Phaser from "../lib/phaser.js";
import Laser from "./Laser.js";
import Enemy from "./Enemy.js";
import Start from "./Start.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("shooter-space");
  }
  init() {}
  preload() {
    this.load.image("background", "assets/background.jpg");
  }
  create() {
    this.add.image(240, 320, "background");
  }
  update() {}
}
