

class map1 {
  
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
    this.car = [];
    this.init();
    
  }
  
  init() {
    for (var i = 0; i < lab.length; i++) {
      for (var j = 0; j < lab[0].length; j++) {
        switch(lab[i][j]){
          case 'F':
            this.buildings.push(new obj(j*20, i*20))
            break;
        }
      }
    }
    for (var i = 0; i < labDetail.length; i++) {
      for (var j = 0; j < labDetail[0].length; j++) {
        switch(labDetail[i][j]){
          case 'w':
            this.buildings.push(new obj(j*20, i*20))
            break;
          case 'T':
            this.buildings.push(new obj(j*20, i*20))
            break;
          case 'o':
            this.doors.push(new door(j*20, i*20, 0))
            break;
          case 'C':
            this.buildings.push(new obj(j*20, i*20))
            this.car.push(new obj(j*20, i*20))
            break;
          case 'c':
            this.buildings.push(new obj(j*20, i*20))
            this.car.push(new obj(j*20, i*20))
            break;
          case 's':
            this.shaft.push(new obj(j*20, i*20))
            break;
          case 'W':
            this.weapons.push(new obj(j*20, i*20))
            this.buildings.push(new obj(j*20, i*20))
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
      text("Find the parts needed to fix the car.", 80, 30)
      this.inst--;
    }
    
    this.checkWin();
  }
  
  checkWin() {
    for (var i = 0; i < this.car.length; i++) {
      if (dist(game.player.x, game.player.y, this.car[i].x, this.car[i].y) < 40 && keyIsDown(69)) {
        if (game.player.shafts >= 2 && game.player.cparts >= 50) {
          game.win = 1
        }
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
    for (var i = 0; i < lab.length; i++) {
      for (var j = 0; j < lab[0].length; j++) {
        switch(lab[i][j]){
          case 'f':
            fill(104, 109, 117);
            rect(j*20, i*20, 20, 20);
            break;
        }
      }
    }
    
    for (var i = 0; i < labDetail.length; i++) {
      for (var j = 0; j < labDetail[0].length; j++) {
        switch(labDetail[i][j]){
          case 'w':
            fill(50, 50, 50);
            rect(j*20+5, i*20, 10, 20);
            break;
          case 'T':
            fill(128,0,0);
            rect(j*20, i*20, 20, 20);
            break;
          case 's':
            if (this.pickedUp === 0)
              image(img5, j*20, i*20, 20, 20);
            break;
          case 'W':
            fill(128,0,0);
            rect(j*20, i*20, 20, 20);
            if (game.player.hasWrench == 0)
              image(img3, j*20, i*20-20, 20, 40)
            break;
          case 'C':
            image(img4, j*20, i*20, 60, 100);
            break;
          case 'D':
            fill(0, 0, 0, 150)
            rect(j*20-20, i*20-20, 60, 60);
            image(img2, j*20-10, i*20-20, 20, 20);
            fill(0, 0, 255)
            textSize(20)
            text("50", j*20+10, i*20)
            image(img5, j*20-10, i*20+10, 20, 20);
            text("2", j*20+15, i*20+30)
            break;
        }
      }
    }
  }
  
  
  enemy() {
    for (var i = 0; i < labDetail.length; i++) {
      for (var j = 0; j < labDetail[0].length; j++) {
        switch(labDetail[i][j]){
          case 'e':
            this.enemies.push(new enemyObj(j*20, i*20, 0));
            break;
        }
      }
    }
  }
  
}

var labDetail =["                                     ",
               "                                     ",
               "                                     ",
               "                                     ",
               "       FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
               "       F   FTTTTTwTTTTwTTTTwTTTfffffF",
               "       F   FTfefTwTffTwTffTwTfffCccfF",
               "       F   FTfffTwTfffwTffTwWfffcccfF",
               "       F   FTfffTwTfffwTffTwTfffcDcfF",
               "       F   FTfffTwTfffwffffwTfffcccfF",
               "       FFFFFfffffwffffwffffwffffcccfF",
               "       FffffffffffffffffffffffffffffF",
               "       FffefffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FfffwfffffwffffwffffwffffffffF",
               "       FfefwfffffwffffwffffwffffffffF",
               "       FfffwTfffTwffffwffffwffffffffF",
               "       FfffwTfffTwfffTwffffwffffffffF",
               "       FfefwTfffTwfffTwffffwffffffffF",
               "       FfffwTfsfTwffTTwTTTTwffffffffF",
               "       FFFFFFFFFFFFFFFFFFFFFFFoooooFF"]


var lab     = ["                                     ",
               "                                     ",
               "                                     ",
               "                                     ",
               "       FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
               "       F   FffffffffffffffffffffffffF",
               "       F   FffffffffffffffffffffffffF",
               "       F   FffffffffffffffffffffffffF",
               "       F   FffffffffffffffffffffffffF",
               "       F   FffffffffffffffffffffffffF",
               "       FFFFFffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FffffffffffffffffffffffffffffF",
               "       FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"]



