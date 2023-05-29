class YourTurn {
    static timer = 0;
    static width = 300;
    static height = 100;
    static x = 10;
    static y = 350;
    constructor(game) {
      this.game = game;
    }

    update(game) {
        this.game = game;
    }

    draw() {
        if(this.game.player.state == "Playing"){
            if (frameCount % 60 == 0 && YourTurn.timer < 3){
                YourTurn.timer++;
            }
            if (YourTurn.timer <= 2){
                image(GameInfo.images.turn, 950, 500, 550, 510);
            }
        }else{
            YourTurn.timer = 0;
        }
    }    
  }
  