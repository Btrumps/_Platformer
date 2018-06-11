const MAX_FALLING_SPIKE_TRIGGER_RANGE = 125;
const FALL_SPEED = 4;

const POWERUP_COOLDOWN_MAX = 60; // 2 sec
const FORGIVENESS_PIXELS = 8;

var allTriggersArray = [];

function triggerClass(col, row, index, whichType) {

	this.x = col * TILE_WIDTH;
	this.y = row * TILE_HEIGHT;

	this.centeredX = this.x + TILE_WIDTH / 2;
	this.centeredY = this.y + TILE_WIDTH / 2;

	this.col = col;
	this.row = row;
	this.index = index;
	this.type = whichType;

	this.powerupCooldown = 0;
	this.powerupCooldownStarted = false;

	this.fallTrigger = false;
	this.collider = true;

	this.move = function() {
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

			// turns off the death collider after it passes the player
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
							player.killPlayer();
							console.log(playerXInsideTrigger + ',' + playerYInsideTrigger + 'left');
							return;
						}
					} else {
						playerXInsideTrigger -= TILE_WIDTH / 2;
						if ((playerXInsideTrigger * 2) + playerYInsideTrigger < 16 && playerXInsideTrigger > 0) {
							player.killPlayer();
							console.log(playerXInsideTrigger + ',' + playerYInsideTrigger + 'right');
							return;
						}
					}
				}
			}
		}

		if (this.y > canvas.height) {
			this.fallTrigger = false;
			this.collider = false;
		}

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

	this.draw = function() {
		if (this.fallTrigger) {
			if (whichType == LEVEL_SPIKE_S_FALLING) {
				canvasContext.drawImage(levelPics[LEVEL_SPIKE_S_FALLING], this.x, this.y);
			}
		}
	}

	this.distFrom = function(otherX, otherY) {
		deltaX = otherX - this.centeredX;
		deltaY = otherY - this.centeredY;

		return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
	}

}