const PLAYER_SPEED = 5;
const PLAYER_VEL_X_DECAY = 0.60;
const PLAYER_JUMP_SPEED = 2.2;
const VARIABLE_JUMP_WINDOW = 6;
const GRAVITY = 1;
const PLAYER_SQUARE_LENGTH = 50;

function playerClass() {
	// TODO: Remove hardcoded values
	// PlayerX/Y are in the center of the rect
	this.x = CANVAS_WIDTH / 2; 
	this.y = CANVAS_HEIGHT / 2;
	this.velX = 0;
	this.velY = 0;

	// Colliders
	this.leftEdge;
	this.rightEdge;
	this.topEdge;
	this.bottomEdge;

	this.isGrounded = true;

	

	this.variableJumpCounter = 0;

	this.move = function() {
		
		if (keyHeld_Left) {
			this.velX -= PLAYER_SPEED;
		}

		if (keyHeld_Right) {
			this.velX += PLAYER_SPEED;
		}

		if (keyHeld_Jump && this.variableJumpCounter <= VARIABLE_JUMP_WINDOW) {
			this.velY -= PLAYER_JUMP_SPEED;
			this.variableJumpCounter++;
		}

		this.velX *= PLAYER_VEL_X_DECAY;
		this.velY += GRAVITY;

		this.x += this.velX;
		this.y += this.velY;

		this.wallCollisionChecks();

		if (this.isGrounded) {
			// reset double jump, variable jump height, etc
			this.variableJumpCounter = 0;
		}

	}

	this.draw = function() {
		colorRect(	this.x - PLAYER_SQUARE_LENGTH / 2,
					this.y - PLAYER_SQUARE_LENGTH / 2,
					PLAYER_SQUARE_LENGTH, PLAYER_SQUARE_LENGTH,
					'#ad0000');
	}

	this.wallCollisionChecks = function() {
		this.leftEdge = this.x - PLAYER_SQUARE_LENGTH / 2;
		this.rightEdge = this.x + PLAYER_SQUARE_LENGTH / 2;
		this.topEdge = this.y - PLAYER_SQUARE_LENGTH / 2;
		this.bottomEdge = this.y + PLAYER_SQUARE_LENGTH / 2;


		if (this.leftEdge < 0 || isObstacleAtPixel(this.leftEdge, this.y) ) {
			this.x = (Math.floor(this.leftEdge / TILE_WIDTH) * TILE_WIDTH) + PLAYER_SQUARE_LENGTH / 2;
			this.velX = 0;
		}
		if (this.rightEdge > CANVAS_WIDTH || isObstacleAtPixel(this.rightEdge, this.y) ) {
			this.x = (Math.floor(this.rightEdge / TILE_WIDTH) * TILE_WIDTH) - PLAYER_SQUARE_LENGTH / 2;
			this.velX = 0;
		}
		if (this.topEdge < 0 || isObstacleAtPixel(this.x, this.topEdge) ) {
			this.y = (Math.floor(this.topEdge / TILE_HEIGHT) * TILE_HEIGHT) + PLAYER_SQUARE_LENGTH / 2;
			this.velY = 0;
		}
		if (this.bottomEdge > CANVAS_HEIGHT || isObstacleAtPixel(this.x, this.bottomEdge) ) {
			this.y = (Math.floor(this.topEdge / TILE_HEIGHT) * TILE_HEIGHT) - PLAYER_SQUARE_LENGTH / 2;
			this.velY = 0;
			this.isGrounded = true;
		} else if (isObstacleAtPixel(this.x, this.bottomEdge + 2) == false)  {
			this.isGrounded = false;
		}
	}

}
