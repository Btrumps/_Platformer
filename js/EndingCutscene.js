const CUTSCENE_PAUSE = 0;
const CUTSCENE_WALK_RIGHT = 1;
const CUTSCENE_STOP = 2;
const CUTSCENE_RUN_AND_JUMP = 3;
const CUTSCENE_DASH = 4;
const CUTSCENE_COLLECTIBLE_OBTAINED = 5;
const CUTSCENE_SOUND_PLAYOUT = 6;

const PAUSE_RUNTIME = 30;
const WALK_RIGHT_RUNTIME = 35;
const STOP_RUNTIME = 30;
const RUN_JUMP_RUNTIME = 10;
const DASH_RUNTIME = 8;
const COLLECTIBLE_OBTAINED_RUNTIME = 15;
const SOUND_PLAYOUT_RUNTIME = 15;

var endingCutsceneStarted = false;
var actionTimer = 0;

var actionsToAccomplish = [	PAUSE_RUNTIME,
							WALK_RIGHT_RUNTIME,
							STOP_RUNTIME,
							RUN_JUMP_RUNTIME,
							DASH_RUNTIME,
							COLLECTIBLE_OBTAINED_RUNTIME];
var whichAction = 0;
function controlPlayerForEnding() {

	if (actionsToAccomplish[whichAction] == null) {
		return;
	}

	if (actionTimer < actionsToAccomplish[whichAction]) {
		actionTimer++;

		if (whichAction == CUTSCENE_PAUSE) {
			if (thirdSong.volume > 0.02) {
				thirdSong.volume -= 0.01;
			}			
		} else if (whichAction == CUTSCENE_WALK_RIGHT) {
			thirdSong.currentTime = 0;
			thirdSong.pause();
			thirdSong.volume = THIRD_SONG_VOLUME;
			playSound(victorySound, VICTORY_VOLUME);
			keyHeld_Right = true;
		} else if (whichAction == CUTSCENE_STOP) {
			// do nothing
		} else if (whichAction == CUTSCENE_RUN_AND_JUMP) {
			keyHeld_Right = true;
			keyHeld_Jump = true;
		} else if (whichAction == CUTSCENE_DASH) {
			keyHeld_DashUp = true;
		} else if (whichAction == CUTSCENE_COLLECTIBLE_OBTAINED) {
			collectibleObtainedLargeAnim.update();
		} else if (whichAction == CUTSCENE_SOUND_PLAYOUT) {
			// do nothing
		}

	} else {

		if (whichAction == CUTSCENE_PAUSE) {
			// do nothing
		} else if (whichAction == CUTSCENE_WALK_RIGHT) {
			keyHeld_Right = false;
		} else if (whichAction == CUTSCENE_STOP) {
			// do nothing
		} else if (whichAction == CUTSCENE_RUN_AND_JUMP) {
			keyHeld_Right = false;
			keyHeld_Jump = false;
		} else if (whichAction == CUTSCENE_DASH) {
			keyHeld_DashUp = false;
		} else if (whichAction == CUTSCENE_COLLECTIBLE_OBTAINED) {
			playSound(collectibleObtainedSound, COLLECTIBLE_OBTAINED_VOLUME);
		} else if (whichAction == CUTSCENE_SOUND_PLAYOUT) {
			// do nothing
		}

		actionTimer = 0;
		whichAction++;
		console.log(whichAction);
	}
	
}