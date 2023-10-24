//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
    }

    update() {
        //move the spaceship left    
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }    
    }

    increaseSpeed(amount) {
        // Increase the speed by the specified amount
        this.speed += amount;
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}

  // Speed increase after 30 seconds
      /*this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.moveSpeed = game.settings.spaceshipSpeed*2;
          this.ship01 = true;
          this.ship02 = true;
          this.ship03 = true;
      }, null, this);
    }*/