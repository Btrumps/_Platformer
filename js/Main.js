const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FPS = 30;

var canvas, canvasContext;


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
	movePlayer();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, 'black', 1);

	drawPlayer();
}