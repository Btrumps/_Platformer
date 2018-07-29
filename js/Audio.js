const COLLECTIBLE_OBTAINED_VOLUME = 0.05;
const COLLECTIBLE_START_TIMER_VOLUME = 0.3;
const DEATH_VOLUME = 0.2;
const DASH_VOLUME = 0.25;
const LANDING_VOLUME = 0.15;
const LEVEL_TRANSITION_VOLUME = 0.5;
const MENU_MOVE_VOLUME = 0.5;
const MENU_SELECT_VOLUME = 0.05;

const MENU_SONG_VOLUME = 0.4;
const FIRST_SONG_VOLUME = 0.3;
const SECOND_SONG_VOLUME = 0.2;
const THIRD_SONG_VOLUME = 0.4;


var audioFormat;
var musicEnabled = true;
var menuSong;
var firstSong;
var secondSong;
var thirdSong;


var deathSound;
var collectibleStartTimerSound;
var collectibleObtainedSound;
var dashSound;
var landingSound;
var levelTransitionSound;
var menuMoveSound;
var menuSelectSound;


function setFormat() {
	var audio = new Audio();

	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function playBGM(whatSong, whatVolume) {
	if (musicEnabled) {
		whatSong.loop = true;
		whatSong.volume = whatVolume;
		whatSong.play();
	} else {
		whatSong.pause();
		whatSong.currentTime = 0;
	}
}

function stopAllBGM() {
	menuSong.pause();
	menuSong.currentTime = 0;
	firstSong.pause();
	firstSong.currentTime = 0;
	secondSong.pause();
	secondSong.currentTime = 0;
	thirdSong.pause();
	thirdSong.currentTime = 0;
}

function playSound(whatSound, whatVolume) {
	whatSound.volume = whatVolume;
	whatSound.play();
}

function loadSounds() {
	setFormat();
	menuSong = new Audio("./audio/music/SadisticaveMenu.mp3");
	firstSong = new Audio("./audio/music/Sadisticave1.mp3");
	secondSong = new Audio("./audio/music/Sadisticave2.mp3");
	thirdSong = new Audio("./audio/music/Sadisticave3.mp3");
	deathSound = new Audio("./audio/sfx/death_sfx.mp3");
	collectibleObtainedSound = new Audio("./audio/sfx/collectible_obtained_sfx.mp3");
	collectibleStartTimerSound = new Audio("./audio/sfx/collectible_start_sfx.mp3");
	dashSound = new Audio("./audio/sfx/dash_sfx.mp3");
	landingSound = new Audio("./audio/sfx/landing2_sfx.mp3");
	menuMoveSound = new Audio("./audio/sfx/menumove_sfx.mp3");
	menuSelectSound = new Audio("./audio/sfx/collectible_obtained_sfx.mp3");
	levelTransitionSound = new Audio("./audio/sfx/leveltransition_sfx.mp3");
}