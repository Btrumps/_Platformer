const SCORE_SCREEN_DEATHS_X = 325;
const SCORE_SCREEN_DEATHS_Y = 400;
const SCORE_SCREEN_COLLECTIBLES_X = 325;
const SCORE_SCREEN_COLLECTIBLES_Y = 500;

var TOTAL_COLLECTIBLE_COUNT = 6; // change this number to the max amount of collectibles in the final game
var totalCollectibles = 0;
var totalDeaths = 0;

var scoreScreenOpen = false;

function drawScoreScreenText() {

	var colorToShow;

	colorText('Deaths: ',
	          SCORE_SCREEN_DEATHS_X,
	          SCORE_SCREEN_DEATHS_Y,
	          '#fefefe', // white
	          FONT_MAIN_MENU);

	if (totalDeaths == 0) {
		colorToShow = PALETTE_BLUE;
	} else { // come up with an average number, red should be bad
		colorToShow = PALETTE_WHITE;
	}

	colorText(totalDeaths,
	          SCORE_SCREEN_DEATHS_X + 350,
	          SCORE_SCREEN_DEATHS_Y,
	          colorToShow, // white
	          FONT_MAIN_MENU);



	colorText('Collectibles: ',
	          SCORE_SCREEN_COLLECTIBLES_X,
	          SCORE_SCREEN_COLLECTIBLES_Y,
	          '#fefefe', // white
	          FONT_MAIN_MENU);

	if (totalCollectibles == TOTAL_COLLECTIBLE_COUNT) {
		colorToShow = PALETTE_BLUE;
	} else {
		colorToShow = PALETTE_WHITE;
	}
	
	colorText(totalCollectibles,
	          SCORE_SCREEN_COLLECTIBLES_X + 350,
	          SCORE_SCREEN_COLLECTIBLES_Y,
	          colorToShow, // white
	          FONT_MAIN_MENU);

}