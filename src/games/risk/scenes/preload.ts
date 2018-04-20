export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadScene"
    });
  }
  preload(): void {
    this.load.image("person", "../assets/games/risk/player.png");
    this.load.spritesheet(
      "office-dude",
      "../assets/games/risk/office-dude.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.image("coin", "../assets/games/risk/coin.png");
  }

  create(): void {
    this.scene.start("MainMenuScene");
  }
}
