const MAX_FALLING_SPIKE_TRIGGER_RANGE = 125;
const FALL_SPEED = 4;
const COLLECTIBLE_SPEED = 0.1;
const COLLECTIBLE_MAX_DIST_FROM_PLAYER = 25;

const POWERUP_COOLDOWN_MAX = 60; // 2 sec
const FORGIVENESS_PIXELS = 8;

const PROJECTILE_INTERVAL = 60;

const PLATFORM_FALL_MAX = 30;
const PLATFORM_RESPAWN_MAX = 60;

var allTriggersArray = [];
var projectileArray = [];

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

	// shooting blocks
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
	}

	this.fallingPlatformHandling = function() {
		if (this.type == LEVEL_FALLING_PLATFORM_W ||
		    this.type == LEVEL_FALLING_PLATFORM_E) {

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
				
				if (this.startRespawnTimer == false && this.fallTimer == 0) {
					var thisIndexInAllTriggers = allTriggersArray.indexOf(this);
					// check for platforms next to it and start their timers as well
					for (var i = thisIndexInAllTriggers - 1; i <= thisIndexInAllTriggers + 1; i++) {
						if (i < allTriggersArray.length) {
							if (allTriggersArray[i].type == LEVEL_FALLING_PLATFORM_W ||
							    allTriggersArray[i].type == LEVEL_FALLING_PLATFORM_E) {
								allTriggersArray[i].fallTimerStarted = true;
							}
						}
					}
				}
				

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
			if (this.shotTimer > this.projectileInterval) {
				this.shotTimer = 0;
				var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_LEFT);
				projectileArray.push(projectile);
			} else {
				this.shotTimer++;
			}
		}

		if (this.type == LEVEL_SHOOTER_E) {
			if (this.shotTimer > this.projectileInterval) {
				this.shotTimer = 0;
				var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_RIGHT);
				projectileArray.push(projectile);
			} else {
				this.shotTimer++;
			}
		}

		if (this.type == LEVEL_SHOOTER_N) {
			if (this.shotTimer > this.projectileInterval) {
				this.shotTimer = 0;
				var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_UP);
				projectileArray.push(projectile);
			} else {
				this.shotTimer++;
			}
		}

		if (this.type == LEVEL_SHOOTER_S) {
			if (this.shotTimer > this.projectileInterval) {
				this.shotTimer = 0;
				var projectile = new projectileClass(this.centeredX, this.centeredY, DIRECTION_DOWN);
				projectileArray.push(projectile);
			} else {
				this.shotTimer++;
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
			if (player.x > this.x &&
				player.x < this.x + TILE_WIDTH &&
				player.y > this.centeredY &&
				player.y < this.centeredY + MAX_FALLING_SPIKE_TRIGGER_RANGE) {

				this.fallTrigger = true;
			}
		}


		if (this.fallTrigger) {
			levelGrid[this.index] = 0;
			this.y += FALL_SPEED;

			// turns off the death collider after it passes the player unless it's a boss level
			if (this.y > player.y + PLAYER_HEIGHT / 2 - FORGIVENESS_PIXELS && currentLevel != 11) {
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

				if (currentLevel == 11 && this.hitPlayer == false) { // boss level
					// these offsets are for collisions, normally, this.x/y refers to player's center
					var bossYOffset = BOSS_HEIGHT / 2;

					bossXArray = [	boss.leftEdge,
									boss.rightEdge,
									boss.x]
					var bossYInsideTrigger = boss.y - bossYOffset - this.y;

					for (var i = 0; i < bossXArray.length; i++) {
						var bossXInsideTrigger = bossXArray[i] - this.x;

						if (bossXInsideTrigger < 8) {
							// adds offset for left-side cases on the right hitbox
							if (bossXInsideTrigger * 2 > bossYInsideTrigger && bossXInsideTrigger > 0) {
								boss.tookDamage = true;
								this.hitPlayer = true;
								return;
							}
						} else {
							bossXInsideTrigger -= TILE_WIDTH / 2;
							if ((bossXInsideTrigger * 2) + bossYInsideTrigger < 16 && bossXInsideTrigger > 0) {
								boss.tookDamage = true;
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
	}

	this.drawText = function() {
		if ((this.type == LEVEL_FALLING_PLATFORM_W ||
		    this.type == LEVEL_FALLING_PLATFORM_E) &&
		    this.fallTimerStarted &&
		    this.fallTimer < this.maxTimeTilFall) {
			// countdown timer
			colorText(Math.round((this.maxTimeTilFall - this.fallTimer) / 30) + 1, (this.centeredX - 1.5) * PIXEL_SCALE_UP, (this.centeredY + 1.5) * PIXEL_SCALE_UP, 'white', FONT_LEVEL_PLATFORM);
		}
	}
}