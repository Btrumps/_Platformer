const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;
const LEVEL_COLS = 16;
const LEVEL_ROWS = 14;

var levelGrid = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,2,2,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,2,2,2,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,2,2,2,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,
				 1,2,2,0,0,0,0,0,0,0,2,2,2,2,2,1,
				 1,2,2,2,0,0,0,0,0,0,2,2,2,2,2,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  
				 ];

	const LEVEL_WALL = 1;
	const LEVEL_PLATFORM = 2;

var obstacleTileArray = [LEVEL_WALL, LEVEL_PLATFORM];


function colRowToArrayIndex(col, row) {
	return col + (row * LEVEL_COLS);
}

function returnTileTypeAtPixel(x, y) {
	var xCol = Math.floor(x / TILE_WIDTH);
	var yRow = Math.floor(y / TILE_HEIGHT);
	var index = colRowToArrayIndex(xCol, yRow);

	return levelGrid[index];
}

function isObstacleAtPixel(x, y, whichEdge) {
	var rayCastArray = [];
	var whichRayCount;

	if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
		whichRayCount = PLAYER_VERTICAL_RAY_COUNT;
		var startX = x - (PLAYER_WIDTH / 2) + PLAYER_RAY_OFFSET;
		var rayCountSpacing = (PLAYER_WIDTH - PLAYER_RAY_OFFSET * 2) / whichRayCount;

		for (var i = 0; i < whichRayCount; i++) {
			var thisRay = startX + (i * rayCountSpacing);
			rayCastArray.push(thisRay);
		}

	} else if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
		whichRayCount = PLAYER_HORIZONTAL_RAY_COUNT;
		var startY = y - (PLAYER_WIDTH / 2) + PLAYER_RAY_OFFSET;
		var rayCountSpacing = (PLAYER_HEIGHT - PLAYER_RAY_OFFSET * 2) / whichRayCount;

		for (var i = 0; i < whichRayCount; i++) {
			var thisRay = startY + (i * rayCountSpacing);
			rayCastArray.push(thisRay);
		}
	}

	for (var i = 0; i < obstacleTileArray.length; i++) {
		for (var j = 0; j < rayCastArray.length; j++) {
			if (whichEdge == TOP_EDGE || whichEdge == BOTTOM_EDGE) {
				if (returnTileTypeAtPixel(rayCastArray[j], y) == obstacleTileArray[i]) {
					return true;
				}
			}
			if (whichEdge == LEFT_EDGE || whichEdge == RIGHT_EDGE) {
				if (returnTileTypeAtPixel(x, rayCastArray[j]) == obstacleTileArray[i]) {
					return true;
				}
			}
		}
	}

	return false;
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