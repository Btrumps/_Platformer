const CUTSCENE_PAUSE = 0;
const CUTSCENE_WALK_RIGHT = 1;
const CUTSCENE_STOP = 2;
const CUTSCENE_RUN_AND_JUMP = 3;
const CUTSCENE_DASH = 4;
const CUTSCENE_COLLECTIBLE_OBTAINED = 5;
const CUTSCENE_SOUND_PLAYOUT = 6;
const CUTSCENE_DROP = 7;

const PAUSE_RUNTIME = 30;
const WALK_RIGHT_RUNTIME = 35;
const STOP_RUNTIME = 30;
const RUN_JUMP_RUNTIME = 10;
const DASH_RUNTIME = 8;
const COLLECTIBLE_OBTAINED_RUNTIME = 12;
const SOUND_PLAYOUT_RUNTIME = 35;
const DROP_RUNTIME = 100;

var endingCutsceneStarted = false;
var actionTimer = 0;

var actionsToAccomplish = [	PAUSE_RUNTIME,
							WALK_RIGHT_RUNTIME,
							STOP_RUNTIME,
							RUN_JUMP_RUNTIME,
							DASH_RUNTIME,
							COLLECTIBLE_OBTAINED_RUNTIME,
							SOUND_PLAYOUT_RUNTIME,
							CUTSCENE_DROP];
var whichAction = 0;
function controlPlayerForEnding() {

	if (actionsToAccomplish[whichAction] == null) {
		return;
	}

	if (actionTimer < actionsToAccomplish[whichAction]) {
		actionTimer++;

		switch (whichAction) {

			case CUTSCENE_PAUSE:
				if (thirdSong.volume > 0.02) {
					thirdSong.volume -= 0.01;
				}
				break;

			case CUTSCENE_WALK_RIGHT:
				thirdSong.currentTime = 0;
				thirdSong.pause();
				thirdSong.volume = THIRD_SONG_VOLUME;
				playSound(victorySound, VICTORY_VOLUME);
				keyHeld_Right = true;
				break;

			case CUTSCENE_STOP:
				// do nothing
				break;

			case CUTSCENE_RUN_AND_JUMP:
				keyHeld_Right = true;
				keyHeld_Jump = true;
				break;

			case CUTSCENE_DASH:
				keyHeld_DashUp = true;
				break;

			case CUTSCENE_COLLECTIBLE_OBTAINED:
				collectibleObtainedLargeAnim.update();
				break;

			case CUTSCENE_SOUND_PLAYOUT:
				// player.js is suspending the player in the air
				break;

			case CUTSCENE_DROP:
				// do nothing
				break;

		}

	} else {

		switch (whichAction) {

			case CUTSCENE_PAUSE:
				// do nothing
				break;

			case CUTSCENE_WALK_RIGHT:
				keyHeld_Right = false;
				break;

			case CUTSCENE_STOP:
				// do nothing
				break;

			case CUTSCENE_RUN_AND_JUMP:
				keyHeld_Right = false;
				keyHeld_Jump = false;
				break;

			case CUTSCENE_DASH:
				keyHeld_DashUp = false;
				break;

			case CUTSCENE_COLLECTIBLE_OBTAINED:
				playSound(collectibleObtainedSound, COLLECTIBLE_OBTAINED_VOLUME);
				break;

			case CUTSCENE_SOUND_PLAYOUT:
				// do nothing
				break;

			case CUTSCENE_DROP:
				// do nothing
				break;

		}

		actionTimer = 0;
		whichAction++;
		console.log(whichAction);
	}
	
}