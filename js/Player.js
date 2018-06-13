const PLAYER_ACCELERATION = 3;
const PLAYER_MAX_SPEED = 12;
const PLAYER_VEL_X_DECAY = 0.65;

const PLAYER_JUMP_SPEED = 6;
const PLAYER_JUMP_MAX_SPEED = 10;
const VARIABLE_JUMP_WINDOW = 8;
const MAX_DASH_FRAMES = 5;
const GROUNDED_DASH_COOLDOWN = 5;
const MAX_FRAMES_SINCE_LEFT_GROUND_TO_JUMP = 4;

const MAX_Y_VELOCITY = 10;
const GRAVITY = .8;
const FALLING_GRAVITY = 1.2;

const COLLECTIBLE_MAX_TIME_TO_HOLD = 120; // 4 sec

const MAX_DEATH_TIME = 30;

const PLAYER_WIDTH = 14;
const PLAYER_HEIGHT = 22;
const PLAYER_ANIM_Y_OFFSET = 0;

const PLAYER_HITBOX_X_OFFSET = 8;
const PLAYER_HITBOX_Y_OFFSET = 6;
const PLAYER_HITBOX_INNER_X_OFFSET = 2;
const PLAYER_HITBOX_INNER_Y_OFFSET = 2;

// to tell isObstacleAtPixel and isTriggerAtPixel which edge is colliding
const TOP_EDGE = 1;
const BOTTOM_EDGE = 2;
const LEFT_EDGE = 3;
const RIGHT_EDGE = 4;

const DIRECTION_LEFT = 1;
const DIRECTION_RIGHT = 2;
const DIRECTION_UP = 3;
const DIRECTION_DOWN = 4;

const PLAYER_STATE_IDLE = 1;
const PLAYER_STATE_RUNNING = 2;
const PLAYER_STATE_JUMPING = 3;
const PLAYER_STATE_DASHING = 4;
const PLAYER_STATE_FALLING = 5;

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
	this.edgeArray = [this.leftEdge, this.rightEdge, this.topEdge, this.bottomEdge];

	this.framesSinceLeftGround = 0;

	this.dashesLeft = 1;
	this.maxDashLimit = 1;
	this.dashFrameCounter = 0;
	this.dashCooldownCounter = GROUNDED_DASH_COOLDOWN;

	this.isGrounded = true;
	this.hasResetJumpAnim = false;
	this.variableJumpCounter = 0;

	this.currentIndex;

	this.triggerArray = [];
	this.insideTrigger = false;

	this.dashTrail = [];

	this.deathAnimationStarted = false;
	this.deathTimer = 0;

	this.collectibleObtained = false;
	this.startCollectibleTimer = false;
	this.collectibleIncrementTimer = 0;

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

				if (this.collectibleObtained && levelGrid[index] == LEVEL_COLLECTIBLE) {
					levelGrid[index] = 0;
				}

			}
		}

		this.startCollectibleTimer = false;
		this.collectibleIncrementTimer = 0;

	}

	this.move = function() {
		var jumpJustPressed = (keyHeld_Jump_Prev == false && keyHeld_Jump);
		var jumpJustReleased = (keyHeld_Jump_Prev && keyHeld_Jump == false);
		keyHeld_Jump_Prev = keyHeld_Jump;


		if (this.deathAnimationStarted) {
			if (this.deathTimer < MAX_DEATH_TIME) {
				this.deathTimer++;
				return;
			} else {
				this.deathAnimationStarted = false;
				this.deathTimer = 0;
				this.playerDiedSoResetLevel();
			}
			
		}

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

		if (jumpJustPressed && this.framesSinceLeftGround < MAX_FRAMES_SINCE_LEFT_GROUND_TO_JUMP) {
			playerJumpLeftAnim.reset();
			playerJumpRightAnim.reset();
			this.velY = -PLAYER_JUMP_SPEED;

		} else if (keyHeld_Jump && this.variableJumpCounter <= VARIABLE_JUMP_WINDOW) {
			this.velY = -PLAYER_JUMP_SPEED;
		}

		// stops the player from jumping twice in the air if they double tap the button
		if (jumpJustReleased) {
			this.variableJumpCounter = VARIABLE_JUMP_WINDOW + 1;
		}

		// if we are holding jump, we are affected by a different gravity on the upwards part of the jump
		if (this.velY > 2) {
			this.velY += FALLING_GRAVITY;

		} else {
			this.velY += GRAVITY;			
		}

		if ( this.velY > MAX_Y_VELOCITY) {
			this.velY = MAX_Y_VELOCITY;
		}

		this.velX *= PLAYER_VEL_X_DECAY;

		this.dashHandling();

		if (this.velX <= 0 && this.currentMoveState != PLAYER_STATE_DASHING) {
			this.direction = DIRECTION_LEFT;

		} else if (this.velX > 0 && this.currentMoveState != PLAYER_STATE_DASHING) {
			this.direction = DIRECTION_RIGHT;
		}

		// adds previous position for the dash trail
		if (this.currentMoveState == PLAYER_STATE_DASHING) {
			this.dashTrail.push({x: this.x - PLAYER_WIDTH /2, y: this.y - PLAYER_HEIGHT / 2});

		} else {
			this.dashTrail = [];

			// set these values to false when not dashing
			// this stops the player from accidentally dashing when holding down the arrows
			// requires the player to lift up the key for every dash
			keyHeld_DashLeft = false;
			keyHeld_DashRight = false;
			keyHeld_DashUp = false;
		}

		this.x += this.velX;
		this.y += this.velY;

		this.currentIndex = this.getCurrentPlayerIndex();

		if (this.isGrounded && this.currentMoveState != PLAYER_STATE_DASHING) {
			this.variableJumpCounter = 0;
			this.framesSinceLeftGround = 0;
			this.dashesLeft = this.maxDashLimit;
			this.dashCooldownCounter++;

		} else {
			this.framesSinceLeftGround++;
			this.variableJumpCounter++;
		}

		if (this.currentMoveState != PLAYER_STATE_DASHING) {
			if (this.isGrounded == false && this.velY < 0) {
				
				this.currentMoveState = PLAYER_STATE_JUMPING;

			} else if (	this.isGrounded == false && this.velY > 2) {

				this.currentMoveState = PLAYER_STATE_FALLING;

			} else if (this.isGrounded && Math.abs(this.velX) > .25) {

				this.currentMoveState = PLAYER_STATE_RUNNING;

			} else {
				this.currentMoveState = PLAYER_STATE_IDLE;
			}
		}

		this.wallCollisionChecks();
		this.checkForTriggersAndAddToArray();

		if (this.triggerArray.length > 0) {
			this.insideTriggerCheck();
		}

		if (this.startCollectibleTimer) {
			this.updateCollectibleTimer();
		}
	}

	this.dashHandling = function() {
		if (keyHeld_DashRight &&
			this.dashesLeft >= this.maxDashLimit &&
			this.currentMoveState != PLAYER_STATE_DASHING) {

			if (this.isGrounded && this.dashCooldownCounter < GROUNDED_DASH_COOLDOWN) {
				// nothing should happen, as we are still waiting for cooldown
			} else {
				this.dashFrameCounter = 0;
				this.dashCooldownCounter = 0;
				this.currentMoveState = PLAYER_STATE_DASHING;
				this.direction = DIRECTION_RIGHT;
				this.dashesLeft--;


				if (this.isGrounded == false) {
					this.dashCooldownCounter = GROUNDED_DASH_COOLDOWN;
				}
			}
		}

		if (keyHeld_DashLeft &&
			this.dashesLeft >= this.maxDashLimit &&
			this.currentMoveState != PLAYER_STATE_DASHING) {

			if (this.isGrounded && this.dashCooldownCounter < GROUNDED_DASH_COOLDOWN) {
				// nothing should happen, as we are still waiting for cooldown
			} else {
				this.dashFrameCounter = 0;
				this.dashCooldownCounter = 0;
				this.currentMoveState = PLAYER_STATE_DASHING;
				this.direction = DIRECTION_LEFT;
				this.dashesLeft--;

				if (this.isGrounded == false) {
					this.dashCooldownCounter = GROUNDED_DASH_COOLDOWN;
				}
			}			
		}

		if (keyHeld_DashUp &&
			this.dashesLeft >= this.maxDashLimit &&
			this.currentMoveState != PLAYER_STATE_DASHING) {

			if (this.isGrounded && this.dashCooldownCounter < GROUNDED_DASH_COOLDOWN) {
				// nothing should happen, as we are still waiting for cooldown
			} else {
				this.dashFrameCounter = 0;
				this.dashCooldownCounter = 0;
				this.currentMoveState = PLAYER_STATE_DASHING;
				this.direction = DIRECTION_UP;
				this.dashesLeft--;

				if (this.isGrounded == false) {
					this.dashCooldownCounter = GROUNDED_DASH_COOLDOWN;
				}
			}			
		}

		if (this.currentMoveState == PLAYER_STATE_DASHING) {

			if (this.dashFrameCounter < MAX_DASH_FRAMES) {
				this.dashFrameCounter++;
				if (this.direction == DIRECTION_RIGHT) {
					this.velX = 10;
					this.velY = 0;
				} else if (this.direction == DIRECTION_LEFT) {
					this.velX = -10;
					this.velY = 0;
				} else if (this.direction == DIRECTION_UP) {
					this.velX = 0;
					this.velY = -8;
				}
				
			} else {
				// this NEEDS to be set to a diff state or we'll never leave dashing state
				// this gets overwritten down at the end of move()
				this.currentMoveState = undefined;
			}
		}
	}

	this.wallCollisionChecks = function() {
		
		this.recalculateCollisionEdges();

		if (this.isGrounded == false && ( this.topEdge < 0 || isObstacleAtPixel(this.x, this.topEdge, TOP_EDGE) ) ) {
			var topEdgeRow = Math.floor(this.topEdge / TILE_HEIGHT);
			if (topEdgeRow == LEVEL_ROWS) {
				topEdgeRow = LEVEL_ROWS - 1;
			}
			this.velY = 0;
			this.y = (topEdgeRow * TILE_HEIGHT) + TILE_HEIGHT + PLAYER_HEIGHT / 2 - PLAYER_HITBOX_INNER_Y_OFFSET;
			this.recalculateCollisionEdges();
			
		}

		if (this.bottomEdge > CANVAS_HEIGHT || isObstacleAtPixel(this.x, this.bottomEdge, BOTTOM_EDGE) ) {
			var bottomEdgeRow = Math.floor(this.bottomEdge / TILE_HEIGHT);
			if (bottomEdgeRow == LEVEL_ROWS) {
				bottomEdgeRow = LEVEL_ROWS - 1;
			}
			this.velY = 0;
			this.y = (bottomEdgeRow * TILE_HEIGHT) - (PLAYER_HEIGHT / 2) + PLAYER_HITBOX_INNER_Y_OFFSET;
			this.recalculateCollisionEdges();
			this.isGrounded = true;

		} else if (isObstacleAtPixel(this.x, this.bottomEdge + 2, BOTTOM_EDGE) == false && this.currentMoveState != PLAYER_STATE_DASHING)  {
			this.isGrounded = false;
		}

		// if moving left, we will check the left edge first and vice versa
		// this is important, when we dash towards the right into a wall
		if (this.direction != DIRECTION_RIGHT) {
			if (this.leftEdge < 0 || isObstacleAtPixel(this.leftEdge, this.y, LEFT_EDGE)) {
				var leftEdgeCol = Math.floor(this.leftEdge / TILE_WIDTH);
				if (leftEdgeCol == LEVEL_COLS) {
					leftEdgeCol = LEVEL_COLS - 1;
				}
				this.velX = 0
				this.x = (leftEdgeCol * TILE_WIDTH) + PLAYER_WIDTH + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_INNER_X_OFFSET + 2;
				this.recalculateCollisionEdges();
				
			}

			if (this.rightEdge > CANVAS_WIDTH || isObstacleAtPixel(this.rightEdge, this.y, RIGHT_EDGE) ) {
				var rightEdgeCol = Math.floor(this.rightEdge / TILE_WIDTH);
				if (rightEdgeCol == LEVEL_COLS) {
					rightEdgeCol = LEVEL_COLS - 1;
				}
				this.velX = 0;
				this.x = (rightEdgeCol * TILE_WIDTH) - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_INNER_X_OFFSET - 2;
				this.recalculateCollisionEdges();
				
			}
		} else {
			if (this.rightEdge > CANVAS_WIDTH || isObstacleAtPixel(this.rightEdge, this.y, RIGHT_EDGE) ) {
				var rightEdgeCol = Math.floor(this.rightEdge / TILE_WIDTH);
				if (rightEdgeCol == LEVEL_COLS) {
					rightEdgeCol = LEVEL_COLS - 1;
				}
				this.velX = 0;
				if (this.currentMoveState == PLAYER_STATE_DASHING) {
					this.x = (rightEdgeCol * TILE_WIDTH) - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_INNER_X_OFFSET - 	2;
				} else {
					this.x = (rightEdgeCol * TILE_WIDTH) - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_INNER_X_OFFSET;
				}
				
				this.recalculateCollisionEdges();
				
			}

			if (this.leftEdge < 0 || isObstacleAtPixel(this.leftEdge, this.y, LEFT_EDGE)) {
				var leftEdgeCol = Math.floor(this.leftEdge / TILE_WIDTH);
				if (leftEdgeCol == LEVEL_COLS) {
					leftEdgeCol = LEVEL_COLS - 1;
				}
				this.velX = 0
				this.x = (leftEdgeCol * TILE_WIDTH) + PLAYER_WIDTH + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_INNER_X_OFFSET + 2;
				this.recalculateCollisionEdges();
				
			}
		}		

	}

	this.checkForTriggersAndAddToArray = function() {	
		isTriggerAtPixel(this.x, this.topEdge, TOP_EDGE);
		isTriggerAtPixel(this.x, this.bottomEdge, BOTTOM_EDGE);
		isTriggerAtPixel(this.leftEdge, this.y, LEFT_EDGE);
		isTriggerAtPixel(this.rightEdge, this.y, RIGHT_EDGE);
	}

	this.recalculateCollisionEdges = function() {
		this.topEdge = this.y  - PLAYER_HEIGHT / 2 + PLAYER_HITBOX_INNER_X_OFFSET;
		this.bottomEdge = this.y + PLAYER_HEIGHT / 2 - PLAYER_HITBOX_INNER_X_OFFSET;
		this.leftEdge = this.x - PLAYER_WIDTH / 2 + PLAYER_HITBOX_INNER_X_OFFSET;
		this.rightEdge = this.x+ PLAYER_WIDTH / 2 - PLAYER_HITBOX_INNER_X_OFFSET;
	}

	this.playerDiedSoResetLevel = function() {
		loadLevel(currentLevel);
		this.reset();
		totalDeaths++;
	}

	// NEED TO SET INSIDE TRIGGER TO FALSE TO AVOID MULTIPLE TRIGGER CALLS
	this.insideTriggerCheck = function() {

		for (var i = 0; i < this.triggerArray.length; i++) {

			if (this.triggerArray[i].type == LEVEL_SPIKE_N) {
				var triggerLeftX = this.triggerArray[i].x - TILE_WIDTH / 2;
				var triggerTopY = this.triggerArray[i].y - TILE_HEIGHT / 2;

				// these offsets are for collisions, normally, this.x/y refers to player's center
				var playerYOffset = 7;

				playerXArray = [this.leftEdge + PLAYER_HITBOX_INNER_X_OFFSET,
								this.rightEdge - PLAYER_HITBOX_INNER_X_OFFSET,
								this.x]
				var playerYInsideTrigger = this.y + playerYOffset - triggerTopY;

				for (var j = 0; j < playerXArray.length; j++) {
					var playerXInsideTrigger = playerXArray[j] - triggerLeftX;

					if (playerXInsideTrigger < 8) {
						if ((playerXInsideTrigger * 2) + playerYInsideTrigger > 16 && playerXInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					} else {
						playerXInsideTrigger -= TILE_WIDTH / 2;
						if (playerXInsideTrigger * 2 < playerYInsideTrigger && playerXInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					}
				}
				
			}

			if (this.triggerArray[i].type == LEVEL_SPIKE_S) {
				var triggerLeftX = this.triggerArray[i].x - TILE_WIDTH / 2;
				var triggerTopY = this.triggerArray[i].y - TILE_HEIGHT / 2;

				// these offsets are for collisions, normally, this.x/y refers to player's center
				var playerYOffset = 6;

				playerXArray = [this.leftEdge + PLAYER_HITBOX_INNER_X_OFFSET + 2,
								this.rightEdge - PLAYER_HITBOX_INNER_X_OFFSET - 2,
								this.x]
				var playerYInsideTrigger = this.y - playerYOffset - triggerTopY;

				for (var j = 0; j < playerXArray.length; j++) {
					var playerXInsideTrigger = playerXArray[j] - triggerLeftX;

					if (playerXInsideTrigger < 8) {
						// adds offset for left-side cases on the right hitbox
						if (playerXInsideTrigger * 2 > playerYInsideTrigger && playerXInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					} else {
						playerXInsideTrigger -= TILE_WIDTH / 2;
						if ((playerXInsideTrigger * 2) + playerYInsideTrigger < 16 && playerXInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					}
				}
				
			}

			if (this.triggerArray[i].type == LEVEL_SPIKE_W) {
				var triggerLeftX = this.triggerArray[i].x - TILE_WIDTH / 2;
				var triggerTopY = this.triggerArray[i].y - TILE_HEIGHT / 2;

				// these offsets are for collisions, normally, this.x/y refers to player's center
				var playerXOffset = 5;

				playerYArray = [this.topEdge + PLAYER_HITBOX_INNER_Y_OFFSET + 2,
								this.bottomEdge - PLAYER_HITBOX_INNER_Y_OFFSET - 2,
								this.y]
				var playerXInsideTrigger = this.x + playerXOffset - triggerLeftX;

				for (var j = 0; j < playerYArray.length; j++) {
					var playerYInsideTrigger = playerYArray[j] - triggerTopY;

					if (playerYInsideTrigger < 8) {
						if (j == 1) {
							playerYInsideTrigger -= 2;
						}
						if ((playerYInsideTrigger * 2) + playerXInsideTrigger > 16 && playerYInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					} else {
						playerYInsideTrigger -= TILE_HEIGHT / 2;
						if (playerYInsideTrigger * 2 < playerXInsideTrigger && playerYInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					}
				}
			}

			if (this.triggerArray[i].type == LEVEL_SPIKE_E) {
				var triggerLeftX = this.triggerArray[i].x - TILE_WIDTH / 2;
				var triggerTopY = this.triggerArray[i].y - TILE_HEIGHT / 2;

				// these offsets are for collisions, normally, this.x/y refers to player's center
				var playerXOffset = 3;

				playerYArray = [this.topEdge + PLAYER_HITBOX_INNER_Y_OFFSET + 2,
								this.bottomEdge - PLAYER_HITBOX_INNER_Y_OFFSET - 2,
								this.y]

				var playerXInsideTrigger = this.x - playerXOffset - triggerLeftX;

				for (var j = 0; j < playerYArray.length; j++) {
					var playerYInsideTrigger = playerYArray[j] - triggerTopY;

					if (playerYInsideTrigger < 8) {
						if (j == 1) {
							playerYInsideTrigger -= 2;
						}
						if (playerYInsideTrigger * 2 > playerXInsideTrigger && playerYInsideTrigger > 0) {
							this.deathAnimationStarted = true;
							return;
						}
					} else {
						playerYInsideTrigger -= TILE_WIDTH / 2;
						// we say < 16 because that stops the bottom edge from being checked
						if ((playerYInsideTrigger * 2) + playerXInsideTrigger < 16 && playerYInsideTrigger > 0 && playerYInsideTrigger < 16) {
							this.deathAnimationStarted = true;
							return;
						}
					}
				}
				
			}

			if (this.triggerArray[i].type == LEVEL_ENTER_PORTAL_1) {
				for (var j = 0; j < allTriggersArray.length; j++) {
					if (allTriggersArray[j].type == LEVEL_EXIT_PORTAL_1) {
						this.x = allTriggersArray[j].centeredX;
						this.y = allTriggersArray[j].centeredY;
						this.velX *= -1; // reverses the direction we went into the portal
						this.collectibleObtained = true;
					}
				}
			}

			if (this.triggerArray[i].type == LEVEL_COLLECTIBLE) {
				levelGrid[this.triggerArray[i].index] = 0;
				this.startCollectibleTimer = true;
			}

			if (this.triggerArray[i].type == LEVEL_END) {
				currentLevel++;
				if (this.collectibleObtained || this.startCollectibleTimer) {
					totalCollectibles++;
					this.collectibleObtained = false;
				}
				loadLevel(currentLevel);
				break;
			}

			if (this.triggerArray[i].type == LEVEL_DASH_POWERUP) {
				if (this.dashesLeft < this.maxDashLimit) {
					this.dashesLeft++;
				}
				this.dashCooldownCounter = GROUNDED_DASH_COOLDOWN;
				levelGrid[this.triggerArray[i].index] = 0;

				for (var j = 0; j < allTriggersArray.length; j++) {
					if (allTriggersArray[j].index == this.triggerArray[i].index) {
						allTriggersArray[j].powerupCooldownStarted = true;
					}
				}
			}
		}

		this.triggerArray = [];


	}

	this.updateCollectibleTimer = function() {
		if (this.collectibleIncrementTimer < COLLECTIBLE_MAX_TIME_TO_HOLD) {
			this.collectibleIncrementTimer++;
		} else {
			this.collectibleObtained = true;
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

	this.drawDashTrail = function() {
		var opacityChange = 0.2;

		if (this.dashTrail.length > 2) {
			this.dashTrail.shift();
		}

		if (this.currentMoveState == PLAYER_STATE_DASHING && this.direction == DIRECTION_LEFT) {
			for (var i = 0; i < this.dashTrail.length; i++) {
				canvasContext.globalAlpha = i * opacityChange + 0.2;
				canvasContext.drawImage(playerDashLeftImg, this.dashTrail[i].x, this.dashTrail[i].y);
				canvasContext.globalAlpha = 1.0;
			}
			
		} else if (this.currentMoveState == PLAYER_STATE_DASHING && this.direction == DIRECTION_RIGHT) {
			
			for (var i = 0; i < this.dashTrail.length; i++) {
				canvasContext.globalAlpha = i * opacityChange + 0.2;
				canvasContext.drawImage(playerDashRightImg, this.dashTrail[i].x, this.dashTrail[i].y);
				canvasContext.globalAlpha = 1.0;
			}
		}  else if (this.currentMoveState == PLAYER_STATE_DASHING && this.direction == DIRECTION_UP) {
			
			for (var i = 0; i < this.dashTrail.length; i++) {
				canvasContext.globalAlpha = i * opacityChange + 0.2;
				canvasContext.drawImage(playerDashUpImg, this.dashTrail[i].x, this.dashTrail[i].y);
				canvasContext.globalAlpha = 1.0;
			}
		}

		
	}

	this.draw = function() {

		if (this.deathAnimationStarted) {
			if (this.direction == DIRECTION_LEFT) {
				playerDeathLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				playerDeathLeftAnim.update();
			} else {
				playerDeathRightAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				playerDeathRightAnim.update();
			}

		} else {
			if (this.direction == DIRECTION_LEFT) {
				if (this.currentMoveState == PLAYER_STATE_IDLE) {
					playerIdleLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_RUNNING) {
					playerRunLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y + 2 - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_JUMPING) {
					playerJumpLeftAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_DASHING) {
					canvasContext.drawImage(playerDashLeftImg, this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_FALLING) {
					canvasContext.drawImage(playerFallingImg, this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else {
					console.log('no animation available for this playerState! add it to player.draw()!');
				}

			} else if (this.direction == DIRECTION_RIGHT){
				if (this.currentMoveState == PLAYER_STATE_IDLE) {
					playerIdleRightAnim.render(this.x - PLAYER_WIDTH / 2 - 2, this.y - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_RUNNING) {
					playerRunRightAnim.render(this.x - PLAYER_WIDTH / 2, this.y + 2 - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_JUMPING) {
					playerJumpRightAnim.render(this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_DASHING) {
					canvasContext.drawImage(playerDashRightImg, this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else if (this.currentMoveState == PLAYER_STATE_FALLING) {
					canvasContext.drawImage(playerFallingImg, this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
				} else {
					console.log('no animation available for this playerState! add it to player.draw()!');
				}
			} else if (this.direction == DIRECTION_UP) {
				canvasContext.drawImage(playerDashUpImg, this.x - PLAYER_WIDTH / 2, this.y - PLAYER_HEIGHT / 2);
			}

			this.drawDashTrail();
			
		}
	}
}
