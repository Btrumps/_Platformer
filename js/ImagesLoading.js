var levelPics = [];
var helpPics = [];

var picsToLoad = 0;

var mainMenuImg = document.createElement("img");

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

var bossIntro = document.createElement("img");
var bossSlam = document.createElement("img");
var bossRoomSlamFace = document.createElement("img");
var bossEnragedFace = document.createElement("img");
var bossReturningToChaseFace = document.createElement("img");

var switchOff = document.createElement("img");
var switchOn = document.createElement("img");

var shooterWAnim = document.createElement("img");
var shooterEAnim = document.createElement("img");
var shooterNAnim = document.createElement("img");
var shooterSAnim = document.createElement("img");

var followDrone = document.createElement("img");
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

function loadImageForHelpCode(helpCode, fileName) {
	helpPics[helpCode] = document.createElement("img");
	beginLoadingImage(helpPics[helpCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: mainMenuImg, theFile: "./images/menu.png"},
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
		{varName: bossIntro, theFile: "./images/enemy/boss_intro_anim.png"},
		{varName: bossSlam, theFile: "./images/enemy/boss_slam_anim.png"},
		{varName: bossRoomSlamFace, theFile: "./images/enemy/boss_room_slam_face.png"},
		{varName: bossEnragedFace, theFile: "./images/enemy/boss_enraged_face.png"},
		{varName: bossReturningToChaseFace, theFile: "./images/enemy/boss_returning_to_chase_face.png"},
		{varName: playerFallingImg, theFile: "./images/player/player_falling.png"},
		{varName: switchOff, theFile: "./images/level_obstacles/switch_off.png"},
		{varName: switchOn, theFile: "./images/level_obstacles/switch_on.png"},
		{varName: shooterWAnim, theFile: "./images/level_obstacles/shooter_w_anim.png"},
		{varName: shooterEAnim, theFile: "./images/level_obstacles/shooter_e_anim.png"},
		{varName: shooterNAnim, theFile: "./images/level_obstacles/shooter_n_anim.png"},
		{varName: shooterSAnim, theFile: "./images/level_obstacles/shooter_s_anim.png"},
		{varName: followDrone, theFile: "./images/level_obstacles/follow_drone.png"},
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
		{levelType: LEVEL_PLATFORM_FALLING, theFile: "./images/level_tiles/platform_falling.png"},
		{levelType: LEVEL_PLATFORM_SINGLE, theFile: "./images/level_tiles/platform_single.png"},
		{levelType: LEVEL_SPIKE_N, theFile: "./images/level_obstacles/spike_N.png"},
		{levelType: LEVEL_SPIKE_S, theFile: "./images/level_obstacles/spike_S.png"},
		{levelType: LEVEL_SPIKE_W, theFile: "./images/level_obstacles/spike_W.png"},
		{levelType: LEVEL_SPIKE_E, theFile: "./images/level_obstacles/spike_E.png"},
		{levelType: LEVEL_SPIKE_TRIGGER, theFile: "./images/level_obstacles/spike_trigger.png"},
		{levelType: LEVEL_SQUARE_SPIKE, theFile: "./images/level_obstacles/square_spike2.png"},
		{levelType: LEVEL_SQUARE_SPIKE_V, theFile: "./images/level_obstacles/square_spike2.png"},
		{levelType: LEVEL_SQUARE_SPIKE_H, theFile: "./images/level_obstacles/square_spike2.png"},
		{levelType: LEVEL_DOOR_1, theFile: "./images/level_obstacles/door_1.png"},
		{levelType: LEVEL_SPIKE_S_FALLING, theFile: "./images/level_obstacles/spike_S_falling.png"},
		{levelType: LEVEL_DASH_POWERUP, theFile: "./images/level_obstacles/dash_powerup.png"},
		{helpType: LEVEL_HELP_A_KEY, theFile: "./images/level_help/level_a_key.png"},
		{helpType: LEVEL_HELP_AG, theFile: "./images/level_help/level_ag.png"},
		{helpType: LEVEL_HELP_AI, theFile: "./images/level_help/level_ai.png"},
		{helpType: LEVEL_HELP_N, theFile: "./images/level_help/level_n.png"},
		{helpType: LEVEL_HELP_ARROW_DOWN, theFile: "./images/level_help/level_arrow_down.png"},
		{helpType: LEVEL_HELP_ARROW_LEFT, theFile: "./images/level_help/level_arrow_left.png"},
		{helpType: LEVEL_HELP_ARROW_RIGHT, theFile: "./images/level_help/level_arrow_right.png"},
		{helpType: LEVEL_HELP_ARROW_UP, theFile: "./images/level_help/level_arrow_up.png"},
		{helpType: LEVEL_HELP_D_KEY, theFile: "./images/level_help/level_d_key.png"},
		{helpType: LEVEL_HELP_DA, theFile: "./images/level_help/level_da.png"},
		{helpType: LEVEL_HELP_HORIZONTAL_LINE, theFile: "./images/level_help/level_horizontal_line.png"},
		{helpType: LEVEL_HELP_JU, theFile: "./images/level_help/level_ju.png"},
		{helpType: LEVEL_HELP_LEFT_ARROWKEY, theFile: "./images/level_help/level_left_arrowkey.png"},
		{helpType: LEVEL_HELP_MO, theFile: "./images/level_help/level_mo.png"},
		{helpType: LEVEL_HELP_MP, theFile: "./images/level_help/level_mp.png"},
		{helpType: LEVEL_HELP_RIGHT_ARROWKEY, theFile: "./images/level_help/level_right_arrowkey.png"},
		{helpType: LEVEL_HELP_S_KEY, theFile: "./images/level_help/level_s_key.png"},
		{helpType: LEVEL_HELP_SH, theFile: "./images/level_help/level_sh.png"},
		{helpType: LEVEL_HELP_TO, theFile: "./images/level_help/level_to.png"},
		{helpType: LEVEL_HELP_UP_ARROWKEY, theFile: "./images/level_help/level_up_arrowkey.png"},
		{helpType: LEVEL_HELP_VE, theFile: "./images/level_help/level_ve.png"},
		{helpType: LEVEL_HELP_VERTICAL_LINE, theFile: "./images/level_help/level_vertical_line.png"},
		{helpType: LEVEL_HELP_W_KEY, theFile: "./images/level_help/level_w_key.png"},
		];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage( imageList[i].varName, imageList[i].theFile );
		} else if (imageList[i].levelType != undefined) {
			loadImageForLevelCode( imageList[i].levelType, imageList[i].theFile );
		} else {
			loadImageForHelpCode( imageList[i].helpType, imageList[i].theFile )
		}

	}
}

function playerBlueImageSwap() {
	if (player.dashesLeft > 0) {
		playerIdleLeft.src =  "./images/player/player_idleleft_blue_anim.png";
		playerIdleRight.src =  "./images/player/player_idleright_blue_anim.png";
		playerJumpLeft.src =  "./images/player/player_jumpleft_blue_anim.png";
		playerJumpRight.src =  "./images/player/player_jumpright_blue_anim.png";
		playerRunLeft.src =  "./images/player/player_runleft_blue_anim.png";
		playerRunRight.src =  "./images/player/player_runright_blue_anim.png";
		playerFallingImg.src =  "./images/player/player_falling_blue.png";
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
