import Phaser from "phaser";
import Bomb from "../Bomb";
import Ghost from "../Ghost";
import ScoreLabel from "../ScoreLabel";
export default class GhostBusterScene extends Phaser.Scene {
  constructor() {
    super("ghost-buster-scene");
  }

  init() {
    this.platforms = undefined;
    this.bomb = undefined;
    this.cursors = undefined;
    this.nav_left = false;
    this.nav_right = false;
    this.shoot = false;
    this.speed = 100;
    this.ghost = undefined;
    this.ghostSpeed = 60;
    this.scoreLabel = undefined;
  }
  preload() {
    this.load.image("background", "images/background.png");
    this.load.image("bomb", "images/bomb.png");
    this.load.image("ghost", "images/ghost.png");
    this.load.image("ground", "images/ground.png");
    this.load.spritesheet("player", "images/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    const gameWidth = this.scale.width * 0.5;
    const gameHeight = this.scale.height * 0.5;

    this.add.image(gameWidth, gameHeight, "background");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(255, 490, "ground");
    // this.player = this.physics.add.sprite(250, 450, 'player')
    // this.player.setCollideWorldBounds(true)
    // this.player.setBounce(0.2)

    this.player = this.createPlayer();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.platforms);
    this.bomb = this.physics.add.group({
      classType: Bomb,
      //banyaknya enemy dalam satu kali grup
      maxSize: 10,
      runChildUpdate: true,
    });
    this.ghost = this.physics.add.group({
      classType: Ghost,
      maxSize: 10,
      runChildUpdate: true,
    });
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnGhost,
      callbackScope: this,
      loop: true,
    });
    this.physics.add.overlap(
      this.bomb, // membuat overlap antara player
      this.ghost, // dan stars
      this.hitGhost, // memanggil method collectStar
      null, // proses callback yang tidak dibutuhkan
      this // memastikan overlap pada scene ini
    );

    this.scoreLabel = this.createScoreLabel(330, 16, 0);
  }
  update(time) {
    this.movePlayer(this.player);
  }
  createPlayer() {
    const player = this.physics.add.sprite(250, 450, "player");
    player.setCollideWorldBounds(true);
    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 0 }],
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 4 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 3 }),
      frameRate: 10,
    });
    return player;
  }
  movePlayer(player, time) {
    if (this.cursors.left.isDown || this.nav_left) {
      this.player.setVelocityX(this.speed * -1);
      this.player.anims.play("left", true);
      this.player.setFlipX(false);
    } else if (this.cursors.right.isDown || this.nav_right) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play("right", true);
      this.player.setFlipX(true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(this.speed * -1);
      this.player.anims.play("turn", true);
      this.player.setFlipX(true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
      this.player.anims.play("turn", true);
      this.player.setFlipX(true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if ((this.shoot && time) || this.cursors.space.isDown) {
      const bomb = this.bomb.get(0, 0, "bomb");
      if (bomb) {
        bomb.fire(this.player.x, this.player.y);
      }
    }
  }
  hitGhost(bomb, ghost) {
    bomb.erase(); //destroy laser yg bersentuhan
    ghost.die(); //destroy enemy yg bersentuhan
    //tambahkan kode di bawah ini
    this.scoreLabel.add(10);
    if (this.scoreLabel.getScore() % 100 == 0) {
      this.ghostSpeed += 30;
    }
  }
  spawnGhost() {
    const config = {
      speed: this.ghostSpeed,
      rotation: 0.06,
    };
    const ghosts = this.ghost.get(0, 0, "ghost", config);
    const ghostWidth = ghosts.displayWidth;
    const positionX = Phaser.Math.Between(
      ghostWidth,
      this.scale.width - ghostWidth
    );
    if (ghosts) {
      ghosts.spawn(positionX);
    }
  }
  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "white" };
    const label = new ScoreLabel(this, x, y, score, style).setDepth(1);
    this.add.existing(label);
    return label;
  }
}
