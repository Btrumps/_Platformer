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
	if (levelTransitionStarted) {
		levelFadeX += levelFadeSpeed;
		colorRect(levelFadeX, levelFadeY, canvas.width,canvas.height, 'black');
		if (levelFadeX > canvas.width) {
			levelTransitionStarted = false;
			levelFadeX = 0;
		}
	}
}