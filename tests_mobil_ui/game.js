// Initialize KAPLAY with mobile-optimized settings
kaplay({
    canvas: document.getElementById("game"),      // use our canvas element
    width: 800, 
    height: 450,                                 // base game resolution (16:9)
    stretch: true, 
    letterbox: true,                             // maintain aspect ratio with bars:contentReference[oaicite:7]{index=7}
    pixelDensity: 1,                             // 1:1 pixel scale for performance:contentReference[oaicite:8]{index=8}
    background: [0, 0, 0],                       // black background (fills letterbox bars)
    // Disable built-in debug tools in production for slight performance gain:
    debug: false,
    // Define input bindings for actions (keyboard mappings for desktop)
    buttons: {
      left:  { keyboard: ["left", "a"] },        // ArrowLeft or "A" key
      right: { keyboard: ["right", "d"] },       // ArrowRight or "D"
      jump:  { keyboard: ["space", "up"] }       // Spacebar or ArrowUp for jump
    },
    // (Other options like maxFPS or crisp can be added as needed)
  });
  

// Create a scene for our shapes
scene("shapes", () => {
    // Add a rectangle
    add([
        rect(100, 50),
        pos(100, 100),
        color(0, 255, 0),
        area(),
        "rectangle"
    ]);

    // Add a circle
    add([
        circle(30),
        pos(300, 100),
        color(255, 0, 0),
        area(),
        "circle"
    ]);

    // Add a triangle
    add([
        polygon([
            vec2(0, 0),
            vec2(50, 0),
            vec2(25, -50)
        ]),
        pos(500, 100),
        color(0, 0, 255),
        area(),
        "triangle"
    ]);

    // Add some text
    add([
        text("Shapes Demo", { size: 32 }),
        pos(400, 200),
        color(255, 255, 255),
        anchor("center")
    ]);

    // Add click/touch interaction
    onClick("rectangle", () => {
        shake(5);
    });

    onClick("circle", () => {
        shake(5);
    });

    onClick("triangle", () => {
        shake(5);
    });
});

// Start with the shapes scene
go("shapes");

// Touch controls: map touch events to input bindings
const leftBtn  = document.getElementById("btn-left");
const rightBtn = document.getElementById("btn-right");
const jumpBtn  = document.getElementById("btn-jump");

// When touch starts on a button, simulate pressing that game input
leftBtn.addEventListener("touchstart", () => pressButton("left"));
leftBtn.addEventListener("touchend",   () => releaseButton("left"));

rightBtn.addEventListener("touchstart", () => pressButton("right"));
rightBtn.addEventListener("touchend",   () => releaseButton("right"));

jumpBtn.addEventListener("touchstart", () => pressButton("jump"));
jumpBtn.addEventListener("touchend",   () => releaseButton("jump"));


// Inside your KAPLAY scene or after defining the player object:
const playerSpeed = 200;
onButtonDown("left", () => {
  player.move(-playerSpeed, 0);    // move player left while held
});
onButtonDown("right", () => {
  player.move(playerSpeed, 0);     // move player right
});
onButtonPress("jump", () => {
  player.jump();                   // trigger jump on button press
});
