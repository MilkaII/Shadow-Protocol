class ScoreBoard {
  static width = 300;
  static height = 100;
  static x = 10;
  static y = 10;
  constructor(game) {
    this.game = game;
  }
  draw() {
    fill(100, 200, 100);
    stroke(0, 0, 0);
    fill(0, 0, 0);
    image(GameInfo.images.chipplayer, ScoreBoard.x + 70, ScoreBoard.y + 530, 120, 120);
    image(GameInfo.images.chipopp, ScoreBoard.x + 70, ScoreBoard.y + 400, 120, 120);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(NORMAL);
    fill(255, 255, 255);
    text(
      this.game.player.chips,
      ScoreBoard.x + 70,
      ScoreBoard.y + 530
    );
    fill(255, 255, 255);
    text(
      this.game.opponents[0].chips,
      ScoreBoard.x + 70,
      ScoreBoard.y + 400
    );
  }

  update(game) {
    this.game = game;
  }
}
