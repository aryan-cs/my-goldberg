function PolyBody (x, y, s, r, props) {

    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.props = props;
    this.exists = true;
    
    this.body = Bodies.polygon(this.x, this.y, this.s, this. r, this.props);
    Matter.World.add(engine.world, this.body);
    allBodies.push(this);

    this.show = function () {

        push();

        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);

        strokeWeight(1);
        stroke(this.props.render.strokeStyle);
        fill(this.props.render.fillStyle);

        beginShape();

        for (var theta = 0; theta < 360; theta += (2 * PI) / this.s) {

            var x = this.r * cos(theta);
            var y = this.r * sin(theta);
            vertex(x, y);

        }
        
        endShape(CLOSE);

        pop();
        

    }

}