const KEY_HELD_TIME_MAX = 15;
var keyHeld_Left = false; 
var keyHeld_Right = false;
var keyHeld_Jump = false;
var keyHeld_Run = false;

var keyHeld_1 = false;
var keyHeld_2 = false;
var keyHeld_3 = false;
var keyHeld_4 = false;
var keyHeld_5 = false;
var keyHeld_T = false;
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
		case "KeyA" :
			keyHeld_Left = value;
			break;
		case "ArrowLeft" :
			keyHeld_Left = value;
			break;

		case "KeyD" :
			keyHeld_Right = value;
			break;
		case "ArrowRight" :
			keyHeld_Right = value;
			break;

		case "KeyW" :
			keyHeld_Jump = value;
			break;
		case "KeyZ" :
			keyHeld_Jump = value;
			break;

		case "ShiftLeft" :
			keyHeld_Run = value;
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

		case "KeyV" :
			if (keyHeld_Timer >= KEY_HELD_TIME_MAX) {
				keyHeld_Timer = 0;
				outputLevelToConsole();
			}
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
		case "KeyT" :
			keyHeld_T = value;
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
