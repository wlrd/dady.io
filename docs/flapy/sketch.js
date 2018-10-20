var dady;
var pipes = [];
var img;
var alive;
var jank;

function setup() {
    createCanvas(windowWidth, windowHeight)

    img = createImg("dadypic.jpg");

    dady = new Dady(img)
    pipes[0] = new Pipe()

    alive = true
    jank = false
}

function draw() {
    background(255)

    if (alive) {
        dady.show()
        dady.update()

        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show()
            pipes[i].move()

            if (pipes[i].isFinished()) {
                pipes.splice(i, 1)
            }

            if (pipes[i].gg(dady) || !dady.alive) {
                alive = false
                break
            }
        }

        if (frameCount % 95 == 0) {
            pipes.push(new Pipe())
        }
    } else {
        var fieldNameElement = document.getElementById('rip');
        fieldNameElement.innerHTML = "dead dady: wlrd"

        if (!jank) {
            var restart = document.getElementById('restart');
            var a = document.createElement('a');
            var linkText = document.createTextNode("restart");
            a.appendChild(linkText);
            a.href = 'flapy_dady.html';
            restart.appendChild(a);
            jank = true
        }
    }
}

function mousePressed() {
    dady.jump()
}

class Dady {
    constructor(img) {
        this.x = width / 5
        this.y = height / 2

        this.gravity = .15
        this.velocityY = 0

        this.alive = true

        this.show = function () {
            fill(0)
            image(img, this.x, this.y)
        }

        this.jump = function () {
            if (this.alive) {
                this.velocityY -= 5
            }
        }

        this.rip = function () {
            this.alive = false
        }

        this.update = function () {
            this.velocityY += this.gravity
            this.y += this.velocityY

            if (this.y > height) {
                this.y = height
                this.velocityY = 0
                this.rip()
            }

            if (this.y < 0) {
                this.y = 0
                this.velocityY = 0
                this.rip()
            }
        }
    }
}

class Pipe {
    constructor() {
        this.top = random(height / 5, height * .7)
        this.bottom = height - this.top - (Math.floor(Math.random() * (300 - 150 + 1)) + 150)
        this.x = width

        this.show = function () {
            fill(0)
            rect(this.x, 0, 50, this.top)
            rect(this.x, height - this.bottom, 50, this.bottom)
        }

        this.move = function () {
            this.x -= 4
        }

        this.isFinished = function () {
            return this.x < 0
        }

        this.gg = function (dady) {
            return (dady.y < this.top || dady.y > height - this.bottom - 20) &&
                ((dady.x > this.x && dady.x < this.x + 25))
        }
    }
}
