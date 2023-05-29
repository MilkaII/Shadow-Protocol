function drawcard(card, img, x, y, width, height) {
  if(card.card.ugc_crd_type_id != 1 && card.card.ugc_crd_type_id != 4){
    image(
      GameInfo.images.cardbackground[card.card.ugc_crd_image],
      x,
      y - 47,
      width - 3,
      height - 105
    );
    image(img, x, y, width, height);
    textAlign(CENTER, CENTER);
    fill(255);
    textStyle(BOLD);
    textSize(15);
    stroke(0);
    strokeWeight(2);
    text(card.card.ugc_crd_cost, x - 49, y - 80);
    text(card.card.ugc_crd_damage, x - 49, y + 80);
    if(GameInfo.cardattackend){
      if (card.wasdamaged) {
        textSize(17);
        fill('red');
        text(card.card.ugc_crd_health, x + 49, y + 80);
        fill(255);
        GameInfo.cardattackend = false;
      }else{
        text(card.card.ugc_crd_health, x + 49, y + 80);
      }
    }else{
      text(card.card.ugc_crd_health, x + 49, y + 80);
    }
    strokeWeight(1);
    noStroke();
    textSize(13);
    text(card.card.ugc_crd_name, x, y + 10);
    textSize(10);
    textAlign(CENTER, TOP);
    text(card.card.ugc_crd_gang, x, y + 20);
    fill(0);
    textStyle(NORMAL);
    noTint();
  }else{
    image(
      GameInfo.images.cardbackground[card.card.ugc_crd_image],
      x,
      y - 47,
      width - 3,
      height - 105
    );
    image(img, x, y, width, height);
    noTint();
    textAlign(CENTER, CENTER);
    fill(255);
    textStyle(BOLD);
    textSize(15);
    stroke(0);
    strokeWeight(2);
    text(card.card.ugc_crd_health, x, y + 85);
    strokeWeight(1);
    noStroke();
    textSize(13);
    text(card.card.ugc_crd_name, x, y + 10);
    textSize(10);
    textAlign(CENTER, TOP);
    text(card.card.ugc_crd_gang, x, y + 20);
    fill(0);
    textStyle(NORMAL);
    noTint();
  }
}

class Boardcards {
  static width = 120;
  static height = 180;
  constructor(card, cardimg, chiefimg) {
    this.card = card;
    this.cardimg = cardimg;
    this.chiefimg = chiefimg;
    this.x = 0;
    this.y = 0;
    this.wasdamaged = false;
    this.hover = false;
  }

  draw(){
    image(GameInfo.images.cardbackground[this.card.ugc_crd_image], this.x, this.y - 55, 120 + 25, 190 - 90);
    image(this.cardimg, this.x, this.y, 120 + 30, 190 + 30);
    noTint();
    textAlign(CENTER, CENTER);
    fill(255);
    textStyle(BOLD);
    textSize(20);
    stroke(0);
    strokeWeight(2);
    text(this.card.ugc_crd_cost, this.x - 62, this.y - 93);
    text(this.card.ugc_crd_damage, this.x - 60, this.y + 93);
    text(this.card.ugc_crd_health, this.x + 60, this.y + 93);
    strokeWeight(1);
    noStroke();
    textSize(17);
    text(this.card.ugc_crd_name, this.x, this.y + 10);
    textSize(12);
    textAlign(CENTER, TOP);
    text(this.card.ugc_crd_gang, this.x, this.y + 20);
    fill(0);
    textStyle(NORMAL);
    noTint();
  }
}

class Board {
  static headery = 15;
  static playerselected = false;
  static oppselected = false;

  constructor(
    columns,
    cardsinfo,
    playerName,
    oppName,
    x,
    y,
    width,
    height,
    bordersize,
    cardimg,
    chiefimg,
    clickaction
  ) {
    this.columns = columns;
    this.playerName = playerName;
    this.oppName = oppName;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bordersize = bordersize;
    this.cardimg = cardimg;
    this.chiefimg = chiefimg;
    this.clickaction = clickaction;
    /// precomputed
    this.cardx = this.cardimg.width / 2;
    this.cardy = this.cardimg.height;
    this.colsize = this.width / this.columns.length;
    this.rowsize = (this.height - Board.headery) / 2;
    this.cardsize = this.colsize / 3;
    this.clickCard = null;

    this.boardcards = this.createcards(cardsinfo);
    //this.hover = false;
  }

  createcards(cardsInfo) {
    let cards = [];
    for (let cardInfo of cardsInfo) {
      cards.push(
        new Boardcards(cardInfo, this.cardimg, this.chiefimg)
      );
    }
    return cards;
  }

  update(columns, cardsinfo) {
    this.columns = columns;
    this.boardcards = this.createcards(cardsinfo);
  }

  updateboardcards() {
    for (let card of this.boardcards) {
      if(card.hover){
        card.draw();
      }
    }
  }

  draw() {
    stroke(255, 255, 255);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    strokeWeight(5);
    line(
      this.x + 130,
      this.y + Board.headery + this.rowsize,
      this.x + this.width,
      this.y + Board.headery + this.rowsize
    );
    line(this.x + 650, this.y, this.x + 650, this.y + this.height);
    line(
      this.x + 855,
      this.y + Board.headery + this.rowsize,
      this.x + this.width + 75,
      this.y + Board.headery + this.rowsize
    );
    line(this.x + 855, this.y, this.x + 855, this.y + this.height);
    strokeWeight(0);
    for (let column of this.columns) {
      if (column.position != 5) {
        strokeWeight(5);
        stroke(255, 255, 255);
        line(
          this.x + column.position * this.colsize,
          this.y,
          this.x + column.position * this.colsize,
          this.y + this.height
        );
        let higlightX = this.x + column.position * this.colsize + 65;
        let higlightY =
          this.y + Board.headery + this.rowsize + (this.rowsize + 10) / 2;
        if (
          mouseX > higlightX - 120 / 2 &&
          mouseX < higlightX + 120 / 2 &&
          mouseY > higlightY - 190 / 2 &&
          mouseY < higlightY + 190 / 2
        ) {
          if (GameInfo.dragbenchtoboard) {
            tint(255, 150);
            image(GameInfo.images.highlight, higlightX, higlightY, 120, 190);
            tint(255, 255);
          }
        }
        strokeWeight(0);
        if (column.posPlayer) {
          let cardX = this.x + column.position * this.colsize + 65;
          let cardY = this.y + Board.headery + this.rowsize + (this.rowsize + 10) / 2;
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == column.posPlayer) {
              if (card.card.crd_state_id == 5) tint(255, 0, 0, 255);

              if (card.card.ugc_crd_active == false) {
                tint(255, 90);
              }

              if (GameInfo.cardattack == true) {
                if (GameInfo.selectedCards.length == 1) {
                  if (GameInfo.selectedCards[0].ugc_id == card.card.ugb_crd_id) {
                    if (card.card.ugc_crd_active == true) {
                      if(!card.hover){
                        tint(0, 255, 0, 255);
                      }
                      Board.playerselected = true;
                    }
                  }
                }else{
                  Board.playerselected = false;
                }
              }

              if(!card.hover){
                drawcard(card, this.cardimg, cardX, cardY, 120, 190);
              }

              if(GameInfo.game.player.state != "Waiting") {
                if(card.card.ugc_crd_active && !Board.playerselected && mouseX > cardX - 120 / 2 && mouseX < cardX + 120 / 2 && mouseY > cardY - 190 / 2 && mouseY < cardY + 190 / 2){
                  if(!GameInfo.dragging){
                    card.x = cardX;
                    card.y = cardY;
                    card.hover = true;
                  }
                }else{
                  card.hover = false;
                }
              }
            }
          }
        }
        if (column.posOpponent) {
          let cardX = this.x + column.position * this.colsize + 65;
          let cardY = this.y + Board.headery + (this.rowsize - this.cardsize + 30) / 2;
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == column.posOpponent) {
              if (card.card.crd_state_id == 5) tint(255, 0, 0, 255);
              if (GameInfo.cardattack == true) {
                if (GameInfo.selectedCards.length === 2) {
                  if (
                    GameInfo.selectedCards[1].ugc_id == card.card.ugb_crd_id
                  ) {
                    if(!card.hover){
                      tint(0, 255, 0, 255);
                    }
                    card.wasdamaged = true;
                    Board.oppselected = true;
                    GameInfo.cardattackend = true;
                  }
                }else{
                  Board.oppselected = false;
                }
              }

              if(!card.hover){
                drawcard(card, this.cardimg, cardX, cardY, 120, 190);
              }

              if (GameInfo.selectedCards.length === 1) {
                if(GameInfo.game.player.state != "Waiting") {
                  if(!Board.oppselected && mouseX > cardX - 120 / 2 && mouseX < cardX + 120 / 2 && mouseY > cardY - 190 / 2 && mouseY < cardY + 190 / 2){
                    if(!GameInfo.dragging){
                      card.x = cardX;
                      card.y = cardY;
                      card.hover = true;
                    }
                  }else{
                    card.hover = false;
                  }
                }
              }
            }
          }
        }
      } else {
        strokeWeight(5);
        stroke(255, 255, 255);
        line(
          this.x + column.position * this.colsize + 75,
          this.y,
          this.x + column.position * this.colsize + 75,
          this.y + this.height
        );
        strokeWeight(0);
        if (column.posPlayer) {
          let cardX = this.x + column.position * this.colsize + 140;
          let cardY = this.y + Board.headery + this.rowsize + (this.rowsize + 10) / 2;
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == column.posPlayer) {
              if (card.card.crd_state_id == 5) tint(255, 0, 0, 255);

              drawcard(card, this.chiefimg, cardX, cardY, 120, 190);
            }
          }
        }
        if (column.posOpponent) {
          let cardX = this.x + column.position * this.colsize + 140;
          let cardY = this.y + Board.headery + (this.rowsize - this.cardsize + 30) / 2;
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == column.posOpponent) {
              if (card.card.crd_state_id == 5) tint(255, 0, 0, 255);

              if (GameInfo.cardattack == true) {
                if (GameInfo.selectedCards.length === 2) {
                  if (GameInfo.selectedCards[1].ugc_id == card.card.ugb_crd_id) {
                    tint(0, 255, 0, 255);
                    GameInfo.cardattackend = true;
                  }
                }
              }
              drawcard(card, this.chiefimg, cardX, cardY, 120, 190);
            }
          }
        }
      }
    }
  }

  click() {
    if (this.clickaction) {
      if (
        mouseY > 100 &&
        mouseY < this.y + this.height &&
        mouseX > this.x + this.colsize &&
        mouseX < this.x + this.width
      ) {
        this.clickaction(mouseX, mouseY);
      } else if (
        mouseY > 100 &&
        mouseY < this.y + this.height &&
        mouseX > this.x + 5 * this.colsize + 75 &&
        mouseX < this.x + 855
      ) {
        this.clickaction(mouseX, mouseY);
      }
    }
  }

  getPlayerColumnAt(x, y) {
    if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.position;
    } else {
      return false;
    }
  }

  getCardAt(x, y) {
    /*
    this.x + column.position * this.colsize + 75,
    this.y,
    this.x + column.position * this.colsize + 75,
    this.y + this.height

    mouseY > 100 &&
    mouseY < this.y + this.height &&
    mouseX > this.x + 5 * this.colsize + 75 &&
    mouseX < this.x + 855
    */

    //remake the if
    if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posPlayer == cardpress.posPlayer) {
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == cardpress.posPlayer) {
              return card.card;
            }
          }
        }
      }
      //return column.posPlayer;
    } else if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + 5 * this.colsize + 75 &&
      x < this.x + 855
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 2;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posPlayer == cardpress.posPlayer) {
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == cardpress.posPlayer) {
              return card.card;
            }
          }
        }
      }
      //return column.posPlayer;
    } else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posOpponent == cardpress.posOpponent) {
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == cardpress.posOpponent) {
              return card.card;
            }
          }
        }
      }
      //return column.posOpponent;
    } else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + 5 * this.colsize + 75 &&
      x < this.x + 855
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 2;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posOpponent == cardpress.posOpponent) {
          for (let card of this.boardcards) {
            if (card.card.ugb_crd_id == cardpress.posOpponent) {
              return card.card;
            }
          }
        }
      }
      //return column.posOpponent;
    }
  }
}
