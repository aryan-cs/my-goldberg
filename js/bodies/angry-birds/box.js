class Box{
    constructor(x,y,w,h){
        this.width=w;
        this.height=h;
        this.body=Matter.Bodies.rectangle(x,y,this.width,this.height);
        Matter.World.add(engine.world,this.body);
    }
    show(){
        
        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        stroke(255,0,0);
        rect(0,0,this.width,this.height);
        pop();
    }
}