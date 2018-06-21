const SCORE_SCREEN_TIME_X = 325;
const SCORE_SCREEN_TIME_Y = 300;
const SCORE_SCREEN_DEATHS_X = 325;
const SCORE_SCREEN_DEATHS_Y = 400;
const SCORE_SCREEN_COLLECTIBLES_X = 325;
const SCORE_SCREEN_COLLECTIBLES_Y = 500;

const SCORE_SCREEN_DIST_AWAY_FROM_SUB_TEXT = 350;

var TOTAL_COLLECTIBLE_COUNT = 6; // change this number to the max amount of collectibles in the final game
var totalCollectibles = 0;
var totalDeaths = 0;
var totalGameTime = 0;

var scoreScreenOpen = false;

function gameTimer() {
	if (scoreScreenOpen == false &&
		mainMenuOpen == false) {
		totalGameTime += 1;
	}
	saveGameTime();
}

function drawScoreScreenText() {

	var colorToShow;
	var gameTimeToShow = new Date(null);

	colorText('Time: ',
	          SCORE_SCREEN_TIME_X,
	          SCORE_SCREEN_TIME_Y,
	          PALETTE_WHITE, // white
	          FONT_MAIN_MENU);

	if (totalGameTime < 60) { // under 1 minute
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

	if (totalCollectibles == TOTAL_COLLECTIBLE_COUNT) {
		colorToShow = PALETTE_BLUE;
	} else {
		colorToShow = PALETTE_WHITE;
	}
	
	colorText(totalCollectibles,
	          SCORE_SCREEN_COLLECTIBLES_X + SCORE_SCREEN_DIST_AWAY_FROM_SUB_TEXT,
	          SCORE_SCREEN_COLLECTIBLES_Y,
	          colorToShow, // white
	          FONT_MAIN_MENU);

}