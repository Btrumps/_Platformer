var playerIdleLeftAnim;

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
    that.rowToDraw = 0;

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

        that.context.drawImage(that.image, // source image
                               frameIndex * that.width, // source x
                               that.rowToDraw * that.height, // source y
                               that.width, //source width
                               that.height, // source height
                               Math.floor(x), // destination x
                               Math.floor(y), // destination y
                               that.width, // destination width
                               that.height); // destination height
    }

    return that;
}

function updateAnimations() {
  playerIdleLeftAnim.update();
  playerIdleRightAnim.update();
  playerRunLeftAnim.update();
  playerRunRightAnim.update();

  bossIntroAnim.update();

  collectibleAnim.update();

  if (okayToUpdateShooterAnim_W) {
    shooterWAnim.update();
  }
  if (okayToUpdateShooterAnim_E) {
    shooterEAnim.update();
  }
  if (okayToUpdateShooterAnim_N) {
    shooterNAnim.update();
  }
  if (okayToUpdateShooterAnim_S) {
    shooterSAnim.update();
  }
  
}

function setupSpriteSheets() {

    playerIdleLeftAnim = sprite({ 
      context: canvasContext,
      width: 16,
      height: 24,
      image: playerIdleLeft,
      loop: true,
      numberOfFrames: 12,
      ticksPerFrame: 8,
    });

    playerIdleRightAnim = sprite({ 
      context: canvasContext,
      width: 16,
      height: 24,
      image: playerIdleRight,
      loop: true,
      numberOfFrames: 12,
      ticksPerFrame: 8,
    });

    playerRunLeftAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 24,
      image: playerRunLeft,
      loop: true,
      numberOfFrames: 8,
      ticksPerFrame: 1,
    });

    playerRunRightAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 24,
      image: playerRunRight,
      loop: true,
      numberOfFrames: 8,
      ticksPerFrame: 1,
    });

    playerDeathLeftAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 24,
      image: playerDeathLeft,
      loop: false,
      numberOfFrames: 8,
      ticksPerFrame: 1,
    });

    playerDeathRightAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 24,
      image: playerDeathRight,
      loop: false,
      numberOfFrames: 8,
      ticksPerFrame: 1,
    });

    bossIntroAnim = sprite({
      context: canvasContext,
      width: 48,
      height: 48,
      image: bossIntro,
      loop: true,
      numberOfFrames: 8,
      ticksPerFrame: 12,
    });

    bossSlamAnim = sprite({
      context: canvasContext,
      width: 48,
      height: 48,
      image: bossSlam,
      loop: false,
      numberOfFrames: 4,
      ticksPerFrame: 4,
    });

    shooterWAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 16,
      image: shooterWAnim,
      loop: false,
      numberOfFrames: 4,
      ticksPerFrame: 8,
    });

    shooterEAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 16,
      image: shooterEAnim,
      loop: false,
      numberOfFrames: 4,
      ticksPerFrame: 8,
    });

    shooterNAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 16,
      image: shooterNAnim,
      loop: false,
      numberOfFrames: 4,
      ticksPerFrame: 8,
    });

    shooterSAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 16,
      image: shooterSAnim,
      loop: false,
      numberOfFrames: 4,
      ticksPerFrame: 8,
    });

    collectibleAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 16,
      image: collectibleAnim,
      loop: true,
      numberOfFrames: 4,
      ticksPerFrame: 6,
    });

    collectibleObtainedAnim = sprite({
      context: canvasContext,
      width: 16,
      height: 16,
      image: collectibleObtainedAnim,
      loop: false,
      numberOfFrames: 11,
      ticksPerFrame: 1,
    });
}