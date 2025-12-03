function mouseClicked() {
  // variables to hold mouse x and y positions
  var x = mouseX;
  var y = mouseY;
  
  // interactions for when the game is in play state
  if (game.state === 2) {  
    if (dist(x, y, 385, 15) < 7.5)
      game.pause = 1;
    if (x > 30 && x < 50 && y > 365 && y < 385)
      game.pause = 0;
    if (game.pause === 1 || game.player.health < 1) {
      if (x > 125 && x < 125+150 && y < 185+55 && y > 185) {
        var c = game.player.c;
        var d = game.difficulty;
        var h = game.player.health;
        var m = game.player.mult;
        setup();
        game.state = 1;
        game.player.c = c;
        game.difficulty = d;
        game.player.mult = m;
        if (c === 0)
          game.player.health = 8;
        else
          game.player.health = 5;
      }
    }
    
    if (game.win === 1) {
      var c = game.player.c;
      var m = game.player.mult;
        var d = game.difficulty;
        var h = game.player.health;
        setup();
        game.state = 1;
        game.player.c = c;
        game.difficulty = d;
        game.player.mult = m;
        if (c === 0)
          game.player.health = 8;
        else
          game.player.health = 5;
    }
  }
  
  
  
  
  
  
  
  
  
  
  // interactions for main menu and logo screen
  else if (game.state != 2) {
    if (game.menu.state === 0 && x > 125 && x < 125+150 && y < 190+50 && y > 190) {
      game.state++;
    }
    else if (game.menu.state === 0 && x > 125 && x < 125+75 && y < 250+25 && y > 250) {
      game.menu.state = 1;
    }
    else if(game.menu.state === 0 && x > 225 && x < 225 + 50 && y < 250+25 && y > 250) {
      game.menu.state = 2;
    }
    else if (game.menu.state != 0 && x > 30 && x < 50 && y > 15 && y < 35) {
      game.menu.state = 0;
      game.menu.hScreen = 0;
      game.menu.oScreen = 0;
    }
    else if (x > 30 && x < 50 && y > 365 && y < 385) {
      if (game.menu.state === 2) {
        game.menu.hScreen -= 1;
        if (game.menu.hScreen < 0)
          game.menu.hScreen = 0;
      }
      else if (game.menu.state === 1) {
        game.menu.oScreen -= 1;
        if (game.menu.oScreen < 0)
          game.menu.oScreen = 0;
      }
    }
    else if (game.menu.state === 2 && x > 350 && x < 370 && y > 365 && y < 385)   {
      game.menu.hScreen += 1;
      if (game.menu.hScreen >= 2)
        game.menu.hScreen = 2;
    }
    else if (game.menu.state === 1 && x > 100 && x < 300 && y > 270 && y < 310)   {
      game.menu.oScreen += 1;
      if (game.menu.oScreen >= 2)
        game.menu.oScreen = 1;
    }
    else if (game.menu.state === 1 && game.menu.oScreen === 0) {
      if (x > 82.5 && x < 82.5+75 && y > 150 && y < 175) {
        game.difficulty = 0;
      }
      else if (x > 162.5 && x < 162.5 + 75 && y > 150 && y < 175) {
        game.difficulty = 1;
      }
      else if (x > 162.5+80 && x < 162.5+80 + 75 && y > 150 && y < 175) {
        game.difficulty = 2;
      }
    }
    else if (game.menu.state === 1 && game.menu.oScreen === 1) {
      if (x > 82.5 && x < 82.5+75 && y > 150 && y < 175) {
        game.player.c = 0;
        game.player.health = 8;
        game.player.mult = 1;
        game.player.cost = 25;
      }
      else if (x > 162.5 && x < 162.5 + 75 && y > 300 && y < 325) {
        game.player.c = 1;
        game.player.health = 5;
        game.player.mult = 1;
        game.player.cost = 15;
      }
      else if (x > 162.5+80 && x < 162.5+80 + 75 && y > 150 && y < 175) {
        game.player.c = 2;
        game.player.health = 5;
        game.player.cost = 25;
        game.player.mult = 1.75;
      }
    }
    if (game.logo.state == "END" && (x > 150) && (x < 250) && (y > 325) && (y < 375))
      game.state = 1;
  }
}