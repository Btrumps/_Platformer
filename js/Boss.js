const BOSS_WIDTH = 48;
const BOSS_HEIGHT = 48;


const BOSS_STATE_INTRO = 1;
const BOSS_STATE_DROP_BLOCKS = 2;
const BOSS_STATE_SLAM = 3;
const BOSS_STATE_VULERNABLE = 4;

function bossClass() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.width = BOSS_WIDTH;
	this.height = BOSS_HEIGHT;

	this.currentState = BOSS_STATE_INTRO;

	this.move = function() {
		if (this.currentState == BOSS_STATE_INTRO) {

		}

		if (this.currentState == BOSS_STATE_DROP_BLOCKS) {

		}

		if (this.currentState == BOSS_STATE_SLAM) {

		}

		if (this.currentState == BOSS_STATE_VULERNABLE) {

		}
	}

	this.draw = function() {
		colorRect(this.x - BOSS_WIDTH / 2, this.y - BOSS_HEIGHT / 2, BOSS_WIDTH, BOSS_HEIGHT, 'white');
	}
}