

class map2 {
  
  constructor() {
    this.buildings = [];
    this.doors = [];
    this.test = 1;
    this.currFrame = frameCount;
    this.weapons = [];
    this.shaft = [];
    this.inst = 300;
    this.pickedUp = 0;
    this.enemies = [];
    this.bench = [];
    this.init();
    
  }
  
  init() {
    for (var i = 0; i < ac.length; i++) {
      for (var j = 0; j < ac[0].length; j++) {
        switch(ac[i][j]){
          case 'F':
            this.buildings.push(new obj(j*20, i*20))
            break;
        }
      }
    }
    for (var i = 0; i < acDetail.length; i++) {
      for (var j = 0; j < acDetail[0].length; j++) {
        switch(acDetail[i][j]){
          case 'B':
            this.buildings.push(new obj(j*20, i*20))
            break;
          case 'b':
            this.buildings.push(new obj(j*20, i*20))
            break;
          case 'o':
            this.doors.push(new door(j*20, i*20, 0))
            break;
          case 's':
            this.shaft.push(new obj(j*20, i*20))
            break;
          case 'w':
            this.buildings.push(new obj(j*20, i*20))
            break;
          case 'T':
            this.buildings.push(new obj(j*20, i*20))
            break;
          case 'C':
            this.buildings.push(new obj(j*20, i*20))
            this.bench.push(new obj(j*20, i*20))
            break;
        }
      }
    }
  }
  
  draw() {
    background(0);

    game.x = 200 - game.player.x;
    game.y = 200 - game.player.y;
    if (game.x > 0)
      game.x = 0;
    if (game.x < -600)
      game.x = -600;
    if (game.y > 0)
      game.y = 0;
    if (game.y < -680)
      game.y = -680;
    push();
    translate(game.x, game.y);
    this.drawBackground();
    this.drawEnemies();
    game.player.draw();
    pop();
    
    if (this.inst > 0) {
      fill(0, 0, 0, 175);
      rect(50, 15, 300, 40)
      fill(255)
      textSize(15);
      text("Look around for parts to fix the car.", 80, 30)
      this.inst--;
    }
    
    this.checkUpgrade();
  }
  
  checkUpgrade() {
    for (var i = 0; i < this.bench.length; i++) {
      if (dist(game.player.x, game.player.y, this.bench[i].x, this.bench[i].y) < 40 && keyIsDown(69) && 
          game.player.hasWrench === 1 && game.player.cparts >= game.player.cost) {
        game.player.wrench.damage = 4;
        game.player.cparts -= game.player.cost;
      }
    }
  }
  
  drawEnemies() {
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].dead === 0) {
        this.enemies[i].draw();
        this.enemies[i].checkCollision();
      }
      else {
        this.enemies.splice(i, 1);
      }
    }
  }
  
  drawBackground() {
    for (var i = 0; i < ac.length; i++) {
      for (var j = 0; j < ac[0].length; j++) {
        switch(ac[i][j]){
          case 'f':
            fill(104, 109, 117);
            rect(j*20, i*20, 20, 20);
            break;
        }
      }
    }
    
    for (var i = 0; i < acDetail.length; i++) {
      for (var j = 0; j < acDetail[0].length; j++) {
        switch(acDetail[i][j]){
          case 'w':
            fill(50, 50, 50);
            rect(j*20+5, i*20, 10, 20);
            break;
          case 's':
            if (this.pickedUp === 0)
              image(img5, j*20, i*20, 20, 20);
            break;
          case 'b':
            image(img7, j*20, i*20, 20, 20);
            break;
          case 'B':
            image(img7, j*20, i*20, 40, 40);
            break;
          case 'C':
            image(img8, j*20, i*20, 20, 20);
            fill(0, 0, 0, 150)
            rect(j*20-10, i*20-21, 50, 24)
            
            image(img2, j*20-9, i*20-20, 20, 20);
            fill(0, 0, 255)
            textSize(20)
            text(game.player.cost, j*20+10, i*20)
            break;
          case 'T':
            fill(0,0,50);
            rect(j*20, i*20, 20, 20);
            break;
        }
      }
    }
  }
  
  
  enemy() {
    for (var i = 0; i < acDetail.length; i++) {
      for (var j = 0; j < acDetail[0].length; j++) {
        switch(acDetail[i][j]){
          case 'e':
            this.enemies.push(new enemyObj(j*20, i*20, 0));
            break;
        }
      }
    }
  }
  
}

var acDetail =["                           ",
               "                           ",
               "                           ",
               "                           ",
               "              FFFFFFFFFFFFF",
               "              FffffffffbBfF",
               "              FfffffffffffF",
               "       FFFFFFFFffffffffffbF",
               "       FsfffffwfffffffffffF",
               "       FffffffwfffffffefffF",
               "       FffffffwfffffffffffF",
               "       FffffffffffffffffffF",
               "       FTfffffffffffffffffF",
               "       FTfffffwfffffffffffF",
               "       FTfffffwfffffffffffF",
               "       FTTTTTTwfffffffffffF",
               "       FFFFFFFFfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              offfffffffffF",
               "              offfffffffffF",
               "              offfffffffffF",
               "              offfffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "       FFFFFFFFfffffffffffF",
               "       FffffffwffffffffffbF",
               "       FffffffwfffffffefBfF",
               "       FCfefffwffffffffbffF",
               "       FffffffffffffffBfBfF",
               "       FfffffffffffffbffffF",
               "       FFFFFFFFFFFFFFFFFFFF"]


var ac     =  ["                           ",
               "                           ",
               "                           ",
               "                           ",
               "              FFFFFFFFFFFFF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "       FFFFFFFFfffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FFFFFFFFfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "              FfffffffffffF",
               "       FFFFFFFFfffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FffffffffffffffffffF",
               "       FFFFFFFFFFFFFFFFFFFF"]



