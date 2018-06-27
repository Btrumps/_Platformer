var particleDefs =  [
					{type: 'death', howMany: 15, startSpeed: 8, howLong: 30, gravity: 0.2, startAng: 0, angSpreadDeg: 180, color: 'white'}, // angSpreadDeg 180 = 360 deg since it can be -180 from to 180
					{type: 'land', howMany: 'random', startSpeed: 0.5, howLong: 30, gravity: 0.02, startAng: -90, angSpreadDeg: 45, color: 'white'}
					];

var particleList = [];

function pfx() {

	// initializing to onscreen values to narrow down point of breakage if any bugs occur
	// these get set in spawnParticles()
	this.x = 75;
	this.y = 75;
	this.velX = -3;
	this.velY = -3;
	this.cycleLife = 10;
	this.gravity = -1;

	this.color = 'white';

	this.move = function() {
		this.x += this.velX;
		this.y += this.velY;

		this.velY += this.gravity;

		this.cycleLife--;

	}

	this.readyToRemove = function() {
		return this.cycleLife <= 0; 
	}

	this.draw = function() {
		colorRect(Math.floor(this.x), Math.floor(this.y), 2,2, this.color, 0.8);
	}
}

function spawnParticles(type, startX, startY) {
	var pfxDef = null;
	var howMany = null;

	for (var i = 0; i < particleDefs.length; i++) {
		if (type == particleDefs[i].type) {
			pfxDef = particleDefs[i];
			break;
		}
	}

	if (pfxDef == null) {
		console.log('could not find particle definition, add to particleDefs! type: ' + type);
		return;
	}

	if (pfxDef.howMany == 'random') {
		howMany = getRoundedRandomNumberBetweenMinMax(2,4);
	} else {
		howMany = pfxDef.howMany;
	}

	

	for (var j = 0; j < howMany; j++) {
		var newPFX = new pfx();

		newPFX.x = startX;
		newPFX.y = startY;

		// var randAng = Math.random() * Math.PI * 2.0; // random radian

		
		var randAng = (pfxDef.startAng * Math.PI / 180.0) + 2.0 * (Math.random() - 0.5) * pfxDef.angSpreadDeg * (Math.PI / 180.0); // random radian
		var randSpeedPerc = Math.random() * pfxDef.startSpeed;

		newPFX.velX = randSpeedPerc * Math.cos(randAng);
		newPFX.velY = randSpeedPerc * Math.sin(randAng);

		newPFX.color = pfxDef.color;
		newPFX.cycleLife = pfxDef.howLong;
		newPFX.gravity = pfxDef.gravity * GRAVITY;

		particleList.push(newPFX);
	}	
}

function moveParticles() {
	for (var i = 0; i < particleList.length; i++) {
		particleList[i].move();
	}

	for (var i = particleList.length - 1; i >= 0; i--) {
		if ( particleList[i].readyToRemove() ) { 
			particleList.splice(i, 1);
		}
	} 
}

function drawParticles() {
	for (var i = 0; i < particleList.length; i++) {
		particleList[i].draw();
	}
}