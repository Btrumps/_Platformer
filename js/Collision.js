var showHitbox = false;

function isObstacleAtPixel(x, y, whichEdge) {
	var hitboxArray = [];

	if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
		var startX = x - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_X_OFFSET;
		var endX = x + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_X_OFFSET;

		//hitboxArray.push(startX);
		hitboxArray.push(x);
		//hitboxArray.push(endX);

	} else if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
		var startY = y - (PLAYER_HEIGHT / 2) + PLAYER_HITBOX_Y_OFFSET;
		var endY = y + (PLAYER_HEIGHT / 2) - PLAYER_HITBOX_Y_OFFSET;

		hitboxArray.push(startY);
		hitboxArray.push(y);
		hitboxArray.push(endY);
	}

	for (var i = 0; i < obstacleTileArray.length; i++) {
		for (var j = 0; j < hitboxArray.length; j++) {
			if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
				if (returnTileTypeAtPixel(hitboxArray[j], y) == obstacleTileArray[i]) {
					
					if (obstacleTileArray[i] == LEVEL_PLATFORM_FALLING &&
					    whichEdge == BOTTOM_EDGE) {
						for (var k = 0; k < allTriggersArray.length; k++) {
							if (allTriggersArray[k].type == LEVEL_PLATFORM_FALLING &&
								allTriggersArray[k].startRespawnTimer == false) {
								
								if (allTriggersArray[k].index == returnIndexAtPixel(hitboxArray[j], y)) { 
									allTriggersArray[k].fallTimerStarted = true;
								}

							}
						}
					}

					// added to prevent pushing the player up or down...
					// ...if their top or bottom colliders touched a wall they are clearly not supposed to
					if ((whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) &&
						(obstacleTileArray[i] == LEVEL_PLATFORM_E ||
						 obstacleTileArray[i] == LEVEL_PLATFORM_W)) {
						console.log('top or bottom edge collided with east/west wall');
						return false;
					}

					return true;
				}
			}
			if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
				if (returnTileTypeAtPixel(x, hitboxArray[j]) == obstacleTileArray[i]) {
					return true;
				}
			}
		}
	}

	return false;
}

function isTriggerAtPixel(x, y, whichEdge) {
	var hitboxArray = [];

	player.recalculateCollisionEdges();

	if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
		var startX = x - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_X_OFFSET;
		var endX = x + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_X_OFFSET;

		hitboxArray.push(x);
		hitboxArray.push(startX);
		hitboxArray.push(endX);

	} else if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
		var startY = y - (PLAYER_HEIGHT / 2) + PLAYER_HITBOX_Y_OFFSET;
		var endY = y + (PLAYER_HEIGHT / 2) - PLAYER_HITBOX_Y_OFFSET;

		hitboxArray.push(startY);
		hitboxArray.push(y);
		hitboxArray.push(endY);
	}

	for (var i = 0; i < triggerTileArray.length; i++) {
		for (var j = 0; j < hitboxArray.length; j++) {
			if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {

				if (returnTileTypeAtPixel(hitboxArray[j], y) == triggerTileArray[i]) {
					var triggerType = triggerTileArray[i];
					var triggerIndex = returnIndexAtPixel(hitboxArray[j], y);
					var triggerCoord = indexToCenteredXY(triggerIndex);

					var foundTriggerAlready = false;
					for (var i = 0; i < player.triggerArray.length; i++) {
						if (player.triggerArray[i].index == triggerIndex) {
							foundTriggerAlready = true;
						}
					}

					if (player.triggerArray.length == 0 || foundTriggerAlready == false) {
						player.triggerArray.push({index : triggerIndex, type: triggerType, x: triggerCoord.x, y: triggerCoord.y});
					}

					return;
				}
			}
			if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
				if (returnTileTypeAtPixel(x, hitboxArray[j]) == triggerTileArray[i]) {
					var triggerType = triggerTileArray[i];
					var triggerIndex = returnIndexAtPixel(x, hitboxArray[j]);
					var triggerCoord = indexToCenteredXY(triggerIndex);

					var foundTriggerAlready = false;
					for (var i = 0; i < player.triggerArray.length; i++) {
						if (player.triggerArray[i].index == triggerIndex) {
							foundTriggerAlready = true;
						}
					}
					
					if (player.triggerArray.length == 0 || foundTriggerAlready == false) {
						player.triggerArray.push({index : triggerIndex, type: triggerType, x: triggerCoord.x, y: triggerCoord.y});
					}

					return;
				}
			}
		}
	}
}

function isProjectileKillingPlayer(x, y) {

	// player.recalculateCollisionEdges();

	var playerLeft = x - (PLAYER_WIDTH / 2) + 2 ;
	var playerRight = x + (PLAYER_WIDTH / 2) - 2;

	var playerTop = y - (PLAYER_HEIGHT / 2) + 5;
	var playerBottom = y + (PLAYER_HEIGHT / 2) - 5;
	
	for (var i = 0; i < projectileArray.length; i++) {

		var projectileLeft = projectileArray[i].x - PROJECTILE_WIDTH / 2;
		var projectileRight = projectileArray[i].x + PROJECTILE_WIDTH / 2;
		var projectileTop = projectileArray[i].y - PROJECTILE_HEIGHT / 2;
		var projectileBottom = projectileArray[i].y + PROJECTILE_HEIGHT / 2;

		if ((projectileRight < playerLeft ||	// is projectileRight left of playerLeft
			 projectileLeft > playerRight ||	// is projectileLeft right of playerRight
			 projectileBottom < playerTop ||		// is projectileBottom above playerTop
			 projectileTop > playerBottom) == false) {	// is projectileTop below playerBottom
			
			return true;
		}

	}
		return false;
}

function checkBossCollisionsWithPlayer() {
	player.recalculateCollisionEdges();
	boss.recalculateCollisionEdges();

	// triggers when the player is above the boss
	if ( ( (player.leftEdge > boss.leftEdge &&
	    	player.leftEdge < boss.rightEdge) ||
		   (player.rightEdge > boss.rightEdge &&
	    	player.rightEdge < boss.leftEdge) ) &&
	    	boss.bottomEdge > player.topEdge &&
	    	boss.topEdge < player.topEdge) {
		player.deathAnimationStarted = true;
	}

	// triggers when the player is above the boss
	if ( ( (player.leftEdge > boss.leftEdge &&
	    	player.leftEdge < boss.rightEdge) ||
		   (player.rightEdge > boss.rightEdge &&
	    	player.rightEdge < boss.leftEdge) ) &&
	    	boss.topEdge < player.bottomEdge &&
	    	boss.bottomEdge > player.bottomEdge) {

		player.deathAnimationStarted = true;
		
	}
}