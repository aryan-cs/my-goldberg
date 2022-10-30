let engine;
let ground;
let boxes=[];
let bird;
let mouseConstrain;
let canvas;
let mouse;
let sling;
function setup(){
    canvas=createCanvas(1000,700);
    engine = Matter.Engine.create();
    ground=new Ground(width/2,height-15,width,20);
    boxes.push(new Box(800,100,50,100));
    boxes.push(new Box(800,50,50,100));
    boxes.push(new Box(800,0,50,100));
    bird=new Bird(380,450,20);
    mouse = Matter.Mouse.create(canvas.elt);
    let options={
        mouse:mouse
    };
    mouse.pixelRatio = pixelDensity();
    mouseConstrain=Matter.MouseConstraint.create(engine, options)
    Matter.World.add(engine.world,Matter.MouseConstraint.create(engine, options));
    sling=new Sling(380,450,bird.body);
}
function draw(){
    background(0);
    Matter.Engine.update(engine);
    ground.show();
    for(let i in boxes)
        boxes[i].show();
    bird.show();
    sling.show();
}
function mouseReleased(){
    setTimeout(()=>{
        sling.fly();
    },50)
}
function keyPressed(key){
    if(key.key===' '){
        Matter.World.remove(engine.world,bird.body);
        bird=new Bird(380,450,20);
        sling.body=bird.body;
        sling.constrain.bodyB=sling.body;
        console.log(sling);
    }
}