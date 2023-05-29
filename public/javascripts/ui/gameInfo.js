// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo {
  // settings variables
  static width = 1879;
  static height = 977;

  static loading = true;

  // data
  static game;
  static gameboard;
  static cardsInBoard;
  static gamebench;
  static cardsInBench;
  static images = {};
  static sounds = {};
  static selectedCards = [];

  // renderers
  static scoreBoard;
  static scoreWindow;
  static yourturn;

  static matchdeck;
  static cardsindeck;
  static playerDeck;
  static oppDeck;
  static board;
  static bench;
  static turn;

  // verification
  static dragging = false;
  static dragbenchtoboard = false;
  static cardattack = false;
  static cardattackend = false;
  static yourturntimer = true;

  // buttons
  static endturnButtonp;
  static endturnButtonw;
  static choosedeck1button;
  static choosedeck2button;

  // spans/divs
  static titlechoosedeck;
  static titleready;
  static subtitleready;
  static loaderready;
  static loaderreadyspan1;
  static loaderreadyspan2;
  static loaderreadyspan3;
  static loaderreadyspan4;

  // Write your UI settings for each game state here
  // Call the method every time there is a game state change
  static prepareUI() {
    if (GameInfo.game.player.state == "Choose Deck") {
      //GameInfo.scoreBoard.show();
      GameInfo.titlechoosedeck.show();
      GameInfo.titleready.hide();
      GameInfo.subtitleready.hide();
      GameInfo.loaderready.hide();
      GameInfo.loaderreadyspan1.hide();
      GameInfo.loaderreadyspan2.hide();
      GameInfo.loaderreadyspan3.hide();
      GameInfo.loaderreadyspan4.hide();
      GameInfo.cancelattack.hide();
      GameInfo.choosedeck1button.show();
      GameInfo.choosedeck2button.show();
      GameInfo.endturnButtonp.hide();
      GameInfo.endturnButtonw.hide();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    } else if (GameInfo.game.player.state == "Ready") {
      GameInfo.titleready.show();
      GameInfo.subtitleready.show();
      GameInfo.loaderready.show();
      GameInfo.loaderreadyspan1.show();
      GameInfo.loaderreadyspan2.show();
      GameInfo.loaderreadyspan3.show();
      GameInfo.loaderreadyspan4.show();
      GameInfo.titlechoosedeck.hide();
      GameInfo.cancelattack.hide();
      GameInfo.endturnButtonp.hide();
      GameInfo.endturnButtonw.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    } else if (GameInfo.game.player.state == "Playing") {
      GameInfo.titlechoosedeck.hide();
      GameInfo.subtitleready.hide();
      GameInfo.loaderready.hide();
      GameInfo.titleready.hide();
      GameInfo.loaderreadyspan1.hide();
      GameInfo.loaderreadyspan2.hide();
      GameInfo.loaderreadyspan3.hide();
      GameInfo.loaderreadyspan4.hide();
      GameInfo.endturnButtonp.show();
      GameInfo.endturnButtonw.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.playerDeck.draggable = true;
      GameInfo.bench.draggable = true;
    } else if (GameInfo.game.player.state == "Waiting") {
      GameInfo.titlechoosedeck.hide();
      GameInfo.subtitleready.hide();
      GameInfo.loaderready.hide();
      GameInfo.titleready.hide();
      GameInfo.loaderreadyspan1.hide();
      GameInfo.loaderreadyspan2.hide();
      GameInfo.loaderreadyspan3.hide();
      GameInfo.loaderreadyspan4.hide();
      GameInfo.cancelattack.hide();
      GameInfo.endturnButtonp.hide();
      GameInfo.endturnButtonw.show();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    } else if (GameInfo.game.player.state == "Score") {
      GameInfo.titlechoosedeck.hide();
      GameInfo.subtitleready.hide();
      GameInfo.loaderready.hide();
      GameInfo.titleready.hide();
      GameInfo.loaderreadyspan1.hide();
      GameInfo.loaderreadyspan2.hide();
      GameInfo.loaderreadyspan3.hide();
      GameInfo.loaderreadyspan4.hide();
      GameInfo.cancelattack.hide();
      GameInfo.endturnButtonp.hide();
      GameInfo.endturnButtonw.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.scoreWindow.open();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    }
  }
}
