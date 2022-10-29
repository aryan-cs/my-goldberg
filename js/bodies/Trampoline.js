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
    Matter.World.add(engine.world, this.body);
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

            accelerate(squareMass.body, -PI / 4, this.bounciness);

        }


    }

}