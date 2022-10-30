class Bird{
    constructor(x,y,r){
        this.radius=r;
        this.body=Matter.Bodies.circle(x,y,this.radius);
        Matter.World.add(engine.world,this.body);
    }
    show(){
        stroke(255);
        fill(255);
        ellipse(this.body.position.x,this.body.position.y,2*this.radius);
    }
}