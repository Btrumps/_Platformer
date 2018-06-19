const MAIN_MENU_NEW_GAME = 1;
const MAIN_MENU_CONTINUE = 2;

const MAIN_MENU_NEW_GAME_X = 425;
const MAIN_MENU_NEW_GAME_Y = 400;
const MAIN_MENU_CONTINUE_X = 420;
const MAIN_MENU_CONTINUE_Y = 500;

const MAIN_MENU_MAX_OPTIONS = 2;

var selectedOption = MAIN_MENU_NEW_GAME;
var mainMenuOpen = true;
function mainMenuUpdate() {
	if ((keyHeld_ArrowUp || keyHeld_W) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (selectedOption > 1) {
			selectedOption--;
		} else if (selectedOption == 1) {
			 // change this number to the max number of options so it wraps to the bottom selection
			selectedOption = MAIN_MENU_MAX_OPTIONS;
		}
		keyHeld_Timer = 0; // sets timer to 0 to prevent changing every frame
	}

	if ((keyHeld_ArrowDown || keyHeld_S) && keyHeld_Timer >= KEY_HELD_TIME_MAX) {
		if (selectedOption < MAIN_MENU_MAX_OPTIONS) {
			selectedOption++;
		} else {
			selectedOption = 1;
		}
		keyHeld_Timer = 0; // sets timer to 0 to prevent changing every frame
	}


	if (keyHeld_Enter || keyHeld_Space) {
		if (selectedOption == MAIN_MENU_NEW_GAME) {
			currentLevel = 1;
			totalCollectibles = 0;
			totalDeaths = 0;
			saveLevel(); // overwrites old save file
			saveDeathCount();
			saveCollectibleCount();
			loadLevel(currentLevel);
			mainMenuOpen = false;
		}

		if (selectedOption == MAIN_MENU_CONTINUE) {
			var savedLevel = getSavedLevel();
			if (savedLevel != undefined) {
				loadLevel(savedLevel);
				currentLevel = savedLevel;
				totalDeaths = getDeathCount();
				totalCollectibles = getCollectibleCount();
			} else {
				// if the player's browser does not have local storage capabilities (or they haven't played before), this will be called
				loadLevel(1);
			}
			mainMenuOpen = false;
		}
	}
}

function drawMainMenu() {
	colorRect(0,0, canvas.width,canvas.height, 'black');
	canvasContext.drawImage(mainMenuImg, -10,25);
}

function drawMainMenuText() {
	var selectedOptionColor = '#208eff';
	var unselectedOptionColor = '#fefefe';

	if (selectedOption == MAIN_MENU_NEW_GAME) {
		colorText('New Game',
		          MAIN_MENU_NEW_GAME_X,
		          MAIN_MENU_NEW_GAME_Y,
		          selectedOptionColor,
		          FONT_MAIN_MENU);
	} else {
		colorText('New Game',
		          MAIN_MENU_NEW_GAME_X,
		          MAIN_MENU_NEW_GAME_Y,
		          unselectedOptionColor,
		          FONT_MAIN_MENU);
	}

	if (selectedOption == MAIN_MENU_CONTINUE) {
		colorText('Continue',
		          MAIN_MENU_CONTINUE_X,
		          MAIN_MENU_CONTINUE_Y,
		          selectedOptionColor,
		          FONT_MAIN_MENU);
	} else if (selectedOption != MAIN_MENU_CONTINUE && getSavedLevel() != undefined) {
		colorText('Continue',
		          MAIN_MENU_CONTINUE_X,
		          MAIN_MENU_CONTINUE_Y,
		          unselectedOptionColor,
		          FONT_MAIN_MENU);
	} else {
		colorText('Continue',
		          MAIN_MENU_CONTINUE_X,
		          MAIN_MENU_CONTINUE_Y,
		          'black',
		          FONT_MAIN_MENU);
	}
}