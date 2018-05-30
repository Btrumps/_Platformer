const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const LEVEL_COLS = 16;
const LEVEL_ROWS = 16;

var levelGrid = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,2,2,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,2,2,0,0,0,0,0,2,2,2,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  
				 ];

	const LEVEL_WALL = 1;
	const LEVEL_PLATFORM = 2;


function colRowToArrayIndex(col, row) {
	return col + (row * LEVEL_COLS);
}

function returnTileTypeAtPixel(x, y) {
	var xCol = Math.floor(x / TILE_WIDTH);
	var yCol = Math.floor(y / TILE_HEIGHT);
	var index = colRowToArrayIndex(xCol, yCol);

	return levelGrid[index];
}

function isObstacleAtPixel(x, y) {
	if (returnTileTypeAtPixel(x, y) == LEVEL_WALL ||
	    returnTileTypeAtPixel(x, y) == LEVEL_PLATFORM) {
		return true;
	} else {
		return false;
	}
}

function drawLevel() {
	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileX = eachCol * TILE_WIDTH;
			var tileY = eachRow * TILE_HEIGHT;
			var levelIndex = colRowToArrayIndex(eachCol, eachRow);
			var tileTypeToPlace = levelGrid[levelIndex];
			var colorHere;

			switch (tileTypeToPlace) {

				case LEVEL_WALL :
					colorHere = '#515151';
					break;

				case LEVEL_PLATFORM :
					colorHere = 'white';
					break;

			}

			if (tileTypeToPlace != 0) {
				colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, colorHere);
			}

		}
	}
}