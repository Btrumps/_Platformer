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
		{levelType: LEVEL_PLATFORM_N, theFile: "./images/platform_N.png"},
		{levelType: LEVEL_PLATFORM_S, theFile: "./images/platform_S.png"},
		{levelType: LEVEL_PLATFORM_W, theFile: "./images/platform_W.png"},
		{levelType: LEVEL_PLATFORM_E, theFile: "./images/platform_E2.png"},
		{levelType: LEVEL_PLATFORM_NW, theFile: "./images/platform_NW.png"},
		{levelType: LEVEL_PLATFORM_NE, theFile: "./images/platform_NE.png"},
		{levelType: LEVEL_PLATFORM_SW, theFile: "./images/platform_SW.png"},
		{levelType: LEVEL_PLATFORM_SE, theFile: "./images/platform_SE.png"},
		{levelType: LEVEL_PLATFORM_N_PILLAR, theFile: "./images/platform_N_pillar.png"},
		{levelType: LEVEL_PLATFORM_S_PILLAR, theFile: "./images/platform_S_pillar.png"},
		{levelType: LEVEL_PLATFORM_W_PILLAR, theFile: "./images/platform_W_pillar.png"},
		{levelType: LEVEL_PLATFORM_E_PILLAR, theFile: "./images/platform_E_pillar.png"},
		{levelType: LEVEL_PLATFORM_BLANK, theFile: "./images/platform_blank.png"},
		{levelType: LEVEL_PLATFORM_VERTICAL_MIDDLE, theFile: "./images/platform_vertical_middle.png"},
		{levelType: LEVEL_PLATFORM_HORIZONTAL_MIDDLE, theFile: "./images/platform_horizontal_middle.png"},
		{levelType: LEVEL_SPIKE_N, theFile: "./images/spike_N.png"},
		{levelType: LEVEL_SPIKE_S, theFile: "./images/spike_S.png"},
		{levelType: LEVEL_SPIKE_W, theFile: "./images/spike_W.png"},
		{levelType: LEVEL_SPIKE_E, theFile: "./images/spike_E.png"},
		{levelType: LEVEL_SPIKE_TRIGGER, theFile: "./images/spike_trigger.png"},
		/*
		{bgType: BG_BRICK_1, theFile: "./images/bg_brick_1.png"},
		{bgType: BG_BRICK_2, theFile: "./images/bg_brick_2.png"},
		{bgType: BG_BRICK_3, theFile: "./images/bg_brick_3.png"},
		*/
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
