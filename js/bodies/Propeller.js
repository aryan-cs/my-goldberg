function Propeller (x, y, w, h, props, angle, speed) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.roundness = 0;
    this.props = props;
    this.angle = angle;
    this.speed = speed;
    
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.props);
    Matter.World.add(engine.world, this.body);
    allBodies.push(this);

    this.show = function () {

        this.spin();
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        noStroke();
        fill(this.props.render.fillStyle);
        rect(0, 0, this.w, this.h, this.roundness);
        pop();

    }

    this.spin = function () {

        Matter.Body.setAngle(this.body, this.angle);
        Matter.Body.setAngularVelocity(this.body, 0.15);
        this.angle -= this.speed;

    }

}