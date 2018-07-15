const TEXT_LEVEL_START_X = 15;
const TEXT_LEVEL_START_Y = 25;

const MAIN_MENU_CONTINUE = 1;
const MAIN_MENU_NEW_GAME = 2;
const MAIN_MENU_SPEEDRUN = 3;
const MAIN_MENU_NO = 1;
const MAIN_MENU_YES = 2;

const MAIN_MENU_CONTINUE_START_X = 400;
const MAIN_MENU_CONTINUE_END_X = 650;
const MAIN_MENU_CONTINUE_START_Y = 365;
const MAIN_MENU_CONTINUE_END_Y = 420;

const MAIN_MENU_NEW_GAME_START_X = 400;
const MAIN_MENU_NEW_GAME_END_X = 650;
const MAIN_MENU_NEW_GAME_START_Y = 465;
const MAIN_MENU_NEW_GAME_END_Y = 520;

const MAIN_MENU_SPEEDRUN_START_X = 400;
const MAIN_MENU_SPEEDRUN_END_X = 650;
const MAIN_MENU_SPEEDRUN_START_Y = 565;
const MAIN_MENU_SPEEDRUN_END_Y = 620;

const MAIN_MENU_NO_START_X = 475;
const MAIN_MENU_NO_END_X = 550;
const MAIN_MENU_NO_START_Y = 395;
const MAIN_MENU_NO_END_Y = 440;

const MAIN_MENU_YES_START_X = 470;
const MAIN_MENU_YES_END_X = 575;
const MAIN_MENU_YES_START_Y = 465;
const MAIN_MENU_YES_END_Y = 520;

const SPEEDRUN_RESET_TIMES_START_X = 370;
const SPEEDRUN_RESET_TIMES_END_X = 675;
const SPEEDRUN_RESET_TIMES_START_Y = 670;
const SPEEDRUN_RESET_TIMES_END_Y = 725;
const SPEEDRUN_BACK_TO_MAIN_MENU_START_X = 370;
const SPEEDRUN_BACK_TO_MAIN_MENU_END_X = 675;
const SPEEDRUN_BACK_TO_MAIN_MENU_START_Y = 770;
const SPEEDRUN_BACK_TO_MAIN_MENU_END_Y = 825;

const MAIN_MENU_CONTINUE_X = 420;
const MAIN_MENU_CONTINUE_Y = 400;
const MAIN_MENU_NEW_GAME_X = 425;
const MAIN_MENU_NEW_GAME_Y = 500;
const MAIN_MENU_SPEEDRUN_X = 300;
const MAIN_MENU_SPEEDRUN_Y = 600;
const MAIN_MENU_ARE_YOU_SURE_X = 375;
const MAIN_MENU_ARE_YOU_SURE_Y = 325;
const MAIN_MENU_NO_X = 485;
const MAIN_MENU_NO_Y = 425;
const MAIN_MENU_YES_X = 475;
const MAIN_MENU_YES_Y = 500;

const MAIN_MENU_ARE_YOU_SURE_WIDTH = 200;
const MAIN_MENU_ARE_YOU_SURE_HEIGHT = 150;
const MAIN_MENU_ARE_YOU_SURE_BORDER = 10;

const MAIN_MENU_MAX_OPTIONS = 3; // increase this number every time we add something to the menu

const SCORE_SCREEN_TIME_X = 325;
const SCORE_SCREEN_TIME_Y = 300;
const SCORE_SCREEN_DEATHS_X = 325;
const SCORE_SCREEN_DEATHS_Y = 400;
const SCORE_SCREEN_COLLECTIBLES_X = 325;
const SCORE_SCREEN_COLLECTIBLES_Y = 500;

const BACK_TO_MAIN_MENU = 1;

const SCORE_SCREEN_BACK_TO_MAIN_MENU_X = 135;
const SCORE_SCREEN_BACK_TO_MAIN_MENU_Y = 700;
const SCORE_SCREEN_DIST_AWAY_FROM_SUB_TEXT = 350;

const SPEEDRUN_RESET_TIMES = 1;
const SPEEDRUN_BACK_TO_MAIN_MENU = 2;

const SPEEDRUN_ANY_PERC_LABEL_X = 275;
const SPEEDRUN_ANY_PERC_LABEL_Y = 400;
const SPEEDRUN_ANY_PERC_TIME_X = SPEEDRUN_ANY_PERC_LABEL_X + 400;
const SPEEDRUN_ANY_PERC_TIME_Y = SPEEDRUN_ANY_PERC_LABEL_Y;

const SPEEDRUN_HUNDRED_PERC_LABEL_X = SPEEDRUN_ANY_PERC_LABEL_X;
const SPEEDRUN_HUNDRED_PERC_LABEL_Y = SPEEDRUN_ANY_PERC_LABEL_Y + 100;
const SPEEDRUN_HUNDRED_PERC_TIME_X = SPEEDRUN_ANY_PERC_TIME_X;
const SPEEDRUN_HUNDRED_PERC_TIME_Y = SPEEDRUN_HUNDRED_PERC_LABEL_Y;

const SPEEDRUN_RESET_TIMES_X = 385;
const SPEEDRUN_RESET_TIMES_Y = 700;
const SPEEDRUN_BACK_TO_MAIN_MENU_X = 380;
const SPEEDRUN_BACK_TO_MAIN_MENU_Y = 800;

const TOTAL_COLLECTIBLE_COUNT = 13; // change this number to the max amount of collectibles in the final game
const LEVELS_PER_WORLD = 15;

var totalCollectibles = 0;
var totalDeaths = 0;
var totalGameTime = 0;

var gameTimerInterval;

var scoreScreenOpen = false;
var speedrunTimesOpen = false;

var selectedOption = MAIN_MENU_CONTINUE;
var noSavedGame = false;
var mainMenuOpen = true;
var areYouSureOpen = false;

function mainMenuUpdate() {

	// this is so we can grey out continue and start the menu selection on New Game
	// this will only happen once, so it doesn't auto snap selection on the are you sure screen
	if ((getSavedLevel() == null || getSavedLevel() == undefined) && areYouSureOpen == false && selectedOption != MAIN_MENU_SPEEDRUN && speedrunTimesOpen == false) {
		noSavedGame = true;
		selectedOption = MAIN_MENU_NEW_GAME;
	}

	if ((keyHeld_ArrowUp || keyHeld_W) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (noSavedGame && areYouSureOpen == false && mainMenuOpen) {
			if (selectedOption > 2) {
				selectedOption--;
			} else if (selectedOption == 2) {
				selectedOption = MAIN_MENU_MAX_OPTIONS;
			}
		} else if (areYouSureOpen) {
			if (selectedOption > 1) {
				selectedOption--;
			} else {
				selectedOption = MAIN_MENU_YES;
			}
		} else {
			if (selectedOption > 1) {
				selectedOption--;
			} else if (selectedOption == 1) {
				 // change this number to the max number of options so it wraps to the bottom selection
				selectedOption = MAIN_MENU_MAX_OPTIONS;

				if (speedrunTimesOpen) {
					selectedOption = SPEEDRUN_BACK_TO_MAIN_MENU;
				}
			}
		}	
		keyHeld_Timer = 0; // sets timer to 0 to prevent changing every frame
	}

	if ((keyHeld_ArrowDown || keyHeld_S) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (noSavedGame && areYouSureOpen == false && mainMenuOpen) {
			if (selectedOption < MAIN_MENU_MAX_OPTIONS && mainMenuOpen) {
				selectedOption++;
			} else {
				selectedOption = MAIN_MENU_NEW_GAME;
			}
		} else if (areYouSureOpen) {
			if (selectedOption < 2) {
				selectedOption++;
			} else {
				selectedOption = MAIN_MENU_NO;
			}
		} else {
			if (selectedOption < MAIN_MENU_MAX_OPTIONS && mainMenuOpen) {
				selectedOption++;
			} else if (selectedOption < MAIN_MENU_MAX_OPTIONS - 1 && speedrunTimesOpen) {
				selectedOption++;
			} else {
				selectedOption = 1;
			}
		}		
		keyHeld_Timer = 0; // sets timer to 0 to prevent changing every frame
	}


	if ((keyHeld_Enter || keyHeld_Space) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {

		keyHeld_Timer = 0;
		var optionSelectedThisFrame = false;

		if (areYouSureOpen) {
			if (selectedOption == MAIN_MENU_YES) {
				if (mainMenuOpen) {
					startNewGame();
				} else if (speedrunTimesOpen) {
					deleteAllSpeedRunInfo();
					areYouSureOpen = false;
					optionSelectedThisFrame = true;
				}
				
			} else if (selectedOption == MAIN_MENU_NO) {
				if (mainMenuOpen) {
					areYouSureOpen = false;
					optionSelectedThisFrame = true;
				} else if (speedrunTimesOpen) {
					areYouSureOpen = false;
					optionSelectedThisFrame = true;
				}
			}
		}

		if (speedrunTimesOpen &&
			selectedOption == SPEEDRUN_RESET_TIMES &&
			optionSelectedThisFrame == false) {

			areYouSureOpen = true;
			keyHeld_Timer = 0;
		}

		if (speedrunTimesOpen &&
			selectedOption == SPEEDRUN_BACK_TO_MAIN_MENU &&
			optionSelectedThisFrame == false) {

			speedrunTimesOpen = false;
			mainMenuOpen = true;
			optionSelectedThisFrame = true;
		}

		if (selectedOption == MAIN_MENU_NEW_GAME &&
			optionSelectedThisFrame == false) {
			selectedOption = 1;
			areYouSureOpen = true;
			optionSelectedThisFrame = true;
		}

		if (selectedOption == MAIN_MENU_CONTINUE &&
		    optionSelectedThisFrame == false &&
		    noSavedGame == false) {
			
			continueSavedGame();
		}

		if (selectedOption == MAIN_MENU_SPEEDRUN &&
		    optionSelectedThisFrame == false) {
			
			mainMenuOpen = false;
			speedrunTimesOpen = true;
			selectedOption = SPEEDRUN_BACK_TO_MAIN_MENU;
			keyHeld_Timer = 0;
		}
	}
}

function drawMainMenu() {
	canvasContext.drawImage(mainMenuImg, -10,25);

	if (areYouSureOpen) {
		colorRect(	(canvas.width / 2) - (MAIN_MENU_ARE_YOU_SURE_WIDTH /2) - MAIN_MENU_ARE_YOU_SURE_BORDER / 2,
					(canvas.height / 2) - 100 - MAIN_MENU_ARE_YOU_SURE_BORDER / 2,
					MAIN_MENU_ARE_YOU_SURE_WIDTH + MAIN_MENU_ARE_YOU_SURE_BORDER,
					MAIN_MENU_ARE_YOU_SURE_HEIGHT + MAIN_MENU_ARE_YOU_SURE_BORDER,
					'white');

		colorRect(	(canvas.width / 2) - (MAIN_MENU_ARE_YOU_SURE_WIDTH /2),
					(canvas.height / 2) - 100,
					MAIN_MENU_ARE_YOU_SURE_WIDTH,
					MAIN_MENU_ARE_YOU_SURE_HEIGHT,
					'black');
	}
}

function drawMainMenuText() {
	var selectedOptionColor = PALETTE_BLUE;
	var unselectedOptionColor = PALETTE_WHITE;

	var textToShow1;
	var textToShow2;
	var textToShow3;

	var whereToShowText1X;
	var whereToShowText1Y;
	var whereToShowText2X;
	var whereToShowText2Y;
	var whereToShowText3X;
	var whereToShowText3Y;

	if (areYouSureOpen) {
		textToShow1 = 'No';
		textToShow2 = 'Yes';
		whereToShowText1X = MAIN_MENU_NO_X;
		whereToShowText1Y = MAIN_MENU_NO_Y;
		whereToShowText2X = MAIN_MENU_YES_X;
		whereToShowText2Y = MAIN_MENU_YES_Y;

		colorText('Are you sure?',
		          MAIN_MENU_ARE_YOU_SURE_X,
		          MAIN_MENU_ARE_YOU_SURE_Y,
		          PALETTE_WHITE,
		          FONT_MAIN_MENU);
	} else if (speedrunTimesOpen) {
		textToShow1 = 'Reset Times';
		textToShow2 = 'Back To Menu';
		whereToShowText1X = SPEEDRUN_RESET_TIMES_X;
		whereToShowText1Y = SPEEDRUN_RESET_TIMES_Y;
		whereToShowText2X = SPEEDRUN_BACK_TO_MAIN_MENU_X;
		whereToShowText2Y = SPEEDRUN_BACK_TO_MAIN_MENU_Y;

	} else {
		textToShow1 = 'Continue';
		textToShow2 = 'New Game';
		textToShow3 = 'Speedrun Best Times';
		whereToShowText1X = MAIN_MENU_CONTINUE_X;
		whereToShowText1Y = MAIN_MENU_CONTINUE_Y;
		whereToShowText2X = MAIN_MENU_NEW_GAME_X;
		whereToShowText2Y = MAIN_MENU_NEW_GAME_Y;
		whereToShowText3X = MAIN_MENU_SPEEDRUN_X;
		whereToShowText3Y = MAIN_MENU_SPEEDRUN_Y;
	}

	if (noSavedGame &&
		areYouSureOpen == false
		&& mainMenuOpen) {

		colorText(textToShow1,
		          whereToShowText1X,
		          whereToShowText1Y,
		          'grey',
		          FONT_MAIN_MENU);

	} else if (selectedOption == MAIN_MENU_CONTINUE || selectedOption == MAIN_MENU_NO || selectedOption == SPEEDRUN_RESET_TIMES) {
		colorText(textToShow1,
		          whereToShowText1X,
		          whereToShowText1Y,
		          selectedOptionColor,
		          FONT_MAIN_MENU);
	} else {
		colorText(textToShow1,
		          whereToShowText1X,
		          whereToShowText1Y,
		          unselectedOptionColor,
		          FONT_MAIN_MENU);
	}

	if (selectedOption == MAIN_MENU_NEW_GAME || selectedOption == MAIN_MENU_YES || selectedOption == SPEEDRUN_BACK_TO_MAIN_MENU) {
		colorText(textToShow2,
		          whereToShowText2X,
		          whereToShowText2Y,
		          selectedOptionColor,
		          FONT_MAIN_MENU);
	} else {
		colorText(textToShow2,
		          whereToShowText2X,
		          whereToShowText2Y,
		          unselectedOptionColor,
		          FONT_MAIN_MENU);
	}

	if (selectedOption == MAIN_MENU_SPEEDRUN) {
		colorText(textToShow3,
		          whereToShowText3X,
		          whereToShowText3Y,
		          selectedOptionColor,
		          FONT_MAIN_MENU);
	} else {
		colorText(textToShow3,
		          whereToShowText3X,
		          whereToShowText3Y,
		          unselectedOptionColor,
		          FONT_MAIN_MENU);
	}

	if (speedrunTimesOpen && areYouSureOpen == false) {
		var colorToShow;

		if (parseInt(getAnyPercentDeathCount()) == 0) {
			colorToShow = PALETTE_BLUE;
		} else {
			colorToShow = PALETTE_WHITE;
		}

		colorText(	'Any% Best Time',
					SPEEDRUN_ANY_PERC_LABEL_X,
					SPEEDRUN_ANY_PERC_LABEL_Y,
					PALETTE_WHITE,
					FONT_MAIN_MENU);

		if (getAnyPercentTime() == null) {
			colorText(	'N/A',
						SPEEDRUN_ANY_PERC_TIME_X,
						SPEEDRUN_ANY_PERC_TIME_Y,
						PALETTE_WHITE,
						FONT_MAIN_MENU);
		} else {

			var gameTimeToShow = new Date(null);
			var timeValue = parseInt(getAnyPercentTime());
			gameTimeToShow.setSeconds(timeValue); // specify value for SECONDS here
			var result = gameTimeToShow.toISOString().substr(11, 8); // turns seconds into HH:MM:SS

			colorText(	result,
						SPEEDRUN_ANY_PERC_TIME_X,
						SPEEDRUN_ANY_PERC_TIME_Y,
						colorToShow,
						FONT_MAIN_MENU);
		}

		if (parseInt(getHundredPercentDeathCount()) == 0) {
			colorToShow = PALETTE_BLUE;
		} else {
			colorToShow = PALETTE_WHITE;
		}

		colorText(	'100% Best Time',
					SPEEDRUN_HUNDRED_PERC_LABEL_X,
					SPEEDRUN_HUNDRED_PERC_LABEL_Y,
					PALETTE_WHITE,
					FONT_MAIN_MENU);

		if (getHundredPercentTime() == null) {
			colorText(	'N/A',
						SPEEDRUN_HUNDRED_PERC_TIME_X,
						SPEEDRUN_HUNDRED_PERC_TIME_Y,
						PALETTE_WHITE,
						FONT_MAIN_MENU);
		} else {
			var gameTimeToShow = new Date(null);
			var timeValue = parseInt(getHundredPercentTime());
			gameTimeToShow.setSeconds(timeValue); // specify value for SECONDS here
			var result = gameTimeToShow.toISOString().substr(11, 8); // turns seconds into HH:MM:SS
			
			colorText(	result,
						SPEEDRUN_HUNDRED_PERC_TIME_X,
						SPEEDRUN_HUNDRED_PERC_TIME_Y,
						colorToShow,
						FONT_MAIN_MENU);
		}
		
	}
}

function startNewGame() {
	currentLevel = 1;
	totalGameTime = 0;
	totalDeaths = 0;
	totalCollectibles = 0;
	saveLevel(); // overwrites old save file
	saveGameTime();
	saveDeathCount();
	saveCollectibleCount();
	saveCollectibleObtainedForLevel("false");
	loadLevel(currentLevel);
	levelTransitionStarted = true;
	gameTimerInterval = setInterval(gameTimer, 1000);
	mainMenuOpen = false;
}

function continueSavedGame() {
	var savedLevel = parseInt( getSavedLevel() );
	currentLevel = savedLevel;
	totalGameTime = parseInt( getGameTime() );
	totalDeaths = parseInt( getDeathCount() );
	totalCollectibles = parseInt( getCollectibleCount() );

	// needs to be entered this way or it will be input as a string
	if (getCollectibleObtainedForLevel() == "false") {
		player.collectibleObtained = false;
	} else {
		player.collectibleObtained = true;
	}

	gameTimerInterval = setInterval(gameTimer, 1000);
	loadLevel(savedLevel);
	levelTransitionStarted = true;
	mainMenuOpen = false;
}

function mainMenuMouseoverHandling() {
	if (mouseX > MAIN_MENU_CONTINUE_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_CONTINUE_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_CONTINUE_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_CONTINUE_END_Y / PIXEL_SCALE_UP && 
		areYouSureOpen == false &&
		noSavedGame == false) {
		selectedOption = MAIN_MENU_CONTINUE;
	}

	if (mouseX > MAIN_MENU_NEW_GAME_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_NEW_GAME_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_NEW_GAME_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_NEW_GAME_END_Y / PIXEL_SCALE_UP &&
		areYouSureOpen == false) {

		selectedOption = MAIN_MENU_NEW_GAME;
	}

	if (mouseX > MAIN_MENU_SPEEDRUN_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_SPEEDRUN_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_SPEEDRUN_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_SPEEDRUN_END_Y / PIXEL_SCALE_UP &&
		areYouSureOpen == false) {

		selectedOption = MAIN_MENU_SPEEDRUN;
	}

	if (mouseX > MAIN_MENU_NO_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_NO_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_NO_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_NO_END_Y / PIXEL_SCALE_UP && 
		areYouSureOpen) {

		selectedOption = MAIN_MENU_NO;
	}

	if (mouseX > MAIN_MENU_YES_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_YES_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_YES_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_YES_END_Y / PIXEL_SCALE_UP &&
		areYouSureOpen) {
		
		selectedOption = MAIN_MENU_YES;
	}
}

function speedrunMouseoverHandling() {
	if (mouseX > SPEEDRUN_RESET_TIMES_START_X / PIXEL_SCALE_UP&&
		mouseX < SPEEDRUN_RESET_TIMES_END_X / PIXEL_SCALE_UP &&
		mouseY > SPEEDRUN_RESET_TIMES_START_Y / PIXEL_SCALE_UP &&
		mouseY < SPEEDRUN_RESET_TIMES_END_Y / PIXEL_SCALE_UP && 
		areYouSureOpen == false) {

		selectedOption = SPEEDRUN_RESET_TIMES;
	}

	if (mouseX > SPEEDRUN_BACK_TO_MAIN_MENU_START_X / PIXEL_SCALE_UP&&
		mouseX < SPEEDRUN_BACK_TO_MAIN_MENU_END_X / PIXEL_SCALE_UP &&
		mouseY > SPEEDRUN_BACK_TO_MAIN_MENU_START_Y / PIXEL_SCALE_UP &&
		mouseY < SPEEDRUN_BACK_TO_MAIN_MENU_END_Y / PIXEL_SCALE_UP &&
		areYouSureOpen == false) {

		selectedOption = SPEEDRUN_BACK_TO_MAIN_MENU;
	}

	if (mouseX > MAIN_MENU_NO_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_NO_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_NO_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_NO_END_Y / PIXEL_SCALE_UP && 
		areYouSureOpen) {

		selectedOption = MAIN_MENU_NO;
	}

	if (mouseX > MAIN_MENU_YES_START_X / PIXEL_SCALE_UP&&
		mouseX < MAIN_MENU_YES_END_X / PIXEL_SCALE_UP &&
		mouseY > MAIN_MENU_YES_START_Y / PIXEL_SCALE_UP &&
		mouseY < MAIN_MENU_YES_END_Y / PIXEL_SCALE_UP &&
		areYouSureOpen) {
		
		selectedOption = MAIN_MENU_YES;
	}
}

function gameTimer() {
	if (scoreScreenOpen == false &&
		mainMenuOpen == false) {
		totalGameTime += 1;
	}
	saveGameTime();
}
function scoreScreenUpdate() {
	if (keyHeld_Enter) {
		keyHeld_Timer = 0;
		scoreScreenOpen = false;
		areYouSureOpen = false;
		mainMenuOpen = true;

		if (totalCollectibles >= TOTAL_COLLECTIBLE_COUNT &&
			(getHundredPercentTime() == null ||
			getGameTime() < getHundredPercentTime())) {

			saveHundredPercentScore(getGameTime(),getDeathCount());
		} else if (	totalCollectibles < TOTAL_COLLECTIBLE_COUNT &&
					(getAnyPercentTime() == null ||
					getGameTime() < getAnyPercentTime())) {
			saveAnyPercentScore(getGameTime(), getDeathCount());
		}

		deleteAllSavedInfo();
		clearInterval(gameTimerInterval);
		totalGameTime = 0;
	}
}

function drawScoreScreenText() {

	var colorToShow;
	var gameTimeToShow = new Date(null);

	colorText('Time: ',
	          SCORE_SCREEN_TIME_X,
	          SCORE_SCREEN_TIME_Y,
	          PALETTE_WHITE, // white
	          FONT_MAIN_MENU);

	if (totalGameTime < 240) { // under 4 minute
		colorToShow = PALETTE_BLUE;
	} else {
		colorToShow = PALETTE_WHITE;
	}
	
	gameTimeToShow.setSeconds(totalGameTime); // specify value for SECONDS here
	var result = gameTimeToShow.toISOString().substr(11, 8); // turns seconds into HH:MM:SS
	
	colorText(result,
	          SCORE_SCREEN_TIME_X + SCORE_SCREEN_DIST_AWAY_FROM_SUB_TEXT,
	          SCORE_SCREEN_TIME_Y,
	          colorToShow,
	          FONT_MAIN_MENU);


	colorText('Deaths: ',
	          SCORE_SCREEN_DEATHS_X,
	          SCORE_SCREEN_DEATHS_Y,
	          PALETTE_WHITE,
	          FONT_MAIN_MENU);

	if (totalDeaths == 0) {
		colorToShow = PALETTE_BLUE;
	} else { // come up with an average number, red should be bad
		colorToShow = PALETTE_WHITE;
	}

	colorText(totalDeaths,
	          SCORE_SCREEN_DEATHS_X + SCORE_SCREEN_DIST_AWAY_FROM_SUB_TEXT,
	          SCORE_SCREEN_DEATHS_Y,
	          colorToShow,
	          FONT_MAIN_MENU);



	colorText('Collectibles: ',
	          SCORE_SCREEN_COLLECTIBLES_X,
	          SCORE_SCREEN_COLLECTIBLES_Y,
	          PALETTE_WHITE,
	          FONT_MAIN_MENU);

	if (totalCollectibles >= TOTAL_COLLECTIBLE_COUNT) {
		colorToShow = PALETTE_BLUE;
	} else {
		colorToShow = PALETTE_WHITE;
	}
	
	colorText(totalCollectibles,
	          SCORE_SCREEN_COLLECTIBLES_X + SCORE_SCREEN_DIST_AWAY_FROM_SUB_TEXT,
	          SCORE_SCREEN_COLLECTIBLES_Y,
	          colorToShow, // white
	          FONT_MAIN_MENU);

	colorText(	'Press Enter To Go Back To Main Menu',
				SCORE_SCREEN_BACK_TO_MAIN_MENU_X,
				SCORE_SCREEN_BACK_TO_MAIN_MENU_Y,
				PALETTE_WHITE,
				FONT_MAIN_MENU);

}

function showLevelText(currentLevel) {
	if (currentLevel <= LEVELS_PER_WORLD) { // change this number based off of how many levels are in each world
		colorText('1-' + currentLevel, TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel > LEVELS_PER_WORLD && currentLevel <= LEVELS_PER_WORLD * 2) {
		colorText('2-' + (currentLevel - LEVELS_PER_WORLD), TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel > LEVELS_PER_WORLD * 2 && currentLevel <= LEVELS_PER_WORLD * 3) {
		colorText('3-' + (currentLevel - LEVELS_PER_WORLD * 2), TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	}
}