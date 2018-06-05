
var allTriggersArray = [];

function triggerClass(col, row, index, whichType) {

	this.centeredX = (col * TILE_WIDTH) + TILE_WIDTH / 2;
	this.centeredY = (row * TILE_WIDTH) + TILE_WIDTH / 2;

	this.col = col;
	this.row = row;
	this.index = index;
	this.type = whichType;

	this.playerInside = false;

	this.move = function() {
		if (this.index == player.currentIndex) {
			this.playerInside = true;
		} else {
			this.playerInside = false;
		}

	}

	this.distFrom = function(otherX, otherY) {
		deltaX = otherX - this.centeredX;
		deltaY = otherY - this.centeredY;

		return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
	}


}