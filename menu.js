
// class represents particles that are used for exhaust trail
class particleObj {
  // function sets up particle parameters
  constructor(x, y, w) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(random(-w, w), random(-0.3, -0.5));
    this.size = random(2, 4);
    this.timeLeft = 320;
    this.fade = 0;
    this.c1 = random(0, 100);
  }
  
  // function draws the particle
  draw() {
    noStroke();
    fill(220 - this.fade, this.c1 - this.fade, 0, this.timeLeft+20);
    this.fade += 1.5;
    ellipse(this.position.x, this.position.y, this.size, this.size*2);
  }
  // function updates the particle position
  move() {
    this.position.add(this.velocity);
    this.timeLeft--;
  }
  
}

class Menu {
  constructor() {
    this.index = 0;
    this.bg = [ "                  mm",
                "                   m",
                "                    ",
                " bbbbbbbbbbbbbbbbbb ",
                "bbbbbbbbbbbbbbbbbbbb",
                "bwbbbwbbwbbwbbwbbbwb",
                "bwbbbwbbwbbwbbwbbbwb",
                "bbbbbbbbbbbbbbbbbbbb",
                "bbbbb          bbbbb",
                "bwbb            bbwb",
                "bwb              bwb",
                "bbb              bbb",
                "bbb              bbb",
                "gggrrrrggggggrrrrggg",
                "gggrrrrggggggrrrrggg",
                "ggrrrrggggggggrrrrgg",
                "grrrrggvgvvvvggrrrrg",
                "rrrrrggvgvgvgggrrrrr",
                "rrrrrgggvggvgggrrrrr",
                "rrrrggggggggggggrrrr"];
    this.state = 0;
    this.hScreen = 0;
    this.oScreen = 0;
    this.particles = [];
    this.dx = 40+320/2;
    this.dy = 220;
    this.direction = 0;
    this.currFrame = -100000;
    this.x = 0;
    this.y = 400;
    this.step = new p5.Vector(1, 1);
    this.step.normalize();
    this.a = 0;
    
  }
  
  draw() {
    noStroke();
    for (var i = 0; i < this.bg.length; i++) {
      for (var j = 0; j < this.bg.length; j++) {
        switch(this.bg[i][j]) {
          case ' ':
            fill(20, 24, 82);
            rect(j*20, i*20, 20, 20);
            break;
          case 'r':
            fill(43, 48, 56);
            rect(j*20, i*20, 20, 20);
            break;
          case 'b':
            fill(205,199,187);
            rect(j*20, i*20, 20, 20);
            break;
          case 'g':
            fill(86, 125, 70);
            rect(j*20, i*20, 20, 20);
            break;
          case 'w':
           fill(255,125,73);
           rect(j*20, i*20, 20, 20);
           break;
          case 'v':
           fill(97, 17, 12);
           rect(j*20, i*20, 20, 20);
           break;
          case 'm':
           fill(249,238,182);
           rect(j*20, i*20, 20, 20);
           break;
            
        }
      }
    }
    // main menu
    if (this.state === 0) {
      // animation
      this.animate();
      // play button
      fill(130, 74, 70);
      rect(125, 190, 150, 50);
      fill(179, 40, 30);
      rect(130, 195, 140, 40);
      fill(0);
      textSize(35);
      text("PLAY", 160, 195+35);
      // Options button
      fill(130, 74, 70);
      rect(125, 250, 75, 25);
      fill(0);
      rect(130-2.5, 195+60-2.5, 70, 20);
      fill(255);
      textSize(15);
      text("OPTIONS", 129.5, 195+74);
      // Help button
      fill(130, 74, 70);
      rect(125+100, 250, 50, 25);
      fill(0);
      rect(130-2.5+100, 195+60-2.5, 45, 20);
      fill(255);
      textSize(15);
      text("HELP", 129.5+100, 195+74);
      // creator
      textSize(15);
      text("Made by: Diego Velazquez Correa", 85, 395);
      this.execute();
      // draw the particles from the missle
      for (var p=0; p < this.particles.length; p++) {
        if (this.particles[p].timeLeft > 0) {
          this.particles[p].draw();
          this.particles[p].move();
        }
        else {
          this.particles.splice(p, 1);
        }
      }
      textSize(40);
      fill(0, 0, 0, 200)
      rect(40, 60.5, 330, 45);
      fill(255, 0, 0);
      text("The Hokie Plague", 45, 95);
    }
    // Options select
    else if (this.state === 1) {
      fill(0, 0, 0, 220);
      rect(25, 10, 350, 380);
      fill(77, 72, 72);
      // exit box
      rect(30, 15, 20, 20);
      stroke(255, 0, 0);
      line(32, 17, 48, 33);
      line(32, 33, 48, 17);
      this.optionScreens();
    }
    // help
    else if (this.state === 2) {
      fill(0, 0, 0, 220);
      rect(25, 10, 350, 380);
      // arrow buttons
      fill(77, 72, 72);
      rect(30, 365, 20, 20);
      rect(350, 365, 20, 20);
      fill(255);
      triangle(33, 375, 47, 368, 47, 383);
      triangle(367, 375, 353, 368, 353, 382);
      // exit box
      fill(77, 72, 72);
      rect(30, 15, 20, 20);
      stroke(255, 0, 0);
      line(32, 17, 48, 33);
      line(32, 33, 48, 17);
      this.helpScreens();
    }
  }
  
  animate() {
    if (this.a === 0 && this.currFrame < frameCount - 120) {
      if (this.y >= 270) {
        push()
        translate(this.x, this.y);
        rotate(this.step.heading())
        fill(224,172,105);
        ellipse(0, 0, 40, 40);
        ellipse(-20, -20, 15, 15);
        ellipse(20, -20, 15, 15);
        fill(155, 0, 0);
        ellipse(0, 0, 30, 30);
        rect(-10, 0, 20, 20);
        pop(); 
      }
      push();
      translate(this.x-50, this.y+50);
      rotate(this.step.heading())
      fill(0,172,50);
      ellipse(0, 0, 40, 40);
      ellipse(-20, -20, 15, 15);
      ellipse(20, -20, 15, 15);
      fill(155, 0, 0);
      ellipse(10, 3, 4, 9);
      ellipse(-10, -5, 4, 9);
      fill(100, 100, 100);
      ellipse(-5, 10, 4, 9);
      pop();
      this.x+= this.step.x;
      this.y-= this.step.y;
      if (this.y+50 < 270) {
        this.a = 1;
        this.currFrame = frameCount;
        this.y = 270;
        this.x = 250;
        this.step.y = -1;
        this.step.x = 1;
        this.step.normalize();
      }
    }
    if (this.a === 1 && this.currFrame < frameCount - 120) {
      if (this.y <= 400) {
        push()
        translate(this.x, this.y);
        rotate(this.step.heading()+PI);
        fill(224,172,105);
        ellipse(0, 0, 40, 40);
        ellipse(-20, -20, 15, 15);
        ellipse(20, -20, 15, 15);
        fill(155, 0, 0);
        ellipse(0, 0, 30, 30);
        rect(-10, 0, 20, 20);
        pop();
      }
      if (this.y > 270+50) {
        push();
        translate(this.x-50, this.y-50);
        rotate(this.step.heading()+PI);
        fill(0,172,50);
        ellipse(0, 0, 40, 40);
        ellipse(-20, -20, 15, 15);
        ellipse(20, -20, 15, 15);
        fill(155, 0, 0);
        ellipse(10, 3, 4, 9);
        ellipse(-10, -5, 4, 9);
        fill(100, 100, 100);
        ellipse(-5, 10, 4, 9);
        pop();
      }
      this.x+= this.step.x;
      this.y-= this.step.y;
      if (this.y-50 > 400) {
        this.a = 0;
        this.currFrame = frameCount;
        this.x = 0;
        this.y = 400
        this.step.set(1, 1);
        this.step.normalize();
      }
    }
  }
  
  optionScreens() {
    noStroke();
    if (this.oScreen === 0) {
      fill(77, 72, 72);
      rect(100, 270, 200, 40);
      fill(255)
      textSize(25);
      text("Select Difficulty", 115, 140);
      text("Character Select", 105, 300);
      
      // medium
      fill(130, 74, 70);
      rect(200-75/2, 150, 75, 25);
      if (game.difficulty === 1) {
        fill(0);
        rect(200-75/2+2.5, 150+2.5, 70, 20);
      }
      fill(255);
      textSize(15);
      text("MEDIUM", 200-75/2+6, 167);
      // easy
      fill(130, 74, 70);
      rect(200-75/2-80, 150, 75, 25);
      if (game.difficulty === 0) {
        fill(0);
        rect(200-75/2+2.5-80, 150+2.5, 70, 20);
      }
      fill(255);
      textSize(15);
      text("EASY", 215-75/2+6-80, 167);
      // hard
      fill(130, 74, 70);
      rect(200-75/2+80, 150, 75, 25);
      if (game.difficulty === 2) {
        fill(0);
        rect(200-75/2+2.5+80, 150+2.5, 70, 20);
      }
      fill(255);
      textSize(15);
      text("HARD", 212-75/2+6+80, 167);
      
      
    }
    else if(this.oScreen === 1) {
      fill(77, 72, 72);
      rect(30, 365, 20, 20);
      fill(255);
      triangle(33, 375, 47, 368, 47, 383);
      
      
      
      // engineer
      fill(130, 74, 70);
      rect(162.5, 300, 75, 25);
      if (game.player.c === 1) {
        fill(0);
        rect(200-75/2+2.5, 300+2.5, 70, 20);
      }
      fill(255);
      textSize(15);
      text("Engineer", 200-75/2+6, 267+50);
      text("Can make more with less.\nDecreased crafting cost.", 120, 267+75)
      fill(168, 162, 162);
      rect(200-70/2, 220, 70, 70);
      push();
      translate(200, 260);
      fill(224,172,105);
      ellipse(0, 0, 40, 40);
      ellipse(-20, -20, 15, 15);
      ellipse(20, -20, 15, 15);
      fill(0, 155, 0);
      ellipse(0, 0, 30, 30);
      rect(-10, 0, 20, 20);
      pop();
      // athlete
      fill(130, 74, 70);
      rect(200-75/2-80, 150, 75, 25);
      if (game.player.c === 0) {
        fill(0);
        rect(200-75/2+2.5-80, 150+2.5, 70, 20);
      }
      fill(255);
      textSize(15);
      text("Athlete", 215-75/2-80, 167);
      text("Peak physical condition.\nIncreased number of lives", 35, 167+25)
      fill(168, 162, 162);
      rect(200-75/2-80+2, 70, 70, 70);
      push();
      translate(200-75/2-80+2+35, 105);
      fill(224,172,105);
      ellipse(0, 0, 40, 40);
      ellipse(-20, -20, 15, 15);
      ellipse(20, -20, 15, 15);
      fill(155, 0, 0);
      ellipse(0, 0, 30, 30);
      rect(-10, 0, 20, 20);
      pop();
      // finance
      fill(130, 74, 70);
      rect(200-75/2+80, 150, 75, 25);
      if (game.player.c === 2) {
        fill(0);
        rect(200-75/2+2.5+80, 150+2.5, 70, 20);
      }
      fill(255);
      textSize(15);
      text("Finance", 255, 167);
      text("Luck is on their side.\nIncreased loot drops.", 230, 167+25)
      fill(168, 162, 162);
      rect(200-75/2+80+2, 70, 70, 70);
      push();
      translate(200-75/2+80+2+35, 105);
      fill(224,172,105);
      ellipse(0, 0, 40, 40);
      ellipse(-20, -20, 15, 15);
      ellipse(20, -20, 15, 15);
      fill(0, 0, 155);
      ellipse(0, 0, 30, 30);
      rect(-10, 0, 20, 20);
      pop();
      
      
      
    }
  }
  
  move() {
    fill(0)
    rect(180, 270, 40, 40);
    if (this.direction === 0) {
      fill(255);
      triangle(200, 274, 184, 306, 216, 306);
      this.dy--;
      if (this.dy === 150) {
        this.direction = PI;
      }
    }
    else if (this.direction === PI) {
      fill(255);
      triangle(200, 306, 184, 274, 216, 274);
      this.dy++;
      if (this.dy === 220) {
        this.direction = PI/2;
      }
    }
    else if (this.direction === PI/2) {
      fill(255);
      triangle(184, 274, 184, 306, 216, 290);
      this.dx++;
      if (this.dx === 300) {
        this.direction = 3*PI/2;
      }
    }
    else {
      fill(255);
      triangle(184, 290, 216, 274, 216, 306);
      this.dx--;
      if (this.dx === 40+320/2) {
        this.direction = 0;
      }
    }
  }
  
  helpScreens() {
    if (this.hScreen === 1) {
      noStroke();
      textSize(35);
      fill(255)
      text("Movement", 125, 50);
      textSize(15);
      text("Use the arrow keys to move throughout the map.", 40, 100);
      fill(168, 162, 162);
      rect(40, 120, 320, 200)
      this.move();
      push();
      translate(this.dx, this.dy);
      rotate(this.direction);
      fill(224,172,105);
      ellipse(0, 0, 40, 40);
      ellipse(-20, -20, 15, 15);
      ellipse(20, -20, 15, 15);
      fill(0, 0, 255);
      ellipse(0, 0, 30, 30);
      rect(-10, 0, 20, 20);
      pop();
    }
    else if (this.hScreen == 0) {
      noStroke();
      textSize(35);
      fill(255)
      text("Objective", 125, 50);
      textSize(15);
      text("The objective of this game is to survive and \nescape campus before the hordes become too \nmuch for you to handle! Your key to escaping \nlies in the Ware Lab, the HEVT design team has \nleft their vehicle abandoned in an almost working \nstate. You must scavenge around campus to find \nthe parts needed to fix the car and escape.", 40, 100);
      
    }
    else {
      noStroke();
      textSize(35);
      fill(255)
      text("Crafting", 135, 50);
      textSize(15);
      text("By scavenging around the map you will find \nseveral weapons that you can use to defend \nyourself from the hordes. These weapons can \nbe upgraded to have better stats at workbenches \nplaced throughout the map. In order to upgrade \na weapon you will need a certain number of \n'parts', which can be found through looting \nbuildings or eliminating zombies.", 40, 100);
    }
  }
  
  execute() {
    this.particles.push(new particleObj(375, 270, 0.2));
    this.particles.push(new particleObj(375, 270, 0.2));
    this.particles.push(new particleObj(375, 270, 0.2));
    
    this.particles.push(new particleObj(35, 70, 0.2));
    this.particles.push(new particleObj(37, 71, 0.2));
    this.particles.push(new particleObj(39, 70, 0.2));
    this.particles.push(new particleObj(41, 71, 0,2));
  }
}