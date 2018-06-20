const BOSS_WIDTH = 48;
const BOSS_HEIGHT = 48;


const BOSS_STATE_INTRO = 1;
const BOSS_STATE_SLAM = 2;
const BOSS_STATE_MOVING_TO_PLAYER = 3;
const BOSS_STATE_VULNERNABLE = 4;
const BOSS_STATE_ENRAGED = 5; // after two hits, boss will get enraged and cycle faster

function bossClass() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.width = BOSS_WIDTH;
	this.height = BOSS_HEIGHT;

	this.breathing1 = 0; // osc1
	this.breathing2 = 0; // osc2
	this.breathPercentage = 1.0;

	this.currentState = BOSS_STATE_INTRO;

	this.move = function() {
		switch(this.currentState) {
			case BOSS_STATE_INTRO:
				this.breathPercentage = 1.0;
				break;
			case BOSS_STATE_MOVING_TO_PLAYER:
				this.breathPercentage = 0.1;
				break;
		}


	}

	this.draw = function() {
		var suppressedSideToSide = 0.5;
		var breathing1_Length = 2;
		var breathing2_Length = 1;
		this.breathing1 += 0.09;
		this.breathing2 -= 0.055;

		colorRect(	Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
					Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)),
					BOSS_WIDTH,
					BOSS_HEIGHT,
					'white');
	}
}