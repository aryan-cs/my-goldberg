function Conveyor (x, y, r, props, angle, speed) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.roundness = 0;
    this.props = props;
    this.angle = angle;
    this.speed = speed;
    this.exists = true;
    
    this.body = Bodies.circle(this.x, this.y, this.r, this.props);
    Matter.World.add(engine.world, this.body);
    allBodies.push(this);

    this.show = function () {

        this.spin();
        fill(this.props.render.fillStyle);
        noStroke();
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        ellipse(0, 0, this.r * 2);
        stroke("white");
        strokeWeight(3);
        line(0, 0, this.r, 0);
        // rotate(PI / 2);
        // line(-this.r, 0, this.r, 0);
        pop();

    }

    this.spin = function () {

        Matter.Body.setAngle(this.body, this.angle);
        Matter.Body.setAngularVelocity(this.body, 0.15);
        this.angle -= this.speed;

    }

}