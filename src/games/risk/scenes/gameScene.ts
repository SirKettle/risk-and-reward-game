import { Person } from "../objects/person";
import { Coin } from "../objects/coin";
import { Score } from "../objects/score";

export class GameScene extends Phaser.Scene {
  // field and game setting
  private fieldSize: number;
  private gameHeight: number;
  private gameWidth: number;
  private boardWidth: number;
  private boardHeight: number;
  private horizontalFields: number;
  private verticalFields: number;
  private tick: number;
  private dayNo: number;

  // objects
  private player: Person;
  private coin: Coin;
  private score: Score;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.fieldSize = 32;
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;
    this.boardWidth = this.gameWidth - 2 * this.fieldSize;
    this.boardHeight = this.gameHeight - 2 * this.fieldSize;
    this.horizontalFields = this.boardWidth / this.fieldSize;
    this.verticalFields = this.boardHeight / this.fieldSize;
    this.tick = 0;
    this.dayNo = 0;
  }

  create(): void {
    this.player = new Person(this, this.fieldSize);
    this.coin = new Coin(this, this.rndXPos(), this.rndYPos());
    this.score = new Score(this, 20, 5);

    const timer = this.time.delayedCall(
      1000,
      this.updateTime,
      // TODO how do we make this timer repeat using params?
      [{ repeat: true }],
      this
    );
  }

  updateTime(): void {
    console.log("u", Date.now());
  }

  update(time): void {
    if (this.tick === 0) {
      this.tick = time;
    }

    this.player.update();
    this.checkCollision();
    this.score.update(
      this.player.getCash(),
      this.player.getInvested(),
      this.player.getWealth(),
      this.player.getIfLeftInCashAmount(),
      `Day ${this.dayNo}`,
      this.player.getRiskLevel()
    );

    if (time - this.tick > 1000) {
      this.player.updateInvestments(this.dayNo);
      this.tick = time;
      this.dayNo += 1;
    }
  }

  private checkCollision(): void {
    // player <-> coin collision
    if (
      this.player.getBody().x === this.coin.x &&
      this.player.getBody().y === this.coin.y
    ) {
      this.player.addCoin();
      this.coin.relocate(this.rndXPos(), this.rndYPos());
    }
  }

  private rndXPos(): number {
    return (
      Phaser.Math.RND.between(1, this.horizontalFields - 1) * this.fieldSize
    );
  }

  private rndYPos(): number {
    return Phaser.Math.RND.between(1, this.verticalFields - 1) * this.fieldSize;
  }
}
