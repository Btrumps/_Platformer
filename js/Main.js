const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 448;
const FPS = 30;

var canvas, canvasContext;
var player = new playerClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	document.addEventListener('keydown', keyDownHandler);
	document.addEventListener('keyup', keyUpHandler);
	canvas.addEventListener('mousemove', mouseMoveHandler);

	canvasContext.imageSmoothingEnabled = false;

	startScreenWithLoadingImagesText();
	loadImages();
	loadSounds();
	setupSpriteSheets();	
}

function imagesDoneLoadingSoStartGame() {
	setInterval(updateAll, 1000 / FPS);
	loadLevel(currentLevel);
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	player.move();
	if (mapEditorEnabled) {
		placeTilesOnButtonPress();
	}

	for (var i = 0; i < allTriggersArray.length; i++) {
		allTriggersArray[i].move();
	}

	playBGMMusic();
}

function drawAll() {
	updateAnimations();
	colorRect(0,0, canvas.width,canvas.height, 'black', 1);
	// drawBG();
	drawLevel();
	player.draw();

	if (mapEditorEnabled) {
		showMapEditorGrid();
	}
}

function startScreenWithLoadingImagesText() {
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", (canvas.width/2) - 50, canvas.height/2, 'black');
}