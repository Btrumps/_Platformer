var levelPics = [];
var bgPics = [];

var picsToLoad = 0;


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

function loadImages() {
	var imageList = [
		{levelType: LEVEL_PLATFORM_LEFT, theFile: "./images/level_platform_left.png"},
		{levelType: LEVEL_PLATFORM_RIGHT, theFile: "./images/level_platform_right.png"},
		{levelType: LEVEL_PLATFORM_LEFT_DOWN, theFile: "./images/level_platform_left_down.png"},
		{levelType: LEVEL_PLATFORM_RIGHT_DOWN, theFile: "./images/level_platform_right_down.png"},
		{levelType: LEVEL_PLATFORM_BOTH, theFile: "./images/level_platform_both.png"},
		{levelType: LEVEL_PLATFORM_BOTH_DOWN, theFile: "./images/level_platform_both_down.png"},
		{levelType: LEVEL_SPIKES, theFile: "./images/level_spikes.png"},
		{levelType: LEVEL_SPIKE_TRIGGER, theFile: "./images/level_spike_trigger.png"},
		{bgType: BG_BRICK_1, theFile: "./images/bg_brick_1.png"},
		{bgType: BG_BRICK_2, theFile: "./images/bg_brick_2.png"},
		{bgType: BG_BRICK_3, theFile: "./images/bg_brick_3.png"},
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
