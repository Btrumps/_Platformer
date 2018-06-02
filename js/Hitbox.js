
function hitBoxClass(x,y, width,height) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.box = {};

	this.setCollider = function(posX, posY) {

		this.box.topLeft = {
			x: posX - this.width/2 + this.offsetX,
			y: posY - this.height/2 + this.offsetY
		}

		this.box.topRight = {
			x: posX + this.width/2 + this.offsetX,
			y: posY - this.height/2 + this.offsetY
		}

		this.box.bottomLeft = {
			x: posX - this.width/2 + this.offsetX,
			y: posY + this.height/2 + this.offsetY
		}

		this.box.bottomRight = {
            x: posX + this.width/2 + this.offsetX,
			y: posY + this.height/2 + this.offsetY
    	}
        this.x = posX + this.offsetX;
        this.y = posY + this.offsetY;
	}
    this.setCollider(x, y);

    this.isCollidingWith = function(otherCollider) {
        var myLeft = this.box.topLeft.x;
        var myRight = this.box.topLeft.x + this.width;
        var myTop = this.box.topLeft.y;
        var myBottom = this.box.topLeft.y + this.height;
        var theirLeft = otherCollider.box.topLeft.x;
        var theirRight = otherCollider.box.topLeft.x + otherCollider.width;
        var theirTop = otherCollider.box.topLeft.y;
        var theirBottom = otherCollider.box.topLeft.y + otherCollider.height;
        return ((myLeft > theirRight || // I'm right of them
                myRight < theirLeft  || // I'm left of them
                myTop > theirBottom  || // I'm below them
                myBottom < theirTop) // I'm above them
                == false); // if none of the above are true, boxes don't overlap
        // NOTE(Cipherpunk): Thanks, Chris!
    }

    this.update = function(posX, posY) {
        this.setCollider(posX, posY);
    }

    this.draw = function(color) {
        canvasContext.strokeStyle = color;
        canvasContext.lineWidth = 1;
        var x = Math.floor(this.box.topLeft.x) + .5;
        var y = Math.floor(this.box.topLeft.y) + .5;
        canvasContext.strokeRect(x, y, this.width, this.height);
    }






}