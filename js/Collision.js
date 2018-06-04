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

		//hitboxArray.push(startY);
		hitboxArray.push(y);
		//hitboxArray.push(endY);
	}

	for (var i = 0; i < obstacleTileArray.length; i++) {
		for (var j = 0; j < hitboxArray.length; j++) {
			if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
				if (returnTileTypeAtPixel(hitboxArray[j], y) == obstacleTileArray[i]) {
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

	if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
		var startX = x - (PLAYER_WIDTH / 2) + PLAYER_HITBOX_X_OFFSET;
		var endX = x + (PLAYER_WIDTH / 2) - PLAYER_HITBOX_X_OFFSET;

		hitboxArray.push(startX);
		hitboxArray.push(x);
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

					player.triggerIndex = triggerIndex;
					player.triggerType = triggerType;
					player.triggerX = triggerCoord.x;
					player.triggerY = triggerCoord.y;

					return true;
				}
			}
			if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
				if (returnTileTypeAtPixel(x, hitboxArray[j]) == triggerTileArray[i]) {
					var triggerType = triggerTileArray[i];
					var triggerIndex = returnIndexAtPixel(x, hitboxArray[j]);
					var triggerCoord = indexToCenteredXY(triggerIndex);

					player.triggerIndex = triggerIndex;
					player.triggerType = triggerType;
					player.triggerX = triggerCoord.x;
					player.triggerY = triggerCoord.y;

					return true;
				}
			}
		}
	}

	return false;
}