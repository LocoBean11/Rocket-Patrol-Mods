//Aaron Rodriguez
// Rocket Patrol 2: Electric Boogaloo
//Approximate time: 5 hours
//Mods chosen: Fire UI (1 pt), 
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