const PLAYER_ACCELERATION = 5;
const PLAYER_MAX_SPEED = 15;
const PLAYER_VEL_X_DECAY = 0.65;
const PLAYER_JUMP_SPEED = 4;
const PLAYER_JUMP_MAX_SPEED = 15; 
const VARIABLE_JUMP_WINDOW = 6;
const GRAVITY = 1;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

const PLAYER_HORIZONTAL_RAY_COUNT = 8;
const PLAYER_VERTICAL_RAY_COUNT = 8;
const PLAYER_RAY_OFFSET = 7;

const TOP_EDGE = 1;
const BOTTOM_EDGE = 2;
const LEFT_EDGE = 3;
const RIGHT_EDGE = 4;


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
		
		if (keyHeld_Left && Math.abs(this.velX - PLAYER_ACCELERATION) < PLAYER_MAX_SPEED) {
			this.velX -= PLAYER_ACCELERATION;
		}

		if (keyHeld_Right && Math.abs(this.velX + PLAYER_ACCELERATION) < PLAYER_MAX_SPEED) {
			this.velX += PLAYER_ACCELERATION;
		}

		if (keyHeld_Jump && Math.abs(this.velY - PLAYER_JUMP_SPEED) < PLAYER_JUMP_MAX_SPEED && this.variableJumpCounter <= VARIABLE_JUMP_WINDOW) {
			this.velY -= PLAYER_JUMP_SPEED;
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
		colorRect(	this.x - PLAYER_WIDTH / 2,
					this.y - PLAYER_HEIGHT / 2,
					PLAYER_WIDTH,
					PLAYER_HEIGHT,
					'#ad0000');
	}


	this.wallCollisionChecks = function() {
		
		this.recalculateCollisionEdges();

		if (this.topEdge < 0 || isObstacleAtPixel(this.x, this.topEdge, TOP_EDGE) ) {
			var topEdgeRow = Math.floor(this.topEdge / TILE_HEIGHT);
			this.y = (topEdgeRow * TILE_HEIGHT) + (PLAYER_HEIGHT + (PLAYER_HEIGHT / 2)) + 1;
			this.recalculateCollisionEdges();
			this.velY = 0;
		}

		if (this.bottomEdge > CANVAS_HEIGHT || isObstacleAtPixel(this.x, this.bottomEdge, BOTTOM_EDGE) ) {
			this.y = (Math.floor(this.bottomEdge / TILE_HEIGHT) * TILE_HEIGHT) - (PLAYER_HEIGHT / 2);
			this.recalculateCollisionEdges();
			this.velY = 0;
			this.isGrounded = true;

		} else if (isObstacleAtPixel(this.x, this.bottomEdge + 2, BOTTOM_EDGE) == false)  {
			this.isGrounded = false;
			this.variableJumpCounter++;
		}

		if (this.leftEdge < 0 || isObstacleAtPixel(this.leftEdge, this.y, LEFT_EDGE) ) {
			var leftEdgeCol = Math.floor(this.leftEdge / TILE_WIDTH);
			this.x = (leftEdgeCol * TILE_WIDTH) + PLAYER_WIDTH + (PLAYER_WIDTH / 2);
			this.recalculateCollisionEdges();
			this.velX = 0;
		}

		if (this.rightEdge > CANVAS_WIDTH || isObstacleAtPixel(this.rightEdge, this.y, RIGHT_EDGE) ) {
			var rightEdgeCol = Math.floor(this.rightEdge / TILE_WIDTH);
			this.x = (rightEdgeCol * TILE_WIDTH) - (PLAYER_WIDTH / 2);
			this.recalculateCollisionEdges();
			this.velX = 0;
		}

	}

	this.recalculateCollisionEdges = function() {
		this.leftEdge = this.x - PLAYER_WIDTH / 2;
		this.rightEdge = this.x + PLAYER_WIDTH / 2;
		this.topEdge = this.y - PLAYER_HEIGHT / 2;
		this.bottomEdge = this.y + PLAYER_HEIGHT / 2;
	}

}
