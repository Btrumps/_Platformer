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

function saveAnyPercentScore(timeValue, deathCountValue) {
	localStorage.setItem("anyPercTime", timeValue);
	localStorage.setItem("anyPercDeathCount", deathCountValue);
}

function saveHundredPercentScore(timeValue, deathCountValue) {
	localStorage.setItem("hundredPercTime", timeValue);
	localStorage.setItem("hundredPercDeathCount", deathCountValue);
}

function getAnyPercentTime() {
	return localStorage.getItem("anyPercTime");
}

function getAnyPercentDeathCount() {
	return localStorage.getItem("anyPercDeathCount");
}

function getHundredPercentTime() {
	return localStorage.getItem("hundredPercTime");
}

function getHundredPercentDeathCount() {
	return localStorage.getItem("hundredPercDeathCount");
}

function getHundredPercentDeathCount() {
	return localStorage.getItem("hundredPercCollectibleCount");
}

function deleteAllSpeedRunInfo() {
	localStorage.removeItem("anyPercTime");
	localStorage.removeItem("anyPercDeathCount");
	localStorage.removeItem("hundredPercTime");
	localStorage.removeItem("hundredPercDeathCount");
	localStorage.removeItem("hundredPercCollectibleCount");
}

function deleteAllSavedInfo() {
	localStorage.removeItem("time");
	localStorage.removeItem("level");
	localStorage.removeItem("deathCount");
	localStorage.removeItem("collectibleCount");
	localStorage.removeItem("collectibleObtained");
}