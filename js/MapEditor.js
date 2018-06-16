var mapEditorEnabled = false;
var helpBGEnabled = false;
var gridEnabled = false;

function placeTilesOnButtonPress() {
	mouseCol = Math.floor(mouseX / TILE_WIDTH);
	mouseRow = Math.floor(mouseY / TILE_HEIGHT);
	mouseIndex = colRowToArrayIndex(mouseCol, mouseRow);

	if (helpBGEnabled == false) {
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

		if (keyHeld_A) {
			levelGrid[mouseIndex] = LEVEL_FALLING_PLATFORM_W;
		}

		if (keyHeld_S) {
			levelGrid[mouseIndex] = LEVEL_FALLING_PLATFORM_E;
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

		if (keyHeld_Q) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_N;
		}

		if (keyHeld_W) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_S;
		}

		if (keyHeld_E) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_E;
		}

		if (keyHeld_Y) {
			levelGrid[mouseIndex] = LEVEL_SHOOTER_W;
		}

		if (keyHeld_Minus) {
			levelGrid[mouseIndex] = LEVEL_START;
		}

		if (keyHeld_Equal) {
			levelGrid[mouseIndex] = LEVEL_END;
		}
	} else {
		if (keyHeld_Num2) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_DOWN;
		}
		if (keyHeld_Num4) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_LEFT;
		}
		if (keyHeld_Num6) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_RIGHT;
		}
		if (keyHeld_Num8) {
			helpGrid[mouseIndex] = LEVEL_HELP_ARROW_UP;
		}

		if (keyHeld_DashUp) {
			helpGrid[mouseIndex] = LEVEL_HELP_UP_ARROWKEY;
		}
		if (keyHeld_DashLeft) {
			helpGrid[mouseIndex] = LEVEL_HELP_LEFT_ARROWKEY;
		}
		if (keyHeld_DashRight) {
			helpGrid[mouseIndex] = LEVEL_HELP_RIGHT_ARROWKEY;
		}

		if (keyHeld_Num0) {
			helpGrid[mouseIndex] = LEVEL_HELP_HORIZONTAL_LINE;
		}
		if (keyHeld_Decimal) {
			helpGrid[mouseIndex] = LEVEL_HELP_VERTICAL_LINE;
		}

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
			helpGrid[mouseIndex] = LEVEL_HELP_JU;
		}
		if (keyHeld_7) {
			helpGrid[mouseIndex] = LEVEL_HELP_MP;
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
	if (whichLevel == 1) {
		level1 = levelGrid.slice();
		console.log('level1 saved successfully!');
	} else if (whichLevel == 2) {
		level2 = levelGrid.slice();
		console.log('level2 saved successfully!');
	} else if (whichLevel == 3) {
		level3 = levelGrid.slice();
		console.log('level3 saved successfully!');
	} else if (whichLevel == 4) {
		level4 = levelGrid.slice();
		console.log('level4 saved successfully!');
	} else if (whichLevel == 5) {
		level5 = levelGrid.slice();
		console.log('level5 saved successfully!');
	} else if (whichLevel == 6) {
		level6 = levelGrid.slice();
		console.log('level6 saved successfully!');
	} else if (whichLevel == 7) {
		level7 = levelGrid.slice();
		console.log('level7 saved successfully!');
	} else if (whichLevel == 8) {
		level8 = levelGrid.slice();
		console.log('level8 saved successfully!');
	} else if (whichLevel == 9) {
		level9 = levelGrid.slice();
		console.log('level9 saved successfully!');
	} else if (whichLevel == 10) {
		level10 = levelGrid.slice();
		console.log('level10 saved successfully!');
	} else if (whichLevel == 11) {
		level11 = levelGrid.slice();
		console.log('level11 saved successfully!');
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