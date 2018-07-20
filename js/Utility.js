function colRowToArrayIndex(col, row) {
	return col + (row * LEVEL_COLS);
}

function arrayIndexToCol(index) {
	return index % LEVEL_COLS + 1;
	
}

function arrayIndexToRow(index) {
	return Math.floor(index / LEVEL_COLS) + 1;
}

function colToCenteredX(col) {
	return (col * TILE_WIDTH) - TILE_WIDTH/2;
}

function rowToCenteredY(row) {
	return (row * TILE_HEIGHT) - TILE_HEIGHT/2;
}

function indexToCenteredXY(index) {
	var colIndex = arrayIndexToCol(index);
	var rowIndex = arrayIndexToRow(index);
	return {
			x: colToCenteredX(colIndex),
			y: rowToCenteredY(rowIndex)
		};
}

function returnTileTypeAtPixel(x, y) {
	// This is added to stop from choosing the index of the other side of the screen
	if (x >= canvas.width) {
		x = canvas.width - 1;
	} else if (x < 0) {
		x = 0;
	}

	if (y >= canvas.height) {
		y = canvas.height - 1;
	} else if (y < 0) {
		y = 0;
	}

	var xCol = Math.floor(x / TILE_WIDTH);
	var yRow = Math.floor(y / TILE_HEIGHT);

	var index = colRowToArrayIndex(xCol, yRow);

	return levelGrid[index];
}

function returnIndexAtPixel(x, y) {
	// This is added to stop from choosing the index of the other side of the screen
	if (x >= canvas.width) {
		x = canvas.width - 1;
	} else if (x < 0) {
		x = 0;
	}

	if (y >= canvas.height) {
		y = canvas.height - 1;
	} else if (y < 0) {
		y = 0;
	}

	var xCol = Math.floor(x / TILE_WIDTH);
	var yRow = Math.floor(y / TILE_HEIGHT);

	return colRowToArrayIndex(xCol, yRow);
}

function getRandomNumberBetweenMinMax(min, max) {
  return Math.random() * (max - min) + min;
}

function getRoundedRandomNumberBetweenMinMax(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}