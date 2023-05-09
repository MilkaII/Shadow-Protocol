class Cards{
  static width = 120;
  static height = 180;
  constructor(card) {
    this.card = card;
    this.dragging = false;
    this.offsety = 0;
    this.offsetx = 0;
    this.dragx = 0;
    this.dragy = 0;
    this.selected = false;
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
    backimg,
    cardimg,
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
    this.backimg = backimg;
    this.cardimg = cardimg;
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
        new Cards(cardInfo)
      );
    }
    return cards;
  }

  update(columns, cardsInfo) {
    this.columns = columns;
    this.cards = this.createcards(cardsInfo);
  }

  updateDrag() {
    //for (let column of this.columns) {
    //  if (column.posPlayer) {
        if (this.draggingCard !== null) {
          this.draggingCard.dragx = mouseX + this.draggingCard.offsetX;
          this.draggingCard.dragy = mouseY + this.draggingCard.offsetY;
        }
    //  }
    //}
  }

  draw() {
    stroke(100, 200, 100);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    strokeWeight(5);
    //player side
    line(
      this.x + 130,
      this.y + Bench.headery + 800,
      this.x + this.width,
      this.y + Bench.headery + 800
    );
    line(this.x + 800, this.y + 815, this.x + 800, this.y + this.height + 250);
    //opponent side
    line(
        this.x + 130,
        this.y + Bench.headery - 150,
        this.x + this.width,
        this.y + Bench.headery - 150
    );
    line(this.x + 800, this.y + Bench.headery - 150, this.x + 800, this.y + this.height / 2 - 140);
    strokeWeight(0);
    for (let column of this.columns) {
      strokeWeight(5);
      stroke(100, 200, 100);
      // player
      line(
        this.x + column.position * this.colsize,
        this.y + 815,
        this.x + column.position * this.colsize,
        this.y + this.height + 250
      );
      //opponent
      line(
        this.x + column.position * this.colsize,
        this.y + Bench.headery - 150,
        this.x + column.position * this.colsize,
        this.y + this.height / 2 - 140
      );
      strokeWeight(0);
      if (column.posPlayer) {
        let cardX = this.x + column.position * this.colsize + 67;
        let cardY = this.y + Bench.headery + this.rowsize + (this.rowsize + 860) / 2;
        for (let card of this.cards) {
          if (card.card.ugben_crd_id == column.posPlayer) {
            if (card.dragging) {
              tint(255, 100);
              image(this.cardimg, card.dragx, card.dragy, Cards.width, Cards.height);
              tint(255, 255);
            }

            image(
                this.cardimg,
                cardX,
                cardY,
                120, //this.cardsize,
                180 //this.cardsize
              );
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.card.ugc_crd_cost, cardX + 48, cardY - 79);
              text(card.card.ugc_crd_damage, cardX - 35, cardY + 60);
              text(card.card.ugc_crd_health, cardX + 35, cardY + 60);
              strokeWeight(1);
              noStroke();
              fill(0);
              textSize(13);
              text(card.card.ugc_crd_name, cardX, cardY + 25);
              textSize(10);
              textAlign(CENTER, TOP);
              text(
                card.card.ugc_crd_gang,
                cardX,
                cardY + 35
              );
              text(
                "Health",
                cardX + 35,
                cardY + 70
              );
              text(
                "Damage",
                cardX - 35,
                cardY + 70
              );
              textStyle(NORMAL);
              noTint();
          }
        }
      }
      if (column.posOpponent) {
        let cardX = this.x + column.position * this.colsize + 67;
        let cardY = this.y + Bench.headery + (this.rowsize - this.cardsize - 250) / 2;
        for (let card of this.cards) {
          if (card.card.ugben_crd_id == column.posOpponent) {
            push()
            translate(cardX, cardY);
            rotate(180);
            image(
              this.cardimg,
              0,
              0,
              120, //this.cardsize,
              180 //this.cardsize
            );
            
            noTint();
            textAlign(CENTER, CENTER);
            fill(255);
            textStyle(BOLD);
            textSize(15);
            stroke(0);
            strokeWeight(2);
            text(card.card.ugc_crd_cost, 0 + 48, 0 - 79);
            text(card.card.ugc_crd_damage, 0 - 35, 0 + 60);
            text(card.card.ugc_crd_health, 0 + 35, 0 + 60);
            strokeWeight(1);
            noStroke();
            fill(0);
            textSize(13);
            text(card.card.ugc_crd_name, 0, 0 + 25);
            textSize(10);
            textAlign(CENTER, TOP);
            text(
              card.card.ugc_crd_gang,
              0,
              0 + 35
            );
            text(
              "Health",
              0 + 35,
              0 + 70
            );
            text(
              "Damage",
              0 - 35,
              0 + 70
            );
            textStyle(NORMAL);
            noTint();
            pop()
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
