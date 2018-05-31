var keyHeld_Left = false; 
var keyHeld_Right = false;
var keyHeld_Jump = false;
var keyHeld_Run = false;

function keyDownHandler(evt) {
	setValuesForKey(evt, true);
}

function keyUpHandler(evt) {
	setValuesForKey(evt, false);
}

function setValuesForKey(evt, value) {
	switch (evt.code) {
		case "KeyA":
			keyHeld_Left = value;
			break;
		case "ArrowLeft":
			keyHeld_Left = value;
			break;

		case "KeyD":
			keyHeld_Right = value;
			break;
		case "ArrowRight":
			keyHeld_Right = value;
			break;

		case "KeyW":
			keyHeld_Jump = value;
			break;
		case "KeyZ":
			keyHeld_Jump = value;
			break;

		case "ShiftLeft":
			keyHeld_Run = value;
			break;
	}
}