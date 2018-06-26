const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 448;
const PIXEL_SCALE_UP = 2;
const FPS = 30;

var canvas, canvasContext;
var scaledCanvas, scaledContext;

var fadeTimer = 0;
var maxFadeInTime = 1 * FPS;
var maxFadeOutTime = 1 * FPS;

var player = new playerClass();

window.onload = function() {
	scaledCanvas = document.getElementById('gameCanvas');
	canvas = document.createElement('canvas');
	
	
	// Sizing game canvas for pixel doubling
	canvas.width = TILE_WIDTH * LEVEL_COLS;
	canvas.height = TILE_HEIGHT * LEVEL_ROWS;
	scaledCanvas.width = PIXEL_SCALE_UP * scaledCanvas.width;
	scaledCanvas.height = PIXEL_SCALE_UP * scaledCanvas.height;

	canvasContext = canvas.getContext('2d');
	scaledContext = scaledCanvas.getContext('2d');
	scaledContext.fillStyle = 'black';

	// Helps it not blur from the scaling
	scaledContext.mozImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;
	scaledContext.msSmoothingEnabled = false;
	canvasContext.mozImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msSmoothingEnabled = false;


	document.addEventListener('keydown', keyDownHandler);
	document.addEventListener('keyup', keyUpHandler);
	scaledCanvas.addEventListener('mousemove', mouseMoveHandler);

	

	startScreenWithLoadingImagesText();
	loadImages();
	loadSounds();
	setupSpriteSheets();	
}

function imagesDoneLoadingSoStartGame() {
	setInterval(updateAll, 1000 / FPS);
	
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if (mainMenuOpen) {
		mainMenuUpdate();
	} else if (scoreScreenOpen) {
		// do nothing, stops deathCount from going up in the background
	} else if (levelLayoutScreenOpen) {
		checkLevelLayoutInput();
	} else {
		player.move();
		if (currentLevel == 11) {
			boss.move();
		}
		
		if (mapEditorEnabled) {
			placeTilesOnButtonPress();
		}

		for (var i = 0; i < allTriggersArray.length; i++) {
			allTriggersArray[i].move();
		}

		for (var i = 0; i < projectileArray.length; i++) {
			projectileArray[i].move();
		}
		
		if (musicEnabled) {
			playBGM(currentLevel);
		}

		checkLevelSkipInput();
	}
}

function drawAll() {
	if (mainMenuOpen) {
		drawMainMenu();
	} else if (scoreScreenOpen) {
		colorRect(0,0, canvas.width,canvas.height, 'black');
	} else if (levelLayoutScreenOpen) {
		drawLevelLayoutScreen();
	} else {
		playerBlueImageSwap();
		updateAnimations();

		colorRect(0,0, canvas.width,canvas.height, 'black');
		if (helpGrid.length > 0) {
			drawHelpBG();
		}

		/*
		canvasContext.save();
		canvasContext.scale(0.2,0.2);

		drawLevel();
		canvasContext.restore();
		*/

		drawLevel();

		player.draw();
		if (currentLevel == 11) {
			boss.draw();
		}

		for (var i = 0; i < allTriggersArray.length; i++) {
			allTriggersArray[i].draw();
		}

		for (var i = 0; i < projectileArray.length; i++) {
			projectileArray[i].draw();
		}


		if (mapEditorEnabled) {
			showMapEditorGrid();
		}

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

		for (var i = 0; i < allTriggersArray.length; i++) {
			allTriggersArray[i].drawText();
		}
	}

	// colorRect(0,0, canvas.width,canvas.height, 'pink', 0.15); // testing 

	scaledContext.drawImage(canvas, 0,0, canvas.width,canvas.height,
		                        		0,0, scaledCanvas.width, scaledCanvas.height);

	if (mainMenuOpen) {
		drawMainMenuText();
	} else if (scoreScreenOpen) {
		drawScoreScreenText();
	} else if (levelLayoutScreenOpen) {

	} else {
		showLevelText();
	}
	
}

function startScreenWithLoadingImagesText() {
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", (canvas.width/2) - 50, canvas.height/2, 'black');
}