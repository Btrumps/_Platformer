const TEXT_LEVEL_START_X = 10;
const TEXT_LEVEL_START_Y = 15;

function showLevelText() {
	if (currentLevel == 1) {
		colorText('Baby Jumps', TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel == 2) {
		colorText('You look dashing, my friend', TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel == 3) {
		colorText('Ah, refreshing...', TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel == 4) {
		colorText('Quick fingers', TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel == 5) {
		colorText('Bit of a refresher', TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	} else if (currentLevel == 6) {
		colorText('Sadistic', TEXT_LEVEL_START_X, TEXT_LEVEL_START_Y, 'white', FONT_LEVEL_NAME);
	}
}