// Logo class which animates a flower growing and then turns the bud sideways
// which represents the letter 'D' and moves the flower stem which represents
// the letter 'V'
class Logo {
  // constructor function that initialized all object parameters
  constructor(){
    // flower stem (triangle) parameters
    this.tri1x = 200; // top left corner coords
    this.tri1y = 350;
    this.tri2x = 200; // bottom middle corner coords
    this.tri2y = 350;
    this.tri3x = 200; // top right corner coords
    this.tri3y = 350;
    // flower bud (arc) parameters
    this.arc1x = 200; // arc coords
    this.arc1y = 350;
    this.arc1start = 300; // arc start angle
    this.arc1end = 240; // arc end angle
    this.arc1width = 0; // arc width
    this.arc1height = 0; // arc height
    //flower petal (arc) parameters
    this.arc2x = 200; // arc coords
    this.arc2y = 220;
    this.arc2start = 60; // start angle
    this.arc2end = 120; // end angle
    // ground rgb colors
    this.ground = [ 17, 61, 28 ];
    // state machine, starts in the GROW state
    this.state = "GROW" // GROW, BLOOM1, BLOOM2, LOGO1, LOGO2, END
  }
  // draw() function draws all of the objects present in the current state that
  // are needed for animation
  draw() {
    // switch the angle mode to degrees for easier manipulation
    angleMode( DEGREES );
    noStroke();
    // draw the flower petal if the logo is past the GROW state
    if ( this.state != "GROW" ) {
      // set petal color to hot pink
      fill( 255, 20, 106 )
      arc( this.arc2x, this.arc2y,
      this.arc1width, this.arc1height,
      this.arc2start, this.arc2end );
    }
    // draw the ground as a rectangle with the rgb colors stored in this.ground
    fill( this.ground[ 0 ], this.ground[ 1 ], this.ground[ 2 ] );
    rect( 0, 350, 400, 50 );
    // draw the flower bud arc as green
    fill( 68, 106, 70 );
    arc( this.arc1x, this.arc1y,
    this.arc1width, this.arc1height,
    this.arc1start, this.arc1end );
    // draw the flower stem arc as a lighter green than the bud
    fill(180, 231, 198);
    // first triangle is the actual stem
    triangle( this.tri1x, this.tri1y,
    this.tri2x, this.tri2y,
    this.tri3x, this.tri3y );
    fill( 68, 106, 70 );
    // second triangle is the cutout at the top of the stem to make it look more
    // like a 'V', this triangle has the same top corners as the stem triangle
    // and is 35% the height of the stem triangle
    triangle( this.tri1x, this.tri1y-1,
    this.tri2x, this.tri1y + (this.tri2y - this.tri1y) * 0.35,
    this.tri3x, this.tri3y-1 );
    // switch the angle mode to degrees for easier manipulation
    angleMode( RADIANS );
  }
  // move function updates the object positions and characteristics to
  // 'animate' the logo. Function uses a state machine to update variable
  move() {
    // GROW state begins with the stem and flower bud at ground level and then has
    // them grow in size and height until the flower petal is fully drawn
    if ( this.state == "GROW" ) {
      // slowly increase the flower bud arc width
      if ( this.arc1width < 100 )
        this.arc1width += 0.6;
      // slowly increase the flower bud arc height
      if ( this.arc1height < 150 )
        this.arc1height += 1;
      // increase the size of the flower stem
      if ( this.tri1y != 280 ) {
        // increase the height of the top corners
        this.tri1y -= 0.5;
        this.tri3y -= 0.5;
        // update the x coord of the corners with the linear equations
        this.tri1x = ( this.tri1y + 350 ) / 3.5; // y = 3.5x - 350
        this.tri3x = ( this.tri3y - 1050 ) / -3.5; // y = -3.5x + 1050
      }
      // set the height of the bottom of the flower bud arc to a little below
      // the top corner height of the flower stem
      this.arc1y = this.tri1y - this.arc1height * 0.8 / 2;
      // call checkGrow to check transitions
      this.checkGrow();
    }
    // BLOOM1 state begins with a fully grown flower and ends when the petal has
    // fully bloomed
    else if ( this.state == "BLOOM1" ){
      // make the petal (drawn behind the bud) come up from behind the bud
      this.arc2y--;
      // take milliseconds from start and store it in t (used in BLOOM2)
      this.t = millis();
      // check transitions
      this.checkBloom();
    }
    // BLOOM2 begins with a fully grown and bloomed flower and ends with a closed
    // petal. The BLOOM2 state also begins 0.5 seconds after BLOOM1 ends
    else if ( this.state == "BLOOM2" && ( millis() - this.t ) >= 500 ){
      // close the petal by updating the start and end angle for the arc
      this.arc2start += 0.5;
      this.arc2end -= 0.5;
      // check transitions
      this.checkBloom();
    }
    // LOGO1 begins with a grown flower and closed petal, ends with a rotated bud
    // and moved flower stem
    else if ( this.state == "LOGO1" ) {
      // update the start and end angles of the arc so that the opening is on the
      // left side
      if ( this.arc1end != 150 ) {
        this.arc1start --;
        this.arc1end --;
      }
      // change the arc width to 270
      if ( this.arc1width <= 270 )
        this.arc1width += 1;
      // change the arc height to 180
      if ( this.arc1height <= 180 )
        this.arc1height += 1;
      // change the ground rectangle rgb values so that it faded into the same
      // color as the background
      if ( this.ground[ 0 ] != 255 )
        this.ground[ 0 ] += 2;
      if ( this.ground[ 1 ] != 253 )
        this.ground[ 1 ] += 2;
      if ( this.ground[ 2 ] != 208 )
        this.ground[ 2 ] += 2;
      // begin moving the stem by first increasing the size of the stem
      if ( this.tri1y >= 250 ) {
        // increase the height of the flower stem
        this.tri1y -= 0.5;
        this.tri3y -= 0.5;
        // update the x coords using the same linear equations as before
        this.tri1x = ( this.tri1y + 350 ) / 3.5;
        this.tri3x = ( this.tri3y - 1050 ) / -3.5;
      }
      // move the stem to the right and up
      else {
        this.tri1y -= 0.4;
        this.tri2y -= 0.4;
        this.tri3y -= 0.4;
        this.tri1x += 0.4;
        this.tri2x += 0.4;
        this.tri3x += 0.4;
      }
      // check transitions
      this.checkLogo();
    }
    // LOGO2 begins with a rotated bud and moved stem, ends with an open petal and
    // stem at the correct position
    else if ( this.state == "LOGO2" ) {
      // if the petal is not open
      if ( this.arc2start != -30 ) {
        // open the petal
        this.arc2start -= 0.5;
        this.arc2end += 0.5;
      }
      // if the stem triangle is not in the correct position
      if ( this.tri1y >= 170 ) {
        // keep moving the triangle up
        this.tri1y -= 0.5;
        this.tri2y -= 0.5;
        this.tri3y -= 0.5;
      }
      // check transitions
      this.checkLogo();
    }
    // if the logo is fully done animating, create start button
    else if (this.state == "END") {
      fill(0);
      rect(150, 325, 100, 50);
      fill(255)
      textSize(20);
      text("START", 165, 355);
    }
  }
  // function checks the transition criteria from GROW state to BLOOM1 state
  checkGrow() {
  // if the stem triangle has reached the given height and the flower bud arc
  // has the correct width and height we transition into the BLOOM1 state
  if ( this.tri1y <= 280 && this.arc1width >= 100 && this.arc1height >= 150 )
  this.state = "BLOOM1";
  }
  // function checks the transition criteria from BLOOM1 state to BLOOM2 state and
  // from BLOOM2 to LOGO1
  checkBloom() {
    // if the flower petal arc has finished its animation (reached a certain
    // height) we transition into BLOOM2
    if ( this.arc2y <= 145 )
      this.state = "BLOOM2";
    // if the flower petal arc has closed (start and end angle are both 90) we
    // transition into the LOGO1 state
    if ( this.arc2start == 90 ) {
      this.state = "LOGO1"
      // set the flower petal arc parameters so that it can reappear in the
      // correct position when the bud is rotated sideways
      this.arc2start = 0;
      this.arc2end = 0;
      this.arc2y = this.arc1y;
      this.arc2x = this.arc1x - 135;
    }
  }
  // function checks the transition criteria from LOGO1 state to LOGO2 state and
  // form LOGO2 state to END state
  checkLogo() {
  // if the flower bud arc has reached the correct width and the ground rectangle
  // has faded into the same color as the background we transition into LOGO2
  if ( this.arc1width >= 270 && this.ground[ 0 ] == 255 )
    this.state = "LOGO2";
  // if the flower stem has moved into the correct position, the logo animation
  // is done and we transition into the END state
  if ( this.tri1y <= 170 )
    this.state = "END";
  }
}
