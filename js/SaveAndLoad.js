function saveLevel() {
	localStorage.setItem("level", currentLevel);
}

function getSavedLevel() {
	return localStorage.getItem("level");
}