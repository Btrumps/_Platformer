function colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor, opacity) {
	canvasContext.fillStyle = fillColor;
	canvasContext.globalAlpha = opacity;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
	canvasContext.globalAlpha = 1.0;
}

function coloredOutlineRectCornerToCorner (corner1X, corner1Y, corner2X, corner2Y, lineColor) {
	canvasContext.strokeStyle = lineColor;
	canvasContext.beginPath();
	canvasContext.setLineDash([]);
	// by subtracting the 2nd X/Y from the 1st X/Y, we translate into variable width and height values  
	canvasContext.rect(corner1X, corner1Y, corner2X-corner1X, corner2Y-corner1Y);
	canvasContext.stroke();
}

function colorText (showWords, textX, textY, fillColor, fontName) {
	scaledContext.font = fontName;
	scaledContext.fillStyle = fillColor;
	scaledContext.fillText(showWords, textX, textY);
}