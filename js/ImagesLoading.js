var levelPics = [];
var bgPics = [];

var picsToLoad = 0;

var playerIdleLeft = document.createElement("img");
var playerIdleRight = document.createElement("img");
var playerRunLeft = document.createElement("img");
var playerRunRight = document.createElement("img");
var playerJumpLeft = document.createElement("img");
var playerJumpRight = document.createElement("img");
var playerDeathLeft = document.createElement("img");
var playerDeathRight = document.createElement("img");
var playerDashLeftImg = document.createElement("img");
var playerDashRightImg = document.createElement("img");
var playerDashUpImg = document.createElement("img");
var playerFallingImg = document.createElement("img");

var enterPortalAnim = document.createElement("img");
var exitPortalAnim = document.createElement("img");
var collectibleAnim = document.createElement("img");
var collectibleObtainedAnim = document.createElement("img");

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		imagesDoneLoadingSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = fileName;
}

function loadImageForLevelCode(levelCode, fileName) {
	levelPics[levelCode] = document.createElement("img");
	beginLoadingImage(levelPics[levelCode], fileName);
}

function loadImageForBGCode(bgCode, fileName) {
	bgPics[bgCode] = document.createElement("img");
	beginLoadingImage(bgPics[bgCode], fileName);
}

function playerBlueImageSwap() {
	if (player.dashesLeft > 0) {
		playerIdleLeft.src =  "./images/player/player_idleleft_blue_anim.png";
		playerIdleRight.src =  "./images/player/player_idleright_blue_anim.png";
		playerJumpLeft.src =  "./images/player/player_jumpleft_blue_anim.png";
		playerJumpRight.src =  "./images/player/player_jumpright_blue_anim.png";
		playerRunLeft.src =  "./images/player/player_runleft_blue_anim.png";
		playerRunRight.src =  "./images/player/player_runright_blue_anim.png";
		playerFallingImg.src =  "./images/player/player_blue_falling.png";
	} else if (player.dashesLeft <= 0) {
		playerIdleLeft.src =  "./images/player/player_idleleft_anim.png";
		playerIdleRight.src =  "./images/player/player_idleright_anim.png";
		playerJumpLeft.src =  "./images/player/player_jumpleft_anim.png";
		playerJumpRight.src =  "./images/player/player_jumpright_anim.png";
		playerRunLeft.src =  "./images/player/player_runleft_anim.png";
		playerRunRight.src =  "./images/player/player_runright_anim.png";
		playerFallingImg.src =  "./images/player/player_falling.png";
	}
}

function loadImages() {
	var imageList = [
		{varName: playerIdleLeft, theFile: "./images/player/player_idleleft_anim.png"},
		{varName: playerIdleRight, theFile: "./images/player/player_idleright_anim.png"},
		{varName: playerRunLeft, theFile: "./images/player/player_runleft_anim.png"},
		{varName: playerRunRight, theFile: "./images/player/player_runright_anim.png"},
		{varName: playerJumpLeft, theFile: "./images/player/player_jumpleft_anim.png"},
		{varName: playerJumpRight, theFile: "./images/player/player_jumpright_anim.png"},
		{varName: playerDeathLeft, theFile: "./images/player/player_deathleft_anim.png"},
		{varName: playerDeathRight, theFile: "./images/player/player_deathright_anim.png"},
		{varName: playerDashLeftImg, theFile: "./images/player/player_dashleft.png"},
		{varName: playerDashRightImg, theFile: "./images/player/player_dashright.png"},
		{varName: playerDashUpImg, theFile: "./images/player/player_dashup.png"},
		{varName: playerFallingImg, theFile: "./images/player/player_falling.png"},
		{varName: enterPortalAnim, theFile: "./images/level_obstacles/enter_portal_anim2.png"},
		{varName: exitPortalAnim, theFile: "./images/level_obstacles/exit_portal_anim2.png"},
		{varName: collectibleAnim, theFile: "./images/level_obstacles/collectible_anim.png"},
		{varName: collectibleObtainedAnim, theFile: "./images/level_obstacles/collectible_obtained_anim.png"},
		{levelType: LEVEL_PLATFORM_N, theFile: "./images/level_tiles/platform_N.png"},
		{levelType: LEVEL_PLATFORM_S, theFile: "./images/level_tiles/platform_S.png"},
		{levelType: LEVEL_PLATFORM_W, theFile: "./images/level_tiles/platform_W.png"},
		{levelType: LEVEL_PLATFORM_E, theFile: "./images/level_tiles/platform_E2.png"},
		{levelType: LEVEL_PLATFORM_NW, theFile: "./images/level_tiles/platform_NW.png"},
		{levelType: LEVEL_PLATFORM_NE, theFile: "./images/level_tiles/platform_NE.png"},
		{levelType: LEVEL_PLATFORM_SW, theFile: "./images/level_tiles/platform_SW.png"},
		{levelType: LEVEL_PLATFORM_SE, theFile: "./images/level_tiles/platform_SE.png"},
		{levelType: LEVEL_PLATFORM_N_PILLAR, theFile: "./images/level_tiles/platform_N_pillar.png"},
		{levelType: LEVEL_PLATFORM_S_PILLAR, theFile: "./images/level_tiles/platform_S_pillar.png"},
		{levelType: LEVEL_PLATFORM_W_PILLAR, theFile: "./images/level_tiles/platform_W_pillar.png"},
		{levelType: LEVEL_PLATFORM_E_PILLAR, theFile: "./images/level_tiles/platform_E_pillar.png"},
		{levelType: LEVEL_PLATFORM_BLANK, theFile: "./images/level_tiles/platform_blank.png"},
		{levelType: LEVEL_PLATFORM_VERTICAL_MIDDLE, theFile: "./images/level_tiles/platform_vertical_middle.png"},
		{levelType: LEVEL_PLATFORM_HORIZONTAL_MIDDLE, theFile: "./images/level_tiles/platform_horizontal_middle.png"},
		{levelType: LEVEL_SPIKE_N, theFile: "./images/level_obstacles/spike_N2.png"},
		{levelType: LEVEL_SPIKE_S, theFile: "./images/level_obstacles/spike_S2.png"},
		{levelType: LEVEL_SPIKE_W, theFile: "./images/level_obstacles/spike_W2.png"},
		{levelType: LEVEL_SPIKE_E, theFile: "./images/level_obstacles/spike_E2.png"},
		{levelType: LEVEL_SPIKE_S_FALLING, theFile: "./images/level_obstacles/spike_S_falling.png"},
		{levelType: LEVEL_DASH_POWERUP, theFile: "./images/level_obstacles/dash_powerup.png"}
		];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage( imageList[i].varName, imageList[i].theFile );
		} else if (imageList[i].levelType != undefined) {
			loadImageForLevelCode( imageList[i].levelType, imageList[i].theFile );
		} else {
			loadImageForBGCode( imageList[i].bgType, imageList[i].theFile )
		}

	}
}
