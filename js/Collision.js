function isObstacleAtPixel(x, y, whichEdge) {
	var rayArray = [];

	if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
		var startX = x - (PLAYER_WIDTH / 2) + PLAYER_RAY_X_OFFSET;
		var endX = x + (PLAYER_WIDTH / 2) - PLAYER_RAY_X_OFFSET;

		rayArray.push(startX);
		//rayArray.push(x);
		rayArray.push(endX);

	} else if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
		var startY = y - (PLAYER_WIDTH / 2) + PLAYER_RAY_Y_OFFSET;
		var endY = y + (PLAYER_WIDTH / 2) + PLAYER_RAY_Y_OFFSET;

		rayArray.push(startY);
		//rayArray.push(y);
		rayArray.push(endY);
	}

	for (var i = 0; i < obstacleTileArray.length; i++) {
		for (var j = 0; j < rayArray.length; j++) {
			if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
				if (returnTileTypeAtPixel(rayArray[j], y) == obstacleTileArray[i]) {
					return true;
				}
			}
			if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
				if (returnTileTypeAtPixel(x, rayArray[j]) == obstacleTileArray[i]) {
					return true;
				}
			}
		}
	}

	return false;
}

function isTriggerAtPixel(x, y, whichEdge) {
	var rayArray = [];

	if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
		var startX = x - (PLAYER_WIDTH / 2) + PLAYER_RAY_X_OFFSET;
		var endX = x + (PLAYER_WIDTH / 2) - PLAYER_RAY_X_OFFSET;

		rayArray.push(startX);
		//rayArray.push(x);
		rayArray.push(endX);

	} else if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
		var startY = y - (PLAYER_WIDTH / 2) + PLAYER_RAY_Y_OFFSET;
		var endY = y + (PLAYER_WIDTH / 2) + PLAYER_RAY_Y_OFFSET;

		rayArray.push(startY);
		//rayArray.push(y);
		rayArray.push(endY);
	}

	for (var i = 0; i < triggerTileArray.length; i++) {
		for (var j = 0; j < rayArray.length; j++) {
			if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {

				if (returnTileTypeAtPixel(rayArray[j], y) == triggerTileArray[i]) {
					var triggerType = triggerTileArray[i];
					var triggerIndex = returnIndexAtPixel(rayArray[j], y);
					var triggerCoord = indexToCenteredXY(triggerIndex);

					player.triggerIndex = triggerIndex;
					player.triggerType = triggerType;
					player.triggerX = triggerCoord.x;
					player.triggerY = triggerCoord.y;

					return true;
				}
			}
			if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
				if (returnTileTypeAtPixel(x, rayArray[j]) == triggerTileArray[i]) {
					var triggerType = triggerTileArray[i];
					var triggerIndex = returnIndexAtPixel(x, rayArray[j]);
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