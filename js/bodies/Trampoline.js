function Trampoline (x, y, w, h, b, props) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bounciness = b;
    this.lookout = null;
    this.roundness = 20;
    this.props = props;
    this.exists = true;
    
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.props);
    this.springy1 = Matter.Constraint.create({ bodyA: this.body, pointB: { x: this.x - this.w, y: this.y }});
    this.springy1.stiffness = 1;
    this.springy2 = Matter.Constraint.create({ bodyA: this.body, pointB: { x: this.x + this.w, y: this.y }});
    this.springy2.stiffness = 1;
    STATIC_PROPS.angle = this.props.angle;

    if (this.props.angle > 0) { this.support = new RectBody(this.x - 50 * cos(this.props.angle), this.y + 50, this.w, 20, STATIC_PROPS); }
    else if (this.props.angle < 0) { this.support = new RectBody(this.x + 50 * cos(this.props.angle), this.y + 50, this.w, 20, STATIC_PROPS); }
    else { this.support = new RectBody(this.x, this.y + 50, this.w, 20, STATIC_PROPS); }

    Matter.World.add(engine.world, [this.body, this.springy1, this.springy2]);
    allBodies.push(this);

    this.show = function () {

        this.bouncy();
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        noStroke();
        fill("#0dffa2");
        rect(0, 0, this.w, this.h, this.roundness);
        pop();

    }

    this.setLookOut = function (body) { this.lookout = body; }

    this.bouncy = function () {

        if (this.lookout && collides(this.body, this.lookout.body)) {

            if (this.body.angle < 0) { accelerate(this.lookout.body, PI - this.body.angle, this.bounciness); }
            else if (this.body.angle > 0) { accelerate(this.lookout.body, this.body.angle - (PI / 2), this.bounciness); }
            else { accelerate(this.lookout.body, this.body.angle, this.bounciness); }

        }


    }

}