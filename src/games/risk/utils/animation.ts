export default function makeAnimations(scene: Phaser.Scene) {
  const config = {
    key: "walk",
    frames: scene.anims.generateFrameNumbers("dude", { start: 0, end: 1 })
  };
  scene.anims.create(config);
}
