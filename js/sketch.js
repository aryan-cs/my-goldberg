function preload () { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  createCanvas(WIDTH, HEIGHT, WEBGL);
  create();

  cam = createCamera();
  cam.setPosition(2500, 2400, 3000);

}

function create () {

  {

    var xStart = 125, yStart = 100, xSpacing = 80, ySpacing = 80;
    for (var column = 0; column < 10; column++) {

      for (var row = 0; row < 10 - column; row++) {

        var x = column * xSpacing + xStart;
        var y = row * ySpacing + yStart;
      
        var rod = new CircBody(x, y, 10, STATIC_PROPS);
        // var rod = new PolyBody(x, y, 6, 15, STATIC_PROPS);

        xStart += xSpacing / 2;
      
      }

      xStart = 125;

    }

    let rotatedProps = STATIC_PROPS;

    rotatedProps.angle = -PI / 6.75;
    leftWall = new RectBody(215, (HEIGHT / 2) - 75, 10, 825, rotatedProps);
    leftWall.roundness = 10;

    rotatedProps.angle = PI / 6.75;
    rightWall = new RectBody(750, (HEIGHT / 2) - 75, 10, 825, rotatedProps);
    rightWall.roundness = 10;

    STATIC_PROPS.angle = 0;
    // topWall = new RectBody(485, 0, WIDTH / 2, 10, STATIC_PROPS);

    for (var ball = 0; ball < 16; ball++) {

      var x = 125 + (ball * 50);

      if (ball % 2 == 0) { var y = -150; }
      else { var y = -300; }
      var plinkoBall = new CircBody(x, y, 10, NORMAL_PROPS);

    }

    setFocus(allBodies[allBodies.length - 7].body);

  }

  var stepProp = STATIC_PROPS;
  stepProp.angle = PI / 4;
  var angledStep = new RectBody(500, HEIGHT, 100, 10, STATIC_PROPS);
  STATIC_PROPS.angle = 0;

  for (var step = 0; step < 4; step++) {
    
    var platform = new RectBody(650 + step * 150, 100 + HEIGHT + step * 40, 100, 10, STATIC_PROPS);

  }

  var dominoPlatform = new RectBody(2290, 1500, WIDTH, 10, STATIC_PROPS);

  for (var dom = 0; dom < 27; dom++) {

    var domino = new RectBody(1400 + dom * 70, 1400, 8, 100, NORMAL_PROPS);

  }

  allBodies[allBodies.length - 1].body.mass = 200;

  propeller1 = new Propeller(3300, 1900, 300, 10, STATIC_PROPS, 0, 0.05);
  propeller2 = new Propeller(2700, 2100, 300, 10, STATIC_PROPS, 0, -0.02);

  dominoBallGround = new RectBody(3300, 2690, 1840, 10, STATIC_PROPS);

  for (var dom = 0; dom < 21; dom++) {

    var domino = new RectBody(2400 + dom * 90, 2500, 8, 100, NORMAL_PROPS);

  }

  STATIC_PROPS.angle = -PI / 9;
  var ballSlide = new RectBody(610, 1755, 1500, 10, STATIC_PROPS);

  var portal1 = new Portal(2500, 3500, -PI / 2);
  var portal2 = new Portal(1800, 2000, -5 * PI / 4);
  portal1.link(portal2);

  var portal3 = new Portal(4100, 3500, -PI / 2);
  var portal4 = new Portal(1400, 2000, PI / 4);
  portal3.link(portal4);

  var portal5 = new Portal(1600, 2500, -PI / 2, 5);
  var portal6 = new Portal(100, 3000, 0);
  portal5.link(portal6);

  STATIC_PROPS.angle = 0;
  var squarePlatform = new RectBody(250, 3100, 300, 10, STATIC_PROPS);

  STATIC_PROPS.angle = -PI / 4;
  var squareRamp = new RectBody(675, 3380, 10, 800, STATIC_PROPS);


  
}

function mouseClicked () {

  // var item = new RectBody((mouseX - WIDTH / 2) + cam.centerX, (mouseY - HEIGHT / 2) + cam.centerY, 50, 50, NORMAL_PROPS);

}


function keyPressed () {

  if (keyCode == ENTER) {

    // NORMAL_PROPS.mass = 150;
    // NORMAL_PROPS.denstiy = 150;
    // item = new RectBody(3250, 2100, 50, 50, NORMAL_PROPS);
    // NORMAL_PROPS.mass = 1;
    // NORMAL_PROPS.denstiy = 1;

    // setFocus(weight.body);

  }

}

function messages () {

  fill("#b0b0b0");
  textFont(defaultFont);
  textSize(100);
  text("press enter to begin!", -500, -100);

}

function draw () {

  Matter.Engine.update(engine);
  // track(focusedBody);
  camControls();

  background(BACKGROUND_COLOR);
  messages();
  for (var body = 0; body < portals.length; body++) { portals[body].show(); }
  for (var body = 0; body < allBodies.length; body++) { allBodies[body].show(); }
  
}

function camControls () {

  if (DEBUG) {

    if (keyIsDown(CONTROL)) { CAM_SPEED = 30; } else { CAM_SPEED = 10; }

    if (keyIsDown(LEFT_ARROW)) { cam.move(-CAM_SPEED, 0, 0); }
    if (keyIsDown(RIGHT_ARROW)) { cam.move(CAM_SPEED, 0, 0); }
    if (keyIsDown(UP_ARROW)) { cam.move(0, -CAM_SPEED, 0); }
    if (keyIsDown(DOWN_ARROW)) { cam.move(0, CAM_SPEED, 0); }

  }

}

function setFocus (body) { focusedBody = body; }

function track (trackBody) { cam.setPosition(trackBody.position.x, trackBody.position.y, 1000); }