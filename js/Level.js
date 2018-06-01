const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const LEVEL_COLS = 32;
const LEVEL_ROWS = 28;

var levelGrid = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,2,2,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,2,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,2,1,3,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,2,1,1,0,0,0,0,1,1,1,1,2,2,2,2,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,2,1,2,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,2,1,2,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,2,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,2,2,0,0,0,1,2,2,0,0,3,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,500,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,0,0,3,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

	const LEVEL_PLATFORM = 1;
	const LEVEL_SPIKES = 2;
	const LEVEL_SPIKE_TRIGGER = 3;
	const PLAYER_START = 500;

var obstacleTileArray = [LEVEL_PLATFORM];
var triggerTileArray = [LEVEL_SPIKES, LEVEL_SPIKE_TRIGGER];


function drawLevel() {
	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileX = eachCol * TILE_WIDTH;
			var tileY = eachRow * TILE_HEIGHT;
			var levelIndex = colRowToArrayIndex(eachCol, eachRow);
			var tileTypeToPlace = levelGrid[levelIndex];
			var colorHere;

			switch (tileTypeToPlace) {

				case LEVEL_PLATFORM :
					colorHere = '#515151';
					break;

				case LEVEL_SPIKES :
					colorHere = 'red';
					break;

				case LEVEL_SPIKE_TRIGGER:
					colorHere = 'yellow';
					break;

				case PLAYER_START :
					colorHere = 'yellow';
					break;


			}

			if (tileTypeToPlace != 0 && tileTypeToPlace != PLAYER_START) {
				
				colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, colorHere);
				
			} else if (tileTypeToPlace == PLAYER_START && mapEditorEnabled) {
				colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, colorHere, 0.5);
			}


		}
	}
}