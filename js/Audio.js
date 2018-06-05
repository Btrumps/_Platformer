var audioFormat;
var musicEnabled = true;
var firstSong;


function setFormat() {
	var audio = new Audio();

	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function playBGMMusic() {
	if (musicEnabled && currentLevel < 3) {
		firstSong.play();
	} else {
		firstSong.pause();
		firstSong.currentTime = 0;
	}
}

function loadSounds() {
	setFormat();
	firstSong = new Audio("./audio/deepdark" + audioFormat);
}