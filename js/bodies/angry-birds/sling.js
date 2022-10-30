class Sling{
    constructor(x,y,body){
        this.x=x;
        this.y=y;
        this.body=body;
        let options={
            pointA:{
                x:this.x,
                y:this.y,
            },
            bodyB:this.body,
            length:50,
            stiffness: 0.02
        }
        this.constrain=Matter.Constraint.create(options);
        Matter.World.add(engine.world,this.constrain);
    }
    show(){
        if(this.constrain.bodyB){    
            strokeWeight(4);
            stroke(255);
            line(this.x,this.y,this.constrain.bodyB.position.x,this.constrain.bodyB.position.y);
        }
    }
    fly(){
        this.constrain.bodyB=null;
    }
}