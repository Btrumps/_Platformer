var mapEditorEnabled = false;
var gridEnabled = false;
var bgEnabled = false;

function placeTilesOnButtonPress() {
	mouseCol = Math.floor(mouseX / TILE_WIDTH);
	mouseRow = Math.floor(mouseY / TILE_HEIGHT);
	mouseIndex = colRowToArrayIndex(mouseCol, mouseRow);

	if (bgEnabled == false) {
		if (keyHeld_Num1) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_SW;
		}

		if (keyHeld_Num2) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_S;
		}

		if (keyHeld_Num3) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_SE;
		}

		if (keyHeld_Num4) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_W;
		}

		if (keyHeld_Num5) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_BLANK;
		}

		if (keyHeld_Num6) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_E;
		}

		if (keyHeld_Num7) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_NW;
		}

		if (keyHeld_Num8) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_N;
		}

		if (keyHeld_Num9) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_NE;
		}

		if (keyHeld_Num0) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_HORIZONTAL_MIDDLE;
		}

		if (keyHeld_Decimal) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_VERTICAL_MIDDLE;
		}

		if (keyHeld_Divide) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_W_PILLAR;
		}

		if (keyHeld_Multiply) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_N_PILLAR;
		}

		if (keyHeld_Subtract) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_E_PILLAR;
		}

		if (keyHeld_Add) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_S_PILLAR;
		}

		if (keyHeld_1) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_N;
		}

		if (keyHeld_2) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_S;
		}

		if (keyHeld_3) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_W;
		}

		if (keyHeld_4) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_E;
		}

		if (keyHeld_5) {
			
		}

		if (keyHeld_6) {
			levelGrid[mouseIndex] = LEVEL_ENTER_PORTAL_1;
		}

		if (keyHeld_7) {
			levelGrid[mouseIndex] = LEVEL_EXIT_PORTAL_1;
		}

		if (keyHeld_8) {
			levelGrid[mouseIndex] = LEVEL_COLLECTIBLE;
		}

		if (keyHeld_9) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_S_FALLING;
		}

		if (keyHeld_0) {
			levelGrid[mouseIndex] = LEVEL_DASH_POWERUP;
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

function saveLevelInSession(whichLevel) {
	if (whichLevel == 1) {
		level1 = levelGrid.slice();
		console.log('level1 saved successfully!');
	} else if (whichLevel == 2) {
		level2 = levelGrid.slice();
		console.log('level2 saved successfully!');
	} else if (whichLevel == 3) {
		level3 = levelGrid.slice();
		console.log('level3 saved successfully!');
	} else {
		console.log('cannot save level, add it to saveLevelInSession()!');
	}
}

function showMapEditorGrid() {
	if (gridEnabled) {
		for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {
				var topLeftX = eachCol * TILE_WIDTH;
				var topLeftY = eachRow * TILE_HEIGHT;
				var bottomRightX = topLeftX + TILE_WIDTH;
				var bottomRightY = topLeftY + TILE_HEIGHT;
				var index = colRowToArrayIndex (eachCol, eachRow);


				coloredOutlineRectCornerToCorner(topLeftX,topLeftY, bottomRightX, bottomRightY, 'white');

			}
		}
	}
}
