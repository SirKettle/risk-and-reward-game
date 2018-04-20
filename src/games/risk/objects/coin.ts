export class Coin extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "coin");
    this.x = x;
    this.y = y;
    scene.add.existing(this);
  }

  public relocate(x, y): void {
    this.x = x;
    this.y = y;
  }
}
