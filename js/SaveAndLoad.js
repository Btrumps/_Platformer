function saveGameTime() {
	localStorage.setItem("time", totalGameTime);
}

function getGameTime() {
	return localStorage.getItem("time");
}

function saveLevel() {
	localStorage.setItem("level", currentLevel);
}

function getSavedLevel() {
	return localStorage.getItem("level");
}

function saveCollectibleObtainedForLevel(value) {
	localStorage.setItem("collectibleObtained", value); 
}

function getCollectibleObtainedForLevel(value) {
	return localStorage.getItem("collectibleObtained");
}

function saveDeathCount() {
	localStorage.setItem("deathCount", totalDeaths);
}

function getDeathCount() {
	return localStorage.getItem("deathCount");
}

function saveCollectibleCount() {
	localStorage.setItem("collectibleCount", totalCollectibles);
}

function getCollectibleCount() {
	return localStorage.getItem("collectibleCount");
}