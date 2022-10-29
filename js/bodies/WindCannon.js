function WindCannon (x, y, props) {

    this.x = x;
    this.y = y;
    this.w = 600;
    this.h = 1600;
    this.thickness = 20;
    this.roundness = 20;
    this.props = props;
    this.lookout = null;
    this.exists = true;
    
    this.leftWall = Bodies.rectangle(this.x - (this.w / 2), this.y, this.thickness, this.h, this.props);
    this.rightWall = Bodies.rectangle(this.x + (this.w / 2), this.y, this.thickness, this.h, this.props);
    this.body = Bodies.rectangle(this.x, this.y + (this.h / 2), this.w, this.thickness, this.props);

    Matter.World.add(engine.world, [this.leftWall, this.rightWall, this.body]);
    allBodies.push(this);
    allBodies.push(this.leftWall);
    allBodies.push(this.rightWall);

    this.show = function () {

        this.woosh();

        push();

        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        noStroke();

        fill("lightblue");
        rect(0, 0, this.w * 1.8, this.thickness, this.roundness);
        rect(-this.w / 2, 0, this.thickness, this.h, this.roundness);
        rect(this.w / 2, 0, this.thickness, this.h, this.roundness);

        stroke("white");
        strokeWeight(30);
        line(125, -200, 175, -this.h / 2);
        line(0, -300, 0, -this.h / 1.5);
        line(-125, -200, -175, -this.h / 2);

        pop();

    }

    this.setLookOut = function (body) { this.lookout = body; }

    this.woosh = function () {

        if (collides(this.lookout.body, this.body)) {

            console.log("woosh");

            accelerate(this.lookout.body, this.props.angle, 10);

        }

    }

}