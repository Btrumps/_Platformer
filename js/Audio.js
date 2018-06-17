var audioFormat;
var musicEnabled = false;
var firstSong;

var deathSound;


function setFormat() {
	var audio = new Audio();

	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function playBGM() {
	if (musicEnabled) {
		firstSong.volume = 0.8;
		firstSong.play();
	} else {
		firstSong.pause();
		firstSong.currentTime = 0;
	}
}

function playDeathSound() {
	deathSound.play();
}

function loadSounds() {
	setFormat();
	firstSong = new Audio("./audio/deepdark" + audioFormat);
	deathSound = new Audio("./audio/sfx/death_sfx.mp3");
}