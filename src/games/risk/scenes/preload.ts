export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadScene"
    });
  }
  preload(): void {
    this.load.image("person", "../assets/games/risk/player.png");
    this.load.image("coin", "../assets/games/risk/coin.png");
  }

  create(): void {
    this.scene.start("MainMenuScene");
  }
}
