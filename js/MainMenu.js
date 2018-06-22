const MAIN_MENU_CONTINUE = 1;
const MAIN_MENU_NEW_GAME = 2;
const MAIN_MENU_NO = 1;
const MAIN_MENU_YES = 2;

const MAIN_MENU_CONTINUE_X = 420;
const MAIN_MENU_CONTINUE_Y = 400;
const MAIN_MENU_NEW_GAME_X = 425;
const MAIN_MENU_NEW_GAME_Y = 500;
const MAIN_MENU_ARE_YOU_SURE_X = 375;
const MAIN_MENU_ARE_YOU_SURE_Y = 325;
const MAIN_MENU_NO_X = 485;
const MAIN_MENU_NO_Y = 425;
const MAIN_MENU_YES_X = 475;
const MAIN_MENU_YES_Y = 500;

const MAIN_MENU_ARE_YOU_SURE_WIDTH = 200;
const MAIN_MENU_ARE_YOU_SURE_HEIGHT = 150;
const MAIN_MENU_ARE_YOU_SURE_BORDER = 10;

const MAIN_MENU_MAX_OPTIONS = 2; // increase this number every time we add something to the menu

var selectedOption = MAIN_MENU_CONTINUE;
var noSavedGame = false;
var mainMenuOpen = true;
var areYouSureOpen = false;

function mainMenuUpdate() {

	// this is so we can grey out continue and start the menu selection on New Game
	// this will only happen once, so it doesn't auto snap selection on the are you sure screen
	if ((getSavedLevel() == null || getSavedLevel() == undefined) && areYouSureOpen == false) {
		noSavedGame = true;
		selectedOption = MAIN_MENU_NEW_GAME;
	}

	if ((keyHeld_ArrowUp || keyHeld_W) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (noSavedGame && areYouSureOpen == false) {
			// do nothing
		} else {
			if (selectedOption > 1) {
				selectedOption--;
			} else if (selectedOption == 1) {
				 // change this number to the max number of options so it wraps to the bottom selection
				selectedOption = MAIN_MENU_MAX_OPTIONS;
			}
		}	
		keyHeld_Timer = 0; // sets timer to 0 to prevent changing every frame
	}

	if ((keyHeld_ArrowDown || keyHeld_S) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (noSavedGame && areYouSureOpen == false) {
			// do nothing
		} else {
			if (selectedOption < MAIN_MENU_MAX_OPTIONS) {
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
				setInterval(gameTimer, 1000);
				mainMenuOpen = false;
			} else if (selectedOption == MAIN_MENU_NO) {
				areYouSureOpen = false;
				optionSelectedThisFrame = true;
			}
		}

		if (selectedOption == MAIN_MENU_NEW_GAME) {
			selectedOption = 1;
			areYouSureOpen = true;
			optionSelectedThisFrame = true;
		}

		if (selectedOption == MAIN_MENU_CONTINUE &&
		    optionSelectedThisFrame == false &&
		    noSavedGame == false) {
			
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

			setInterval(gameTimer, 1000);
			loadLevel(savedLevel);
			mainMenuOpen = false;
		}
	}
}

function drawMainMenu() {
	colorRect(0,0, canvas.width,canvas.height, 'black');
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

	var whereToShowText1X;
	var whereToShowText1Y;
	var whereToShowText2X;
	var whereToShowText2Y;

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
	} else {
		textToShow1 = 'Continue';
		textToShow2 = 'New Game';
		whereToShowText1X = MAIN_MENU_CONTINUE_X;
		whereToShowText1Y = MAIN_MENU_CONTINUE_Y;
		whereToShowText2X = MAIN_MENU_NEW_GAME_X;
		whereToShowText2Y = MAIN_MENU_NEW_GAME_Y;
	}

	if (noSavedGame &&
		areYouSureOpen == false) {

		colorText(textToShow1,
		          whereToShowText1X,
		          whereToShowText1Y,
		          'grey',
		          FONT_MAIN_MENU);

	} else if (selectedOption == MAIN_MENU_CONTINUE || selectedOption == MAIN_MENU_NO) {
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

	if (selectedOption == MAIN_MENU_NEW_GAME || selectedOption == MAIN_MENU_YES) {
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
}