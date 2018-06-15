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
					
					if ((obstacleTileArray[i] == LEVEL_FALLING_PLATFORM_W ||
					    obstacleTileArray[i] == LEVEL_FALLING_PLATFORM_E) &&
					    whichEdge == BOTTOM_EDGE) {
						for (var k = 0; k < allTriggersArray.length; k++) {
							if (allTriggersArray[k].type == LEVEL_FALLING_PLATFORM_W ||
							    allTriggersArray[k].type == LEVEL_FALLING_PLATFORM_E) {
								
								if (allTriggersArray[k].index == returnIndexAtPixel(hitboxArray[j], y)) { 
									allTriggersArray[k].fallTimerStarted = true;

									for (var j = k - 1; j <= k + 1; j++) {
										if (j < allTriggersArray.length) {
											if (allTriggersArray[j].type == LEVEL_FALLING_PLATFORM_W ||
											    allTriggersArray[j].type == LEVEL_FALLING_PLATFORM_E) {
												allTriggersArray[j].fallTimerStarted = true;
											}
										}
									}
								}

							}
						}
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

	player.recalculateCollisionEdges();

	// these small values push the hitbox in on the player
	var startX = x - (PLAYER_WIDTH / 2) + 1;
	var endX = x + (PLAYER_WIDTH / 2) - 1;

	var startY = y - (PLAYER_HEIGHT / 2) + 2;
	var endY = y + (PLAYER_HEIGHT / 2) - 2;
	
	for (var i = 0; i < projectileArray.length; i++) {

		if (projectileArray[i].x > startX &&
			projectileArray[i].x < endX &&
			projectileArray[i].y > startY &&
			projectileArray[i].y < endY) {
			
			return true;
		}

	}
		return false;
}