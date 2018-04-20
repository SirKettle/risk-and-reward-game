/// <reference path='../../phaser.d.ts'/>

import "phaser";
import { BootScene } from "./scenes/bootScene";
import { PreloadScene } from "./scenes/preload";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";

// main game configuration
const config: GameConfig = {
  title: "Risk!",
  url: "https://github.com/SirKettle/risk-and-reward-game",
  version: "1.0",
  width: 480,
  height: 480,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 800 },
      debug: false
    }
  },
  scene: [BootScene, PreloadScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  backgroundColor: "#23AB54",
  pixelArt: true,
  antialias: false
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
};
