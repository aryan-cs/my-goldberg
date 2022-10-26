function Portal (x, y, angle) {

    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 300;
    this.angle = angle;
    this.otherPortal = null;
    this.props = {

        isStatic: true,
        angle: this.angle,

        render: {

            fillStyle: "black",
            strokeStyle: "#a1a1a1",
            lineWidth: 10

        }

    }
    
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.props);
    Matter.World.add(engine.world, this.body);
    portals.push(this);

    this.show = function () {

        this.teleport();

        fill(this.props.render.fillStyle);
        strokeWeight(10);
        stroke(this.props.render.strokeStyle);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle)
        ellipse(0, 0, 100, this.h);
        pop();

    }

    this.link = function (otherPortal) {
        
        this.otherPortal = otherPortal;
        this.otherPortal.otherPortal = this;
        this.props.render.strokeStyle = "#ffbc4f"; // orange
        this.otherPortal.props.render.strokeStyle = "#4fbeff"; // blue
    
    }

    this.teleport = function () {

        for (var b = 0; b < allBodies.length; b++) {

            var body = allBodies[b].body;

            if (Matter.Collision.collides(this.body, body) != null) {

                console.log("collision");

                var tX = this.otherPortal.body.position.x;
                var tY = this.otherPortal.body.position.y;
                Matter.Body.setPosition(body, { x: tX, y: tY });
                // Matter.Body.rotate(body, this.otherPortal.body.angle - this.body.angle);

            }

        }


    }

}