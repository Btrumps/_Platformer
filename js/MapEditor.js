var mapEditorEnabled = false;
var bgEnabled = false;

function placeTilesOnButtonPress() {
	mouseCol = Math.floor(mouseX / TILE_WIDTH);
	mouseRow = Math.floor(mouseY / TILE_HEIGHT);
	mouseIndex = colRowToArrayIndex(mouseCol, mouseRow);

	if (bgEnabled == false) {
		if (keyHeld_1) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_LEFT;
		}

		if (keyHeld_2) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_RIGHT;
		}

		if (keyHeld_3) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_LEFT_DOWN;
		}

		if (keyHeld_4) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_RIGHT_DOWN;
		}

		if (keyHeld_5) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_BOTH;
		}

		if (keyHeld_6) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_BOTH_DOWN;
		}

		if (keyHeld_Q) {
			levelGrid[mouseIndex] = LEVEL_SPIKES;
		}

		if (keyHeld_W) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_TRIGGER;
		}

		if (keyHeld_E) {
			levelGrid[mouseIndex] = LEVEL_ENTER_PORTAL_1;
		}

		if (keyHeld_R) {
			levelGrid[mouseIndex] = LEVEL_EXIT_PORTAL_1;
		}

		if (keyHeld_T) {
			levelGrid[mouseIndex] = LEVEL_COLLECTIBLE;
		}

		if (keyHeld_Y) {
			levelGrid[mouseIndex] = LEVEL_COLLECTIBLE;
		}		
	

		if (keyHeld_Minus) {
			levelGrid[mouseIndex] = LEVEL_START;
		}

		if (keyHeld_Equal) {
			levelGrid[mouseIndex] = LEVEL_END;
		}

		if (keyHeld_C) {
			levelGrid[mouseIndex] = 0;
		}
	} else {
		if (keyHeld_1) {
			bgGrid[mouseIndex] = BG_BRICK_1;
		}

		if (keyHeld_2) {
			bgGrid[mouseIndex] = BG_BRICK_2;
		}

		if (keyHeld_3) {
			bgGrid[mouseIndex] = BG_BRICK_3;
		}

		if (keyHeld_C) {
			bgGrid[mouseIndex] = 0;
		}
	}

}

function outputLevelToConsole() {
	if (bgEnabled == false) {
		var levelData = JSON.stringify(levelGrid);

		console.log(levelData);
	} else {
		var bgData = JSON.stringify(bgGrid);

		console.log(bgData);
	}
	
}

function showMapEditorGrid() {

	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {
			var topLeftX = eachCol * TILE_WIDTH;
			var topLeftY = eachRow * TILE_HEIGHT;
			var bottomRightX = topLeftX + TILE_WIDTH;
			var bottomRightY = topLeftY + TILE_HEIGHT;
			var index = colRowToArrayIndex (eachCol, eachRow);


			coloredOutlineRectCornerToCorner(topLeftX,topLeftY, bottomRightX, bottomRightY, 'black');

		}
	}

}