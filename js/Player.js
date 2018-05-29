const PLAYER_SPEED = 5;
const PLAYER_VEL_X_DECAY = 0.60;
const PLAYER_JUMP_SPEED = 2.2;
const VARIABLE_JUMP_WINDOW = 6;
const GRAVITY = 1;

const PLAYER_SQUARE_LENGTH = 20;

// TODO: Remove hardcoded values
// PlayerX/Y are in the center of the rect
var playerX = CANVAS_WIDTH / 2; 
var playerY = CANVAS_HEIGHT - PLAYER_SQUARE_LENGTH/2;

var playerLeftEdge;
var playerRightEdge;
var playerTopEdge;
var playerBottomEdge;


var playerVelX = 0;
var playerVelY = 0;

var variableJumpCounter = 0;

function movePlayer() {
	
	if (keyHeld_Left) {
		playerVelX -= PLAYER_SPEED;
	}

	if (keyHeld_Right) {
		playerVelX += PLAYER_SPEED;
	}

	if (keyHeld_Jump && variableJumpCounter <= VARIABLE_JUMP_WINDOW) {
		playerVelY -= PLAYER_JUMP_SPEED;
		variableJumpCounter++;
	}

	playerVelX *= PLAYER_VEL_X_DECAY;
	playerVelY += GRAVITY;

	playerX += playerVelX;
	playerY += playerVelY;

	wallCollisionChecks();

}

function drawPlayer () {
	colorRect(	playerX - PLAYER_SQUARE_LENGTH/2,
				playerY - PLAYER_SQUARE_LENGTH/2,
				PLAYER_SQUARE_LENGTH, PLAYER_SQUARE_LENGTH,
				'red');
}

function wallCollisionChecks() {
	playerLeftEdge = playerX - PLAYER_SQUARE_LENGTH/2;
	playerRightEdge = playerX + PLAYER_SQUARE_LENGTH/2;
	playerTopEdge = playerY - PLAYER_SQUARE_LENGTH/2;
	playerBottomEdge = playerY + PLAYER_SQUARE_LENGTH/2;

	if (playerLeftEdge < 0) {
		playerX = PLAYER_SQUARE_LENGTH/2;
	}
	if (playerRightEdge > CANVAS_WIDTH) {
		playerX = CANVAS_WIDTH - PLAYER_SQUARE_LENGTH/2;
	}
	if (playerTopEdge < 0) {
		playerY = 0 + PLAYER_SQUARE_LENGTH/2;
	}
	if (playerBottomEdge > CANVAS_HEIGHT) {
		playerY = CANVAS_HEIGHT - PLAYER_SQUARE_LENGTH/2;
		playerVelY = 0; // Need to zero out to stop gravity from increasing
		
		if (keyHeld_Jump == false) {
			variableJumpCounter = 0;
		}	
	}
}