function saveLevel() {
	localStorage.setItem("level", currentLevel);
}

function getSavedLevel() {
	return localStorage.getItem("level");
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