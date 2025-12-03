class wrenchObj {
  constructor() {
    this.punch = new p5.Vector(0, -20);
    this.f = 0;
    this.damage = 2;
    this.range = 20;
    this.currFrame = frameCount;
    this.swing = PI/2;
  }
  
  draw() {
    fill(224,172,105);
    if (this.f === 0) {
      push()
      rotate(-PI/2)
      image(img3, 5, -5, 10, 30);
      pop()
      ellipse(-10, -10, 7.5, 7.5);
      ellipse(10, -10, 7.5, 7.5);
    }
    else {
      ellipse(0, -10, 7.5, 7.5);
      push();
      translate(0, -10);
      fill(255, 0, 0)
      rotate(this.swing);
      image(img3, -5, 0, 10, 30)
      pop();
      this.swing += 0.2;
      if (this.swing > 3*PI/2) {
        this.f = 0;
        this.swing = PI/2;
      }
    }
    
    if (keyIsDown(32) && this.currFrame < frameCount - 60 ) {
      this.currFrame = frameCount;
      this.f = 1;
      this.checkCollision();
    }
  }
  
  checkCollision() {
    for (var i = 0; i < game.map.enemies.length; i++) {
      if (dist(game.map.enemies[i].x, game.map.enemies[i].y, 
          game.player.x+20*cos(game.player.angle), game.player.y+20*sin(game.player.angle)) < 40){
        game.map.enemies[i].health -= this.damage;
      }
    }
  }
  
}

class fistsObj {
  constructor() {
    this.punch = new p5.Vector(0, -20);
    this.f = 0;
    this.damage = 1;
    this.currFrame = frameCount;
  }
  draw() {
    fill(224,172,105);
    if (this.f === 0) {
      ellipse(-10, -10, 7.5, 7.5);
      ellipse(10, -10, 7.5, 7.5);
    }
    else {
      if (this.currFrame < frameCount - 10) {
        this.currFrame = frameCount;
        this.f = 0; 
      }
      ellipse(-10, -10, 7.5, 7.5);
      ellipse(this.punch.x, this.punch.y, 7.5, 7.5);
      
    }
    
    if (keyIsDown(32) && this.currFrame < frameCount - 60 ) {
      this.currFrame = frameCount;
      this.f = 1;
      this.checkCollision();
    }
    
  }
  
  checkCollision() {
    for (var i = 0; i < game.map.enemies.length; i++) {
      if (dist(game.map.enemies[i].x, game.map.enemies[i].y, 
          game.player.x+20*cos(game.player.angle), game.player.y+20*sin(game.player.angle)) < 15){
        game.map.enemies[i].health--;
      }
    }
  }
}

class playerObj {
  constructor() {
    this.x = 500;
    this.y = 500;
    this.step = new p5.Vector();
    this.c = 0;
    this.fist = new fistsObj();
    this.wrench = new wrenchObj();
    this.hasWrench = 0;
    this.weapon = 0;
    this.angle = 0;
    this.health = 8;
    this.cparts = 0;
    this.shafts = 0;
    this.cost = 25;
    this.mult = 1;
    this.delay = frameCount;
  }
  
  draw() {
    if (keyIsDown(LEFT_ARROW)) {
      this.step.x = -1;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.step.x = 1;
    }
    else
      this.step.x = 0;
    
    
    if (keyIsDown(UP_ARROW)) {
      this.step.y = -1;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      this.step.y = 1;
    }
    else
      this.step.y = 0;
    
    if (this.step.x != 0 || this.step.y != 0)
      this.angle = this.step.heading();
    
    this.checkCollision()
    this.x += this.step.x;
    this.y += this.step.y;
    
    if (this.x < 110)
      this.x = 110;
    if (this.y < 110)
      this.y = 110;
    if (this.x > 890)
      this.x = 890;
    if (this.y > 970)
      this.y = 970;
    
    
    push();
    translate(this.x, this.y);
    rotate(this.angle+PI/2)
    fill(224,172,105);
    ellipse(0, 0, 20, 20);
    
    this.weaponDraw();
    if (this.c === 0)
      fill(155, 0, 0);
    else if (this.c === 2)
      fill(0, 0, 155);
    else
      fill(0, 155, 0);
    ellipse(0, 0, 15, 15);
    rect(-5, 0, 10, 10);    
    pop();
    
    push();
    translate(-game.x, -game.y);
    for (var i = 0; i < this.health; i++) {
      fill(255, 0, 0);
      ellipse(11+i*20, 10, 8, 8);
      ellipse(19+i*20, 10, 8, 8);
      triangle(7+i*20, 11, 23+i*20, 11, 15+i*20, 20);
    }
    image(img2, 5, 25, 20, 20)
    fill(0, 0, 255)
    textSize(20);
    text(this.cparts, 30, 42)
    
    image(img5, 5, 45, 20, 20)
    fill(0, 0, 255)
    textSize(20);
    text(this.shafts, 30, 62)
    pop();
    
  }
  
  weaponDraw() {
    this.checkEquip();
    if (this.weapon == 0)
      this.fist.draw();
    else if (this.weapon == 1)
      this.wrench.draw();
  }
  
  checkEquip() {
    if (keyIsDown(49)) {
      this.weapon = 0;
    }
    else if (keyIsDown(50) && this.hasWrench) {
      this.weapon = 1;
    }
  }
  
  checkCollision() {
    // iterate through map.buildings
    for (var i = 0; i < game.map.buildings.length; i++) {
      // get the next position of the player
      var nextX = this.x + this.step.x;
      var nextY = this.y + this.step.y;
      
      // if there is a collision with a wall
      // set the step to 0
      if (dist(this.x, nextY, game.map.buildings[i].x, game.map.buildings[i].y) < 10 ||
          dist(this.x, nextY, game.map.buildings[i].x, game.map.buildings[i].y+20) < 10 ||
          dist(this.x, nextY, game.map.buildings[i].x+20, game.map.buildings[i].y+20) < 10 ||
          dist(this.x, nextY, game.map.buildings[i].x+20, game.map.buildings[i].y) < 10 ||
         (this.x+10 > game.map.buildings[i].x && this.x+10 < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y && nextY < game.map.buildings[i].y+20) ||
         (this.x-10 > game.map.buildings[i].x && this.x-10 < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y && nextY < game.map.buildings[i].y+20) ||
         (this.x > game.map.buildings[i].x && this.x < game.map.buildings[i].x+20 &&
          nextY+10 > game.map.buildings[i].y && nextY+10 < game.map.buildings[i].y+20) ||
         (this.x > game.map.buildings[i].x && this.x < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y-10 && nextY-10 < game.map.buildings[i].y+20))
        this.step.y = 0;
      
      if (dist(nextX, this.y, game.map.buildings[i].x, game.map.buildings[i].y) < 10 ||
          dist(nextX, this.y, game.map.buildings[i].x, game.map.buildings[i].y+20) < 10 ||
          dist(nextX, this.y, game.map.buildings[i].x+20, game.map.buildings[i].y+20) < 10 ||
          dist(nextX, this.y, game.map.buildings[i].x+20, game.map.buildings[i].y) < 10 ||
         (nextX+10 > game.map.buildings[i].x && nextX+10 < game.map.buildings[i].x+20 &&
          this.y > game.map.buildings[i].y && this.y < game.map.buildings[i].y+20) ||
         (nextX-10 > game.map.buildings[i].x && nextX-10 < game.map.buildings[i].x+20 &&
          this.y > game.map.buildings[i].y && this.y < game.map.buildings[i].y+20) ||
         (nextX > game.map.buildings[i].x && nextX < game.map.buildings[i].x+20 &&
          this.y+10 > game.map.buildings[i].y && this.y+10 < game.map.buildings[i].y+20) ||
         (nextX > game.map.buildings[i].x && nextX < game.map.buildings[i].x+20 &&
          this.y > game.map.buildings[i].y-10 && this.y-10 < game.map.buildings[i].y+20))
        this.step.x = 0;
      
    }
    
    for (var i = 0; i < game.map.doors.length; i++) {
      if (dist(this.x, this.y, game.map.doors[i].x, game.map.doors[i].y) < 40 && keyIsDown(69) && 
          (this.delay < (frameCount - 60))) {
        
        this.delay = frameCount;
        if (game.map.doors[i].b === 1) {
          game.map = game.m1;
          game.currMap = 1;
          game.map.enemy();
          this.x = 600;
          this.y = 400;
        }
        else if (game.map.doors[i].b === 0) {
          game.map.enemies = [];
          game.map = game.m0;
          if (game.currMap == 1)  {
            this.x = 850;
            this.y = 700;
          }
          else {
            this.x = 760;
            this.y = 270;
          }
          game.currMap = 0;
        }
        else if (game.map.doors[i].b === 2) {
          game.map = game.m2;
          game.currMap = 2;
          game.map.enemy();
          this.x = 330;
          this.y = 400;
        }
      }
    }
    
    for (var i = 0; i < game.map.weapons.length; i++) {
      if (dist(this.x, this.y, game.map.weapons[i].x, game.map.weapons[i].y) < 40 && keyIsDown(69)) {
        this.hasWrench = 1;
        this.weapon = 1;
      }
    }
    
    for (var i = 0; i < game.map.shaft.length; i++) {
      if (dist(this.x, this.y, game.map.shaft[i].x, game.map.shaft[i].y) < 40 && keyIsDown(69)) {
        game.map.shaft.splice(i, 1);
        this.shafts += 1;
        game.map.pickedUp = 1;
      }
    }
    
  }
  
  
}