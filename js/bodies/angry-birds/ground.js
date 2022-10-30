class Ground{
    constructor(x,y,w,h){
        this.width=w;
        this.height=h;
        this.body=Matter.Bodies.rectangle(x,y,this.width,this.height,{isStatic:true});
        Matter.World.add(engine.world,this.body);
    }
    show(){
        rectMode(CENTER);
        rect(this.body.position.x,this.body.position.y,this.width,this.height);
    }
}