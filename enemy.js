class wanderState {
  // constructor sets class parameters
  constructor(){
    // angle the enemy moves
    this.direction = 0;
    // distance traveled
    this.wanderDist = 0;
    this.step = new p5.Vector(0, -1);
  }
  
  // execute function is what makes the enemy 
  // object that is passed in move
  execute(me) {
    // if the object has traveled the random wander distance
    if (this.wanderDist <= 0) {
      // set new wander distance
      this.wanderDist = random(50, 80);
      // randomize the direction
      this.direction = random(0, 360);
      me.direction = this.direction;
      this.step.set(cos(this.direction), sin(this.direction));
    }
    // decrease wander distance by 1
    this.wanderDist--;
    // move the object
    var nx = me.x + this.step.x*0.5
    var ny = me.y + this.step.y*0.5
    if (dist(nx, ny, game.player.x, game.player.y) > 20) {
      this.checkCollision(nx, ny, me);
      me.x += this.step.x*0.8
      me.y += this.step.y*0.8
    }
    // out of bounds checks
    if (me.x < 110)
      me.x = 110;
    if (me.y < 110)
      me.y = 110;
    if (me.x > 890)
      me.x = 890;
    if (me.y > 970)
      me.y = 970;
    
    // if the enemy is within 150 pixels (150 + 10 + 10 to account 
    // for object width)
    if(dist(me.x+10, me.y+10, game.player.x+10, game.player.y+10) < 170) {
      // change state to chase state
      me.changeState(1);
    }
  }
  
  checkCollision(nextX, nextY, me) {
    // iterate through map.buildings
    for (var i = 0; i < game.map.buildings.length; i++) {
      
      // if there is a collision with a wall
      // set the step to 0
      if (dist(me.x, nextY, game.map.buildings[i].x, game.map.buildings[i].y) < 10 ||
          dist(me.x, nextY, game.map.buildings[i].x, game.map.buildings[i].y+20) < 10 ||
          dist(me.x, nextY, game.map.buildings[i].x+20, game.map.buildings[i].y+20) < 10 ||
          dist(me.x, nextY, game.map.buildings[i].x+20, game.map.buildings[i].y) < 10 ||
         (me.x+10 > game.map.buildings[i].x && me.x+10 < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y && nextY < game.map.buildings[i].y+20) ||
         (me.x-10 > game.map.buildings[i].x && me.x-10 < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y && nextY < game.map.buildings[i].y+20) ||
         (me.x > game.map.buildings[i].x && me.x < game.map.buildings[i].x+20 &&
          nextY+10 > game.map.buildings[i].y && nextY+10 < game.map.buildings[i].y+20) ||
         (me.x > game.map.buildings[i].x && me.x < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y-10 && nextY-10 < game.map.buildings[i].y+20))
        this.step.y = 0;
      
      if (dist(nextX, me.y, game.map.buildings[i].x, game.map.buildings[i].y) < 10 ||
          dist(nextX, me.y, game.map.buildings[i].x, game.map.buildings[i].y+20) < 10 ||
          dist(nextX, me.y, game.map.buildings[i].x+20, game.map.buildings[i].y+20) < 10 ||
          dist(nextX, me.y, game.map.buildings[i].x+20, game.map.buildings[i].y) < 10 ||
         (nextX+10 > game.map.buildings[i].x && nextX+10 < game.map.buildings[i].x+20 &&
          me.y > game.map.buildings[i].y && me.y < game.map.buildings[i].y+20) ||
         (nextX-10 > game.map.buildings[i].x && nextX-10 < game.map.buildings[i].x+20 &&
          me.y > game.map.buildings[i].y && me.y < game.map.buildings[i].y+20) ||
         (nextX > game.map.buildings[i].x && nextX < game.map.buildings[i].x+20 &&
          me.y+10 > game.map.buildings[i].y && me.y+10 < game.map.buildings[i].y+20) ||
         (nextX > game.map.buildings[i].x && nextX < game.map.buildings[i].x+20 &&
          me.y > game.map.buildings[i].y-10 && me.y-10 < game.map.buildings[i].y+20))
        this.step.x = 0;
    }
  }
}

class chaseState {
  // constructor sets up step vector
  constructor() {
    this.step = new p5.Vector(0, -1);
  }
  
  // execute function makes the passed in enemy object chase the player
  execute(me) {
    // get the x and y step to the player
    this.step.set(me.x - game.player.x, me.y - game.player.y);
    this.step.normalize();
    // move the enemy object closer to the player
    var nx = me.x - this.step.x*0.8
    var ny = me.y - this.step.y*0.8
    if (dist(nx, ny, game.player.x, game.player.y) > 19) {
      this.checkCollision(nx, ny, me);
      me.x -= this.step.x*0.5
      me.y -= this.step.y*0.5
    }
    // set the direction the enemy should be facing
    me.direction = this.step.heading()+PI;
    
    // out of bounds checks    
    if (me.x < 110)
      me.x = 110;
    if (me.y < 110)
      me.y = 110;
    if (me.x > 890)
      me.x = 890;
    if (me.y > 970)
      me.y = 970;
    
    // if the player is farther than 150 pixels
    if(dist(me.x+10, me.y+10, game.player.x+10, game.player.y+10) > 170) {
      me.changeState(0); // change state back to wander state
    }
  }
  
  checkCollision(nextX, nextY, me) {
    // iterate through map.buildings
    for (var i = 0; i < game.map.buildings.length; i++) {
      
      // if there is a collision with a wall
      // set the step to 0
      if (dist(me.x, nextY, game.map.buildings[i].x, game.map.buildings[i].y) < 10 ||
          dist(me.x, nextY, game.map.buildings[i].x, game.map.buildings[i].y+20) < 10 ||
          dist(me.x, nextY, game.map.buildings[i].x+20, game.map.buildings[i].y+20) < 10 ||
          dist(me.x, nextY, game.map.buildings[i].x+20, game.map.buildings[i].y) < 10 ||
         (me.x+10 > game.map.buildings[i].x && me.x+10 < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y && nextY < game.map.buildings[i].y+20) ||
         (me.x-10 > game.map.buildings[i].x && me.x-10 < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y && nextY < game.map.buildings[i].y+20) ||
         (me.x > game.map.buildings[i].x && me.x < game.map.buildings[i].x+20 &&
          nextY+10 > game.map.buildings[i].y && nextY+10 < game.map.buildings[i].y+20) ||
         (me.x > game.map.buildings[i].x && me.x < game.map.buildings[i].x+20 &&
          nextY > game.map.buildings[i].y-10 && nextY-10 < game.map.buildings[i].y+20))
        this.step.y = 0;
      
      if (dist(nextX, me.y, game.map.buildings[i].x, game.map.buildings[i].y) < 10 ||
          dist(nextX, me.y, game.map.buildings[i].x, game.map.buildings[i].y+20) < 10 ||
          dist(nextX, me.y, game.map.buildings[i].x+20, game.map.buildings[i].y+20) < 10 ||
          dist(nextX, me.y, game.map.buildings[i].x+20, game.map.buildings[i].y) < 10 ||
         (nextX+10 > game.map.buildings[i].x && nextX+10 < game.map.buildings[i].x+20 &&
          me.y > game.map.buildings[i].y && me.y < game.map.buildings[i].y+20) ||
         (nextX-10 > game.map.buildings[i].x && nextX-10 < game.map.buildings[i].x+20 &&
          me.y > game.map.buildings[i].y && me.y < game.map.buildings[i].y+20) ||
         (nextX > game.map.buildings[i].x && nextX < game.map.buildings[i].x+20 &&
          me.y+10 > game.map.buildings[i].y && me.y+10 < game.map.buildings[i].y+20) ||
         (nextX > game.map.buildings[i].x && nextX < game.map.buildings[i].x+20 &&
          me.y > game.map.buildings[i].y-10 && me.y-10 < game.map.buildings[i].y+20))
        this.step.x = 0;
    }
  }
}

class enemyObj {
  constructor(x, y, h) {
    this.direction = 0;
    this.currFrame = frameCount;
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
    this.x = x;
    this.y = y;
    this.dead = 0;
    this.health = 5;
    this.step = new p5.Vector();
    this.hitCooldown = -100;
    if (h === 0)
      this.step.set(0, 1);
    else if (h === 1)
      this.step.set(0, -1);
    else if (h === 2)
      this.step.set(1, 0);
    else
      this.step.set(-1, 0);
    this.direction = this.step.heading();
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.direction + PI/2)
    fill(0,172,50);
    ellipse(0, 0, 20, 20);
    
    ellipse(-10, -10, 7.5, 7.5);
    ellipse(10, -10, 7.5, 7.5);
    
    fill(155, 0, 0);
    ellipse(7, 3, 2, 4.5);
    ellipse(-7, -4, 2, 4.5);
    fill(100, 100, 100);
    ellipse(-5, 5, 2, 4.5);
    pop();
    
    if (this.health < 1) {
      this.dead = 1;
      var p = random(4, 8);
      game.player.cparts += round(p * game.player.mult);
    }
    
    if ((this.x < 140 || this.x > 860) && this.step.y === 0) {
      this.x += this.step.x*0.5;
    }
    else if ((this.y < 140 || this.y > 940) && this.step.x === 0) {
      this.y += this.step.y*0.5;
    }
    else  
      this.state[this.currState].execute(this);
  }
  
  
  checkCollision() {
    if (this.hitCooldown < frameCount - 60 &&
       dist(this.x, this.y, game.player.x, game.player.y) < 20) {
      this.hitCooldown = frameCount;
      game.player.health--;
    }
  }
  
  changeState(s) {
    this.currState = s;
  }
}


