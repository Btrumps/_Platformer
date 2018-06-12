function sprite(options) {
    var that = {};
    var frameIndex = 0; // current frame to be displayed
    var tickCount = 0; // the number of updates since the current frame was first displayed
    var ticksPerFrame = options.ticksPerFrame || 0; // the number of updates until the next frame should be displayed
    var numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.image = options.image;
    that.loop = options.loop;
    that.width = options.width;
    that.height = options.height;

    that.update = function() {
        tickCount++;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;

            // if the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                frameIndex++; // go to the next frame
            } else if (that.loop) {
                frameIndex = 0;
            }
        }
    }
	
	that.reset = function() {
		tickCount = 0;
		frameIndex = 0;
	}

    that.render = function(x, y) {
        // clear the canvas
        // context.clearRect(0,0, that.width, that.height);
        var picWidth = Math.floor(that.width / numberOfFrames);

        that.context.drawImage(that.image, // source image
                               frameIndex * picWidth, // source x
                               0, // source y
                               picWidth, //source width
                               that.height, // source height
                               Math.floor(x), // destination x
                               Math.floor(y), // destination y
                               picWidth, // destination width
                               that.height); // destination height
    }

    return that;
}

function updateAnimations() {
  playerIdleLeftAnim.update();
  playerIdleRightAnim.update();
  playerRunLeftAnim.update();
  playerRunRightAnim.update();
  playerJumpLeftAnim.update();
  playerJumpRightAnim.update();
  enterPortalAnim.update();
  exitPortalAnim.update();
  collectibleAnim.update();
}

function setupSpriteSheets() {
    playerIdleLeftAnim = sprite({ 
      context: canvasContext,
      width: 192,
      height: 24,
      image: playerIdleLeft,
      loop: true,
      numberOfFrames: 12,
      ticksPerFrame: 8,
    });

    playerIdleRightAnim = sprite({ 
      context: canvasContext,
      width: 192,
      height: 24,
      image: playerIdleRight,
      loop: true,
      numberOfFrames: 12,
      ticksPerFrame: 8,
    });

    playerRunLeftAnim = sprite({
      context: canvasContext,
      width: 128,
      height: 24,
      image: playerRunLeft,
      loop: true,
      numberOfFrames: 8,
      ticksPerFrame: 1,
    });

    playerRunRightAnim = sprite({
      context: canvasContext,
      width: 128,
      height: 24,
      image: playerRunRight,
      loop: true,
      numberOfFrames: 8,
      ticksPerFrame: 1,
    });

    playerJumpLeftAnim = sprite({
      context: canvasContext,
      width: 48,
      height: 24,
      image: playerJumpLeft,
      loop: true,
      numberOfFrames: 3,
      ticksPerFrame: 16,
    });

    playerJumpRightAnim = sprite({
      context: canvasContext,
      width: 48,
      height: 24,
      image: playerJumpRight,
      loop: true,
      numberOfFrames: 3,
      ticksPerFrame: 16,
    });

    enterPortalAnim = sprite({
      context: canvasContext,
      width: 128,
      height: 32,
      image: enterPortalImg,
      loop: true,
      numberOfFrames: 4,
      ticksPerFrame: 8,
    });

    exitPortalAnim = sprite({
      context: canvasContext,
      width: 128,
      height: 32,
      image: exitPortalImg,
      loop: true,
      numberOfFrames: 4,
      ticksPerFrame: 8,
    });

    collectibleAnim = sprite({
      context: canvasContext,
      width: 64,
      height: 16,
      image: collectibleImg,
      loop: true,
      numberOfFrames: 4,
      ticksPerFrame: 6,
    });
}