var levelFadeX = 0;
var levelFadeY = 0;
var levelFadeSpeed = 30;
var levelTransitionStarted = false;

function deathFadeCheck() {
	if (fadeTimer > 0) {
		fadeTimer--;
		colorRect(0,0, canvas.width, canvas.height, 'black', fadeTimer/maxFadeInTime);
	} else if (fadeTimer < 0) {
		fadeTimer--;
		colorRect(0,0, canvas.width, canvas.height, 'black', Math.abs(fadeTimer)/maxFadeOutTime);
		if (fadeTimer == -maxFadeOutTime) {
			fadeTimer = maxFadeInTime;
		}
	}
}

function levelTransitionCheck() {
	// if we are the first 15 levels, we want to transition from left to right
	// the next group of 15 should go right to left
	if (levelTransitionStarted && (currentLevel <= LEVELS_PER_WORLD || currentLevel > LEVELS_PER_WORLD * 2)) {
		levelFadeX += levelFadeSpeed;
		colorRect(levelFadeX, levelFadeY, canvas.width,canvas.height, 'black');
		if (levelFadeX > canvas.width) {
			levelTransitionStarted = false;
			levelFadeX = 0;
		}
	} else if (levelTransitionStarted && currentLevel > LEVELS_PER_WORLD && currentLevel <= LEVELS_PER_WORLD * 2) {
		levelFadeX -= levelFadeSpeed;
		colorRect(levelFadeX, levelFadeY, canvas.width,canvas.height, 'black');
		if (levelFadeX < -canvas.width) {
			levelTransitionStarted = false;
			levelFadeX = 0;
		}
	}
}