    class Play extends Phaser.Scene {
        constructor() {
            super("playScene");
        }

        preload() {
            //load images/tile sprites
            this.load.image('rocket', './assets/rocket.png');
            this.load.image('spaceship', './assets/spaceship.png');
            this.load.image('smallerspaceship', './assets/smallerspaceship.png');
            this.load.image('starfield', './assets/starfield.png');
            //load spritesheet
            this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
            //BGM
            this.load.audio('chiptunemusic', './assets/chiptunemusic.mp3');
            this.load.audio('Explosion 1', './assets/Explosion 1.wav');
            this.load.audio('Explosion 2', './assets/Explosion 2.wav');
            this.load.audio('Explosion 3', './assets/Explosion 3.wav');
            this.load.audio('Explosion 4', './assets/Explosion 4.wav');
        }

        create() {
          this.explosions = ['Explosion 1', 'Explosion 2', 'Explosion 3', 'Explosion 4'];

          //Looping BGM
          this.backgroundMusic = this.sound.add('chiptunemusic'); 
          this.backgroundMusic.play({ loop: true });
          this.backgroundMusic.setVolume(0.1);

            // place tile sprite
            this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

            // green UI background
            this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
            // white borders
            this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

            //add rocket (p1)
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

            //add spaceships (x4)
            this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
            this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
            this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
            this.ship04 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*4, 'smallerspaceship', 0, 50).setOrigin(0,0);
            this.ship04.increaseSpeed(4);

            //define keys
            keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

            // animation config
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { 
                    start: 0,
                    end: 9,
                    first: 0
                }),
                frameRate: 30
            });
            
            // initialize score
            this.p1Score = 0;

            // display score
            let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
          }
          
          this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

          //Display the remaining time
          let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
          }
        this.timeRemaining = this.add.text(game.config.width/2, game.config.height/2, "60", timeConfig).setOrigin(-1.5,5);

        let fireButtonConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'center',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
        }
        this.fire = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "FIRE", fireButtonConfig).setOrigin(-2.5,0);

            // Game Over flag
            this.gameOver = false;
    
            // 60-second play clock
            scoreConfig.fixedWidth = 0;
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }, null, this);

            // Set a timer to increase spaceship speed after 30 seconds
            this.time.addEvent({
              delay: 30000, // 30 seconds in milliseconds
              callback: this.increaseSpaceshipSpeed,
              callbackScope: this,
              loop: false // Do not repeat the timer
            });
          }

          increaseSpaceshipSpeed() {
            // Increases the speed of the spaceships
            this.ship01.increaseSpeed(2);
            this.ship02.increaseSpeed(2);
            this.ship03.increaseSpeed(2);
            this.ship04.increaseSpeed(3);
          }
        
            update() {

              this.timeRemaining.text = `${Math.round(this.clock.getRemainingSeconds())}`.toString();

              //display "Fire" when button is pressed
          if(this.p1Rocket.y < game.config.height - borderUISize - borderPadding) {
            this.fire.setBackgroundColor('#F3B141');
            this.fire.setColor('#843605');
          }

          else{
            this.fire.setBackgroundColor ('#00FF00');
            this.fire.setColor('#00FF00');
          }

              // check key input for restart / menu
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                  this.scene.restart();
                  this.backgroundMusic.stop();
              }

            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                  this.scene.start("menuScene");
                  this.backgroundMusic.stop();
              }

            this.starfield.tilePositionX -= 4;  // update the tile sprite

          if(!this.gameOver) {
              this.p1Rocket.update();  // update p1 and spaceships (x3)
              this.ship01.update();  
              this.ship02.update();
              this.ship03.update();
              this.ship04.update();
          }

            // check collisions
            if(this.checkCollision(this.p1Rocket, this.ship04)) {
              this.p1Rocket.reset();
              this.shipExplode(this.ship04);
          }

            if(this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship03);
            }

            if(this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship02);
            }

            if(this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship01);
            }
          }

          checkCollision(rocket, ship) {
            // simple AABB checking
            if (rocket.x < ship.x + ship.width && 
              rocket.x + rocket.width > ship.x && 
              rocket.y < ship.y + ship.height &&
              rocket.height + rocket.y > ship. y) {
                return true;
            } else {
                return false;
              }
          }
        
          shipExplode(ship) {
            // temporarily hides ship
            ship.alpha = 0;
            // create explosion sprite at ship's position
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
              ship.reset();                         // reset ship position
              ship.alpha = 1;                       // make ship visible again
              boom.destroy();                       // remove explosion sprite
            });

            //score add and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            
            // Add extra time to the game clock for each successful hit
            this.clock.elapsed -= 3000;
            this.rnd = Phaser.Math.RND;
            this.sound.play(this.rnd.pick(this.explosions));
            //this.sound.play('sfx_explosion');
            }
        }