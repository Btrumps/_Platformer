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
	var xCol = Math.floor(x / TILE_WIDTH);
	var yRow = Math.floor(y / TILE_HEIGHT);
	var index = colRowToArrayIndex(xCol, yRow);

	return levelGrid[index];
}

function returnIndexAtPixel(x, y) {
	var xCol = Math.floor(x / TILE_WIDTH);
	var yRow = Math.floor(y / TILE_HEIGHT);

	return colRowToArrayIndex(xCol, yRow);
}