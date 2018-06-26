const MAX_FALLING_SPIKE_TRIGGER_RANGE = 125;
const FALLING_SPIKE_TRIGGER_OFFSET = 2;
const FALL_SPEED = 5;

const SQUARE_SPIKE_SPEED = 3;

const STARTING_FOLLOW_DRONE_SPEED = 2;

const COLLECTIBLE_SPEED = 0.1;
const COLLECTIBLE_MAX_DIST_FROM_PLAYER = 25;

const POWERUP_COOLDOWN_MAX = 60; // 2 sec
const FORGIVENESS_PIXELS = 8;

const DELAY_BEFORE_FIRST_SHOT_W = 30;
const DELAY_BEFORE_FIRST_SHOT_E = 0;
const DELAY_BEFORE_FIRST_SHOT_N = 30;
const DELAY_BEFORE_FIRST_SHOT_S = 0;

const PROJECTILE_INTERVAL = 60;

const PLATFORM_FALL_MAX = 30;
const PLATFORM_RESPAWN_MAX = 60;

var allTriggersArray = [];
var projectileArray = [];

var okayToUpdateShooterAnim_W = false;
var okayToUpdateShooterAnim_E = false;
var okayToUpdateShooterAnim_N = false;
var okayToUpdateShooterAnim_S = false;

function triggerClass(col, row, index, whichType) {

	this.x = col * TILE_WIDTH;
	this.y = row * TILE_HEIGHT;

	this.centeredX = this.x + TILE_WIDTH / 2;
	this.centeredY = this.y + TILE_WIDTH / 2;

	this.col = col;
	this.row = row;
	this.index = index;
	this.type = whichType;

	// powerups
	this.powerupCooldown = 0;
	this.powerupCooldownStarted = false;

	// collectibles
	this.collectiblePickedUp = false;

	// falling spikes
	this.fallTrigger = false;
	this.collider = true;
	this.hitPlayer = false;

	// spike trigger
	this.spikeTriggered = false;

	// follow drone
	this.followSpeed = STARTING_FOLLOW_DRONE_SPEED;

	// square spikes
	this.movingDown = true;
	this.movingRight = true;

	// switch
	this.switchedOn = false;

	// shooting blocks
	this.firstShotFired = false;
	this.delayBeforeFirstShotTimer = 0;
	this.shotTimer = 0;
	this.projectileInterval = PROJECTILE_INTERVAL;

	// falling platforms
	this.fallTimer = 0;
	this.maxTimeTilFall = PLATFORM_FALL_MAX;
	this.fallTimerStarted = false;
	this.startRespawnTimer = false;
	this.respawnTimer = 0;
	this.maxTimeTilRespawn = PLATFORM_RESPAWN_MAX;

	this.move = function() {
		this.fallingSpikeHandling();
		this.powerupHandling();
		this.collectibleHandling();
		this.shooterHandling();
		this.fallingPlatformHandling();
		this.bouncingSquareSpikeHandling();
		this.followDroneHandling();
		this.spikeTriggerHandling();
	}

	this.spikeTriggerHandling = function() {
		if (this.type == LEVEL_SPIKE_TRIGGER && this.spikeTriggered) {
			var deltaX = player.x - this.x - TILE_WIDTH / 2;
			var deltaY = player.y - this.y - TILE_HEIGHT / 2;
			var distanceToPlayer = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

			if (distanceToPlayer > 20) {
				this.type = LEVEL_SQUARE_SPIKE;
				levelGrid[this.index] = LEVEL_SQUARE_SPIKE;
			}
		}
	}

	this.followDroneHandling = function() {
		if (this.type == LEVEL_FOLLOW_DRONE) {
			levelGrid[this.index] = 0;

			var deltaX = player.x - this.x - TILE_WIDTH / 2;
			var deltaY = player.y - this.y - TILE_HEIGHT / 2;
			var distanceToPlayer = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

			if (distanceToPlayer != 0 && player.deathAnimationStarted == false) {
				if (distanceToPlayer > this.followSpeed) {
					this.x += this.followSpeed * deltaX/distanceToPlayer;
					this.y += this.followSpeed * deltaY/distanceToPlayer;
				} else {
					this.x = player.x - TILE_WIDTH / 2;
					this.y = player.y - TILE_HEIGHT / 2;
				}
				
			}

			this.checkCollisionWithPlayerAndKill(2,2);

		}
	}

	this.bouncingSquareSpikeHandling = function() {
		if (this.type == LEVEL_SQUARE_SPIKE_V) {
			levelGrid[this.index] = 0;

			var edgeCheckY;

			if (this.movingDown) {
				this.y += SQUARE_SPIKE_SPEED;
				edgeCheckY = this.y + TILE_HEIGHT; 
			} else {
				this.y -= SQUARE_SPIKE_SPEED;
				edgeCheckY = this.y;
			}

			var edgeCol = Math.floor(this.x / TILE_WIDTH);
			var edgeRow = Math.floor(edgeCheckY / TILE_HEIGHT);
			var edgeIndex = colRowToArrayIndex(edgeCol, edgeRow);

			if (this.movingDown) {
				for (var i = 0; i < bottomTiles.length; i++) {
					if (levelGrid[edgeIndex] == bottomTiles[i]) {
						this.movingDown = false;
					}
				}
			} else if (this.movingDown == false) {
				for (var i = 0; i < topTiles.length; i++) {
					if (levelGrid[edgeIndex] == topTiles[i]) {
						this.movingDown = true;
					}
				}
			}

			if (player.deathAnimationStarted == false) {
				this.checkCollisionWithPlayerAndKill(0,0);
			}

		} else if (this.type == LEVEL_SQUARE_SPIKE_H) {
			levelGrid[this.index] = 0;

			var edgeCheckX;

			if (this.movingRight) {
				this.x += SQUARE_SPIKE_SPEED;
				edgeCheckX = this.x + TILE_WIDTH; 
			} else {
				this.x -= SQUARE_SPIKE_SPEED;
				edgeCheckX = this.x;
			}

			var edgeCol = Math.floor(edgeCheckX / TILE_WIDTH);
			var edgeRow = Math.floor(this.y / TILE_HEIGHT);
			var edgeIndex = colRowToArrayIndex(edgeCol, edgeRow);

			if (this.movingRight) {
				for (var i = 0; i < rightTiles.length; i++) {
					if (levelGrid[edgeIndex] == rightTiles[i]) {
						this.movingRight = false;
					}
				}
			} else if (this.movingRight == false) {
				for (var i = 0; i < leftTiles.length; i++) {
					if (levelGrid[edgeIndex] == leftTiles[i]) {
						this.movingRight = true;
					}
				}
			}

			if (player.deathAnimationStarted == false) {
				this.checkCollisionWithPlayerAndKill(0,0);
			}
			
		}


	}

	this.checkCollisionWithPlayerAndKill = function(forgivenessX, forgivenessY) {
		player.recalculateCollisionEdges();

		if ( ( (player.leftEdge + forgivenessX > this.x &&
	    	player.leftEdge + forgivenessX < this.x + TILE_WIDTH) ||
		   (player.rightEdge - forgivenessX > this.x + TILE_WIDTH &&
	    	player.rightEdge - forgivenessX < this.x) ) &&
	    	this.y +TILE_HEIGHT > player.topEdge + forgivenessY &&
	    	this.y < player.topEdge + forgivenessY) {
			this.hitPlayer = true;
			player.deathAnimationStarted = true;
		}

		if ( ( (player.leftEdge + forgivenessX > this.x &&
		    	player.leftEdge + forgivenessX < this.x + TILE_WIDTH) ||
			   (player.rightEdge - forgivenessX > this.x + TILE_WIDTH &&
		    	player.rightEdge - + forgivenessX < this.x) ) &&
		    	this.y < player.bottomEdge + forgivenessY &&
		    	this.y + TILE_HEIGHT > player.bottomEdge + forgivenessY) {

			this.hitPlayer = true;
			player.deathAnimationStarted = true;
		}

		if (player.x > this.x &&
			player.x < this.x + TILE_WIDTH &&
			player.y > this.y &&
			player.y < this.y +TILE_HEIGHT) {

			this.hitPlayer = true;
			player.deathAnimationStarted = true;
		}
	}

	this.fallingPlatformHandling = function() {
		if (this.type == LEVEL_PLATFORM_FALLING) {

			if (this.startRespawnTimer) {
				if (this.respawnTimer < this.maxTimeTilRespawn) {
					this.respawnTimer++;
				} else {
					this.startRespawnTimer = false;
					this.respawnTimer = 0;
					levelGrid[this.index] = this.type;
				}
			}

			if (this.fallTimerStarted && this.startRespawnTimer == false) {		

				if (this.fallTimer > this.maxTimeTilFall) {
					levelGrid[this.index] = 0;
					this.fallTimerStarted = false;
					this.fallTimer = 0;
					this.startRespawnTimer = true;
				} else if (this.fallTimerStarted && this.fallTimer <= this.maxTimeTilFall) {
					this.fallTimer++;
				}
			}
		}	
	}

	this.shooterHandling = function() {
		if (this.type == LEVEL_SHOOTER_W) {
			if (this.firstShotFired == false) {
				if (this.delayBeforeFirstShotTimer < DELAY_BEFORE_FIRST_SHOT_W) {
					this.delayBeforeFirstShotTimer++;
				} else {
					this.delayBeforeFirstShotTimer = 0;
					this.firstShotFired = true;
				}
			} else {
				if (this.shotTimer > this.projectileInterval) {
					this.shotTimer = 0;
					var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_LEFT);
					projectileArray.push(projectile);
					okayToUpdateShooterAnim_W = false;
					shooterWAnim.reset();
				} else {
					this.shotTimer++;
					okayToUpdateShooterAnim_W = true;
				}
			}
			
		}

		if (this.type == LEVEL_SHOOTER_E) {
			if (this.firstShotFired == false) {
				if (this.delayBeforeFirstShotTimer < DELAY_BEFORE_FIRST_SHOT_E) {
					this.delayBeforeFirstShotTimer++;
				} else {
					this.delayBeforeFirstShotTimer = 0;
					this.firstShotFired = true;
				}
			} else {
				if (this.shotTimer > this.projectileInterval) {
					this.shotTimer = 0;
					var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_RIGHT);
					projectileArray.push(projectile);
					okayToUpdateShooterAnim_E = false;
					shooterEAnim.reset();
				} else {
					this.shotTimer++;
					okayToUpdateShooterAnim_E = true;
				}
			}
		}

		if (this.type == LEVEL_SHOOTER_N) {
			if (this.firstShotFired == false) {
				if (this.delayBeforeFirstShotTimer < DELAY_BEFORE_FIRST_SHOT_N) {
					this.delayBeforeFirstShotTimer++;
				} else {
					this.delayBeforeFirstShotTimer = 0;
					this.firstShotFired = true;
				}
			} else {
				if (this.shotTimer > this.projectileInterval) {
					this.shotTimer = 0;
					var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_UP);
					projectileArray.push(projectile);
					okayToUpdateShooterAnim_N = false;
					shooterNAnim.reset();
				} else {
					this.shotTimer++;
					okayToUpdateShooterAnim_N = true;
				}
			}
			
		}

		if (this.type == LEVEL_SHOOTER_S) {
			if (this.firstShotFired == false) {
				if (this.delayBeforeFirstShotTimer < DELAY_BEFORE_FIRST_SHOT_S) {
					this.delayBeforeFirstShotTimer++;
				} else {
					this.delayBeforeFirstShotTimer = 0;
					this.firstShotFired = true;
				}
			} else {
				if (this.shotTimer > this.projectileInterval) {
					this.shotTimer = 0;
					var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_DOWN);
					projectileArray.push(projectile);
					okayToUpdateShooterAnim_S = false;
					shooterSAnim.reset();
				} else {
					this.shotTimer++;
					okayToUpdateShooterAnim_S = true;
				}
			}
		}
	}

	this.powerupHandling = function() {
		if (this.type == LEVEL_DASH_POWERUP) {
			// this only occurs if the player picks up a powerup. once the timer is up, the powerup respawns
			if (this.powerupCooldownStarted) {
				if (this.powerupCooldown < POWERUP_COOLDOWN_MAX) {
					this.powerupCooldown++;
				} else {
					levelGrid[this.index] = LEVEL_DASH_POWERUP;
					this.powerupCooldownStarted = false;
					this.powerupCooldown = 0;
				}
			}
		}
	}

	this.collectibleHandling = function () {
		if (this.type == LEVEL_COLLECTIBLE && player.startCollectibleTimer && player.deathAnimationStarted == false && player.collectibleObtained == false) {
			var deltaX = player.x - this.centeredX;
			var deltaY = player.y - this.centeredY;
			var distanceFromPlayer = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

			// the farther the collectible is from the player, the faster it will travel
			var speed = COLLECTIBLE_SPEED * distanceFromPlayer;

			var moveX = speed * deltaX/distanceFromPlayer;
			var moveY = speed * deltaY/distanceFromPlayer;

			if (distanceFromPlayer > COLLECTIBLE_MAX_DIST_FROM_PLAYER) {

				this.centeredX += moveX;
				this.centeredY += moveY;

				this.x = this.centeredX - TILE_WIDTH / 2;
				this.y = this.centeredY - TILE_HEIGHT / 2;

			}
		}
	}

	this.fallingSpikeHandling = function() {
		// we don't want the falling spikes to respawn on any other map than the boss fight
		if (this.startRespawnTimer && currentLevel == 11) { 
				if (this.respawnTimer < this.maxTimeTilRespawn) {
					this.respawnTimer++;
				} else {
					this.startRespawnTimer = false;
					this.respawnTimer = 0;
					this.hitPlayer = false;
					levelGrid[this.index] = this.type;
					this.x = this.centeredX - TILE_WIDTH / 2;
					this.y = this.centeredY - TILE_HEIGHT / 2;
				}
			}
		if (this.type == LEVEL_SPIKE_S_FALLING) {
			if (player.x > this.x - FALLING_SPIKE_TRIGGER_OFFSET &&
				player.x < this.x + TILE_WIDTH + FALLING_SPIKE_TRIGGER_OFFSET &&
				player.y > this.centeredY &&
				player.y < this.centeredY + MAX_FALLING_SPIKE_TRIGGER_RANGE) {

				this.fallTrigger = true;
			}
		}


		if (this.fallTrigger) {
			levelGrid[this.index] = 0;
			this.y += FALL_SPEED;

			// turns off the death collider after it passes the player unless it's a boss level
			if (this.y > player.y + PLAYER_HEIGHT / 2 - FORGIVENESS_PIXELS) {
				this.collider = false;

			} else {
				this.collider = true;
			}

			if (this.collider) {
				// these offsets are for collisions, normally, this.x/y refers to player's center
				var playerYOffset = 6;

				playerXArray = [player.leftEdge + PLAYER_HITBOX_INNER_X_OFFSET + 2,
								player.rightEdge - PLAYER_HITBOX_INNER_X_OFFSET - 2,
								player.x]
				var playerYInsideTrigger = player.y - playerYOffset - this.y;

				for (var i = 0; i < playerXArray.length; i++) {
					var playerXInsideTrigger = playerXArray[i] - this.x;

					if (playerXInsideTrigger < 8) {
						// adds offset for left-side cases on the right hitbox
						if (playerXInsideTrigger * 2 > playerYInsideTrigger && playerXInsideTrigger > 0) {
							player.deathAnimationStarted = true;
							this.hitPlayer = true;
							return;
						}
					} else {
						playerXInsideTrigger -= TILE_WIDTH / 2;
						if ((playerXInsideTrigger * 2) + playerYInsideTrigger < 16 && playerXInsideTrigger > 0) {
							player.deathAnimationStarted = true;
							this.hitPlayer = true;
							return;
						}
					}
				}
			}

			if (currentLevel == 11 && this.y < boss.y + BOSS_HEIGHT / 2) {
					this.collider = true;
			}

			if (this.collider && currentLevel == 11 && this.hitPlayer == false) { // boss level
				if (boss.y + BOSS_HEIGHT / 2 < this.y) {
					// do nothing
				} else {
					// these offsets are for collisions, normally, this.x/y refers to player's center
					boss.recalculateCollisionEdges();
					var bossYOffset = BOSS_HEIGHT / 2;
					bossXArray = [	boss.leftEdge,
									boss.rightEdge,
									boss.x]
					var bossYInsideTrigger = boss.y - bossYOffset - this.y;

					for (var i = 0; i < bossXArray.length; i++) {
						var bossXInsideTrigger = bossXArray[i] - this.x;

						if (bossXInsideTrigger < 8) {
							// adds offset for left-side cases on the right hitbox
							if (bossXInsideTrigger * 2 > bossYInsideTrigger) {
								boss.tookDamage = true;
								console.log('boss took damage from left side');
								this.hitPlayer = true;
								return;
							}
						} else {
							bossXInsideTrigger -= TILE_WIDTH / 2;
							if ((bossXInsideTrigger * 2) + bossYInsideTrigger < 16) {
								boss.tookDamage = true;
								console.log('boss took damage from right side');
								this.hitPlayer = true;
								return;
							}
						}
					}
				}
			}
		}

		if (this.y > canvas.height) {
			this.fallTrigger = false;
			this.collider = false;
			this.startRespawnTimer = true;
		}

	}

	this.draw = function() {
		if (this.fallTrigger) {
			if (whichType == LEVEL_SPIKE_S_FALLING && this.hitPlayer == false) {
				canvasContext.drawImage(levelPics[LEVEL_SPIKE_S_FALLING], this.x, this.y);
			}
		}

		if (this.type == LEVEL_COLLECTIBLE && player.startCollectibleTimer && player.collectibleObtained == false) {
			collectibleAnim.render(this.x, this.y);
		}

		if (this.type == LEVEL_COLLECTIBLE && player.collectibleObtained) {
			collectibleObtainedAnim.render(this.x, this.y);
			collectibleObtainedAnim.update();
		}

		if (this.type == LEVEL_SQUARE_SPIKE_V && this.hitPlayer == false) {
			canvasContext.drawImage(levelPics[LEVEL_SQUARE_SPIKE_V], this.x, this.y);
		}

		if (this.type == LEVEL_SQUARE_SPIKE_H && this.hitPlayer == false) {
			canvasContext.drawImage(levelPics[LEVEL_SQUARE_SPIKE_H], this.x, this.y);
		}

		if (this.type == LEVEL_FOLLOW_DRONE) {
			canvasContext.drawImage(followDrone, this.x, this.y);
		}
	}

	this.drawText = function() {
		if ((this.type == LEVEL_PLATFORM_FALLING) &&
		    this.fallTimerStarted &&
		    this.fallTimer < this.maxTimeTilFall) {
			// countdown timer
			colorText(Math.round((this.maxTimeTilFall - this.fallTimer) / 30) + 1, (this.centeredX - 1.5) * PIXEL_SCALE_UP, (this.centeredY + 1.5) * PIXEL_SCALE_UP, 'white', FONT_LEVEL_PLATFORM);
		}
	}
}