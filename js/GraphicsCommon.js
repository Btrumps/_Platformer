function colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor, opacity) {
	canvasContext.fillStyle = fillColor;
	canvasContext.globalAlpha = opacity;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
	canvasContext.globalAlpha = 1.0;
}