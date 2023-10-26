//Name: Aaron Rodriguez
//Rocket Patrol 2: Electric Boogaloo
//Approximate time: 9 hours
//Mods chosen: Fire UI (1 pt), looping background music (1 pt), speed increase (1 pt)
//time remaining (3 pts), new title screen (3 pts), randomized explosion sound effects (3 pts) 
//new enemy spaceship type (5 pts), add time to the clock for each hit (5 pts)
//CITATION: "Chiptune No Copyright Music | No Copyright | No Attribution - Loopable" by Liborio Conti @ YouTube
//The randomized explosion sound effect was the last mod and it goes over the 20 point limit, but it was just for fun

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;                                                   

//npm install -g http-server
//http-server
//http://localhost:8080