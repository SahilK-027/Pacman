// * Step 1: Project setup
/*
Selecting the canvas element from html file and changing its width and height to window width and height
*/
const canvas = document.querySelector('canvas')
c = canvas.getContext('2d')
const scoreEl = document.getElementById('scoreEl')


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: 820
}
// Resize window
window.addEventListener('resize',()=>{
    // Update sizes
    sizes.width = window.innerWidth;
})

canvas.width = sizes.width
canvas.height = sizes.height

// * Step 2: Generate map boundaries
class Boundary {
    // Our boundary will be made up of number of squares so width and height of each square will be 40px .
    static width = 40;
    static height = 40;
    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    // This functiomn will draw image grid for our maze
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
// In map each '-' represent one box on canvas
const map = [
    /*
    this map will generate a boundary like
    * * * * * * *
    *           *
    *   *   *   *
    *           *
    * * * * * * *
    */
    // First row for boundary
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', 'b', '.', '[', '+', ']', '.', '[', '-', ']', '.', '[', '+', ']', '.', 'b', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]
const boundaries = []
function createImage(src) {
    const image = new Image();
    image.src = src;
    return (image);
}






// * Step3: adding collectable items for player
const pellets = []
class Pellets {
    constructor({ position }) {
        this.position = position;
        this.radius = 3;
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = '#f8eaad'
        c.fill();
        c.closePath();
    }
}



// * Step 4 : creating powerUp
const powerUps = []
class PowerUp {
    constructor({ position }) {
        this.position = position;
        this.radius = 8;
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = '#f8eaad'
        c.fill();
        c.closePath();
    }
}
// We will loop through the map and when we will find -  we will draw box otherwise we will not draw box
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/pipeHorizontal.png')
                    })
                )
                break
            case '|':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/pipeVertical.png')
                    })
                )
                break
            case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/pipeCorner1.png')
                    })
                )
                break
            case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/pipeCorner2.png')
                    })
                )
                break
            case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/pipeCorner3.png')
                    })
                )
                break
            case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/pipeCorner4.png')
                    })
                )
                break
            case 'b':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./assets/block-2.png')
                    })
                )
                break
            case '[':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./assets/capLeft.png')
                    })
                )
                break
            case ']':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./assets/capRight.png')
                    })
                )
                break
            case '_':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./assets/capBottom.png')
                    })
                )
                break
            case '^':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./assets/capTop.png')
                    })
                )
                break
            case '+':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./assets/pipeCross.png')
                    })
                )
                break
            case '5':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./assets/pipeConnectorTop.png')
                    })
                )
                break
            case '6':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./assets/pipeConnectorRight.png')
                    })
                )
                break
            case '7':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./assets/pipeConnectorBottom.png')
                    })
                )
                break
            case '8':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./assets/pipeConnectorLeft.png')
                    })
                )
                break
            case '.':
                pellets.push(
                    new Pellets({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break
            case 'p':
                powerUps.push(
                    new PowerUp({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break
        }
    })
})






// * Step 5: Add Player with movement
// Getting circle drawn on the canvas
class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.mouth = 0.75
        this.openRate = 0.12
        this.rotation = 0
    }
    draw() {
        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.translate(-this.position.x, -this.position.y);
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, this.mouth, Math.PI * 2 - this.mouth);
        c.lineTo(this.position.x, this.position.y)
        c.fillStyle = '#FFD700'
        c.fill();
        c.closePath();
        c.restore();
    }
    // Movement logic
    move() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.mouth < 0 || this.mouth > 0.75) {
            this.openRate = -this.openRate
        }
        this.mouth += this.openRate
    }
}

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height * 6 + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})





// * Step 6: Creating enemy
class Enemy {
    constructor({ position, velocity, color = "red" }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.prevCollisions = [];
        this.scared = false;
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.scared ? 'blue' : this.color
        c.fill();
        c.closePath();
    }
    // Movement logic
    move() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

var vel = 2

const enemies = [
    new Enemy({
        position: {
            x: Boundary.width * 33 + Boundary.width / 2,
            y: Boundary.height * 1 + Boundary.height / 2
        },
        velocity: {
            x: -1*vel,
            y: 0,
        }
    }),
    new Enemy({
        position: {
            x: Boundary.width * 33 + Boundary.width / 2,
            y: Boundary.height * 11 + Boundary.height / 2
        },
        velocity: {
            x: -1 * vel,
            y: 0
        }
    }),
    new Enemy({
        position: {
            x: Boundary.width * 17 + Boundary.width / 2,
            y: Boundary.height * 11 + Boundary.height / 2
        },
        velocity: {
            x: 0,
            y: -1 * vel
        }
    }),
    new Enemy({
        position: {
            x: Boundary.width * 17 + Boundary.width / 2,
            y: Boundary.height * 1 + Boundary.height / 2
        },
        velocity: {
            x: 0,
            y: vel
        }
    }),
]






// * Step 7 : Key press functionality
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let lastKey = '';
// Adding score
let score = 0;
// Giving movements to circle according to ⬆️ ⬇️ ⬅️ ➡️ key-strokes
// Adding event listener for the keypress
window.addEventListener('keydown', ({ key }) => {
    // We want toperform movement logic for each key
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
    }
})
// Adding event listener for the key not pressed
window.addEventListener('keyup', ({ key }) => {
    // We want toperform movement logic for each key
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})







// * Step 8: Add collision detection logic
function circleCollidesWithRectangle({
    circle,
    rectangle
}) {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding
        &&
        // left collision
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
        &&
        // Bottom collision
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
        &&
        // Right collision
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
    )
}


// for each key press we will draw new boundary and moved player position so that we will get animated look

let animateID   // This variable will store the id of current frame
function animate() {
    animateID = requestAnimationFrame(animate);
    //(from x,y ==(0, 0), to full width and height clear canvas)
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (keys.w.pressed && lastKey == 'w') {
        // WE WANT TO MOVE UP SO WE WILL GO ON -VE Y AXIS
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 0,
                        y: -5
                    }
                }, // ... -> spread operator duplicating player object
                rectangle: boundary
            }))
            // if we detect collision set velocity to zero
            {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = -5;
            }
        }
    }
    else if (keys.s.pressed && lastKey == 's') {
        // WE WANT TO MOVE DOWN SO WE WILL GO ON +VE Y AXIS
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 0,
                        y: 5
                    }
                }, // ... -> spread operator duplicating player object
                rectangle: boundary
            }))
            // if we detect collision set velocity to zero
            {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = 5;
            }
        }
    }
    else if (keys.a.pressed && lastKey == 'a') {
        // WE WANT TO MOVE LEFT SO WE WILL GO ON -VE x AXIS
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: -5,
                        y: 0
                    }
                }, // ... -> spread operator duplicating player object
                rectangle: boundary
            }))
            // if we detect collision set velocity to zero
            {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = -5;
            }
        }
    }
    else if (keys.d.pressed && lastKey == 'd') {
        // WE WANT TO MOVE RIGHT SO WE WILL GO ON +VE x AXIS
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 5,
                        y: 0
                    }
                }, // ... -> spread operator duplicating player object
                rectangle: boundary
            }))
            // if we detect collision set velocity to zero
            {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = 5;
            }
        }
    }
    // DRAWING BOUNDARY
    boundaries.forEach(boundary => {
        boundary.draw();
        if (circleCollidesWithRectangle({
            circle: player,
            rectangle: boundary
        })) {
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })
    // Drawing moved player
    player.move();

    // Drawing powerup
    powerUps.forEach((powerUp, index) => {
        powerUp.draw();
        // Player eats powerup
        if (Math.hypot(powerUp.position.x - player.position.x,
            powerUp.position.y - player.position.y) < powerUp.radius + player.radius) {
            // Make enemy vulnerable
            powerUps.splice(index, 1);
            var audio = new Audio("./assets/sounds/eat_powerup.wav");
            audio.play();
            enemies.forEach(enemy => {
                enemy.scared = true;

                setTimeout(() => {
                    enemy.scared = false;
                }, 5000)
            })
        }
    })
    // Drawing pellets
    pellets.forEach((pellet, index) => {
        pellet.draw();

        //* Step 9: Player eats pellets
        if (Math.hypot(pellet.position.x - player.position.x,
            pellet.position.y - player.position.y) < pellet.radius + player.radius) {
            pellets.splice(index, 1);
            score += 10;
            scoreEl.innerHTML = score
        }
    })

    // Drawing enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        // To detect enemy and players collision
        if (Math.hypot(enemy.position.x - player.position.x,
            enemy.position.y - player.position.y) < enemy.radius + player.radius
        ) {
            if (enemy.scared) {
                var audio = new Audio("./assets/sounds/eat_ghosts.mp3");
                audio.play();
                enemies.splice(i, 1);
            }
            // If player collides with the enemy then cancel that particular animation frame
            else {
                var audio = new Audio("./assets/sounds/death.wav");
                audio.play();
                cancelAnimationFrame(animateID);
            }
        }
    }
    enemies.forEach(enemy => {
        enemy.move();
        const collisions = []
        boundaries.forEach(boundary => {
            if (
                !collisions.includes('right') &&
                circleCollidesWithRectangle({

                    circle: {
                        ...enemy,
                        velocity: {
                            x: 2,
                            y: 0
                        }
                    }, // ... -> spread operator duplicating player object
                    rectangle: boundary
                })) {
                collisions.push('right')
            }

            if (
                !collisions.includes('left') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...enemy,
                        velocity: {
                            x: -2,
                            y: 0
                        }
                    }, // ... -> spread operator duplicating player object
                    rectangle: boundary
                })) {
                collisions.push('left')
            }

            if (
                !collisions.includes('up') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...enemy, velocity: {
                            x: 0,
                            y: -2
                        }
                    }, // ... -> spread operator duplicating player object
                    rectangle: boundary
                })) {
                collisions.push('up')
            }

            if (
                !collisions.includes('down') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...enemy, velocity: {
                            x: 0,
                            y: 2
                        }
                    }, // ... -> spread operator duplicating player object
                    rectangle: boundary
                })) {
                collisions.push('down')
            }
        })

        if (collisions.length > enemy.prevCollisions.length) {
            enemy.prevCollisions = collisions
        }
        if (JSON.stringify(collisions) !== JSON.stringify(enemy.prevCollisions)) {
            // For finding possible paths for our enemy to move we can filter out new collisions from prev collisions
            // EX. if previously enemy was colliding up and down 
            // and currently it is colliding only up =>  then down is a new path
            if (enemy.velocity.x > 0) {
                enemy.prevCollisions.push('right');
            }
            else if (enemy.velocity.x < 0) {
                enemy.prevCollisions.push('left');
            }
            else if (enemy.velocity.y < 0) {
                enemy.prevCollisions.push('up');
            }
            else if (enemy.velocity.y > 0) {
                enemy.prevCollisions.push('down');
            }
            const pathWays = enemy.prevCollisions.filter(collision => {
                return !collisions.includes(collision)
            })
            // Extracting random value from path ways array to set the direction of enemy

            const direction = pathWays[Math.floor(Math.random() * pathWays.length)]

            switch (direction) {
                case 'down':
                    enemy.velocity.y = 2
                    enemy.velocity.x = 0
                    break;
                case 'up':
                    enemy.velocity.y = -2
                    enemy.velocity.x = 0
                    break;
                case 'left':
                    enemy.velocity.y = 0
                    enemy.velocity.x = -2
                    break;
                case 'right':
                    enemy.velocity.y = 0
                    enemy.velocity.x = 2
                    break;
            }
            enemy.prevCollisions = [];
        }
    })


    // rotation logic
    if (player.velocity.x > 0) {
        player.rotation = 0;
    }
    else if (player.velocity.x < 0) {
        player.rotation = Math.PI;
    }
    else if (player.velocity.y > 0) {
        player.rotation = Math.PI / 2;
    }
    else if (player.velocity.y < 0) {
        player.rotation = Math.PI * 1.5;
    }


    // WIN CONDITION
    if (pellets.length == 0) {
        var audio = new Audio("./assets/sounds/victory-sound.mp3");
        audio.play();
        var audio = new Audio("./assets/sounds/you-win.mp3");
        audio.play();
        cancelAnimationFrame(animateID);
    }

}
animate()
/*
 * AI BEHIND THE GHOST
 * => We need to keep track of our enemies' collisions at all times, so at any given location, a collision could happen on the top, bottom, or right. As a result, the ghost will be pursuing our player and will choose their route based on the heuristic of the fewest possible collisions and getting closer to them.
 */

