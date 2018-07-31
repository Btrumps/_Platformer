const COLLECTIBLE_OBTAINED_VOLUME = 0.15;
const COLLECTIBLE_START_TIMER_VOLUME = 0.6;
const DEATH_VOLUME = 0.35;
const DASH_VOLUME = 0.25;
const LANDING_VOLUME = 0.15;
const POWERUP_VOLUME = 0.15;
const LEVEL_TRANSITION_VOLUME = 0.2;
const PLATFORM_FALLING_VOLUME = 0.2;
const MENU_MOVE_VOLUME = 0.5;
const MENU_SELECT_VOLUME = 0.1;
const VICTORY_VOLUME = 0.5;

const MENU_SONG_VOLUME = 0.4;
const FIRST_SONG_VOLUME = 0.3;
const SECOND_SONG_VOLUME = 0.2;
const THIRD_SONG_VOLUME = 0.4;


var audioFormat;
var musicEnabled = false;
var menuSong;
var firstSong;
var secondSong;
var thirdSong;


var deathSound;
var collectibleStartTimerSound;
var collectibleObtainedSound;
var dashSound;
var dashSoundAlt;
var landingSound;
var landingSoundAlt;
var powerupSound;
var powerupSoundAlt;
var platformFallingSound;
var platformFallingSoundAlt;
var levelTransitionSound;
var menuMoveSound;
var menuSelectSound;
var victorySound;

var dashAltSoundTurn = false;
var landingAltSoundTurn = false;
var powerupAltSoundTurn = false;

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

function playRepeatingSound(whatSound, whatAltSound, altBool, whatVolume) {
  	
    if(altBool) {
    	whatAltSound.volume = whatVolume;
    	whatAltSound.currentTime = 0;
     	whatAltSound.play();
    } else {
    	whatSound.volume = whatVolume;
      	whatSound.currentTime = 0;
      	whatSound.play();
    }

    altBool = !altBool;
  
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
	platformFallingSound = new Audio("./audio/sfx/platform_falling_sfx.mp3");
	powerupSound = new Audio("./audio/sfx/powerup_sfx.mp3");
	menuMoveSound = new Audio("./audio/sfx/menumove_sfx.mp3");
	menuSelectSound = new Audio("./audio/sfx/collectible_obtained_sfx.mp3");
	levelTransitionSound = new Audio("./audio/sfx/level_transition_sfx.mp3");
	victorySound = new Audio("./audio/sfx/victory_sfx.mp3");
}