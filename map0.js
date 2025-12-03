class obj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
  }
}

class door {
  constructor(x, y, b) {
    this.x = x;
    this.y = y;
    this.b = b;
  }
}

class map0 {
  
  constructor() {
    this.buildings = [];
    this.doors = [];
    this.init();
    this.inst = 300;
    this.test = 1;
    this.currFrame = frameCount;
    this.weapons = [];
    this.pickedUp = 0;
    this.shaft = [];
    this.enemies = []
  }
  
  init() {
    for (var i = 0; i < outside.length; i++) {
      for (var j = 0; j < outside[0].length; j++) {
        switch(outside[i][j]){
          case 'B':
            this.buildings.push(new obj(j*20, i*20))
            break;
        }
      }
    }
  }
  
  draw() {
    var ran = random(0, 10000);
    if (ran < 300 && this.currFrame < frameCount - 120) {
      this.currFrame = frameCount;
      ran = random(0, 4);
      if (ran < 1)
        this.enemies.push(new enemyObj(18*20, 0, 0));
      else if (ran < 2)
        this.enemies.push(new enemyObj(18*20, 54*20, 1));
      else if (ran < 3)
        this.enemies.push(new enemyObj(0, 45*20, 2));
      else
        this.enemies.push(new enemyObj(50*20, 20*20, 3));
    }
    

    
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
      rect(50, 15, 310, 60)
      fill(255)
      textSize(15);
      text("Use the arrow keys to move.\nPress spacebar to hit enemies.\nPress e to interact with objects and doors.", 80, 30)
      this.inst--;
    }
  }
  
  drawEnemies() {
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].dead === 0) {
        this.enemies[i].draw();
        this.enemies[i].checkCollision();
      }
      else
        this.enemies.splice(i, 1);
    }
  }
  
  drawBackground() {
    background(255, 125, 180)
    for (var i = 0; i < outside.length; i++) {
      for (var j = 0; j < outside[0].length; j++) {
        switch(outside[i][j]){
          case 'b':
            fill(104, 109, 117);
            rect(j*20, i*20, 20, 20);
            break;
          case 'B':
            fill(104, 109, 117);
            rect(j*20, i*20, 20, 20);
            break;
          case 'r':
            fill(19, 10, 6);
            rect(j*20, i*20, 20, 20);
            break;
          case 'g':
            fill(86, 125, 70);
            rect(j*20, i*20, 20, 20);
            break;
          case 's':
            fill(240, 220, 192);
            rect(j*20, i*20, 20, 20);
            break;
        }
      }
    }
    
    for (var i = 0; i < outside.length; i++) {
      for (var j = 0; j < outside[0].length; j++) {
        push()
        translate(j*20, i*20)
        switch(details[i][j]){
          case 'u':
            image(img1, -20, 0, 40, 80);
            break;
          case 'd':
            push();
            rotate(PI)
            image(img1, -20, -20, 40, 80);
            pop();
            break;
          case 'R':
            push();
            rotate(PI/2)
            image(img1, -20, -20, 40, 80);
            pop();
            break;
          case 'L':
            push();
            rotate(-PI/2)
            image(img1, -20, 0, 40, 80);
            pop();
            break;
          case 'o':
            fill(50, 50, 50);
            rect(0, 10, 20, 10);
            fill(255, 255, 0, 100);
            rect(0, 20, 20, 40);
            this.doors.push(new door(j*20, i*20, 1));
            break;
          case 'O':
            fill(50, 50, 50);
            rect(0, 0, 10, 20);
            fill(255, 255, 0, 100);
            rect(-20, 0, 20, 20);
            this.doors.push(new door(j*20, i*20, 2));
            break;
        }
        pop();
      }
    }
  }
  
  
}

var details = ["gggggggggggssssrrrrrrggssrrrrrrrrggggrrrrrrrrrrrrr",
               "gggggggggggssssrrrrrrggssrrrrrrrrggggrrrrrrrrrrrrr",
               "gggggggggggssssrrrrrrggssrrrrrrrrggggggggggggggggg",
               "gggggggggggssssrrrrrrssssrrrrrrrrggggggggggggggggg",
               "rrrrd ccRLcc Lccc ccRLcccLccccccRcccRLcccLccccgggg",
               "rrrrurrrrrrrrrrrrrrrrggssrrrrrrrrggsssssssssscusss",
               "rrrr rrrrrrrrrrrrrrrrggssrrrrrrrrsssssssssssscssss",
               "rrrrcrrrrrrrrrrrrrrrrggssrrrrrrrrsssssssssssscssss",
               "ssss ssssssssssrrrrrrggssrrrrrrrrgsssssBBBBBBsssss",
               "sbbbBBBBBBBggssrrrrrrggssrrrrrrrrgssBBBbbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgssBbbbbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgssBBBbbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssssBbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssssObbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssssBbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssBBbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssBBBBBBBBrrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrggggggggggggBurrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrggggggggggggBrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrBrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrBrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrBurrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrBrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBBBBBBBBBBBBBBBBBBrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBBBBBBBBBBBBBBoooobbbbb",
               "sbbbbbbbbbBggssrrrrrrssssssssssssssssssssssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrssssssssssssssssssssssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBBBBBBBBBBBBBggggssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBbbbbbbbbbbbBggggssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBbbbbbbbbbbbBggggssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBbbbbbbbbbbbBggggssssBbbbb",
               "sbbbBBBBBBBggssrrrrrrsssBbbbbbbbbbbbBggssssssBbbbb",
               "ssssussssssssssrrrrrrsssBbbbbbbbbbbbBgssgssss usss",
               "ssss ssssssssssrrrrrrsssBBBBBBBBBBBBBssggssssBssss",
               "rrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr rrrr",
               "rrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrBrrrr",
               "rrrrurrrrrrrrrrrrrrrrssggggggggggggggggggggg  ssgg",
               "rrrr rrrrrrrrrrrrrrrrssggggggggggggggggggggg Lssgg",
               "ssss ssssssssssrrrrrrssggBBBBBBBBBBBBBBBBBBBBgssgg",
               "ssss ssssssssssrrrrrrssggBbbbbbbbbbbbbbbbbbbBgssgg",
               "bbbbBBBBBBBssssrrrrrrssggBbbbbbbbbbbbbbbbbbbBgssgg",
               "bbbbbbbbbbBssssrrrrrrssggBbbbbbbbbbbbbbbbbbbBgssgg",
               "bbbbbbbbbbB             BBBBBBBBBBBBBBBBBBBBBgssgg",
               "bbbbbbbbbbbLgssrrrrRssgRgggggggssggggggggggggssgg",
               "bbbbbbbbbbbggssrrrrrrssgggggggggssgggggggggggssssg",
               "bbbbbbbbbbbggssrrrrrrsssssssssssssssssssssssssssss", 
               "bbbbbbbbbbbggssrrrrrrsssssssssssssssssssssssssssss"];



var outside = ["gggggggggggssssrrrrrrggssrrrrrrrrggggrrrrrrrrrrrrr",
               "gggggggggggssssrrrrrrggssrrrrrrrrggggrrrrrrrrrrrrr",
               "gggggggggggssssrrrrrrggssrrrrrrrrggggggggggggggggg",
               "sssssssssssssssrrrrrrssssrrrrrrrrggggggggggggggggg",
               "rrrrrrrrrrrrrrrrrrrrrggssrrrrrrrrggggggggggggggggg",
               "rrrrrrrrrrrrrrrrrrrrrggssrrrrrrrrggsssssssssssssss",
               "rrrrrrrrrrrrrrrrrrrrrggssrrrrrrrrsssssssssssssssss",
               "rrrrrrrrrrrrrrrrrrrrrggssrrrrrrrrsssssssssssssssss",
               "sssssssssssssssrrrrrrggssrrrrrrrrgsssssBBBBBBsssss",
               "sbbbBBBBBBBggssrrrrrrggssrrrrrrrrgssBBBbbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgssBbbbbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgssBBBbbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssssBbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssssBbbbbbsssss",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssssBbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssBBbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgsssBBBBBBBBrrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgggggggggggggrrrr",
               "sbbbbbbbbbBggssrrrrrrggssrrrrrrrrgggggggggggggrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
               "sbbbbbbbbbBggssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBBBBBBBBBBBBBBBBBBrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbrrrrr",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBbbbbbbbbbbbbbbbbbbbbbb",
               "sbbbbbbbbbBggssrrrrrrsssrrrBBBBBBBBBBBBBBBBBBbbbbb",
               "sbbbbbbbbbBggssrrrrrrssssssssssssssssssssssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrssssssssssssssssssssssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBBBBBBBBBBBBBggggssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBbbbbbbbbbbbBggggssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBbbbbbbbbbbbBggggssssBbbbb",
               "sbbbbbbbbbBggssrrrrrrsssBbbbbbbbbbbbBggggssssBbbbb",
               "sbbbBBBBBBBggssrrrrrrsssBbbbbbbbbbbbBggssssssBbbbb",
               "sssssssssssssssrrrrrrsssBbbbbbbbbbbbBgssgsssssssss",
               "sssssssssssssssrrrrrrsssBBBBBBBBBBBBBssggsssssssss",
               "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
               "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
               "rrrrrrrrrrrrrrrrrrrrrssgggggggggggggggggggggggssgg",
               "rrrrrrrrrrrrrrrrrrrrrssgggggggggggggggggggggggssgg",
               "sssssssssssssssrrrrrrssggBBBBBBBBBBBBBBBBBBBBgssgg",
               "sssssssssssssssrrrrrrssggBbbbbbbbbbbbbbbbbbbBgssgg",
               "bbbbBBBBBBBssssrrrrrrssggBbbbbbbbbbbbbbbbbbbBgssgg",
               "bbbbbbbbbbBssssrrrrrrssggBbbbbbbbbbbbbbbbbbbBgssgg",
               "bbbbbbbbbbBssssrrrrrrssggBBBBBBBBBBBBBBBBBBBBgssgg",
               "bbbbbbbbbbbggssrrrrrrssgggggggggssggggggggggggssgg",
               "bbbbbbbbbbbggssrrrrrrssgggggggggssgggggggggggssssg",
               "bbbbbbbbbbbggssrrrrrrsssssssssssssssssssssssssssss", 
               "bbbbbbbbbbbggssrrrrrrsssssssssssssssssssssssssssss"];



