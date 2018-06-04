const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const LEVEL_COLS = 32;
const LEVEL_ROWS = 28;

var loadedTriggers = false;

var level1 = [5,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,0,0,0,0,0,0,0,0,0,22,4,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,6,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,1,5,5,6,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,1,5,6,0,0,0,0,11,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,4,6,17,0,0,0,0,14,0,0,0,11,0,0,0,14,0,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,4,6,0,0,0,0,0,11,0,0,0,19,0,0,0,11,0,0,0,22,4,5,12,0,0,0,19,23,0,0,0,0,4,5,8,9,0,0,0,19,0,0,0,19,0,0,0,19,0,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,4,5,5,5,8,8,8,5,8,8,8,5,8,8,8,5,9,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,4,5,5,5,2,2,2,2,2,2,2,2,5,5,5,5,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,4,5,5,3,0,0,0,0,0,0,0,0,1,2,5,5,6,0,0,22,4,6,0,0,10,20,6,23,0,0,0,0,4,5,3,0,0,0,0,0,0,0,0,0,0,0,1,5,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,10,20,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,15,0,0,0,0,0,0,0,0,4,6,0,0,22,4,5,20,12,0,0,19,23,0,0,0,22,19,15,0,0,0,0,7,8,8,9,14,14,14,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,4,12,0,0,0,0,4,5,2,2,20,8,8,9,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,19,23,0,0,0,0,4,6,0,0,0,1,2,3,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,19,23,0,0,0,0,4,6,0,18,0,0,0,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,0,19,14,14,0,0,0,4,6,0,0,0,0,0,0,0,4,6,0,0,22,4,6,0,0,10,20,6,14,14,0,0,0,1,20,12,0,0,15,4,0,8,8,8,8,8,8,8,5,6,0,0,22,4,3,0,0,0,0,4,20,12,0,0,0,0,0,0,0,0,10,5,5,2,2,2,2,2,2,2,2,3,0,0,22,4,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,22,4,500,0,0,0,0,19,16,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,22,4,0,0,0,0,0,19,0,0,0,0,0,15,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,7,5,8,8,8,8,8,5,8,8,8,8,8,8,8,8,8,8,8,5,6,600,600,600,7,8,8,8,8,8,8,8,5,5];
var level1BG = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,2,3,1,3,1,3,3,1,3,1,1,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,3,3,1,3,3,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,1,3,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,2,1,1,1,1,1,null,1,3,1,3,1,1,1,1,3,1,1,1,1,2,1,1,1,3,3,1,2,1,2,1,1,3,1,1,1,1,1,1,1,3,3,1,1,1,1,1,3,3,3,2,3,3,3,1,2,1,3,3,1,3,3,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,2,1,1,3,1,1,1,1,2,2,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,3,3,2,1,1,1,1,1,1,1,1,3,3,3,1,1,1,3,3,3,1,1,1,1,1,1,1,1,3,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,2,3,1,1,1,1,1,3,3,1,1,3,3,2,3,3,2,1,1,1,3,1,1,1,3,null,2,2,1,1,1,2,1,1,1,1,1,1,3,3,3,1,1,1,1,3,3,1,3,3,3,3,1,3,1,1,1,3,1,1,2,3,1,1,3,3,1,1,1,3,3,1,3,1,1,3,3,2,3,1,1,1,1,1,3,2,3,3,3,2,1,3,3,1,3,3,1,3,1,1,1,1,2,1,3,1,1,3,3,3,1,1,1,1,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,1,1,3,2,1,3,3,3,1,3,1,1,3,1,2,1,3,1,3,1,3,1,1,1,1,1,1,3,1,1,1,1,1,3,1,1,3,1,2,1,1,1,1,1,1,2,2,1,1,1,3,3,3,3,3,1,1,3,1,3,1,1,1,1,1,1,1,1,1,1,null,2,1,3,1,1,1,1,1,2,1,3,1,2,3,1,1,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,2,null,3,1,1,1,1,1,1,3,3,1,1,2,1,1,3,1,1,1,1,1,1,2,1,1,3,1,1,1,1,2,null,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,3,3,2,1,3,1,1,1,1,2,1,2,1,1,2,1,3,3,3,1,1,1,1,1,null,2,1,1,1,1,null,3,1,3,3,3,1,1,1,1,3,3,1,1,1,1,2,3,2,1,1,1,2,3,1,1,1,1,1,3,1,1,1,2,1,null,null,1,3,3,1,1,1,3,1,1,2,3,2,2,2,2,2,2,1,3,1,1,1,3,1,3,1,1,3,2,1,3,1,2,1,3,1,1,3,1,2,2,1,1,1,1,2,3,1,3,1,1,1,3,1,3,3,1,1,1,3,1,1,null,1,1,2,2,1,3,1,3,1,1,1,1,1,3,1,1,1,3,3,1,3,1,1,1,1,1,3,3,3,3,3,2,null,2,1,1,1,2,3,1,2,3,1,1,1,3,1,1,3,1,1,2,1,2,1,3,1,1,1,3,1,1,1,1,3,1,3,1,1,2,3,1,1,1,1,1,3,1,1,3,1,2,1,1,1,1,1,1,1,1,1,1,3,3,3,1,3,3,1,1,1,1,1,2,3,2,1,3,1,3,1,3,1,1,1,1,1,1,1,1,3,3,3,1,3,1,1,1,3,3,1,1,1,1,1,1,1,1,3,1,3,1,3,3,3,1,1,3,1,3,1,1,1,1,1,3,1,1,1,1,3,3,1,1,1];

var bgGrid = [];
	const BG_BRICK_1 = 1;
	const BG_BRICK_2 = 2;
	const BG_BRICK_3 = 3;


var levelGrid = [];

	const LEVEL_PLATFORM_SW = 1;
	const LEVEL_PLATFORM_S = 2;
	const LEVEL_PLATFORM_SE = 3;
	const LEVEL_PLATFORM_W = 4;
	const LEVEL_PLATFORM_BLANK = 5;
	const LEVEL_PLATFORM_E = 6;
	const LEVEL_PLATFORM_NW = 7;
	const LEVEL_PLATFORM_N = 8;
	const LEVEL_PLATFORM_NE = 9;
	const LEVEL_PLATFORM_W_PILLAR = 10;
	const LEVEL_PLATFORM_N_PILLAR = 11;
	const LEVEL_PLATFORM_E_PILLAR = 12;
	const LEVEL_PLATFORM_S_PILLAR = 13;
	const LEVEL_PLATFORM_VERTICAL_MIDDLE = 19;
	const LEVEL_PLATFORM_HORIZONTAL_MIDDLE = 20;


	const LEVEL_SPIKE_N = 14;
	const LEVEL_SPIKE_S = 21;
	const LEVEL_SPIKE_W = 22;
	const LEVEL_SPIKE_E = 23;
	const LEVEL_SPIKE_TRIGGER = 15;
	const LEVEL_ENTER_PORTAL_1 = 16;
	const LEVEL_EXIT_PORTAL_1 = 17;
	const LEVEL_COLLECTIBLE = 18;
	const LEVEL_START = 500;
	const LEVEL_END = 600;

var obstacleTileArray = [	LEVEL_PLATFORM_SW,
							LEVEL_PLATFORM_S,
							LEVEL_PLATFORM_SE,
							LEVEL_PLATFORM_W,
							LEVEL_PLATFORM_BLANK,
							LEVEL_PLATFORM_E,
							LEVEL_PLATFORM_NW,
							LEVEL_PLATFORM_N,
							LEVEL_PLATFORM_NE,
							LEVEL_PLATFORM_W_PILLAR,
							LEVEL_PLATFORM_N_PILLAR,
							LEVEL_PLATFORM_E_PILLAR,
							LEVEL_PLATFORM_S_PILLAR,
							LEVEL_PLATFORM_VERTICAL_MIDDLE,
							LEVEL_PLATFORM_HORIZONTAL_MIDDLE];

var triggerTileArray = [LEVEL_SPIKE_N,
						LEVEL_SPIKE_S,
						LEVEL_SPIKE_W,
						LEVEL_SPIKE_E,
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

				case LEVEL_PLATFORM_SW :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_S :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_SE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_W :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_BLANK :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_E :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_NW :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_N :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_NE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_W_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_N_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_E_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_S_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_VERTICAL_MIDDLE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_HORIZONTAL_MIDDLE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_N:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_S:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_W:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_E:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_TRIGGER:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_ENTER_PORTAL_1:
					enterPortalAnim.render(tileX, tileY);
					break;

				case LEVEL_EXIT_PORTAL_1:
					exitPortalAnim.render(tileX, tileY);
					break;

				case LEVEL_COLLECTIBLE:
					collectibleAnim.render(tileX, tileY);
					break;

				case LEVEL_START :
					if (mapEditorEnabled) {
						colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, 'yellow', 0.5);
					}
					break;

				case LEVEL_END :
					if (mapEditorEnabled) {
						colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, '#42f46b');
					}
					break;


			}

		}
	}
}