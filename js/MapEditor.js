var mapEditorEnabled = false;

function placeTilesOnButtonPress() {
	mouseCol = Math.floor(mouseX / TILE_WIDTH);
	mouseRow = Math.floor(mouseY / TILE_HEIGHT);
	mouseIndex = colRowToArrayIndex(mouseCol, mouseRow);

	if (keyHeld_1) {
		levelGrid[mouseIndex] = LEVEL_PLATFORM;
	}

	if (keyHeld_2) {
		levelGrid[mouseIndex] = LEVEL_SPIKES;
	}

	if (keyHeld_3) {
		levelGrid[mouseIndex] = LEVEL_SPIKE_TRIGGER;
	}

	if (keyHeld_Minus) {
		levelGrid[mouseIndex] = PLAYER_START;
	}


	if (keyHeld_T) {
		levelGrid[mouseIndex] = 0;
	}


}

function outputLevelToConsole() {

	var levelData = JSON.stringify(levelGrid);

	console.log(levelData);
	
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