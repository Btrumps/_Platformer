var levelEditorEnabled = false;
var helpBGEnabled = false;
var gridEnabled = false;
var levelPreview = false;

var levelLayoutScreenOpen = false;
var levelToShow = 1;

function placeTilesOnButtonPress() {
	mouseCol = Math.floor(mouseX / TILE_WIDTH);
	mouseRow = Math.floor(mouseY / TILE_HEIGHT);
	mouseIndex = colRowToArrayIndex(mouseCol, mouseRow);

	if (helpBGEnabled == false) {

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
			levelGrid[mouseIndex] = LEVEL_SPIKE_S_FALLING;
		}

		if (keyHeld_6) {
			levelGrid[mouseIndex] = LEVEL_SQUARE_SPIKE;
		}

		if (keyHeld_7) {
			levelGrid[mouseIndex] = LEVEL_SQUARE_SPIKE_H;
		}

		if (keyHeld_8) {
			levelGrid[mouseIndex] = LEVEL_SQUARE_SPIKE_V;
		}

		if (keyHeld_9 && currentLevel != 46) {
			levelGrid[mouseIndex] = LEVEL_COLLECTIBLE;
		}	else if (keyHeld_9 && currentLevel == 46) {
			levelGrid[mouseIndex] = LEVEL_COLLECTIBLE_LARGE;
		}

		if (keyHeld_0) {
			levelGrid[mouseIndex] = LEVEL_DASH_POWERUP;
		}

		if (keyHeld_Minus) {
			levelGrid[mouseIndex] = LEVEL_SWITCH_1;
		}

		if (keyHeld_Equal) {
			levelGrid[mouseIndex] = LEVEL_DOOR_1;
		}

		if (keyHeld_Q) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_N;
		}

		if (keyHeld_W) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_S;
		}

		if (keyHeld_E) {
			levelGrid[mouseIndex] = LEVEL_FOLLOW_DRONE;
		}

		if (keyHeld_Y) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_W_PILLAR;
		}

		if (keyHeld_U) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_E_PILLAR;
		}

		if (keyHeld_I || keyHeld_Num7) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_NW;
		}

		if (keyHeld_O || keyHeld_Num8) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_N;
		}

		if (keyHeld_P || keyHeld_Num9) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_NE;
		}

		if (keyHeld_BracketLeft) {
			levelGrid[mouseIndex] = LEVEL_START;
		}

		if (keyHeld_BracketRight) {
			levelGrid[mouseIndex] = LEVEL_END;
		}

		if (keyHeld_A) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_W;
		}

		if (keyHeld_S) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_E;
		}

		if (keyHeld_D) {
			levelGrid[mouseIndex] = LEVEL_SPIKE_TRIGGER;
		}

		if (keyHeld_F) {
			levelGrid[mouseIndex] = LEVEL_BOUNCE_BLOCK;
		}

		if (keyHeld_H) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_N_PILLAR;
		}

		if (keyHeld_J) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_S_PILLAR;
		}

		if (keyHeld_K || keyHeld_Num4) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_W;
		}

		if (keyHeld_L || keyHeld_Num5) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_SINGLE;
		}

		if (keyHeld_Semicolon || keyHeld_Num6) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_E;
		}

		if (keyHeld_Quote) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_FALLING;
		}

		if (keyHeld_Z) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_HORIZONTAL_MIDDLE;
		}

		if (keyHeld_X) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_VERTICAL_MIDDLE;
		}

		if (keyHeld_Comma || keyHeld_Num1) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_SW;
		}

		if (keyHeld_Period || keyHeld_Num2) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_S;
		}

		if (keyHeld_Slash || keyHeld_Num3) {
			levelGrid[mouseIndex] = LEVEL_PLATFORM_SE;
		}
	} else {

		if (keyHeld_1) {
			helpGrid[mouseIndex] = LEVEL_HELP_TO;
		}
		if (keyHeld_2) {
			helpGrid[mouseIndex] = LEVEL_HELP_DA;
		}
		if (keyHeld_3) {
			helpGrid[mouseIndex] = LEVEL_HELP_SH;
		}
		if (keyHeld_4) {
			helpGrid[mouseIndex] = LEVEL_HELP_MO;
		}
		if (keyHeld_5) {
			helpGrid[mouseIndex] = LEVEL_HELP_VE;
		}
		if (keyHeld_6) {
			helpGrid[mouseIndex] = LEVEL_HELP_R_KEY;
		}
		if (keyHeld_7) {
			helpGrid[mouseIndex] = LEVEL_HELP_RE;
		}
		if (keyHeld_8) {
			helpGrid[mouseIndex] = LEVEL_HELP_ST;
		}
		if (keyHeld_9) {
			helpGrid[mouseIndex] = LEVEL_HELP_AR;
		}
		if (keyHeld_0) {
			helpGrid[mouseIndex] = LEVEL_HELP_T2;
		}

		if (keyHeld_Z) {
			helpGrid[mouseIndex] = LEVEL_HELP_T;
		}
		if (keyHeld_X) {
			helpGrid[mouseIndex] = LEVEL_HELP_AP;
		}
		if (keyHeld_Period) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_DOWN;
		}
		if (keyHeld_K) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_LEFT;
		}
		if (keyHeld_Semicolon) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_RIGHT;
		}
		if (keyHeld_O) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_UP;
		}
		if (keyHeld_I) {
			helpGrid[mouseIndex] = LEVEL_HELP_HORIZONTAL_LINE;
		}
		if (keyHeld_P) {
			helpGrid[mouseIndex] = LEVEL_HELP_VERTICAL_LINE;
		}

		if (keyHeld_ArrowUp) {
			helpGrid[mouseIndex] = LEVEL_HELP_UP_ARROWKEY;
		}
		if (keyHeld_ArrowLeft) {
			helpGrid[mouseIndex] = LEVEL_HELP_LEFT_ARROWKEY;
		}
		if (keyHeld_ArrowRight) {
			helpGrid[mouseIndex] = LEVEL_HELP_RIGHT_ARROWKEY;
		}

		if (keyHeld_W) {
			helpGrid[mouseIndex] = LEVEL_HELP_W_KEY;
		}
		if (keyHeld_A) {
			helpGrid[mouseIndex] = LEVEL_HELP_A_KEY;
		}
		if (keyHeld_S) {
			helpGrid[mouseIndex] = LEVEL_HELP_S_KEY;
		}
		if (keyHeld_D) {
			helpGrid[mouseIndex] = LEVEL_HELP_D_KEY;
		}

	}

	if (keyHeld_C || keyHeld_Delete) {
		if (helpBGEnabled == false) {
			levelGrid[mouseIndex] = 0;
		} else if (helpBGEnabled) {
			helpGrid[mouseIndex] = 0;
		}
	}

}

// can be declared var or const
const copyToClipboard = str => {
  var textElement = document.createElement('textarea');
  textElement.value = str;
  textElement.setAttribute('readonly', '');
  textElement.style.position = 'absolute';
  textElement.style.left = '-9999px';
  document.body.appendChild(textElement);
  textElement.select();
  document.execCommand('copy');
  document.body.removeChild(textElement);
};

function outputLevelToConsole() {

	if (helpBGEnabled == false) {
		var levelData = JSON.stringify(levelGrid);
		copyToClipboard(levelData);
	} else if (helpBGEnabled) {
		var helpData = JSON.stringify(helpGrid);
		copyToClipboard(helpData);
	}
	
	//console.log(levelData);
}

function saveLevelInSession(whichLevel) {

	window["level" + whichLevel] = levelGrid.slice();
	console.log('level ' + whichLevel + 'saved successfully!');

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

function drawLevelLayoutScreen() {
	colorRect(0,0, canvas.width,canvas.height, 'black');

	var rowsPerScreen = 3;
	var columnsPerScreen = 3;
	var whichLevelToDraw = levelToShow;

	// 3 because that's how many levels we can fit on a screen
	for (var eachRow = 0; eachRow < rowsPerScreen; eachRow++) {
		for (var eachCol = 0; eachCol < columnsPerScreen; eachCol++) {
			canvasContext.save();
			canvasContext.translate(eachCol * 180, eachRow * 140);
			canvasContext.scale(0.3,0.3);
			loadLevel(whichLevelToDraw);
			drawLevel();
			canvasContext.restore();
			whichLevelToDraw++;
		}
	}

}

function checkLevelLayoutInput() {
	if (keyHeld_Minus && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (levelToShow >= 9) {
			levelToShow -= 9; // 9 is the max amount of levels that can be shown on a screen at a time
		}
		keyHeld_Timer = 0;
	}
	if (keyHeld_Equal && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		levelToShow += 9;
		keyHeld_Timer = 0;
	}
}