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
    }

    create() {
      //this.text.setText(`Event.progress: ${this.timedEvent.getProgress().toString().substr(0, 4)}`);

    /*  this.remainingTime = game.settings.gameTimer / 1000; // Set the initial remaining time in seconds

      // Create a text element to display the remaining time
      this.remainingTimeText = this.add.text(
          16, // X position
          16, // Y position
          'Time: ' + this.remainingTime, // Initial text
          {
              fontFamily: 'Courier',
              fontSize: '24px',
              color: '#ffffff',
          }
      );
      */
      //Looping BGM
      this.backgroundMusic = this.sound.add('chiptunemusic'); // 'backgroundMusic' should be the key for your music asset
      this.backgroundMusic.play({ loop: true });

      this.extraTime = 5;

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
        this.ship04.increaseSpeed(3);

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
          this.add.text(game.config.width/2, game.config.height/2, `${this.clock.getRemainingSeconds()}`.toString(), timeConfig).setOrigin(-1.5,5);

         /* if (!this.gameOver) {
            // Update the remaining time
            this.remainingTime = Math.max(0, this.remainingTime - this.time.deltaTime / 1000); // Subtract elapsed time in seconds
    
            // Update the displayed text
            this.remainingTimeText.setText('Time: ' + Math.ceil(this.remainingTime));
    
            // Check for game over when the time runs out
            if (this.remainingTime <= 0) {
                this.gameOver = true;
    
                // Handle game over logic here
                // For example: this.scene.start("gameOverScene");
            }
        }
*/
          //display "Fire" when button is pressed
       if(this.p1Rocket.y < game.config.height - borderUISize - borderPadding) {
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
       this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "FIRE", fireButtonConfig).setOrigin(-2.5,0);
      }
      else{
        let nofireButtonConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#00ff00',
          color: '0x00FF00',
          align: 'center',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
        }
        this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "", nofireButtonConfig).setOrigin(-2.5,0);
      }

          // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
              this.scene.restart();
          }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              this.scene.start("menuScene");
          }

        this.starfield.tilePositionX -= 4;  // update the tile sprite

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.scene.restart();
      }

      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene");
      }

      this.starfield.tilePositionX -= 4;  // update tile sprite

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
          //Add time for destroyed spaceship
          this.timeRemaining = 60000 * (1 - this.timedEvent.getProgress());
          this.newTime = this.timeRemaining + 5000;
          this.clock = this.time.delayedCall(this.newTime, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

          /*this.time.delayedCall(extraTime * 1000, () => {
          }, [], this);*/
      }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            /*this.time.delayedCall(extraTime * 1000, () => {
            }, [], this);*/
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
           /* this.time.delayedCall(extraTime * 1000, () => {
            }, [], this);*/
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
           /* this.time.delayedCall(extraTime * 1000, () => {
            }, [], this);*/
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

        // Add extra time to the game clock
          // Check if extra time has been added for this explosion
          if (!this.extraTimeAdded) {
          // Add extra time to the game clock using delayedCall
            this.time.delayedCall(extraTime * 1000, () => {
          }, [], this);

          // Set the flag to indicate that extra time has been added
          this.extraTimeAdded = true;
 }

        this.sound.play('sfx_explosion');
        }
    }