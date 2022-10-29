function CircBody (x, y, r, props) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.props = props;
    this.exists = true;
    
    this.body = Bodies.circle(this.x, this.y, this.r, this.props);
    Matter.World.add(engine.world, this.body);
    allBodies.push(this);

    this.show = function () {

        fill(this.props.render.fillStyle);
        noStroke();
        push();
        translate(this.body.position.x, this.body.position.y);
        ellipse(0, 0, this.r * 2);
        pop();

    }

}