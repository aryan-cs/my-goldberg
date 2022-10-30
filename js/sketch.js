function preload () {
  
  defaultFont = loadFont("assets/fonts/default.ttf");
  popSound = loadSound("assets/sfx/pop.mp3");
  warpSound = loadSound("assets/sfx/warp.mp3");

}

function setup () {

  canvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  cam = createCamera();
  create();

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

    // setFocus(allBodies[allBodies.length - 7].body);

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

  fallDom = allBodies[allBodies.length - 1];
  fallDom.body.mass = 200;
  hitDom = allBodies[allBodies.length - 2];

  propeller1 = new Propeller(3300, 1900, 300, 10, STATIC_PROPS, 0, 0.05);
  propeller2 = new Propeller(2700, 2100, 300, 10, STATIC_PROPS, 0, -0.02);

  dominoBallGround = new RectBody(3300, 2690, 1840, 10, STATIC_PROPS);

  for (var dom = 0; dom < 21; dom++) {

    dominos.push(new RectBody(2400 + dom * 90, 2500, 8, 100, NORMAL_PROPS));

  }

  STATIC_PROPS.angle = -PI / 9;
  ballSlide = new RectBody(610, 1755, 1500, 10, STATIC_PROPS);

  portal1 = new Portal(2500, 3500, -PI / 2);
  portal2 = new Portal(1800, 2000, -5 * PI / 4);
  portal1.link(portal2);

  portal3 = new Portal(4100, 3500, -PI / 2);
  portal4 = new Portal(1400, 2000, PI / 4);
  portal3.link(portal4);

  portal5 = new Portal(1600, 2500, -PI / 2, 5);
  portal6 = new Portal(50, 3450, 0);
  portal5.link(portal6);

  STATIC_PROPS.angle = 0;
  squarePlatform = new RectBody(200, 3500, 80, 10, STATIC_PROPS);

  STATIC_PROPS.angle = -PI / 3;
  squareRamp = new RectBody(710, 3775, 10, 1100, STATIC_PROPS);

  STATIC_PROPS.angle = 0;
  squareMass = new RectBody(205, 3400, 150, 150, NORMAL_PROPS);

  for (var belt = 0; belt < 10; belt++) {

    conveyor = new Conveyor(1245 + 85 * belt, 4100, 40, STATIC_PROPS, 0, -0.02);

  }

  for (var belt = 0; belt < 20; belt++) {

    conveyor = new Conveyor(2045 + 85 * belt, 4600, 40, STATIC_PROPS, 0, -0.05 * (belt + 1));

  }

  NORMAL_PROPS.angle = PI / 4;
  bouncePad = new Trampoline(3900, 5200, 300, 10, 2, NORMAL_PROPS);
  bouncePad.setLookOut(squareMass);

  STATIC_PROPS.angle = -PI / 20;
  NORMAL_PROPS.angle = 0;
  wallGround = new RectBody(5550, 5650, 700, 10, STATIC_PROPS);

  block1 = new RectBody(5150, 5200, 100, 400, NORMAL_PROPS);
  block2 = new RectBody(5150, 4700, 100, 400, NORMAL_PROPS);
  block3 = new RectBody(5150, 4200, 100, 400, NORMAL_PROPS);

  STATIC_PROPS.angle = 0;
  block4 = new RectBody(5900, 5000, 10, 1200, STATIC_PROPS);
  barrierGround = new RectBody(5150, 5700, 100, 10, STATIC_PROPS);

  for (row = 0; row < 5; row++) {

    for (column = 0; column < 5; column++) {

      balls.push(new CircBody(5310 + row * 120, 4600 + column * 120, 50, NORMAL_PROPS));
      Matter.Body.setStatic(balls[balls.length - 1].body, true);
  
    }

  }

  NORMAL_PROPS.isStatic = false;

  for (var segment = 0; segment < 4; segment++) {

    STATIC_PROPS.angle = PI / 3;
    var seg = new RectBody(4920 - segment * 520, 5800 + segment * 315, 10, 400, STATIC_PROPS);
    var bBottom = new RectBody((4920 - segment * 520) - 260, (5800 + segment * 315) + 285, 10, 210, STATIC_PROPS);

    STATIC_PROPS.angle = 0;
    var bRight = new RectBody((4920 - segment * 520) - 170, (5800 + segment * 315) + 165, 10, 128, STATIC_PROPS);
    var bLeft = new RectBody((4920 - segment * 520) - 350, (5800 + segment * 315) + 280, 10, 120, STATIC_PROPS);

  }

  seesaw1 = new Balance(2400, 7500, 1200, 30, NORMAL_PROPS);
  seesaw2 = new Balance(3400, 7900, 1200, 30, NORMAL_PROPS);
  seesaw3 = new Balance(2400, 8300, 1200, 30, NORMAL_PROPS);
  seesaw4 = new Balance(3400, 8700, 1200, 30, NORMAL_PROPS);
  seesaw5 = new Balance(2000, 9600, 2320, 30, NORMAL_PROPS);

  slab = new RectBody(850, 9300, 50, 10, STATIC_PROPS);
  projectile = new CircBody(850, 9200, 100, NORMAL_PROPS);

  NORMAL_PROPS.angle = -PI / 4;
  launch = new Trampoline(800, 13400, 1200, 10, 20, NORMAL_PROPS);
  launch.setLookOut(projectile);

  STATIC_PROPS.angle = 0;
  boxPlatform = new RectBody(-3100, 12500, 3000, 10, STATIC_PROPS);
  
  NORMAL_PROPS.angle = 0;
  for (row = 0; row < 23; row++) {

    for (column = 0; column < 15; column++) {

      blocks.push(new RectBody(-4200 + row * 100, 11000 + column * 100, 100, 100, NORMAL_PROPS));
  
    }

  }

  ground = new Ground(-7000, 12500, WIDTH, 20);
  bird = new Bird(-7000, 12500, 200);
  sling = new Sling(-7000, 11500, bird.body);

  // mouse = Matter.Mouse.create(canvas.elt);
  // let options = { mouse: mouse, constraint: { stiffness: 0.05, render: { visible: false } } };
  // mouse.pixelRatio = pixelDensity();
  // mouseConstrain = Matter.MouseConstraint.create(engine, options);
  // Matter.World.add(engine.world, mouseConstrain);

  mouse = Matter.Mouse.create(canvas.elt);
  mouseParams = { mouse: mouse, constraint:{ stiffness: 0.05, angularStiffness: 0 }};
  mouseConstraint = Matter.MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  Matter.World.add(engine.world, mouseConstraint);

  camJourney();
  // setFocus(bird.body);
  
}

function angry () {

  ground.show();
  for (let i in boxes) { boxes[i].show(); }
  bird.show();
  sling.show()

}

function mouseReleased () { setTimeout(() => { sling.fly(); accelerate(bird.body, PI / 35, 175); }, 50); }

// function mouseClicked () {

//   // var item = new RectBody((mouseX - WIDTH / 2) + cam.centerX, (mouseY - HEIGHT / 2) + cam.centerY, 50, 50, NORMAL_PROPS);

// }


function keyPressed () {

  if (keyCode == ENTER) {

    Matter.World.remove(engine.world, bird.body);
    bird = new Bird(-7000, 12500, 200);
    sling.body = bird.body;
    sling.constrain.bodyB = sling.body;

  }

  if (key == " ") {

    for (let b in blocks) { accelerate(blocks[b].body, random(0, 2 * PI), random(0, 3)); }

  }

}

function collisions () {

  if (collides(dominos[0].body, squareMass.body)) {
    
    accelerate(squareMass.body, 0, 0.25);

    setTimeout(() => {
    
      setFocus(squareMass.body);
      dX = 0;
      dZ = 0;

    }, 500);
  
  }

  if (collides(bouncePad.body, squareMass.body)) { for (var b = 0; b < balls.length; b++) { Matter.Body.setStatic(balls[b].body, false); } }

  if (collides(squareMass.body, block1.body)) {
    
    Matter.Body.translate(block1.body, { x: 0, y: -100 });
    despawn(block1); despawn(block2); despawn(block3); despawn(squareMass);

    for (var body = 0; body < balls.length; body++) { accelerate(balls[body].body, PI, 0.001); }

    tracking = false;
    dX = -5;
    dY = 3;
    dZ = 3;
  
  }

  if (collides(hitDom.body, fallDom.body)) { setFocus(fallDom.body); dX = 0; }

  if (collides(portal1.body, dominos[0].body)) { tracking = false; dX = -20; dZ = -2; dY = 6; }

  if (collides(projectile.body, launch.body)) {

    setTimeout(() => {

      dX = 0;
      dY = 0;
      dZ = 0;
      tracking = false;

    }, 1000);

  }

  for (let b in blocks) { if (collides(blocks[b].body, projectile.body)) { fin = true; } }

  // if (fin) {

  //   for (let b in blocks) { accelerate(blocks[b].body, random(0, 2 * PI), random(0, 1)); }

  // }

}

function camJourney () {

  tracking = false;

  cam.setPosition(1500, 500, 2000);
  setTimeout(() => { dY = 5; }, 1000);
  setTimeout(() => { dX = 1; dY = 15; dZ = -10; }, 3500);
  setTimeout(() => { dX = 5; dY = 0; dZ = 0; }, 4000);
  setTimeout(() => { dX = 1; dY = 0; dZ = 0; }, 5000);
  // setTimeout(() => { track(fallDom.body); dX = 0; }, 15000);

}

function messages () {

  fill("#b0b0b0");
  textFont(defaultFont);
  textSize(100);
  text("my rube goldberg project!", -500, -100);

}

function draw () {

  Matter.Engine.update(engine);

  camControls();
  if (!tracking) { cam.move(dX, dY, dZ); }
  else { track(focusedBody); }

  background(BACKGROUND_COLOR);
  messages();
  collisions();
  for (var body = 0; body < portals.length; body++) { portals[body].show(); }
  for (var body = 0; body < allBodies.length; body++) { if (allBodies[body].exists) { allBodies[body].show(); } }
  angry();
  
}

function camControls () {

  if (DEBUG) {

    if (keyIsDown(CONTROL)) { CAM_SPEED = 50; } else { CAM_SPEED = 30; }

    if (keyIsDown(LEFT_ARROW)) { cam.move(-CAM_SPEED, 0, 0); }
    if (keyIsDown(RIGHT_ARROW)) { cam.move(CAM_SPEED, 0, 0); }
    if (keyIsDown(UP_ARROW)) { cam.move(0, -CAM_SPEED, 0); }
    if (keyIsDown(DOWN_ARROW)) { cam.move(0, CAM_SPEED, 0); }

  }

}

function setFocus (body) { tracking = true; focusedBody = body; }

function track (trackBody) { cam.setPosition(trackBody.position.x, trackBody.position.y, 2000); }

function collides (entity1, entity2) { return Matter.Collision.collides(entity1, entity2) != null; }

function accelerate (body, direction, magnitude) {

  var force = Matter.Vector.create(magnitude * cos(direction), magnitude * sin(direction));
  Matter.Body.applyForce(body, body.position, force);

}

function despawn (body) { Matter.World.remove(engine.world, body.body); body.exists = false; }