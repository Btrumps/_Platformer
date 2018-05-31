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

	setInterval(updateAll, 1000 / FPS);
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	player.move();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, 'grey', 1);
	drawLevel();
	player.draw();
}