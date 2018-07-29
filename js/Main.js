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
	scaledCanvas.addEventListener('mousedown', mousedownHandler);
	scaledCanvas.addEventListener('mouseup', mouseupHandler);
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
		mainMenuMouseoverHandling();
		mainMenuUpdate();
		playBGM(menuSong, MENU_SONG_VOLUME);
	} else if (scoreScreenOpen) {
		scoreScreenUpdate();
		playBGM(menuSong, MENU_SONG_VOLUME);
	} else if (levelLayoutScreenOpen) {
		checkLevelLayoutInput();
	} else if (speedrunTimesOpen) {
		speedrunMouseoverHandling();
		mainMenuUpdate();
		playBGM(menuSong, MENU_SONG_VOLUME);
	} else {
		player.move();

		if (currentLevel == BOSS_FIGHT_1_LEVEL) {
			boss.move();
		}
		
		moveParticles();
		moveAllTriggers();
		moveAllProjectiles();
		checkLevelSkipInput();


		if (currentLevel <= LEVELS_PER_WORLD) {
			menuSong.pause();
			menuSong.currentTime = 0;
			playBGM(firstSong, FIRST_SONG_VOLUME);
		} else if (currentLevel > LEVELS_PER_WORLD && currentLevel <= LEVELS_PER_WORLD * 2) {
			menuSong.pause();
			menuSong.currentTime = 0;
			firstSong.pause();
			firstSong.currentTime = 0;
			playBGM(secondSong, SECOND_SONG_VOLUME);
		} else if (currentLevel > LEVELS_PER_WORLD * 2 && currentLevel <= LEVELS_PER_WORLD * 3) {
			menuSong.pause();
			menuSong.currentTime = 0;
			secondSong.pause();
			secondSong.currentTime = 0;
			playBGM(thirdSong, THIRD_SONG_VOLUME);
		}
			
		
		if (levelEditorEnabled) {
			placeTilesOnButtonPress();
		}
		
	}
}

function drawAll() {

	colorRect(0,0, canvas.width,canvas.height, 'black');

	if (mainMenuOpen) {
		drawMainMenu();
	} else if (scoreScreenOpen) {
		// do nothing, we display text after initial canvas is drawn
	} else if (levelLayoutScreenOpen) {
		drawLevelLayoutScreen();
	} else if (speedrunTimesOpen) {
		drawMainMenu(); // draws 'are you sure' box and header image
	} else {
		playerBlueImageSwap();
		updateAnimations();
		
		drawHelpBG();
		drawLevel();
		player.draw();

		if (currentLevel == BOSS_FIGHT_1_LEVEL) {
			boss.draw();
		}
		

		drawParticles();
		drawAllTriggers();
		drawAllProjectiles();

		if (levelEditorEnabled) {
			showMapEditorGrid();
		}

		deathFadeCheck();
		levelTransitionCheck();
		drawCollectibleIcon();

	}

	// colorRect(0,0, canvas.width,canvas.height, 'pink', 0.15); // testing 

	scaledContext.drawImage(canvas, 0,0, canvas.width,canvas.height,
		                        		0,0, scaledCanvas.width, scaledCanvas.height);

	if (mainMenuOpen) {
		drawMainMenuText();
	} else if (scoreScreenOpen) {
		drawScoreScreenText();
	} else if (levelLayoutScreenOpen) {

	} else if (speedrunTimesOpen) {
		drawMainMenuText();
	} else {
		showLevelText(currentLevel);
		drawCollectibleText();
		drawAllTriggerText();
	}
	
}

function startScreenWithLoadingImagesText() {
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", (canvas.width/2) - 50, canvas.height/2, 'black');
}