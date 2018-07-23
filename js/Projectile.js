const PROJECTILE_SPEED = 5;
const PROJECTILE_WIDTH = 6;
const PROJECTILE_HEIGHT = 6;

function projectileClass(fromX, fromY, whichDirection) {

	this.x = fromX;
	this.y = fromY;
	this.direction = whichDirection;
	this.isOffScreen = false;

	this.move = function() {
		if (this.direction == DIRECTION_LEFT) {
			this.x -= PROJECTILE_SPEED;
		}

		if (this.direction == DIRECTION_RIGHT) {
			this.x += PROJECTILE_SPEED;
		}

		if (this.direction == DIRECTION_UP) {
			this.y -= PROJECTILE_SPEED;
		}

		if (this.direction == DIRECTION_DOWN) {
			this.y += PROJECTILE_SPEED;
		}

		/*
		if ((this.x > canvas.width ||
		    this.y > canvas.height ||
		    this.x < 0 ||
		    this.y < 0) && this.isOffScreen == false) {
			this.isOffScreen = true;
			var thisIndex = projectileArray.indexOf(this);
			projectileArray.splice(thisIndex, 1);
		}
		*/
	}

	this.draw = function() {
		colorRect(this.x - PROJECTILE_WIDTH / 2,
		          this.y - PROJECTILE_HEIGHT / 2,
		          PROJECTILE_WIDTH,PROJECTILE_HEIGHT,
		          'white');
	}


}

function moveAllProjectiles() {
	for (var i = 0; i < projectileArray.length; i++) {
		projectileArray[i].move();
	}
}

function drawAllProjectiles() {
	for (var i = 0; i < projectileArray.length; i++) {
		projectileArray[i].draw();
	}
}