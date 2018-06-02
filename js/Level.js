const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const LEVEL_COLS = 32;
const LEVEL_ROWS = 28;

var loadedTriggers = false;

var level1 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,2,0,0,0,0,0,0,0,0,0,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,2,0,0,0,0,8,0,0,0,0,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,2,0,0,0,0,8,3,0,0,0,3,1,2,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,1,2,0,0,0,0,8,3,0,0,0,3,1,2,0,6,0,0,0,0,0,0,0,8,0,0,0,3,0,0,0,3,1,2,0,0,0,0,8,3,0,0,0,0,1,2,0,0,0,0,0,3,0,0,0,8,0,0,0,8,0,0,0,3,1,2,2,0,0,0,8,3,0,0,0,0,1,1,8,2,0,0,0,8,0,0,0,8,0,0,0,8,0,0,0,3,1,2,0,0,0,0,8,3,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,3,1,2,0,0,0,0,8,3,0,0,0,0,1,1,1,1,1,1,3,3,3,3,3,3,1,1,1,8,2,0,0,3,1,2,0,0,0,0,8,3,3,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,8,2,0,0,3,1,2,0,0,1,1,8,2,2,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,1,1,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,3,8,0,0,0,0,0,4,0,0,0,0,0,0,0,0,8,2,0,0,3,1,2,2,2,0,0,8,0,0,0,0,3,8,4,0,0,0,0,1,8,2,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,3,8,2,0,0,0,0,1,1,8,2,3,3,3,3,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,3,8,3,0,0,0,0,1,0,0,0,1,1,8,2,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,3,8,3,0,0,0,0,1,0,7,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,0,8,3,3,0,0,0,1,0,0,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,1,1,8,3,3,0,0,0,1,8,2,0,0,4,1,1,2,0,0,0,0,0,0,8,2,0,0,3,1,2,0,0,0,0,8,2,2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,8,2,0,0,3,1,2,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,3,1,2,0,0,500,0,8,0,5,0,0,0,0,0,0,0,0,0,1,2,0,600,0,0,0,0,0,0,0,0,0,3,1,2,0,0,0,0,8,0,0,0,0,0,4,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var level1BG = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,2,3,1,3,1,3,3,1,3,1,1,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,3,3,1,3,3,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,1,3,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,2,1,1,1,1,1,null,1,3,1,3,1,1,1,1,3,1,1,1,1,2,1,1,1,3,3,1,2,1,2,1,1,3,1,1,1,1,1,1,1,3,3,1,1,1,1,1,3,3,3,2,3,3,3,1,2,1,3,3,1,3,3,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,2,1,1,3,1,1,1,1,2,2,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,3,3,2,1,1,1,1,1,1,1,1,3,3,3,1,1,1,3,3,3,1,1,1,1,1,1,1,1,3,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,2,3,1,1,1,1,1,3,3,1,1,3,3,2,3,3,2,1,1,1,3,1,1,1,3,null,2,2,1,1,1,2,1,1,1,1,1,1,3,3,3,1,1,1,1,3,3,1,3,3,3,3,1,3,1,1,1,3,1,1,2,3,1,1,3,3,1,1,1,3,3,1,3,1,1,3,3,2,3,1,1,1,1,1,3,2,3,3,3,2,1,3,3,1,3,3,1,3,1,1,1,1,2,1,3,1,1,3,3,3,1,1,1,1,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,1,1,3,2,1,3,3,3,1,3,1,1,3,1,2,1,3,1,3,1,3,1,1,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,2,1,1,1,1,1,1,2,2,1,1,1,3,3,3,3,3,1,1,3,1,3,1,1,1,1,1,1,1,1,1,1,null,2,1,3,1,1,1,1,1,2,1,3,1,2,3,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,2,null,3,1,1,1,1,1,1,3,3,1,1,2,1,1,3,1,1,1,1,1,1,2,1,1,3,1,1,1,1,2,null,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,3,3,2,1,3,1,1,1,1,2,1,2,1,1,2,1,3,3,3,1,1,1,1,1,null,2,1,1,1,1,null,3,1,3,3,3,1,1,1,1,3,3,1,1,1,1,2,3,2,1,1,1,2,3,1,1,1,1,1,3,1,1,1,2,1,null,null,1,3,3,1,1,1,3,1,1,2,3,2,2,2,2,2,2,1,3,1,1,1,3,1,3,1,1,3,2,1,3,1,2,1,3,1,1,3,1,2,2,1,1,1,1,2,3,1,3,1,1,1,3,1,3,3,1,1,1,3,1,1,null,1,1,2,2,1,3,1,3,1,1,1,1,1,3,1,1,1,3,3,1,3,1,1,1,1,1,3,3,3,3,3,2,null,2,1,1,1,2,3,1,2,3,1,1,1,3,1,1,3,1,1,2,1,2,1,3,1,1,1,3,1,1,1,1,3,1,3,1,1,2,3,1,1,1,1,1,3,1,1,3,1,2,1,1,1,1,1,1,1,1,1,1,3,3,3,1,3,3,1,1,1,1,1,2,3,2,1,3,1,3,1,3,1,1,1,1,1,1,1,1,3,3,3,1,3,1,1,1,3,3,1,1,1,1,1,1,1,1,3,1,3,1,3,3,3,1,1,3,1,3,1,1,1,1,1,3,1,1,1,1,3,3,1,1,1];

var bgGrid = [];
	const BG_BRICK_1 = 1;
	const BG_BRICK_2 = 2;
	const BG_BRICK_3 = 3;


var levelGrid = [];

	const LEVEL_PLATFORM_LEFT = 1;
	const LEVEL_PLATFORM_RIGHT = 2;
	const LEVEL_PLATFORM_BOTH = 8;
	const LEVEL_PLATFORM_BOTH_DOWN = 9;
	const LEVEL_PLATFORM_LEFT_DOWN = 10;
	const LEVEL_PLATFORM_RIGHT_DOWN = 11;

	const LEVEL_SPIKES = 3;
	const LEVEL_SPIKE_TRIGGER = 4;
	const LEVEL_ENTER_PORTAL_1 = 5;
	const LEVEL_EXIT_PORTAL_1 = 6;
	const LEVEL_COLLECTIBLE = 7;
	const LEVEL_START = 500;
	const LEVEL_END = 600;

var obstacleTileArray = [LEVEL_PLATFORM_LEFT, LEVEL_PLATFORM_RIGHT, LEVEL_PLATFORM_BOTH, LEVEL_PLATFORM_BOTH_DOWN];
var triggerTileArray = [LEVEL_SPIKES,
						LEVEL_SPIKE_TRIGGER,
						LEVEL_ENTER_PORTAL_1,
						LEVEL_EXIT_PORTAL_1,
						LEVEL_COLLECTIBLE,
						LEVEL_END];

function loadLevel(whichLevel, whichBG) {
	levelGrid = whichLevel.slice();
	bgGrid = whichBG.slice();
}

function getTriggersAndAddToArray() {
	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileIndex = colRowToArrayIndex(eachCol, eachRow);

			for (var i = 0; i < triggerTileArray.length; i++) {
				if (levelGrid[tileIndex] == triggerTileArray[i]) {

					var thisTrigger = new triggerClass(eachCol, eachRow, tileIndex, levelGrid[tileIndex]);
					allTriggersArray.push(thisTrigger);

				}
			}
		}
	}

	loadedTriggers = true;
}

function drawBG() {
	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {
			var tileX = eachCol * TILE_WIDTH;
			var tileY = eachRow * TILE_HEIGHT;
			var bgIndex = colRowToArrayIndex(eachCol, eachRow);
			var tileTypeToPlace = bgGrid[bgIndex];
			var useImg = bgPics[tileTypeToPlace];
			
			switch(tileTypeToPlace) {

				case BG_BRICK_1 :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case BG_BRICK_2 :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case BG_BRICK_3 :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

			}
		}
	}

}


function drawLevel() {

	if (loadedTriggers == false) {
		getTriggersAndAddToArray();
	}

	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileX = eachCol * TILE_WIDTH;
			var tileY = eachRow * TILE_HEIGHT;
			var levelIndex = colRowToArrayIndex(eachCol, eachRow);
			var tileTypeToPlace = levelGrid[levelIndex];
			var useImg = levelPics[tileTypeToPlace];
			var colorHere;

			switch (tileTypeToPlace) {

				case LEVEL_PLATFORM_LEFT :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_RIGHT :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_LEFT_DOWN :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_RIGHT_DOWN :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_BOTH :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_BOTH_DOWN :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKES :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_TRIGGER:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_ENTER_PORTAL_1:
					colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, 'purple');
					break;

				case LEVEL_EXIT_PORTAL_1:
					colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, 'orange');
					break;

				case LEVEL_COLLECTIBLE:
					colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, 'pink');
					break;

				case LEVEL_START :
					if (mapEditorEnabled) {
						colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, 'yellow', 0.5);
					}
					break;

				case LEVEL_END :
					colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, '#42f46b');
					break;


			}

		}
	}
}