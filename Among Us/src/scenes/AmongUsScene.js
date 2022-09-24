import Phaser from "phaser";
export default class AmongUsScene extends Phaser.Scene {
  constructor() {
    super("among-us-scene");
  }
  init(){

  }
  preload() {
    this.load.image("maps", "images/Maps.png");
    this.load.image("playerRed", "images/Red.png");
  }
  create() {
    this.add.image(960, 540, "maps");                                 
  }
  update(){
    
  }
}
