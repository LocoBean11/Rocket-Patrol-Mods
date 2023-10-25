//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
      this.fasterMoveSpeed = game.settings.spaceshipSpeed; //ships move faster after 30 seconds
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
        this.moveSpeed += amount;
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}