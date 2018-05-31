const PLAYER_ACCELERATION = 2.5;
const PLAYER_RUN_ACCELERATION = 3.5;
const PLAYER_MAX_SPEED = 12;
const PLAYER_RUN_MAX_SPEED = 17;
const PLAYER_VEL_X_DECAY = 0.7;
const PLAYER_JUMP_SPEED = 3;
const PLAYER_JUMP_MAX_SPEED = 12; 
const VARIABLE_JUMP_WINDOW = 8;
const GRAVITY = .9;
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 48;

const PLAYER_HORIZONTAL_RAY_COUNT = 6;
const PLAYER_VERTICAL_RAY_COUNT = 6;
const PLAYER_RAY_OFFSET = 6;

const TOP_EDGE = 1;
const BOTTOM_EDGE = 2;
const LEFT_EDGE = 3;
const RIGHT_EDGE = 4;

const LEFT_DIRECTION = 1;
const RIGHT_DIRECTION = 2;


function playerClass() {
	// TODO: Remove hardcoded values
	// PlayerX/Y are in the center of the rect
	this.x = CANVAS_WIDTH / 2; 
	this.y = CANVAS_HEIGHT / 2;
	this.velX = 0;
	this.velY = 0;
	this.direction;

	// Colliders
	this.leftEdge;
	this.rightEdge;
	this.topEdge;
	this.bottomEdge;

	this.isGrounded = true;

	

	this.variableJumpCounter = 0;

	this.move = function() {
		
		if (keyHeld_Left &&
			keyHeld_Run &&
			Math.abs(this.velX - PLAYER_RUN_ACCELERATION) < PLAYER_RUN_MAX_SPEED) {

			this.velX -= PLAYER_RUN_ACCELERATION;

		} else if (keyHeld_Left &&
		           Math.abs(this.velX - PLAYER_ACCELERATION) < PLAYER_MAX_SPEED) {
			this.velX -= PLAYER_ACCELERATION;
		}

		if (keyHeld_Right &&
			keyHeld_Run &&
			Math.abs(this.velX + PLAYER_RUN_ACCELERATION) < PLAYER_RUN_MAX_SPEED) {

			this.velX += PLAYER_RUN_ACCELERATION;

		} else if (keyHeld_Right &&
		           Math.abs(this.velX + PLAYER_ACCELERATION) < PLAYER_MAX_SPEED) {
			this.velX += PLAYER_ACCELERATION;
		}

		if (keyHeld_Jump && 
		    Math.abs(this.velY - PLAYER_JUMP_SPEED) < PLAYER_JUMP_MAX_SPEED &&
			this.variableJumpCounter <= VARIABLE_JUMP_WINDOW) {

			this.velY -= PLAYER_JUMP_SPEED;
		}

		this.velX *= PLAYER_VEL_X_DECAY;
		this.velY += GRAVITY;

		if (this.velX < 0) {
			this.direction = LEFT_DIRECTION;
		} else {
			this.direction = RIGHT_DIRECTION;
		}

		this.x += this.velX;
		this.y += this.velY;

		this.wallCollisionChecks();

		if (this.isGrounded) {
			// reset double jump, variable jump height, etc
			this.variableJumpCounter = 0;
		}

	}


	this.wallCollisionChecks = function() {
		
		this.recalculateCollisionEdges();

		if (this.topEdge < 0 || isObstacleAtPixel(this.x, this.topEdge, TOP_EDGE) ) {
			var topEdgeRow = Math.floor(this.topEdge / TILE_HEIGHT);
			this.y = (topEdgeRow * TILE_HEIGHT) + (PLAYER_HEIGHT + (PLAYER_HEIGHT / 4) - 1);
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


	this.draw = function() {
		colorRect(	this.x - PLAYER_WIDTH / 2,
					this.y - PLAYER_HEIGHT / 2,
					PLAYER_WIDTH,
					PLAYER_HEIGHT,
					'#ad0000');

		colorRect(	this.x - 1,
					this.y - 1,
					2,
					2,
					'white');

		// hit box point

		// top edge center hitbox point
		colorRect(	this.x - 1,
					this.topEdge - 1,
					2,
					2,
					'white');

		// top edge left hitbox point
		colorRect(	this.x - 1 - (PLAYER_WIDTH / 2) + PLAYER_RAY_OFFSET,
					this.topEdge - 1,
					2,
					2,
					'white');

		// top edge right hitbox point
		colorRect(	this.x - 1 + (PLAYER_WIDTH / 2) - PLAYER_RAY_OFFSET,
					this.topEdge - 1,
					2,
					2,
					'white');


		// bottom edge center hitbox point
		colorRect(	this.x - 1,
					this.bottomEdge - 1,
					2,
					2,
					'white');

		// bottom edge left hitbox point
		colorRect(	this.x - 1 - (PLAYER_WIDTH / 2) + PLAYER_RAY_OFFSET,
					this.bottomEdge - 1,
					2,
					2,
					'white');

		// bottom edge right hitbox point
		colorRect(	this.x - 1 + (PLAYER_WIDTH / 2) - PLAYER_RAY_OFFSET,
					this.bottomEdge - 1 ,
					2,
					2,
					'white');

		// left edge center hitbox point
		colorRect(	this.leftEdge - 1,
					this.y - 1,
					2,
					2,
					'white');

		// left edge top hitbox point
		colorRect(	this.leftEdge - 1,
					this.y - 1 - (PLAYER_HEIGHT / 2) + PLAYER_RAY_OFFSET,
					2,
					2,
					'white');

		// left edge bottom hitbox point
		colorRect(	this.leftEdge - 1,
					this.y - 1 + (PLAYER_HEIGHT / 2) - PLAYER_RAY_OFFSET,
					2,
					2,
					'white');

		// right edge center hitbox point
		colorRect(	this.rightEdge - 1,
					this.y - 1,
					2,
					2,
					'white');

		// right edge top hitbox point
		colorRect(	this.rightEdge - 1,
					this.y - 1 - (PLAYER_HEIGHT / 2) + PLAYER_RAY_OFFSET,
					2,
					2,
					'white');

		// right edge bottom hitbox point
		colorRect(	this.rightEdge - 1,
					this.y - 1 + (PLAYER_HEIGHT / 2) - PLAYER_RAY_OFFSET,
					2,
					2,
					'white');

	}
}
