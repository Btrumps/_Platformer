const BOSS_WIDTH = 48;
const BOSS_HEIGHT = 48;
const BOSS_MAX_HEALTH = 3;

const BOSS_FIGHT_1_FLOOR_Y = 368;

const BOSS_CHASE_SPEED = 4;
const BOSS_ROOM_SLAM_CHASE_SPEED = 6;
const BOSS_SLAM_SPEED = 6;
const BOSS_ROOM_SLAM_SPEED = 7;
const BOSS_RETURN_TO_CHASE_SPEED = 4;
const BOSS_RETURN_TO_ROOM_SLAM_SPEED = 7;

const BOSS_ENRAGE_CHASE_SPEED = 6;
const BOSS_ENRAGE_ROOM_SLAM_CHASE_SPEED = 8;
const BOSS_ENRAGE_SLAM_SPEED = 7;
const BOSS_ENRAGE_ROOM_SLAM_SPEED = 8;
const BOSS_ENRAGE_RETURN_TO_CHASE_SPEED = 6;
const BOSS_ENRAGE_RETURN_TO_ROOM_SLAM_SPEED = 7;

const BOSS_CHASE_DEADZONE = 5;

const BOSS_INTRO_MAX_TIME = 60;
const BOSS_SLAM_ANTICIPATION_FRAMES = 12;
const BOSS_VULERNABLE_MAX_TIME = 30;
const BOSS_DAMAGE_TAKEN_COOLDOWN = 30;

const BOSS_ROOM_SLAM_1_X = 64 - TILE_WIDTH / 2;
const BOSS_ROOM_SLAM_2_X = 144 + TILE_WIDTH / 2;
const BOSS_ROOM_SLAM_3_X = 256;
const BOSS_ROOM_SLAM_4_X = 352 + TILE_WIDTH / 2;
const BOSS_ROOM_SLAM_5_X = 448 + TILE_WIDTH / 2;

const BOSS_STATE_INTRO = 1;
const BOSS_STATE_PICKING_MOVE = 2;
const BOSS_STATE_CHASE_PLAYER = 3;
const BOSS_STATE_READYING_FOR_ROOM_SLAM = 4;
const BOSS_STATE_SLAM = 5;
const BOSS_STATE_ROOM_SLAM = 6;
const BOSS_STATE_VULNERABLE = 7;
const BOSS_STATE_RETURN_TO_CHASE = 8;
const BOSS_STATE_RETURN_TO_ROOM_SLAM = 9;
const BOSS_STATE_ENRAGED = 10; // after two hits, boss will get enraged and cycle faster

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
	this.health = BOSS_MAX_HEALTH;

	this.chaseSpeed = BOSS_CHASE_SPEED;
	this.roomSlamChaseSpeed = BOSS_ROOM_SLAM_CHASE_SPEED;
	this.slamSpeed = BOSS_SLAM_SPEED;
	this.roomSlamSpeed = BOSS_ROOM_SLAM_SPEED;
	this.returnToChaseSpeed = BOSS_RETURN_TO_CHASE_SPEED;
	this.returnToRoomSlamSpeed = BOSS_RETURN_TO_ROOM_SLAM_SPEED;

	this.roomSlamNumber = 1;
	this.reversed = false;

	this.introTimer = 0;
	this.slamAnticipationTimer = 0;
	this.vulernableTimer = 0;
	this.damageTakenCooldownTimer = 0;

	this.currentState = BOSS_STATE_INTRO;

	this.move = function() {

		if (this.health == 1) {
			this.chaseSpeed = BOSS_ENRAGE_CHASE_SPEED;
			this.roomSlamChaseSpeed = BOSS_ENRAGE_ROOM_SLAM_CHASE_SPEED;
			this.slamSpeed = BOSS_ENRAGE_SLAM_SPEED;
			this.roomSlamSpeed = BOSS_ENRAGE_ROOM_SLAM_SPEED;
			this.returnToChaseSpeed = BOSS_ENRAGE_RETURN_TO_CHASE_SPEED;
			this.returnToRoomSlamSpeed = BOSS_ENRAGE_RETURN_TO_ROOM_SLAM_SPEED;
		} else {
			this.chaseSpeed = BOSS_CHASE_SPEED;
			this.roomSlamChaseSpeed = BOSS_ROOM_SLAM_CHASE_SPEED;
			this.slamSpeed = BOSS_SLAM_SPEED;
			this.roomSlamSpeed = BOSS_ROOM_SLAM_SPEED;
			this.returnToChaseSpeed = BOSS_RETURN_TO_CHASE_SPEED;
			this.returnToRoomSlamSpeed = BOSS_RETURN_TO_ROOM_SLAM_SPEED;
		}

		switch(this.currentState) {

			case BOSS_STATE_INTRO:
				this.breathPercentage = 1.0;
				if (this.introTimer < BOSS_INTRO_MAX_TIME) {
					this.introTimer++;
				} else {
					this.currentState = BOSS_STATE_PICKING_MOVE;
					this.introTimer = 0;
				}
				break;

			case BOSS_STATE_PICKING_MOVE:
				var randomNumber = Math.random();
				if (this.health == BOSS_MAX_HEALTH) {
					this.randomNumber = 0;
				}
				if (randomNumber <= .6) {
					this.currentState = BOSS_STATE_CHASE_PLAYER;
				} else {
					this.currentState = BOSS_STATE_READYING_FOR_ROOM_SLAM;

					randomNumber = Math.random();
					if (randomNumber < .5) {
						this.reversed = true;
						this.roomSlamNumber = 5;
					} else {
						this.reversed = false;
						this.roomSlamNumber = 1;
					}
				}
				break;

			case BOSS_STATE_CHASE_PLAYER:
				this.breathPercentage = 1.0;

				if (this.x > player.x + BOSS_CHASE_DEADZONE) {
					this.x -= this.chaseSpeed;
				} else if (this.x < player.x - BOSS_CHASE_DEADZONE) {
					this.x += this.chaseSpeed;
				} else {
					if (player.y < boss.y) {
						// maybe change to another state to attack the player when they are above the boss
					} else {
						this.currentState = BOSS_STATE_SLAM;
					}
				}
				break;

			case BOSS_STATE_READYING_FOR_ROOM_SLAM:
				var whichSlamX;

				if (this.roomSlamNumber == 1) {
					whichSlamX = BOSS_ROOM_SLAM_1_X;
				} else if (this.roomSlamNumber == 2) {
					whichSlamX = BOSS_ROOM_SLAM_2_X;
				} else if (this.roomSlamNumber == 3) {
					whichSlamX = BOSS_ROOM_SLAM_3_X;
				} else if (this.roomSlamNumber == 4) {
					whichSlamX = BOSS_ROOM_SLAM_4_X;
				} else if (this.roomSlamNumber == 5) {
					whichSlamX = BOSS_ROOM_SLAM_5_X;
				}

				
				if (this.x < whichSlamX) {
					if (whichSlamX - this.x < this.roomSlamChaseSpeed) {
						this.x = whichSlamX;
					} else {
						this.x += this.roomSlamChaseSpeed;
					}
					
				} else if (this.x > whichSlamX) {
					if (this.x - whichSlamX < this.roomSlamChaseSpeed) {
						this.x = whichSlamX;
					} else {
						this.x -= this.roomSlamChaseSpeed;
					}
					
				}

				if (this.x == whichSlamX) {
					this.currentState = BOSS_STATE_ROOM_SLAM;
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
						this.y += this.slamSpeed;
					} else if (this.y + BOSS_HEIGHT / 2 >= BOSS_FIGHT_1_FLOOR_Y) {
						this.currentState = BOSS_STATE_VULNERABLE;
						this.slamAnticipationTimer = 0;
					}
				}
				break;

			case BOSS_STATE_VULNERABLE:
				this.breathPercentage = 0;
				if (this.vulernableTimer < BOSS_VULERNABLE_MAX_TIME && this.health > 1) {
					this.vulernableTimer++;
				} else {
					this.currentState = BOSS_STATE_RETURN_TO_CHASE;
					this.vulernableTimer = 0;
					bossSlamAnim.reset();
				}
				break;

			case BOSS_STATE_ROOM_SLAM:
				this.breathPercentage = 0;

				if (this.y + BOSS_HEIGHT / 2 < BOSS_FIGHT_1_FLOOR_Y) {
					this.y += this.roomSlamSpeed;

				} else if (this.y + BOSS_HEIGHT / 2 >= BOSS_FIGHT_1_FLOOR_Y) {
					this.currentState = BOSS_STATE_RETURN_TO_ROOM_SLAM;
				}
				break;		

			case BOSS_STATE_RETURN_TO_CHASE:
				this.breathPercentage = 1.0;
				var randomReturnPointY = Math.random() * 20;
				if (this.y > (canvas.height / 2) + randomReturnPointY) {
					this.y -= this.returnToChaseSpeed;
				} else {
					this.currentState = BOSS_STATE_PICKING_MOVE;
				}
				break;

			case BOSS_STATE_RETURN_TO_ROOM_SLAM:
				this.breathPercentage = 1.0;
				var randomReturnPointY = Math.random() * 20;
				if (this.y > (canvas.height / 2) + randomReturnPointY) {
					this.y -= this.returnToRoomSlamSpeed;
				} else {
					if (this.roomSlamNumber == 5 && this.reversed == false) {
						this.currentState = BOSS_STATE_PICKING_MOVE;
					} else if (this.reversed == false) {
						this.roomSlamNumber++;
						this.currentState = BOSS_STATE_READYING_FOR_ROOM_SLAM;
					} else if (this.roomSlamNumber == 1 && this.reversed) {
						this.currentState = BOSS_STATE_PICKING_MOVE;
					} else if (this.reversed) {
						this.roomSlamNumber--;
						this.currentState = BOSS_STATE_READYING_FOR_ROOM_SLAM;
					}
				}
				break;

		}

		this.recalculateCollisionEdges();

		if (player.deathAnimationStarted == false) {
			checkBossCollisionsWithPlayer();
		}
		

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

		if (this.health <= 1) {
			canvasContext.drawImage(bossEnragedFace,
				                    Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
				                    Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
		} else {
			if (this.currentState == BOSS_STATE_SLAM ||
				this.currentState == BOSS_STATE_VULNERABLE) {
				bossSlamAnim.render(Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
				                    Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
				bossSlamAnim.update();
			} else if (this.currentState == BOSS_STATE_RETURN_TO_CHASE) {
				canvasContext.drawImage(bossReturningToChaseFace,
				                        Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
				                    	Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
			} else if (this.currentState == BOSS_STATE_ROOM_SLAM ||
			           this.currentState == BOSS_STATE_RETURN_TO_ROOM_SLAM ||
			           this.currentState == BOSS_STATE_READYING_FOR_ROOM_SLAM) {
				canvasContext.drawImage(bossRoomSlamFace,
				                        Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
				                    	Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
			} else {
				bossIntroAnim.render(Math.floor(this.x - BOSS_WIDTH / 2 + this.breathPercentage * suppressedSideToSide * (Math.cos(this.breathing1) * breathing1_Length + Math.cos(this.breathing2) * breathing2_Length)),
				                    Math.floor(this.y - BOSS_HEIGHT / 2 + this.breathPercentage * (Math.sin(this.breathing1) * breathing1_Length + Math.sin(this.breathing2) * breathing2_Length)) );
			}
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