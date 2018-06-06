const PLAYER_ACCELERATION = 3.4;
const PLAYER_MAX_SPEED = 10;
const PLAYER_VEL_X_DECAY = 0.6;

const VARIABLE_JUMP_WINDOW = 6;
const PLAYER_JUMP_SPEED = 2;
const PLAYER_JUMP_MAX_SPEED = 10;

const MAX_Y_VELOCITY = 15;
const GRAVITY = .9;
const HOLDING_BUTTON_GRAVITY = 1.4;
const FALLING_GRAVITY = 1.7;

const PLAYER_WIDTH = 14;
const PLAYER_HEIGHT = 22;
const PLAYER_ANIM_Y_OFFSET = 0;

const PLAYER_HITBOX_X_OFFSET = 8;
const PLAYER_HITBOX_Y_OFFSET = 10;
const PLAYER_HITBOX_INNER_X_OFFSET = 2;
const PLAYER_HITBOX_INNER_Y_OFFSET = 2;

// to tell isObstacleAtPixel and isTriggerAtPixel which edge is colliding
const TOP_EDGE = 1;
const BOTTOM_EDGE = 2;
const LEFT_EDGE = 3;
const RIGHT_EDGE = 4;

const LEFT_DIRECTION = 1;
const RIGHT_DIRECTION = 2;

const PLAYER_STATE_IDLE = 1;
const PLAYER_STATE_RUNNING = 2;
const PLAYER_STATE_JUMPING = 3;

var totalCollectibles = 0;

function playerClass() {
	// TODO: Remove hardcoded values
	// PlayerX/Y are in the center of the rect
	this.x; 
	this.y;
	this.hitboxOffsetX;
	this.hitboxOffsetY;
	this.velX = 0;
	this.velY = 0;
	this.direction;
	this.currentMoveState;

	// Colliders
	this.leftEdge;
	this.rightEdge;
	this.topEdge;
	this.bottomEdge;

	this.framesSinceLeftGround = 0;

	this.isGrounded = true;
	this.hasResetJumpAnim = false;
	this.variableJumpCounter = 0;

	this.currentIndex;
	this.insideTrigger = false;
	this.triggerType;
	this.triggerIndex;
	this.triggerX;
	this.triggerY;

	this.collectibleObtained = false;

	this.reset = function() {
		for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {
				var index = colRowToArrayIndex(eachCol, eachRow);

				if (levelGrid[index] == LEVEL_START) {
					var startX = (eachCol * TILE_WIDTH)  + TILE_WIDTH / 2;
					var startY = (eachRow * TILE_HEIGHT) + TILE_HEIGHT / 2;

					this.x = startX;
					this.y = startY;
				}

			}
		}

		collectibleObtained = false;
	}

	this.move = function() {

		var jumpJustPressed = (keyHeld_Jump_Prev == false && keyHeld_Jump);
		var jumpJustReleased = (keyHeld_Jump_Prev && keyHeld_Jump == false);
		keyHeld_Jump_Prev = keyHeld_Jump;
		


		if (keyHeld_Left) {
			
			this.velX -= PLAYER_ACCELERATION;
		}

		if (keyHeld_Right) {

			this.velX += PLAYER_ACCELERATION;
		}

		if (this.velX > PLAYER_MAX_SPEED) {
			this.velX = PLAYER_MAX_SPEED;
		} else if (Math.abs(this.velX) > PLAYER_MAX_SPEED) {
			this.velX = -PLAYER_MAX_SPEED;
		}

		// this.velY < 1 stops the player from jumping while falling down
		if (keyHeld_Jump &&
			this.velY < 1 &&
		    Math.abs(this.velY - PLAYER_JUMP_SPEED) <= PLAYER_JUMP_MAX_SPEED &&
			this.variableJumpCounter <= VARIABLE_JUMP_WINDOW) {

			if (this.hasResetJumpAnim) {
				playerJumpLeftAnim.reset();
				playerJumpRightAnim.reset();
				this.hasResetJumpAnim = false;
			}

			this.velY = -8;
		}


		// if we are holding jump, we are affected by a different gravity on the upwards part of the jump
		if (this.velY > 0 && this.velY + FALLING_GRAVITY < MAX_Y_VELOCITY) {
			this.velY += FALLING_GRAVITY;
		} else if (this.velY < 0 && keyHeld_Jump == false) {
			this.velY += HOLDING_BUTTON_GRAVITY;
		} else {
			this.velY += GRAVITY;

			if ( this.velY > MAX_Y_VELOCITY) {
				this.velY = MAX_Y_VELOCITY;
			}
		}



		if (this.isGrounded == false) {
			this.currentMoveState = PLAYER_STATE_JUMPING;
		} else if (this.isGrounded && Math.abs(this.velX) > .2) {
			this.currentMoveState = PLAYER_STATE_RUNNING;
		} else {
			this.currentMoveState = PLAYER_STATE_IDLE;
		}

		this.velX *= PLAYER_VEL_X_DECAY;

		// dash implement here...

		if (this.velX < 0) {
			this.direction = LEFT_DIRECTION;
		} else {
			this.direction = RIGHT_DIRECTION;
		}

		this.x += this.velX;
		this.y += this.velY;

		this.wallCollisionChecks();
		this.triggerCollisionChecks();

		if (this.insideTrigger) {
			this.insideTriggerCheck();
		}

		this.currentIndex = this.getCurrentPlayerIndex();

		if (this.isGrounded) {
			// reset double jump, variable jump height, etc
			this.variableJumpCounter = 0;
			this.framesSinceLeftGround = 0;

			if (this.hasResetJumpAnim == false) {
				this.hasResetJumpAnim = true;
			}
		} else {
			this.framesSinceLeftGround++;
		}

	}


	this.wallCollisionChecks = function() {
		
		this.recalculateCollisionEdges();

		if (this.isGrounded == false && ( this.topEdge < 0 || isObstacleAtPixel(this.x, this.topEdge, TOP_EDGE) ) ) {
			var topEdgeRow = Math.floor(this.topEdge / TILE_HEIGHT);
			this.velY = 0;
			this.y = (topEdgeRow * TILE_HEIGHT) + TILE_HEIGHT + PLAYER_HEIGHT / 2 - PLAYER_HITBOX_INNER_Y_OFFSET;
			this.recalculateCollisionEdges();
			
		}

		if (this.bottomEdge > CANVAS_HEIGHT || isObstacleAtPixel(this.x, this.bottomEdge, BOTTOM_EDGE) ) {
			var bottomEdgeRow = Math.floor(this.bottomEdge / TILE_HEIGHT);
			this.velY = 0;
			this.y = (bottomEdgeRow * TILE_HEIGHT) - (PLAYER_HEIGHT / 2) + PLAYER_HITBOX_INNER_Y_OFFSET;
			this.recalculateCollisionEdges();
			this.isGrounded = true;

		} else if (isObstacleAtPixel(this.x, this.bottomEdge + 2, BOTTOM_EDGE) == false)  {
			this.isGrounded = false;
			this.variableJumpCounter++;
		}

		if (this.leftEdge < 0 || isObstacleAtPixel(this.leftEdge, this.y, LEFT_EDGE) ) {
			var leftEdgeCol = Math.floor(this.leftEdge / TILE_WIDTH);
			this.velX = 0;
			this.x = (leftEdgeCol * TILE_WIDTH) + PLAYER_WIDTH + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_INNER_X_OFFSET + 2;
			this.recalculateCollisionEdges();
			
		}

		if (this.rightEdge > CANVAS_WIDTH || isObstacleAtPixel(this.rightEdge, this.y, RIGHT_EDGE) ) {
			var rightEdgeCol = Math.floor(this.rightEdge / TILE_WIDTH);
			this.velX = 0;
			this.x = (rightEdgeCol * TILE_WIDTH) - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_INNER_X_OFFSET;
			this.recalculateCollisionEdges();
			
		}

	}

	this.triggerCollisionChecks = function() {
		this.recalculateCollisionEdges();


		if (isTriggerAtPixel(this.x, this.topEdge, TOP_EDGE)) {
			this.insideTrigger = true;
		} else if (isTriggerAtPixel(this.x, this.bottomEdge, BOTTOM_EDGE)) {
			this.insideTrigger = true;
		} else if (isTriggerAtPixel(this.leftEdge, this.y, LEFT_EDGE)) {
			this.insideTrigger = true;
		} else if (isTriggerAtPixel(this.rightEdge, this.y, RIGHT_EDGE)) {
			this.insideTrigger = true;
		}

	}

	this.recalculateCollisionEdges = function() {
		this.topEdge = this.y  - PLAYER_HEIGHT / 2 + PLAYER_HITBOX_INNER_X_OFFSET;
		this.bottomEdge = this.y + PLAYER_HEIGHT / 2 - PLAYER_HITBOX_INNER_X_OFFSET;
		this.leftEdge = this.x - PLAYER_WIDTH / 2 + PLAYER_HITBOX_INNER_X_OFFSET;
		this.rightEdge = this.x+ PLAYER_WIDTH / 2 - PLAYER_HITBOX_INNER_X_OFFSET;
	}

	this.killPlayer = function() {
		loadLevel(currentLevel);
		player.reset();
		console.log('you have died');
	} 

	this.insideTriggerCheck = function() {

		if (this.distFrom(this.triggerX, this.triggerY) > PLAYER_WIDTH + 10) {
			this.insideTrigger = false;
			if (this.triggerType == LEVEL_SPIKE_TRIGGER) {
				levelGrid[this.triggerIndex] = LEVEL_SPIKE_N;
			}

			this.triggerType;
			this.triggerIndex;
			this.triggerX;
			this.triggerY;
		}

		if (this.triggerType == LEVEL_SPIKE_N ||
			this.triggerType == LEVEL_SPIKE_S ||
			this.triggerType == LEVEL_SPIKE_W ||
			this.triggerType == LEVEL_SPIKE_E) {

			this.killPlayer();
			this.insideTrigger = false;
		}

		if (this.triggerType == LEVEL_ENTER_PORTAL_1) {
			for (var i = 0; i < allTriggersArray.length; i ++) {
				if (allTriggersArray[i].type == LEVEL_EXIT_PORTAL_1) {
					this.x = allTriggersArray[i].centeredX;
					this.y = allTriggersArray[i].centeredY;
					this.velX *= -1; // reverses the direction we went into the portal
					this.insideTrigger = false;
				}
			}
		}

		if (this.triggerType == LEVEL_COLLECTIBLE) {
			this.collectibleObtained = true;
			levelGrid[this.triggerIndex] = 0;
			this.insideTrigger = false;

		}

		if (this.triggerType == LEVEL_END) {
			this.insideTrigger = false;
			currentLevel++;
			if (this.collectibleObtained) {
				totalCollectibles++;
			}
			loadLevel(currentLevel);
		}

		if (this.triggerType == LEVEL_BOUNCE_PAD) {
			if (this.y < this.triggerY) {
				this.y = this.triggerY - TILE_HEIGHT;
				this.velY = -MAX_Y_VELOCITY;
				this.insideTrigger = false;
			}
		}


	}


	this.getCurrentPlayerIndex = function() {
		var playerCol = Math.floor(this.x / TILE_WIDTH);
		var playerRow = Math.floor(this.y / TILE_HEIGHT);

		return colRowToArrayIndex(playerCol, playerRow);
	}

	this.distFrom = function(otherX, otherY) {
		var deltaX = otherX - this.x;
		var deltaY = otherY - this.y;

		return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
	}

	this.draw = function() {
		/*
		colorRect(	this.x - PLAYER_WIDTH / 2,
					this.y - PLAYER_HEIGHT / 2,
					PLAYER_WIDTH,
					PLAYER_HEIGHT,
					'blue');
		*/

		if (this.direction == LEFT_DIRECTION) {
			if (this.currentMoveState == PLAYER_STATE_IDLE) {
				playerIdleLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
			} else if (this.currentMoveState == PLAYER_STATE_RUNNING) {
				playerRunLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y + 2 - PLAYER_HEIGHT / 2);
			} else if (this.currentMoveState == PLAYER_STATE_JUMPING) {
				playerJumpLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
			}

		} else {
			if (this.currentMoveState == PLAYER_STATE_IDLE) {
				playerIdleRightAnim.render(this.x - PLAYER_WIDTH / 2 - 2, this.y - PLAYER_HEIGHT / 2);
			} else if (this.currentMoveState == PLAYER_STATE_RUNNING) {
				playerRunRightAnim.render(this.x - PLAYER_WIDTH / 2, this.y + 2 - PLAYER_HEIGHT / 2);
			} else if (this.currentMoveState == PLAYER_STATE_JUMPING) {
				playerJumpRightAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
			}
		}

		if (showHitbox) {
			var colorHere = 'blue';

			// this x and y point
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
						colorHere);

			// top edge left hitbox point
			colorRect(	this.x - 1 - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_X_OFFSET,
						this.topEdge - 1,
						2,
						2,
						colorHere);

			// top edge right hitbox point
			colorRect(	this.x - 1 + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_X_OFFSET,
						this.topEdge - 1,
						2,
						2,
						colorHere);


			// bottom edge center hitbox point
			colorRect(	this.x - 1,
						this.bottomEdge - 1,
						2,
						2,
						colorHere);

			// bottom edge left hitbox point
			colorRect(	this.x - 1 - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_X_OFFSET,
						this.bottomEdge - 1,
						2,
						2,
						colorHere);

			// bottom edge right hitbox point
			colorRect(	this.x - 1 + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_X_OFFSET,
						this.bottomEdge - 1 ,
						2,
						2,
						colorHere);

			// left edge center hitbox point
			colorRect(	this.leftEdge - 1,
						this.y - 1,
						2,
						2,
						colorHere);

			// left edge top hitbox point
			colorRect(	this.leftEdge - 1,
						this.y - 1 - (PLAYER_HEIGHT / 2) + PLAYER_HITBOX_Y_OFFSET,
						2,
						2,
						colorHere);

			// left edge bottom hitbox point
			colorRect(	this.leftEdge - 1,
						this.y - 1 + (PLAYER_HEIGHT / 2) - PLAYER_HITBOX_Y_OFFSET,
						2,
						2,
						colorHere);

			// right edge center hitbox point
			colorRect(	this.rightEdge - 1,
						this.y - 1,
						2,
						2,
						colorHere);

			// right edge top hitbox point
			colorRect(	this.rightEdge - 1,
						this.y - 1 - (PLAYER_HEIGHT / 2) + PLAYER_HITBOX_Y_OFFSET,
						2,
						2,
						colorHere);

			// right edge bottom hitbox point
			colorRect(	this.rightEdge - 1,
						this.y - 1 + (PLAYER_HEIGHT / 2) - PLAYER_HITBOX_Y_OFFSET,
						2,
						2,
						colorHere);
		}

	}
}
