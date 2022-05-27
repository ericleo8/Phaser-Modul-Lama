import Phaser from "phaser";
export default class AmongUsScene extends Phaser.Scene {
  constructor() {
    super("among-us-scene");
  }
  preload() {
    this.load.image("maps", "images/Maps.png");
    this.load.image("cyan", "images/Cyan.png");
    this.load.image("orange", "images/Orange.png");
    this.load.image("pink", "images/Pink.png");
    this.load.image("red", "images/Red.png");
  }
  create() {
    this.add.image(960, 540, "maps");
    this.add.image(1000, 400, "red");
    this.add.image(1750, 400, "cyan").setScale(0.5);
  }
}
