async function refresh() {
  if (
    GameInfo.game.player.state == "Waiting" ||
    GameInfo.game.player.state == "Choose Deck" ||
    GameInfo.game.player.state == "Ready"
  ) {
    // Every time we are waiting
    await getGameInfo();
    await getBoardInfo();
    await getBenchInfo();
    await getDecksInfo();
    
    GameInfo.prepareUI();
  }
  // Nothing to do when we are playing since we control all that happens
  // so no update is needed from the server
}

function preload() {
  // images
  GameInfo.images.card = loadImage("/assets/card_template.png");
  GameInfo.images.backcard = loadImage("/assets/backcard_template.png");
  GameInfo.images.hack = loadImage("/assets/hack_template.png");
  GameInfo.images.chief = loadImage("/assets/chief_template.png");
  GameInfo.images.backgroundgame = loadImage("/assets/background_game.jpg");
  GameInfo.images.chipplayer = loadImage("/assets/chip_p.png");
  GameInfo.images.chipopp = loadImage("/assets/chip_o.png");
  GameInfo.images.highlight = loadImage("/assets/Highlight.png");
  GameInfo.images.win = loadImage("/assets/win.png");
  GameInfo.images.lose = loadImage("/assets/lose.png");
  GameInfo.images.turn = loadImage("/assets/your_turn.png");
  GameInfo.images.deck = loadImage("/assets/Deck.png");
  GameInfo.images.cardbackground = [];
  for(var i = 0; i < 18; i++){
    GameInfo.images.cardbackground[i] = loadImage("/assets/CardsBackground/CardBackground" + i + ".png");
  }

  //sounds
  // GameInfo.sounds.login = loadSound("/assets/audio/lifelike.mp3");
  GameInfo.sounds.gameplay = loadSound("/assets/audio/password_infinity.mp3");
  GameInfo.sounds.click = loadSound("/assets/audio/interface.mp3");
}

async function setup() {
  let canvas = createCanvas(GameInfo.width, GameInfo.height);
  canvas.parent("game");

  imageMode(CENTER);
  angleMode(DEGREES);
  frameRate(60);
  // preload  images

  await getGameInfo();
  await getBoardInfo();
  await getBenchInfo();
  await getDecksInfo();
  setInterval(refresh, 2000);

  //buttons (create a separated function if they are many)
  // end turn button
  GameInfo.endturnButtonp = createButton("End Turn");
  GameInfo.endturnButtonp.parent("game");
  GameInfo.endturnButtonp.position(GameInfo.width - 270, GameInfo.height - 150);
  GameInfo.endturnButtonp.mousePressed(endturnAction);
  GameInfo.endturnButtonp.addClass("game");
 
  GameInfo.endturnButtonw = createButton("Opponent Turn");
  GameInfo.endturnButtonw.parent("game");
  GameInfo.endturnButtonw.position(GameInfo.width - 270, GameInfo.height - 150);
  GameInfo.endturnButtonw.addClass("game2");

  GameInfo.cancelattack = createButton("X");
  GameInfo.cancelattack.parent("game");
  GameInfo.cancelattack.position(GameInfo.width - 430, GameInfo.height - 515);
  GameInfo.cancelattack.mousePressed(CancelAttack);
  GameInfo.cancelattack.addClass("game3");

  //Choose deck 1 button
  GameInfo.choosedeck1button = createButton("");
  GameInfo.choosedeck1button.parent("game");
  GameInfo.choosedeck1button.position(
    GameInfo.width - 1300,
    GameInfo.height - 600
  );
  GameInfo.choosedeck1button.mousePressed(ChooseDeck1Action);
  GameInfo.choosedeck1button.addClass("game4");
  //Choose deck 2 button
  GameInfo.choosedeck2button = createButton("");
  GameInfo.choosedeck2button.parent("game");
  GameInfo.choosedeck2button.position(
    GameInfo.width - 800,
    GameInfo.height - 600
  );
  GameInfo.choosedeck2button.mousePressed(ChooseDeck2Action);
  GameInfo.choosedeck2button.addClass("game5");

  GameInfo.titlechoosedeck = createSpan('Choose a Leader');
  GameInfo.titlechoosedeck.parent("game");
  GameInfo.titlechoosedeck.position(GameInfo.width - 1200, GameInfo.height - 800);
  GameInfo.titlechoosedeck.addClass("game6");

  GameInfo.titleready = createSpan('You are ready!!');
  GameInfo.titleready.parent("game");
  GameInfo.titleready.position(GameInfo.width - 1200, GameInfo.height - 700);
  GameInfo.titleready.addClass("game6");

  GameInfo.subtitleready = createSpan('Wait for the other player');
  GameInfo.subtitleready.parent("game");
  GameInfo.subtitleready.position(GameInfo.width - 1140, GameInfo.height - 630);
  GameInfo.subtitleready.addClass("game7");

  //start loader
  GameInfo.loaderready = createDiv('');
  GameInfo.loaderready.parent("game");
  GameInfo.loaderready.position(GameInfo.width - 1040, GameInfo.height - 580);
  GameInfo.loaderready.addClass("loader");
  GameInfo.loaderreadyspan1 = createSpan('');
  GameInfo.loaderreadyspan1.parent(GameInfo.loaderready);
  GameInfo.loaderreadyspan2 = createSpan('');
  GameInfo.loaderreadyspan2.parent(GameInfo.loaderready);
  GameInfo.loaderreadyspan3 = createSpan('');
  GameInfo.loaderreadyspan3.parent(GameInfo.loaderready);
  GameInfo.loaderreadyspan4 = createSpan('');
  GameInfo.loaderreadyspan4.parent(GameInfo.loaderready);
  //end loader

  //if(!GameInfo.sounds.gameplay.isPlaying()){
    //GameInfo.sounds.gameplay.play();
    GameInfo.sounds.gameplay.loop();
    GameInfo.sounds.gameplay.setVolume(0.03);
   
  //}

  GameInfo.prepareUI();

  GameInfo.loading = false;
}

function draw() {
  imageMode(CENTER);
  image(GameInfo.images.backgroundgame, GameInfo.width / 2, GameInfo.height / 2);
  if (GameInfo.loading) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill("black");
    text("Loading...", GameInfo.width / 2, GameInfo.height / 2);
  } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
    GameInfo.scoreWindow.draw();
  } else if (GameInfo.game.state != "Choose Deck" && GameInfo.game.state != "Ready"){
    GameInfo.scoreBoard.draw();
    GameInfo.board.draw();
    GameInfo.board.updateboardcards();
    GameInfo.bench.draw();
    GameInfo.bench.updateDrag();
    GameInfo.oppDeck.draw();
    GameInfo.playerDeck.draw();
    GameInfo.playerDeck.updateDrag();
    GameInfo.yourturn.draw();
    if(GameInfo.selectedCards.length == 1){
      GameInfo.cancelattack.show();
    }else{
      GameInfo.cancelattack.hide();
    }
  }
}

async function mouseClicked() {
  if(GameInfo.game.player.state == "Playing"){
    GameInfo.board.click();
  }
  if(!GameInfo.sounds.click.isPlaying()){
    GameInfo.sounds.click.play();
    GameInfo.sounds.click.setVolume(0.2);
  }
}

async function mousePressed() {
  if ( GameInfo.playerDeck) {
    GameInfo.playerDeck.press();
  }
  if (GameInfo.bench) {
    GameInfo.bench.press();
  }
  if(!GameInfo.sounds.click.isPlaying()){
    GameInfo.sounds.click.play();
    GameInfo.sounds.click.setVolume(0.2);
  }
}

async function mouseReleased() {
  if (GameInfo.playerDeck) {
    GameInfo.playerDeck.release();
  }
  if (GameInfo.bench) {
    GameInfo.bench.release();
  }
  if(GameInfo.sounds.click.isPlaying()){
    GameInfo.sounds.click.stop();
  }
}  