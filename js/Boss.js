const BOSS_WIDTH = 48;
const BOSS_HEIGHT = 48;

const BOSS_FIGHT_1_FLOOR_Y = 368;

const BOSS_CHASE_SPEED = 3;
const BOSS_RETURN_TO_CHASE_SPEED = 3;
const BOSS_SLAM_SPEED = 5;
const BOSS_CHASE_DEADZONE = 5;

const BOSS_INTRO_MAX_TIME = 60;
const BOSS_SLAM_ANTICIPATION_FRAMES = 12;
const BOSS_VULERNABLE_MAX_TIME = 15;
const BOSS_DAMAGE_TAKEN_COOLDOWN = 30;

const BOSS_STATE_INTRO = 1;
const BOSS_STATE_CHASE_PLAYER = 2;
const BOSS_STATE_SLAM = 3;
const BOSS_STATE_VULNERNABLE = 4;
const BOSS_STATE_RETURN_TO_CHASE = 5;
const BOSS_STATE_ENRAGED = 6; // after two hits, boss will get enraged and cycle faster

function bossClass() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;

	this.topEdge = this.y  - BOSS_HEIGHT / 2;
	this.bottomEdge = this.y + BOSS_HEIGHT / 2;
	this.leftEdge = this.x - BOSS_WIDTH / 2;
	this.rightEdge = this.x + BOSS_WIDTH / 2;

	this.breathing1 = 0; // osc1
	this.breathing2 = 0; // osc2
	this.breathPercentage = 1.0;

	this.tookDamage = false;
	this.health = 3;

	this.introTimer = 0;
	this.slamAnticipationTimer = 0;
	this.vulernableTimer = 0;
	this.damageTakenCooldownTimer = 0;

	this.currentState = BOSS_STATE_INTRO;

	this.move = function() {
		switch(this.currentState) {

			case BOSS_STATE_INTRO:
				this.breathPercentage = 1.0;
				if (this.introTimer < BOSS_INTRO_MAX_TIME) {
					this.introTimer++;
				} else {
					this.currentState = BOSS_STATE_CHASE_PLAYER;
					this.introTimer = 0;
				}
				break;

			case BOSS_STATE_CHASE_PLAYER:
				this.breathPercentage = 1.0;
				if (this.x > player.x + BOSS_CHASE_DEADZONE) {
					this.x -= BOSS_CHASE_SPEED;
				} else if (this.x < player.x - BOSS_CHASE_DEADZONE) {
					this.x += BOSS_CHASE_SPEED;
				} else {
					if (player.y < boss.y) {
						// maybe change to another state to attack the player when they are above the boss
					} else {
						this.currentState = BOSS_STATE_SLAM;
					}
				}
				break;

			case BOSS_STATE_SLAM:
				if (this.slamAnticipationTimer < BOSS_SLAM_ANTICIPATION_FRAMES) {
					this.breathPercentage = 1.0;
					this.slamAnticipationTimer++;
					this.y -= 1;
				} else {
					this.breathPercentage = 0;
					if (this.y + BOSS_HEIGHT / 2 < BOSS_FIGHT_1_FLOOR_Y) {
						this.y += BOSS_SLAM_SPEED;
					} else if (this.y + BOSS_HEIGHT / 2 >= BOSS_FIGHT_1_FLOOR_Y) {
						this.currentState = BOSS_STATE_VULNERNABLE;
						this.slamAnticipationTimer = 0;
					}
				}
				break;

			case BOSS_STATE_VULNERNABLE:
				this.breathPercentage = 0;
				if (this.vulernableTimer < BOSS_VULERNABLE_MAX_TIME) {
					this.vulernableTimer++;
				} else {
					this.currentState = BOSS_STATE_RETURN_TO_CHASE;
					this.vulernableTimer = 0;
					bossSlamAnim.reset();
				}
				break;

			case BOSS_STATE_RETURN_TO_CHASE:
				this.breathPercentage = 1.0;
				if (this.y > canvas.height / 2) {
					this.y -= BOSS_RETURN_TO_CHASE_SPEED;
				} else {
					this.currentState = BOSS_STATE_CHASE_PLAYER;
				}

		}	

		checkBossCollisionsWithPlayer();

		this.damageHandling();
	}

	this.damageHandling = function() {
		// at the start of the counter, deduct health from the boss so that we can show an animation for boss taking damage
		if (this.tookDamage && this.damageTakenCooldownTimer == 0) {
			this.health--;
		}

		// we need to have this here or the boss will take damage every frame while the spike is inside the boss
		if (this.tookDamage && this.damageTakenCooldownTimer < BOSS_DAMAGE_TAKEN_COOLDOWN) {
			this.damageTakenCooldownTimer++;

		} else if (this.tookDamage && this.damageTakenCooldownTimer >= BOSS_DAMAGE_TAKEN_COOLDOWN) {
			this.tookDamage = false;
			this.damageTakenCooldownTimer = 0;
		}

		// need to have player.deathAnimationStarted as false or the player can win when the spike hits the boss
		if (this.health <= 0 && player.deathAnimationStarted == false) {
			scoreScreenOpen = true;
		}
	}

	this.recalculateCollisionEdges = function() {
		this.topEdge = this.y  - BOSS_HEIGHT / 2;
		this.bottomEdge = this.y + BOSS_HEIGHT / 2;
		this.leftEdge = this.x - BOSS_WIDTH / 2;
		this.rightEdge = this.x + BOSS_WIDTH / 2;
	}

	this.draw = function() {
		var suppressedSideToSide = 0.5;
		var breathing1_Length = 2;
		var breathing2_Length = 1;
		this.breathing1 += 0.092;
		this.breathing2 -= 0.053;

		if (this.currentState == BOSS_STATE_SLAM || this.currentState == BOSS_STATE_VULNERNABLE) {
			bossSlamAnim.render(Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
			                    Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
			bossSlamAnim.update();
		} else {
			bossIntroAnim.render(Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
			                    Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
		}


		/*
		colorRect(	Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
					Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)),
					BOSS_WIDTH,
					BOSS_HEIGHT,
					'white');
		*/
	}
}