

class gameObj {
  constructor() {
    // for logo animation on bootup
    this.logo = new Logo();
    this.menu = new Menu();
    this.win = 0;
    // 0 - Logo, 1 - Menu, 2 - Play
    this.state = 0;
    // 0 - easy, 1 - medium, 2 - hard
    this.difficulty = 0;
    this.player = new playerObj();
    this.enemies = [];
    this.x = 0;
    this.y = 0;
    // 0 - outside
    // 1 - ware lab
    // 2 - air conditioning facility
    this.m0 = new map0();
    this.m1 = new map1();
    this.m2 = new map2();
    this.map = this.m0;
    this.currMap = 0;
    this.pause = 0;
  }
  
  draw() {
    if (this.pause)
      this.drawPause();
    else if (this.player.health < 1)
      this.drawGameOver();
    else if (this.win > 0)
      this.drawWin()
    else
      this.drawGame();
  }
  
  drawWin(){
    background(135, 206, 235)
    fill(17,124,19)
    rect(0, 300, 400, 100)
    fill(0)
    rect(0, 300, 400, 50);
    image(img6, 80, 300-100, 270, 120)
    fill(0)
    textSize(40)
    text("You Escaped!", 70, 100)
    textSize(20)
    text("Click anywhere to return to main menu.", 25, 150)
    
  }
  
  
  drawGameOver() {
    fill(0, 0, 0, 220);
    rect(25, 10, 350, 380);
    
    fill(255, 0, 0)
    textSize(30)
    text("Game Over", 130, 70)
    
    fill(130, 74, 70);
    rect(125, 185, 150, 55);
    fill(0);
    rect(130, 190, 140, 45);
    fill(255);
    textSize(20);
    text("  Return to\nMain Menu?", 150, 205);
  }
  
  drawPause() {
    fill(0, 0, 0, 220);
    rect(25, 10, 350, 380);
    // arrow button
    fill(77, 72, 72);
    rect(30, 365, 20, 20);
    fill(255);
    triangle(33, 375, 47, 368, 47, 383);
    
    fill(130, 74, 70);
    rect(125, 185, 150, 55);
    fill(0);
    rect(130, 190, 140, 45);
    fill(255);
    textSize(20);
    text("  Return to\nMain Menu?", 150, 205);
  }
  
  drawGame() {
    push()
    this.map.draw();
    pop()
    fill(77, 72, 72);
    ellipse(385, 15, 15, 15)
    fill(255)
    rect(385-2.5-1, 12, 2.5, 5)
    rect(386, 12, 2.5, 5)
 
  }
  
  
  
}

