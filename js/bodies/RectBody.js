function RectBody (x, y, w, h, props) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.roundness = 20;
    this.props = props;
    
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.props);
    Matter.World.add(engine.world, this.body);
    allBodies.push(this);

    this.show = function () {

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        noStroke();
        fill(this.props.render.fillStyle);
        rect(0, 0, this.w, this.h, this.roundness);
        pop();

    }

}