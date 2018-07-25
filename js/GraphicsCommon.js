function colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor, opacity) {
	canvasContext.fillStyle = fillColor;
	canvasContext.globalAlpha = opacity;
	canvasContext.fillRect(Math.floor(topLeftX), Math.floor(topLeftY), Math.floor(boxWidth), Math.floor(boxHeight));
	canvasContext.globalAlpha = 1.0;
}

function coloredOutlineRectCornerToCorner (corner1X, corner1Y, corner2X, corner2Y, lineColor) {
	canvasContext.strokeStyle = lineColor;
	canvasContext.beginPath();
	canvasContext.setLineDash([]);
	// by subtracting the 2nd X/Y from the 1st X/Y, we translate into variable width and height values  
	canvasContext.rect(Math.floor(corner1X), Math.floor(corner1Y), Math.floor(corner2X-corner1X), Math.floor(corner2Y-corner1Y));
	canvasContext.stroke();
}

function colorText (showWords, textX, textY, fillColor, fontName) {
	scaledContext.font = fontName;
	scaledContext.fillStyle = fillColor;
	scaledContext.fillText(showWords, textX, textY);
}