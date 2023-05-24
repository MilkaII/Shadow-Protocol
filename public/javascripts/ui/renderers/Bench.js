class Cards{
  static width = 120;
  static height = 180;
  constructor(card, img, hacksimg) {
    this.card = card;
    this.img = img;
    this.hacksimg = hacksimg;
    this.dragging = false;
    this.offsety = 0;
    this.offsetx = 0;
    this.dragx = 0;
    this.dragy = 0;
    this.selected = false;

    this.x = 0;
    this.y = 0;
    this.hover = false;
  }

  draw(){
    if(this.card.ugc_crd_type_id == 4){

      image(GameInfo.images.cardbackground[this.card.ugc_crd_image], this.x, this.y - 55, 120 + 25, 190 - 90);
      image(this.hacksimg, this.x, this.y, 120 + 30, 190 + 30);
      noTint();
      textAlign(CENTER, CENTER);
      fill(255);
      textStyle(BOLD);
      textSize(20);
      stroke(0);
      strokeWeight(2);
      text(this.card.ugc_crd_cost, this.x - 62, this.y - 93);
      strokeWeight(1);
      noStroke();
      textSize(17);
      text(this.card.ugc_crd_name, this.x, this.y + 10);
      textSize(12);
      textAlign(CENTER, TOP);
      text(this.card.ugc_crd_gang, this.x, this.y + 20);
      text(this.card.ugc_crd_info, this.x - 50, this.y + 45, 100);
      fill(0);
      textStyle(NORMAL);
      noTint();

    }else{

      image(GameInfo.images.cardbackground[this.card.ugc_crd_image], this.x, this.y - 55, 120 + 25, 190 - 90);
      image(this.img, this.x, this.y, 120 + 30, 190 + 30);
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
}

class Bench {
  static headery = 15;

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
    hacksimg,
    dragAction
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
    this.hacksimg = hacksimg;
    this.dragAction = dragAction;
    //this.clickaction = clickaction;
    this.cards = this.createcards(cardsinfo);

    /// precomputed
    this.cardx = this.cardimg.width / 2;
    this.cardy = this.cardimg.height;
    this.colsize = this.width / (this.columns.length + 1);
    this.rowsize = (this.height - Bench.headery) / 2;
    this.cardsize = this.colsize / 3;

    //drag
    this.draggable = false;
    this.draggingCard = null;
  }

  createcards(cardsInfo) {
    let cards = [];
    for (let cardInfo of cardsInfo) {
      cards.push(
        new Cards(cardInfo, this.cardimg, this.hacksimg)
      );
    }
    return cards;
  }

  update(columns, cardsInfo) {
    this.columns = columns;
    this.cards = this.createcards(cardsInfo);
  }

  updateDrag() {
    if (this.draggingCard !== null) {
      this.draggingCard.dragx = mouseX + this.draggingCard.offsetX;
      this.draggingCard.dragy = mouseY + this.draggingCard.offsetY;
    }
    for (let card of this.cards) {
      if(card.hover){
        card.draw();
      }
    }
  }

  draw() {
    stroke(9, 122, 176);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    strokeWeight(5);
    //player side
    line(
      this.x + 155,
      this.y + Bench.headery + 800,
      this.x + this.width + 20,
      this.y + Bench.headery + 800
    );
    line(this.x + 820, this.y + 815, this.x + 820, this.y + this.height + 250);
    //opponent side
    stroke(137, 4, 160);
    line(
        this.x + 115,
        this.y + Bench.headery - 150,
        this.x + this.width - 20,
        this.y + Bench.headery - 150
    );
    line(this.x + 780, this.y + Bench.headery - 150, this.x + 780, this.y + this.height / 2 - 140);
    strokeWeight(0);
    for (let column of this.columns) {
      strokeWeight(5);
      // player
      stroke(9, 122, 176);
      line(
        this.x + column.position * this.colsize + 20,
        this.y + 815,
        this.x + column.position * this.colsize + 20,
        this.y + this.height + 250
      );
      //opponent
      stroke(137, 4, 160);
      line(
        this.x + column.position * this.colsize - 20,
        this.y + Bench.headery - 150,
        this.x + column.position * this.colsize - 20,
        this.y + this.height / 2 - 140
      );
      strokeWeight(0);
      if (column.posPlayer) {
        let cardX = this.x + column.position * this.colsize + 87;
        let cardY = this.y + Bench.headery + this.rowsize + (this.rowsize + 860) / 2;
        for (let card of this.cards) {
          if (card.card.ugben_crd_id == column.posPlayer) {
            if(card.card.ugc_crd_type_id == 4){
              if(!card.hover && !card.dragging){
                image(GameInfo.images.cardbackground[card.card.ugc_crd_image], cardX, cardY - 47, 120 - 3, 190 - 105);
                image(this.hacksimg, cardX, cardY, 120, 190);
                noTint();
                textAlign(CENTER, CENTER);
                fill(255);
                textStyle(BOLD);
                textSize(15);
                stroke(0);
                strokeWeight(2);
                text(card.card.ugc_crd_cost, cardX - 49, cardY - 80);
                strokeWeight(1);
                noStroke();
                textSize(13);
                text(card.card.ugc_crd_name, cardX, cardY + 10);
                textSize(10);
                textAlign(CENTER, TOP);
                text(card.card.ugc_crd_gang, cardX, cardY + 20);
                text(card.card.ugc_crd_info, cardX - 50, cardY + 45, 100);
                fill(0);
                textStyle(NORMAL);
                noTint();
              }

              if(GameInfo.game.player.state != "Waiting") {
                if(mouseX > cardX - 120 / 2 && mouseX < cardX + 120 / 2 && mouseY > cardY - 190 / 2 && mouseY < cardY + 190 / 2){
                  if(!GameInfo.dragging){
                    card.x = cardX;
                    card.y = cardY;
                    card.hover = true;
                  }
                }else{
                  card.hover = false;
                }
              }

              if (card.dragging) {
                tint(255, 100);
                image(GameInfo.images.cardbackground[card.card.ugc_crd_image], card.dragx, card.dragy - 47, Cards.width - 3, Cards.height - 105);
                image(this.hacksimg, card.dragx, card.dragy, Cards.width, Cards.height);
                textAlign(CENTER, CENTER);
                fill(255);
                textStyle(BOLD);
                textSize(15);
                stroke(0);
                strokeWeight(2);
                text(card.card.ugc_crd_cost, card.dragx - 49, card.dragy - 80);
                strokeWeight(1);
                noStroke();
                textSize(13);
                text(card.card.ugc_crd_name, card.dragx, card.dragy + 10);
                textSize(10);
                textAlign(CENTER, TOP);
                text(card.card.ugc_crd_gang, card.dragx, card.dragy + 20);
                text(card.card.ugc_crd_info, card.dragx - 50, card.dragy + 45, 100);
                fill(0);
                textStyle(NORMAL);
                tint(255, 255);
              }

            }else{

              if(!card.hover && !card.dragging){
                image(GameInfo.images.cardbackground[card.card.ugc_crd_image], cardX, cardY - 47, 120 - 3, 190 - 105);
                image(this.cardimg, cardX, cardY, 120, 190);
                noTint();
                textAlign(CENTER, CENTER);
                fill(255);
                textStyle(BOLD);
                textSize(15);
                stroke(0);
                strokeWeight(2);
                text(card.card.ugc_crd_cost, cardX - 49, cardY - 80);
                text(card.card.ugc_crd_damage, cardX - 49, cardY + 80);
                text(card.card.ugc_crd_health, cardX + 49, cardY + 80);
                strokeWeight(1);
                noStroke();
                textSize(13);
                text(card.card.ugc_crd_name, cardX, cardY + 10);
                textSize(10);
                textAlign(CENTER, TOP);
                text(card.card.ugc_crd_gang, cardX, cardY + 20);
                fill(0);
                textStyle(NORMAL);
                noTint();
              }

              if(GameInfo.game.player.state != "Waiting") {
                if(mouseX > cardX - 120 / 2 && mouseX < cardX + 120 / 2 && mouseY > cardY - 190 / 2 && mouseY < cardY + 190 / 2){
                  if(!GameInfo.dragging){
                    card.x = cardX;
                    card.y = cardY;
                    card.hover = true;
                  }
                }else{
                  card.hover = false;
                }
              }

              if (card.dragging) {
                tint(255, 100);
                image(GameInfo.images.cardbackground[card.card.ugc_crd_image], card.dragx, card.dragy - 47, Cards.width - 3, Cards.height - 105);
                image(this.cardimg, card.dragx, card.dragy, Cards.width, Cards.height);
                textAlign(CENTER, CENTER);
                fill(255);
                textStyle(BOLD);
                textSize(15);
                stroke(0);
                strokeWeight(2);
                text(card.card.ugc_crd_cost, card.dragx - 49, card.dragy - 80);
                text(card.card.ugc_crd_damage, card.dragx - 49, card.dragy + 80);
                text(card.card.ugc_crd_health, card.dragx + 49, card.dragy + 80);
                strokeWeight(1);
                noStroke();
                textSize(13);
                text(card.card.ugc_crd_name, card.dragx, card.dragy + 10);
                textSize(10);
                textAlign(CENTER, TOP);
                text(card.card.ugc_crd_gang, card.dragx, card.dragy + 20);
                fill(0);
                textStyle(NORMAL);
                tint(255, 255);
              }
            }
          }
        }
      }
      if (column.posOpponent) {
        let cardX = this.x + column.position * this.colsize + 47;
        let cardY = this.y + Bench.headery + (this.rowsize - this.cardsize - 250) / 2;
        for (let card of this.cards) {
          if (card.card.ugben_crd_id == column.posOpponent) {
            if(card.card.ugc_crd_type_id == 4){
              image(GameInfo.images.cardbackground[card.card.ugc_crd_image], cardX, cardY - 47, 120 - 3, 190 - 105);
              image(this.hacksimg, cardX, cardY, 120, 190);
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.card.ugc_crd_cost, cardX - 49, cardY - 80);
              strokeWeight(1);
              noStroke();
              textSize(13);
              text(card.card.ugc_crd_name, cardX, cardY + 10);
              textSize(10);
              textAlign(CENTER, TOP);
              text(card.card.ugc_crd_gang, cardX, cardY + 20);
              text(card.card.ugc_crd_info, cardX - 50, cardY + 45, 100);
              fill(0);
              textStyle(NORMAL);
              noTint();
            }else{
              image(GameInfo.images.cardbackground[card.card.ugc_crd_image], cardX, cardY - 47, 120 - 3, 190 - 105);
              image(this.cardimg, cardX, cardY, 120, 190);
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.card.ugc_crd_cost, cardX - 49, cardY - 80);
              text(card.card.ugc_crd_damage, cardX - 49, cardY + 80);
              text(card.card.ugc_crd_health, cardX + 49, cardY + 80);
              strokeWeight(1);
              noStroke();
              textSize(13);
              text(card.card.ugc_crd_name, cardX, cardY + 10);
              textSize(10);
              textAlign(CENTER, TOP);
              text(card.card.ugc_crd_gang, cardX, cardY + 20);
              fill(0);
              textStyle(NORMAL);
              noTint();
            }
          }
        }
      }
    }
  }

  //se houver problemas com o dragndrop ver isto aqui
  press() {
    if (!this.draggable) {
      return;
    }

    //add if for limit the drandrop
    let pos = Math.floor((mouseX - this.x) / this.colsize) - 1;
    let cardpress = this.columns[pos];

    for (let column of this.columns) {
      if (column.posPlayer == cardpress.posPlayer) {
        let cardX = this.x + column.position * this.colsize + 67;
        let cardY = this.y + Bench.headery + this.rowsize + (this.rowsize + 860) / 2;
        for (let card of this.cards) {
          if (card.card.ugben_crd_id == cardpress.posPlayer) {
            if (this.draggable && mouseX > cardX - Cards.width / 2 && mouseX < cardX + Cards.width / 2 && mouseY > cardY - Cards.height / 2 && mouseY < cardY + Cards.height / 2) {
              card.offsetX = cardX - mouseX;
              card.offsetY = cardY - mouseY;
              card.dragx = mouseX + card.offsetX;
              card.dragy = mouseY + card.offsetY;
              card.dragging = true;
              this.draggingCard = card;
              GameInfo.dragbenchtoboard = true;
              GameInfo.dragging = true;
            }
          }
        }
      }
    }
  }

  release() {
    if (!this.draggable || this.draggingCard === null) {
      return;
    }
    this.draggingCard.dragging = false;
    GameInfo.dragging = false;
    if (this.dragAction) {
      this.dragAction(mouseX, mouseY, this.draggingCard.card);
    }
    this.draggingCard = null;
  }

  //mudar isto
  getPlayerColumnAt(x, y) {
    if (
      y > this.y + this.height + 250 &&
      y < this.y + 800 &&
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
}
