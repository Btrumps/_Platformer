const TEXT_LEVEL_START_X = 15;
const TEXT_LEVEL_START_Y = 25;

const LEVELS_PER_WORLD = 15;

function showLevelText(currentLevel) {
	if (currentLevel <= LEVELS_PER_WORLD) { // change this number based off of how many levels are in each world
		colorText('1-' + currentLevel, TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel > LEVELS_PER_WORLD && currentLevel <= LEVELS_PER_WORLD * 2) {
		colorText('2-' + (currentLevel - LEVELS_PER_WORLD), TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel > LEVELS_PER_WORLD * 2 && currentLevel <= LEVELS_PER_WORLD * 3) {
		colorText('3-' + (currentLevel - LEVELS_PER_WORLD * 2), TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	}
}