async function getGameInfo() {
  let result = await requestPlayerGame();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.game = result.game;
    if (GameInfo.scoreBoard) GameInfo.scoreBoard.update(GameInfo.game);
    else GameInfo.scoreBoard = new ScoreBoard(GameInfo.game);
    // if game ended we get the scores and prepare the ScoreWindow
    if (GameInfo.game.state == "Finished") {
      let result = await requestScore();
      GameInfo.scoreWindow = new ScoreWindow(
        50,
        50,
        GameInfo.width - 100,
        GameInfo.height - 100,
        result.score,
        closeScore
      );
    }
  }
}

async function getBoardInfo() {
  let result = await requestBoardInfo();
  let cards = await requestCardsInBoard();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.gameboard = result.board;
    GameInfo.cardsInBoard = cards.result;
    if (GameInfo.board) GameInfo.board.update(GameInfo.gameboard);
    else
      GameInfo.board = new Board(
        GameInfo.gameboard,
        GameInfo.game.player.name,
        GameInfo.game.opponents[0].name,
        570,
        300,
        650,
        380,
        30,
        GameInfo.images.boardbg,
        GameInfo.images.card,
        clickActionAttack
      );
  }
}

async function getBenchInfo() {
  let result = await requestBenchInfo();
  let cards = await requestCardsInBench();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.gamebench = result.bench;
    GameInfo.cardsInBench = cards.result;
    if (GameInfo.bench) GameInfo.bench.update(GameInfo.gamebench, GameInfo.cardsInBench);
    else
      GameInfo.bench = new Bench(
        GameInfo.gamebench,
        GameInfo.cardsInBench,
        GameInfo.game.player.name,
        GameInfo.game.opponents[0].name,
        500,
        150,
        800,
        380,
        30,
        GameInfo.images.boardbg,
        GameInfo.images.card,
        dragndropFromBenchToBoard
      );
  }
}

async function getDecksInfo() {
  let result = await requestDeckChoosen();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.matchdeck = result.deck;
    if (GameInfo.playerDeck) GameInfo.playerDeck.update(GameInfo.matchdeck);
    else
      GameInfo.playerDeck = new Deck(
        GameInfo.matchdeck,
        100,
        820,
        null,
        GameInfo.images.card,
        dragndropFromHandToBench
      );

    if (GameInfo.oppDeck) GameInfo.oppDeck.update(GameInfo.matchdeck);
    else
      GameInfo.oppDeck = new Deck(GameInfo.matchdeck, null, null, null, null);
  }
}
async function dragndropFromHandToBench(x, y, card) {
  let pos = GameInfo.bench.getPlayerColumnAt(x, y);
  playCardFromHandToBench(card, pos);
  //alert(pos);
}

async function dragndropFromBenchToBoard(x, y, card) {
  let pos = GameInfo.board.getPlayerColumnAt(x, y);
  playCardFromBenchToBoard(card, pos);
  //alert(pos);
}

async function endturnAction() {
  let result = await requestEndTurn();
  if (result.successful) {
    await getGameInfo();
    GameInfo.prepareUI();
  } else alert("Something went wrong when ending the turn.");
}

async function ChooseDeck1Action() {
  if (confirm(`Do you want to choose the deck 1 ?`)) {
    let result = await requestChooseDeck(1);
    if (result.successful) {
      await getGameInfo();
      GameInfo.prepareUI();
    } else alert("Something went wrong choosing the deck.");
  }
}
async function ChooseDeck2Action() {
  if (confirm(`Do you want to choose the deck 2 ?`)) {
    let result = await requestChooseDeck(2);
    if (result.successful) {
      await getGameInfo();
      GameInfo.prepareUI();
    } else alert("Something went wrong choosing the deck.");
  }
}

// remake this
let selectedCards = [];
async function clickActionAttack(x, y) {
  let card = GameInfo.board.getCardAt(x, y);
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    if(selectedCards[0] == selectedCards[1]){
      alert("You can't attack your own card");
    }
    await attackCard(selectedCards[0], selectedCards[1]);
    selectedCards = [];
  }
}

async function playCardFromHandToBench(card, position) {
  if (confirm(`Do you want to play the "${card.ugc_crd_name}" card?`)) {
    let result = await requestPlayCardFromHandToBench(card.ugc_id, position);
    if (result.successful) {
      await getGameInfo();
      await getBoardInfo();
      await getBenchInfo();
      await getDecksInfo();
      alert(result.msg);
    }
  }
}

async function playCardFromBenchToBoard(card, position) {
  if (card.ugc_crd_type_id != 4){
    if (confirm(`Do you want to play the "${card.ugc_crd_name}" card?`)) {
      let result = await requestPlayCardFromBenchToBoard(card.ugc_id, position);
      if (result.successful) {
        await getGameInfo();
        await getBoardInfo();
        await getBenchInfo();
        await getDecksInfo();
        alert(result.msg);
      }
    }
  }else{
    if (confirm(`Do you want to use this hack?`)) {
      let result = await requestPlayCardFromBenchToBoard(card.ugc_id, position);
      if (result.successful) {
        await getGameInfo();
        await getBoardInfo();
        await getBenchInfo();
        await getDecksInfo();
        alert(result.msg);
      }
    }
  }
}

async function attackCard(playercard, oppcard) {
  //if (confirm(`Do you want to play the "${card.ugc_crd_name}" card?`)) {
  let result = await requestAttackCard(playercard, oppcard);
  if (result.successful) {
    await getGameInfo();
    await getBoardInfo();
    await getBenchInfo();
    await getDecksInfo();
    alert(result.msg);
  }
  //}
}

async function closeScore() {
  let result = await requestCloseScore();
  if (result.successful) {
    await checkGame(true); // This should send the player back to matches
  } else alert("Something went wrong when ending the turn.");
}
