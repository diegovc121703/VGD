var game;


function preload(){
  img1 = loadImage("car.png")
  img2 =loadImage("parts.png")
  img3 = loadImage("pipe-wrench.png")
  img4 = loadImage("hevt.png")
  img5 = loadImage("half.png")
  img6 = loadImage("win.png")
  img7 = loadImage("box.png")
  img8 = loadImage("bench.png")
}

function setup() {
  createCanvas(400, 400);
  
  game = new gameObj();
  game.state = 0;
}

function draw() {
  // if the game state is 0, we draw and animate logo
  if (game.state === 0) {
    // set the background color to beige
    background( 255, 253, 208 );
    // call the logo draw and move function
    game.logo.draw();
    game.logo.move();
  }
  // if game state is 1, we draw and animate the start screen
  else if (game.state === 1){
    game.menu.draw();
  }
  else if (game.state === 2) {
    game.draw();
  }

}