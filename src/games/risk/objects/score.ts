const toMoneyFormat = (amount: number): string => {
  return `£${amount.toFixed(2)}`;
};

const renderScoreText = (
  cash: number,
  invested: number,
  wealth: number,
  ifLeftInCashAmount: number,
  time: string,
  riskLevel: string
) => `
Cash: ${toMoneyFormat(cash)}
---
Risk level: ${riskLevel}
Invested: ${toMoneyFormat(invested)}
---
Total wealth: ${toMoneyFormat(wealth)}
---
${time}
Investing has saved you ${toMoneyFormat(wealth - ifLeftInCashAmount)}
`;

export class Score {
  private text: Phaser.GameObjects.Text;

  constructor(scene, x, y) {
    this.text = scene.add.text(x, y, "", {
      fontFamily: "Courier",
      fontSize: "15px",
      fontStyle: "",
      fill: "#4df24c"
    });
  }

  public update(
    cash: number,
    invested: number,
    wealth: number,
    ifLeftInCashAmount: number,
    time: string,
    riskLevel: string
  ): void {
    const scoreText = renderScoreText(
      cash,
      invested,
      wealth,
      ifLeftInCashAmount,
      time,
      riskLevel
    );
    this.text.setText(scoreText);
  }
}
