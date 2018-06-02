const KEY_HELD_TIME_MAX = 15;
var keyHeld_Left = false; 
var keyHeld_Right = false;
var keyHeld_Jump = false;
var keyHeld_Run = false;

var keyHeld_Q = false;
var keyHeld_W = false;
var keyHeld_E = false;
var keyHeld_R = false;
var keyHeld_T = false;
var keyHeld_Y = false;
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

var keyHeld_C = false;
var keyHeld_V = false;
var keyHeld_Minus = false;
var keyHeld_Equal = false;

var keyHeld_Timer = KEY_HELD_TIME_MAX;

var mouseX;
var mouseY;

function keyDownHandler(evt) {
	setValuesForKey(evt, true);
}

function keyUpHandler(evt) {
	setValuesForKey(evt, false);
	keyHeld_Timer = KEY_HELD_TIME_MAX;
}

function setValuesForKey(evt, value) {
	switch (evt.code) {

		case "ArrowLeft" :
			keyHeld_Left = value;
			break;

		case "ArrowRight" :
			keyHeld_Right = value;
			break;


		case "ArrowUp" :
			keyHeld_Jump = value;
			break;

		case "KeyZ" :
			keyHeld_Jump = value;
			break;


		// Map editor stuff
		case "KeyB" :
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				mapEditorEnabled = !mapEditorEnabled;

				if (mapEditorEnabled) {
					console.log('Map Editor Enabled');
				} else {
					console.log('Map Editor Disabled');
				}

			}
			break;

		case "KeyN" :
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				bgEnabled = !bgEnabled;

				if (mapEditorEnabled) {
					console.log('BG Enabled');
				} else {
					console.log('BG Disabled');
				}

			}
			break;

		case "KeyV" :
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				outputLevelToConsole();
			}
			break;

		case "KeyQ" :
			keyHeld_Q = value;
			break;
		case "KeyW" :
			keyHeld_W = value;
			break;
		case "KeyE" :
			keyHeld_E = value;
			break;
		case "KeyR" :
			keyHeld_R = value;
			break;
		case "KeyT" :
			keyHeld_T = value;
			break;
		case "KeyY" :
			keyHeld_Y = value;
			break;
		case "Digit1" :
			keyHeld_1 = value;
			break;
		case "Digit2" :
			keyHeld_2 = value;
			break;
		case "Digit3" :
			keyHeld_3 = value;
			break;
		case "Digit4" :
			keyHeld_4 = value;
			break;
		case "Digit5" :
			keyHeld_5 = value;
			break;
		case "Digit6" :
			keyHeld_6 = value;
			break;
		case "Digit7" :
			keyHeld_7 = value;
			break;
		case "Digit8" :
			keyHeld_8 = value;
			break;
		case "Digit9" :
			keyHeld_9 = value;
			break;
		case "Digit0" :
			keyHeld_0 = value;
			break;
		case "KeyC" :
			keyHeld_C = value;
			break;
		case "Minus" :
			keyHeld_Minus = value;
			break;
		case "Equal" :
			keyHeld_Equal = value;
			break;
	}
}

function mouseMoveHandler(evt) {
	var rect = canvas.getBoundingClientRect();

	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;

}
