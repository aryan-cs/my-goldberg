function Balance (x, y, w, h, props) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.roundness = 20;
    this.props = props;
    this.exists = true;
    
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.props);
    this.leftConstraint = Matter.Constraint.create({ bodyA: this.body, pointB: { x: this.x - (this.w / 2), y: this.y + this.h }});
    this.rightConstraint = Matter.Constraint.create({ bodyA: this.body, pointB: { x: this.x + (this.w / 2), y: this.y + this.h }});

    Matter.World.add(engine.world, [this.body, this.leftConstraint, this.rightConstraint]);

    allBodies.push(this);


    this.show = function () {

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        noStroke();
        fill(this.props.render.fillStyle);
        rect(0, 0, this.w, this.h, this.roundness);
        fill(BACKGROUND_COLOR);
        ellipse(0, 0, 20);
        pop();

    }

}