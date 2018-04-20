enum DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

enum RISK_LEVEL {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}

enum KEYBOARD_EVENTS {
  INVEST = "keydown_I",
  TOGGLE_RISK = "keydown_T",
  UP = "keydown_UP",
  DOWN = "keydown_DOWN",
  LEFT = "keydown_LEFT",
  RIGHT = "keydown_RIGHT"
}

type MinMax = {
  min: number;
  max: number;
};

function getMinMaxPercentage(riskLevel: RISK_LEVEL): MinMax {
  if (riskLevel === RISK_LEVEL.HIGH) {
    return {
      min: -15,
      max: 25
    };
  }

  if (riskLevel === RISK_LEVEL.MEDIUM) {
    return {
      min: -10,
      max: 15
    };
  }

  return {
    min: -5,
    max: 10
  };
}

export class Person {
  private size: number;
  private cash: number;
  private invested: number;
  private dividends: number;
  private ifLeftInCashAmount: number;
  private direction: DIRECTION;
  private riskLevel: RISK_LEVEL;
  private cursors: any;
  private inputKeys: any;
  private sprite: Phaser.GameObjects.Image;

  public getCash(): number {
    return this.cash;
  }
  public getInvested(): number {
    return this.invested;
  }
  public getWealth(): number {
    return this.cash + this.invested;
  }
  public getIfLeftInCashAmount(): number {
    return this.ifLeftInCashAmount;
  }
  public getRiskLevel(): RISK_LEVEL {
    return this.riskLevel;
  }
  public getBody(): Phaser.GameObjects.Image {
    return this.sprite;
  }

  constructor(scene: Phaser.Scene, fieldSize: number) {
    // set variables
    this.size = fieldSize;
    this.cash = 10;
    this.dividends = 0;
    this.invested = 0;
    this.direction = null;
    this.ifLeftInCashAmount = this.cash;
    this.riskLevel = RISK_LEVEL.MEDIUM;

    // input events
    scene.input.keyboard.on(KEYBOARD_EVENTS.UP, this.moveUp, this);
    scene.input.keyboard.on(KEYBOARD_EVENTS.DOWN, this.moveDown, this);
    scene.input.keyboard.on(KEYBOARD_EVENTS.LEFT, this.moveLeft, this);
    scene.input.keyboard.on(KEYBOARD_EVENTS.RIGHT, this.moveRight, this);

    scene.input.keyboard.on(KEYBOARD_EVENTS.INVEST, this.investCash, this);
    scene.input.keyboard.on(
      KEYBOARD_EVENTS.TOGGLE_RISK,
      this.toggleRiskLevel,
      this
    );

    this.renderPersonGraphic(scene);
  }

  private renderPersonGraphic(scene: Phaser.Scene): void {
    this.sprite = scene.add.image(0, 0, "person");
    scene.physics.world.enable(this.sprite);
  }

  public update(): void { }

  private moveUp(): void {
    this.updatePosition(0, -this.size);
  }

  private moveDown(): void {
    this.updatePosition(0, this.size);
  }

  private moveLeft(): void {
    this.updatePosition(-this.size, 0);
  }

  private moveRight(): void {
    this.updatePosition(this.size, 0);
  }

  private updatePosition(x: number, y: number): void {
    this.sprite.x += x;
    this.sprite.y += y;
  }

  public updateInvestments(dayNo): void {
    if (this.invested <= 0) {
      return;
    }

    if (dayNo % 10 === 0) {
      const percentageRange = getMinMaxPercentage(this.riskLevel);
      const growthPercentage = Phaser.Math.RND.between(
        percentageRange.min,
        percentageRange.max
      );

      const growth = this.invested * growthPercentage / 100;

      this.invested += growth;
    }
  }

  public investCash(): void {
    this.invested += this.cash;
    this.cash = 0;
  }

  private toggleRiskLevel(): void {
    switch (this.riskLevel) {
      case RISK_LEVEL.LOW:
        this.riskLevel = RISK_LEVEL.MEDIUM;
        break;
      case RISK_LEVEL.MEDIUM:
        this.riskLevel = RISK_LEVEL.HIGH;
        break;
      case RISK_LEVEL.HIGH:
        this.riskLevel = RISK_LEVEL.LOW;
        break;
    }
  }

  public addCoin(): void {
    this.cash++;
    this.ifLeftInCashAmount++;
  }
}
