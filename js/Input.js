const KEY_HELD_TIME_MAX = 15;

const LEFT_CLICK = 1;

var keyHeld_Timer = KEY_HELD_TIME_MAX;
var keyHeld_DashTimer = KEY_HELD_TIME_MAX;

var mouseX;
var mouseY;

var keyHeld_Left = false; 
var keyHeld_Right = false;
var keyHeld_DashLeft = false; 
var keyHeld_DashRight = false;
var keyHeld_DashUp = false;
var keyHeld_Jump = false;
var keyHeld_Jump_Prev = false;
var keyHeld_Run = false;

var keyHeld_1 = false;
var keyHeld_2 = false;
var keyHeld_3 = false;
var keyHeld_4 = false;
var keyHeld_5 = false;
var keyHeld_6 = false;
var keyHeld_7 = false;
var keyHeld_8 = false;
var keyHeld_9 = false;
var keyHeld_0 = false;
var keyHeld_Minus = false;
var keyHeld_Equal = false;

var keyHeld_Q = false;
var keyHeld_W = false;
var keyHeld_E = false;
var keyHeld_R = false;
var keyHeld_T = false;
var keyHeld_Y = false;
var keyHeld_U = false;
var keyHeld_I = false;
var keyHeld_O = false;
var keyHeld_P = false;
var keyHeld_BracketLeft = false;
var keyHeld_BracketRight = false;

var keyHeld_A = false;
var keyHeld_S = false;
var keyHeld_D = false;
var keyHeld_F = false;
var keyHeld_G = false;
var keyHeld_H = false;
var keyHeld_J = false;
var keyHeld_K = false;
var keyHeld_L = false;
var keyHeld_Semicolon = false;
var keyHeld_Quote = false;

var keyHeld_Z = false;
var keyHeld_X = false;
var keyHeld_C = false;
var keyHeld_V = false;
var keyHeld_B = false;
var keyHeld_N = false;
var keyHeld_M = false;
var keyHeld_Comma = false;
var keyHeld_Period = false;
var keyHeld_Slash = false;

var keyHeld_ArrowUp = false;
var keyHeld_ArrowDown = false;
var keyHeld_ArrowLeft = false;
var keyHeld_ArrowRight = false;
var keyHeld_Enter = false;
var keyHeld_Space = false;
var keyHeld_Delete = false;

var keyHeld_Num1 = false;
var keyHeld_Num2 = false;
var keyHeld_Num3 = false;
var keyHeld_Num4 = false;
var keyHeld_Num5 = false;
var keyHeld_Num6 = false;
var keyHeld_Num7 = false;
var keyHeld_Num8 = false;
var keyHeld_Num9 = false;
var keyHeld_Num0 = false;
var keyHeld_Divide = false;
var keyHeld_Multiply = false;
var keyHeld_Subtract = false;
var keyHeld_Add = false;
var keyHeld_Decimal = false;

function keyDownHandler(evt) {
	setValuesForKey(evt, true);
}

function keyUpHandler(evt) {
	setValuesForKey(evt, false);
	keyHeld_Timer = KEY_HELD_TIME_MAX;

	if (evt.code == "ArrowUp" ||
		evt.code == "ArrowLeft" ||
		evt.code == "ArrowRight") {
		keyHeld_DashTimer = KEY_HELD_TIME_MAX;
	}
	
}

function mousedownHandler(evt) {
	

}

function mouseupHandler(evt) {

	if (evt.which == LEFT_CLICK && mainMenuOpen) {
		
		if (mouseX > MAIN_MENU_CONTINUE_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_CONTINUE_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_CONTINUE_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_CONTINUE_END_Y / PIXEL_SCALE_UP && 
			areYouSureOpen == false &&
			noSavedGame == false) {

			continueSavedGame();
			// playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > MAIN_MENU_NO_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_NO_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_NO_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_NO_END_Y / PIXEL_SCALE_UP && 
			areYouSureOpen) {
			
			areYouSureOpen = false;
			// playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > MAIN_MENU_YES_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_YES_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_YES_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_YES_END_Y / PIXEL_SCALE_UP &&
			areYouSureOpen) {

			startNewGame();
			// playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > MAIN_MENU_NEW_GAME_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_NEW_GAME_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_NEW_GAME_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_NEW_GAME_END_Y / PIXEL_SCALE_UP &&
			areYouSureOpen == false) {

			selectedOption = MAIN_MENU_NO;
			areYouSureOpen = true;
			playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > MAIN_MENU_SPEEDRUN_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_SPEEDRUN_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_SPEEDRUN_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_SPEEDRUN_END_Y / PIXEL_SCALE_UP &&
			areYouSureOpen == false) {

			speedrunTimesOpen = true;
			mainMenuOpen = false;
			playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}
			
		
	} else if (evt.which == LEFT_CLICK && speedrunTimesOpen) {
		if (mouseX > SPEEDRUN_RESET_TIMES_START_X / PIXEL_SCALE_UP&&
			mouseX < SPEEDRUN_RESET_TIMES_END_X / PIXEL_SCALE_UP &&
			mouseY > SPEEDRUN_RESET_TIMES_START_Y / PIXEL_SCALE_UP &&
			mouseY < SPEEDRUN_RESET_TIMES_END_Y / PIXEL_SCALE_UP && 
			areYouSureOpen == false) {

			selectedOption = MAIN_MENU_NO;
			areYouSureOpen = true;
			// playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > SPEEDRUN_BACK_TO_MAIN_MENU_START_X / PIXEL_SCALE_UP&&
			mouseX < SPEEDRUN_BACK_TO_MAIN_MENU_END_X / PIXEL_SCALE_UP &&
			mouseY > SPEEDRUN_BACK_TO_MAIN_MENU_START_Y / PIXEL_SCALE_UP &&
			mouseY < SPEEDRUN_BACK_TO_MAIN_MENU_END_Y / PIXEL_SCALE_UP &&
			areYouSureOpen == false) {

			speedrunTimesOpen = false;
			mainMenuOpen = true;
			selectedOption = MAIN_MENU_SPEEDRUN;
			// playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > MAIN_MENU_NO_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_NO_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_NO_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_NO_END_Y / PIXEL_SCALE_UP && 
			areYouSureOpen) {

			areYouSureOpen = false;
			selectedOption = SPEEDRUN_BACK_TO_MAIN_MENU;
			// playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}

		if (mouseX > MAIN_MENU_YES_START_X / PIXEL_SCALE_UP&&
			mouseX < MAIN_MENU_YES_END_X / PIXEL_SCALE_UP &&
			mouseY > MAIN_MENU_YES_START_Y / PIXEL_SCALE_UP &&
			mouseY < MAIN_MENU_YES_END_Y / PIXEL_SCALE_UP &&
			areYouSureOpen) {
			
			deleteAllSpeedRunInfo();
			areYouSureOpen = false;
			playSound(menuSelectSound, MENU_SELECT_VOLUME);
		}
	}

}

function setValuesForKey(evt, value) {
	var keyUsedByGame = true;

	switch (evt.code) {

		case "Digit1":
			keyHeld_1 = value;
			break;
		case "Digit2":
			keyHeld_2 = value;
			break;
		case "Digit3":
			keyHeld_3 = value;
			break;
		case "Digit4":
			keyHeld_4 = value;
			break;
		case "Digit5":
			keyHeld_5 = value;
			break;
		case "Digit6":
			keyHeld_6 = value;
			break;
		case "Digit7":
			keyHeld_7 = value;
			break;
		case "Digit8":
			keyHeld_8 = value;
			break;
		case "Digit9":
			keyHeld_9 = value;
			break;
		case "Digit0":
			keyHeld_0 = value;
			break;
		case "Minus":
			keyHeld_Minus = value;
			break;
		case "Equal":
			keyHeld_Equal = value;
			break;

		case "KeyQ":
			keyHeld_Q = value;
			break;
		case "KeyW":
			if (levelEditorEnabled == false) {
				keyHeld_Jump = value;
			}
			keyHeld_W = value;
			break;
		case "KeyE":
			keyHeld_E = value;
			break;
		case "KeyR":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				// Prevents the deathcount from increasing in realtime on the score screen
				if (scoreScreenOpen == false) {
					player.deathAnimationStarted = true;
				}
			}
			break;
		case "KeyT":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				saveLevelInSession(currentLevel);
			}
			break;
		case "KeyY":
			keyHeld_Y = value;
			break;
		case "KeyU":
			keyHeld_U = value;
			break;
		case "KeyI":
			keyHeld_I = value;
			break;
		case "KeyO":
			keyHeld_O = value;
			break;
		case "KeyP":
			keyHeld_P = value;
			break;
		case "BracketLeft":
			keyHeld_BracketLeft = value;
			break;
		case "BracketRight":
			keyHeld_BracketRight = value;
			break;

		case "KeyA":
			if (levelEditorEnabled == false) {
				keyHeld_Left = value;
			}
			keyHeld_A = value;
			break;
		case "KeyS":
			keyHeld_S = value;
			break;
		case "KeyD":
			if (levelEditorEnabled == false) {
				keyHeld_Right = value;
			}
			keyHeld_D = value;
			break;
		case "KeyF":
			keyHeld_F = value;
			break;
		case "KeyG":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				gridEnabled = !gridEnabled;

				if (levelEditorEnabled) {
					console.log('Grid Enabled');
				} else {
					console.log('Grid Disabled');
				}

			}
			break;
		case "KeyH":
			keyHeld_H = value;
			break;
		case "KeyJ":
			keyHeld_J = value;
			break;
		case "KeyK":
			keyHeld_K = value;
			break;
		case "KeyL":
			keyHeld_L = value;
			break;
		case "Semicolon":
			keyHeld_Semicolon = value;
			break;
		case "Quote":
			keyHeld_Quote = value;
			break;


		case "KeyZ":
			keyHeld_Z = value;
			break;
		case "KeyX":
			keyHeld_X = value;
			break;
		case "KeyC":
			keyHeld_C = value;
			break;
		case "KeyV":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				outputLevelToConsole();
			}
			break;
		case "KeyB":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				levelEditorEnabled = !levelEditorEnabled;

				if (levelEditorEnabled) {
					console.log('Map Editor Enabled');
				} else {
					console.log('Map Editor Disabled');
				}

			}
			break;
		case "KeyN":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				helpBGEnabled = !helpBGEnabled;

				if (helpBGEnabled) {
					console.log('BG Enabled');
				} else {
					console.log('BG Disabled');
				}

			}
			break;
		case "KeyM":
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				musicEnabled = !musicEnabled;

				if (musicEnabled) {
					console.log('music Enabled');
				} else {
					console.log('music Disabled');
				}
			}
			break;
		case "Comma":
			keyHeld_Comma = value;
			break;
		case "Period":
			keyHeld_Period = value;
			break;
		case "Slash":
			keyHeld_Slash = value;
			break;


		case "ArrowUp":
			if (currentLevel > 2) {
				keyHeld_DashUp = value;
			}
			keyHeld_ArrowUp = value;
			break;
		case "ArrowDown":
			keyHeld_ArrowDown = value;
			break;
		case "ArrowLeft":
			if (currentLevel > 2) {
				keyHeld_DashLeft = value;
			}
			keyHeld_ArrowLeft = value;
			break;
		case "ArrowRight":
			if (currentLevel > 2) {
				keyHeld_DashRight = value;
			}
			keyHeld_ArrowRight = value;
			break;
		case "Enter":
			keyHeld_Enter = value;
			break;
		case "Space":
			// keyHeld_Jump = value; // I honestly feel that the game feel sucks if the player uses space, therefore i'm not even allowing it
			keyHeld_Space = value;
			break;
		case "Delete":
			keyHeld_Delete = value;
			break;

		case "Numpad1":
			keyHeld_Num1 = value;
			break;
		case "Numpad2":
			keyHeld_Num2 = value;
			break;
		case "Numpad3":
			keyHeld_Num3 = value;
			break;
		case "Numpad4":
			keyHeld_Num4 = value;
			break;
		case "Numpad5":
			keyHeld_Num5 = value;
			break;
		case "Numpad6":
			keyHeld_Num6 = value;
			break;
		case "Numpad7":
			keyHeld_Num7 = value;
			break;
		case "Numpad8":
			keyHeld_Num8 = value;
			break;
		case "Numpad9":
			keyHeld_Num9 = value;
			break;
		case "Numpad0":
			keyHeld_Num0 = value;
			break;
		case "NumpadDivide":
			keyHeld_Divide = value;
			break;
		case "NumpadMultiply":
			keyHeld_Multiply = value;
			break;
		case "NumpadSubtract":
			keyHeld_Subtract = value;
			break;
		case "NumpadAdd":
			keyHeld_Add = value;
			break;
		case "NumpadDecimal":
			keyHeld_Decimal = value;
			break;

		default : 
			keyUsedByGame = false;
			break;
	}

	if (keyUsedByGame) {
		evt.preventDefault();
	}
}

function mouseMoveHandler(evt) {
	var rect = canvas.getBoundingClientRect();

	mouseX = (evt.clientX - rect.left) / PIXEL_SCALE_UP;
	mouseY = (evt.clientY - rect.top) / PIXEL_SCALE_UP;

}