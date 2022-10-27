function Portal (x, y, angle, scaleFactor) {

    if (!scaleFactor) { this.scaleFactor = 1; }
    else { this.scaleFactor = scaleFactor; }

    this.x = x;
    this.y = y;
    this.w = 5 * this.scaleFactor;
    this.h = 300 * this.scaleFactor;
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
        rotate(this.body.angle);

        drawingContext.shadowColor = color(207, 7, 99);
        drawingContext.shadowBlur = 20;
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        
        ellipse(0, 0, 100, this.h);

        if (DEBUG) {

            noStroke();
            fill(this.props.render.strokeStyle);
            rect (100, -10, 20, 20);

        }

        pop();

    }

    this.link = function (otherPortal) {
        
        this.otherPortal = otherPortal;
        this.props.render.strokeStyle = "#ffbc4f"; // orange
        this.otherPortal.props.render.strokeStyle = "#4fbeff"; // blue
    
    }

    this.teleport = function () {

        for (var b = 0; b < allBodies.length; b++) {

            var body = allBodies[b].body;

            if (Matter.Collision.collides(this.body, body) != null && this.otherPortal != null) {

                var tX = this.otherPortal.body.position.x - body.position.x;
                var tY = this.otherPortal.body.position.y - body.position.y;
                Matter.Body.translate(body, { x: tX, y: tY });
                Matter.Body.rotate(body, this.otherPortal.body.angle - this.body.angle);

            }

        }


    }

}