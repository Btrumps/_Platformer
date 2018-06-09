const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const LEVEL_COLS = 32;
const LEVEL_ROWS = 28;

var currentLevel = 1;

var level1 = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0,5,5,5,5,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5,0,0,0,0,0,5,5,5,6,21,21,21,21,null,null,null,null,null,null,null,null,null,null,600,5,5,5,5,5,5,5,0,0,2,2,2,0,5,5,5,6,23,0,0,null,0,0,0,0,0,null,null,null,null,null,600,5,5,5,5,5,5,5,5,6,21,21,21,4,5,5,5,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,600,5,5,5,5,5,5,5,5,3,0,0,0,1,2,2,2,3,23,0,0,0,0,0,0,0,0,0,0,0,0,0,600,5,5,5,5,5,5,5,6,23,0,0,0,21,21,21,21,21,0,0,0,0,7,8,8,8,8,8,8,8,8,8,8,5,5,5,5,5,5,5,6,23,0,25,0,0,0,null,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,0,25,0,0,0,25,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,0,null,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,null,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,14,14,14,14,14,14,14,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,25,0,22,7,8,8,8,8,8,8,8,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,null,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,25,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,3,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,null,null,null,0,null,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,500,null,null,null,null,null,null,null,null,null,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,null,null,null,null,0,0,0,0,0,14,14,14,14,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,8,8,8,8,8,8,8,8,8,8,8,8,8,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];
var level2 = [5,2,2,2,0,0,0,2,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,24,0,0,1,2,3,0,0,0,22,4,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,6,0,0,0,24,21,21,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,1,5,5,6,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,1,5,6,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,14,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,4,6,0,0,0,0,11,23,0,0,0,22,4,6,17,0,0,0,0,14,0,0,0,11,0,0,0,14,0,0,0,0,4,6,0,0,0,0,19,23,0,0,0,22,4,6,0,0,0,0,0,11,0,0,0,19,0,0,0,11,0,0,0,0,4,5,12,0,0,0,19,23,0,0,0,22,4,5,8,9,0,0,0,19,0,0,0,19,0,0,0,19,0,0,0,0,4,6,24,0,0,0,19,23,0,0,0,22,4,5,5,5,8,8,8,5,8,8,8,5,8,8,8,5,9,23,0,0,4,6,0,0,0,0,19,23,0,0,0,22,4,5,5,5,0,0,0,0,0,0,0,0,5,5,5,5,6,23,0,0,4,6,0,0,0,7,6,23,0,0,0,0,4,5,5,2,2,2,2,2,2,2,2,2,2,2,5,5,6,23,0,0,4,6,0,0,0,1,6,23,0,0,0,0,4,5,3,24,24,24,24,24,21,21,24,24,24,24,1,5,6,0,0,0,4,6,0,0,0,24,19,23,0,0,0,0,4,3,24,0,0,0,0,0,0,0,0,0,0,0,24,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,0,0,19,24,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,10,20,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,14,0,0,0,0,0,0,0,0,4,6,0,0,22,4,5,12,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,7,8,8,9,14,14,14,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,4,5,2,2,20,8,8,9,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,7,5,6,0,0,0,1,2,3,0,4,6,0,0,0,4,6,0,0,0,10,6,23,0,0,0,22,19,0,0,0,10,5,0,6,0,18,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,0,0,19,0,0,0,24,4,0,6,0,0,0,0,0,0,0,4,6,23,0,0,4,6,0,0,0,0,19,14,14,0,0,0,1,12,0,0,0,4,0,0,8,8,8,8,8,8,8,5,6,23,0,0,4,3,0,0,0,0,4,20,12,0,0,0,24,24,0,0,0,4,0,5,2,2,2,2,2,2,2,2,3,23,0,0,4,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,4,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,500,0,0,0,0,19,16,0,0,0,0,0,0,0,0,0,4,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,4,0,6,0,0,0,0,0,0,0,0,0,0,0,7,5,8,8,8,8,8,5,8,8,8,8,8,8,8,8,8,8,0,5,6,600,600,600,7,8,8,8,8,8,8,8,5,5];
var level1BG = [];
var level2BG = [];

var levelTest = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,null,null,null,null,5,5,null,null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,null,null,null,null,null,null,null,null,null,0,3,21,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,null,null,null,null,null,null,null,null,null,6,23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,null,null,null,null,null,null,null,null,null,3,23,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,null,null,null,null,null,null,null,null,6,23,null,null,null,null,null,22,null,null,null,0,null,null,null,null,null,null,null,null,4,5,null,null,null,2,2,2,2,2,2,2,3,23,null,null,null,null,null,22,null,0,null,null,null,null,null,null,null,null,null,null,4,5,null,null,6,23,21,21,21,21,21,21,21,null,null,null,25,null,null,22,0,0,null,0,0,0,null,null,null,null,null,null,4,5,null,null,6,23,0,null,null,null,null,null,null,null,null,null,null,null,22,7,8,8,8,8,8,8,8,9,null,null,null,null,4,5,null,null,6,23,0,25,null,null,0,null,25,null,null,null,null,null,22,4,5,5,5,5,5,5,5,6,null,null,null,null,4,5,null,null,6,23,0,null,null,0,0,0,null,null,null,null,null,null,22,4,5,5,5,null,5,5,5,6,null,null,null,null,4,5,null,null,6,23,0,null,0,null,0,null,null,null,null,null,null,null,22,4,5,5,5,5,5,5,5,6,null,null,null,null,4,5,null,null,6,23,0,null,0,null,null,14,14,14,14,14,14,14,14,4,5,5,5,5,5,5,5,6,null,null,null,null,4,5,null,null,6,23,0,null,null,null,null,10,20,20,20,20,20,20,20,2,2,2,2,2,2,2,2,3,null,null,null,null,4,5,null,null,6,23,0,25,null,null,null,null,null,null,null,0,null,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,6,23,0,0,0,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,6,23,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,null,null,6,23,0,0,null,0,null,7,8,9,null,null,0,null,null,null,null,null,null,null,null,null,10,12,null,null,null,null,4,5,null,null,6,23,0,0,null,0,0,4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,2,2,3,23,0,25,null,null,0,4,5,6,null,null,null,null,10,12,null,null,null,null,null,null,null,null,null,null,null,null,4,6,null,null,null,null,null,null,null,null,0,1,2,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,6,null,null,null,null,null,null,null,0,0,0,null,null,0,0,0,0,0,null,null,null,null,10,12,null,null,null,null,null,null,null,4,6,null,null,null,null,null,2,2,2,2,0,0,0,0,null,null,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,4,3,null,null,null,null,null,24,24,24,24,7,8,9,null,null,null,null,null,null,0,null,0,null,null,null,null,null,null,null,null,null,4,null,null,null,0,null,0,0,0,0,0,4,5,6,0,0,0,10,12,null,null,null,0,0,0,0,0,0,0,0,0,null,4,500,null,null,null,null,null,null,null,null,null,4,5,6,null,null,null,null,null,null,null,null,null,0,0,null,null,null,0,0,0,null,4,null,null,null,null,0,0,0,0,0,null,4,5,6,0,null,null,null,null,null,null,0,null,null,null,0,0,0,0,0,0,0,4,8,8,8,8,8,8,8,8,8,8,5,5,5,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0];
var bgTest = [];

var levelList

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


	const LEVEL_SPIKE_S_FALLING = 24;
	const LEVEL_SPIKE_N = 14;
	const LEVEL_SPIKE_S = 21;
	const LEVEL_SPIKE_W = 22;
	const LEVEL_SPIKE_E = 23;
	const LEVEL_SPIKE_TRIGGER = 15;
	const LEVEL_ENTER_PORTAL_1 = 16;
	const LEVEL_EXIT_PORTAL_1 = 17;
	const LEVEL_COLLECTIBLE = 18;
	const LEVEL_DASH_POWERUP = 25;
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

var triggerTileArray = [LEVEL_SPIKE_S_FALLING,
						LEVEL_SPIKE_N,
						LEVEL_SPIKE_S,
						LEVEL_SPIKE_W,
						LEVEL_SPIKE_E,
						LEVEL_SPIKE_TRIGGER,
						LEVEL_ENTER_PORTAL_1,
						LEVEL_EXIT_PORTAL_1,
						LEVEL_COLLECTIBLE,
						LEVEL_DASH_POWERUP,
						LEVEL_END];

function loadLevel(whichLevel) {
	if (whichLevel == 1) {
		levelGrid = level1.slice();
		bgGrid = level1BG.slice();
	} else if (whichLevel == 2) {
		levelGrid = level2.slice();
		bgGrid = level2BG.slice();
	} else if (whichLevel == 3) {
		levelGrid = level3.slice();
		bgGrid = level3BG.slice();
	} else {
		console.log ('cannot find level to load, add to loadLevel()!');
		levelGrid = levelTest.slice();
		bgGrid = bgTest.slice();
	}
	player.reset();
	getTriggersAndAddToArray();
}

function getTriggersAndAddToArray() {
	allTriggersArray = [];

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

				case LEVEL_SPIKE_S_FALLING:
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

				case LEVEL_DASH_POWERUP:
					canvasContext.drawImage(useImg, tileX, tileY);
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

/* LOST LEVELS 

var lostLevel1 = [6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,9,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,0,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,0,null,null,null,null,null,null,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,0,null,null,null,null,null,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,22,11,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,null,null,null,0,19,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,null,14,null,null,0,19,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,5,6,null,null,22,11,0,0,0,19,null,null,null,null,null,null,14,0,14,null,null,null,null,null,null,null,null,null,0,null,null,null,5,6,null,18,null,19,0,0,0,19,null,null,null,null,null,null,7,8,9,null,null,null,null,null,null,null,null,14,0,0,0,14,5,6,null,0,0,19,0,11,0,19,null,null,null,null,null,null,4,5,6,null,null,null,14,0,14,0,0,11,14,0,14,7,5,6,null,0,null,19,0,19,0,19,null,null,null,null,null,null,4,5,6,null,null,null,7,8,9,0,0,4,9,null,7,null,5,6,0,11,0,19,0,19,0,19,null,null,null,null,null,null,4,5,6,null,null,null,4,5,6,0,0,4,3,null,1,5,5,6,0,19,0,19,0,19,0,19,null,null,null,null,null,null,4,5,6,null,null,null,4,5,6,0,0,19,null,null,null,4,5,6,14,19,14,19,14,19,14,19,14,14,14,14,14,14,4,5,6,14,14,14,4,5,6,14,14,19,600,600,600,4];


*/
