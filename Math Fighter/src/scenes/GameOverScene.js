import Phaser from "phaser";
var replayButton;
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("over-scene");
  }
  init(data) {
    this.replayButton = undefined;
    this.score = data.score;
  }
  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("game-over-text", "images/gameover.png");
    this.load.image("replay-button", "images/replay.png");
    //load image teks game over disini

    //load image tombol replay disini
  }
  create() {
    this.add.image(200, 320, "background");
    this.add.image(240, 200, "game-over-text");
    this.add.text(170, 300, "Score: " + this.score, {
      fontSize: "32px",
      fill: "black",
    });
    this.replayButton = this.add
      .image(240, 400, "replay-button")
      .setInteractive();
    // berpindah ke bunny jump scene ketika button di klik
    this.replayButton.once(
      "pointerup",
      () => {
        this.scene.start("math-fighter-scene");
      },
      this
    );
    // this.add.text(65, 300, "SCORE:", { fontSize: "60px", fill: "#000" });
    // //menambahkan nilai score
    // this.add.text(300, 300, this.score, { fontSize: "60px", fill: "#000" });
  }
}
