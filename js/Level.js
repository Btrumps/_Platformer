const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const LEVEL_COLS = 32;
const LEVEL_ROWS = 28;

var currentLevel = 1;

var level1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,8,8,8,9,0,0,0,null,null,null,null,null,null,null,7,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,8,8,9,null,null,null,null,0,7,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,9,null,null,null,7,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,6,0,0,0,4,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,0,null,0,4,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,0,4,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,6,null,null,0,4,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,4,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,1,2,2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,null,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,8,8,8,8,8,8];
var level2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,8,8,8,8,8,9,0,0,0,0,7,8,8,8,8,9,0,0,0,0,0,0,0,0,7,8,8,8,8,8,8,8,0,0,0,0,0,6,14,14,14,14,4,0,0,0,0,6,14,14,14,14,14,14,14,14,4,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,8,8,0,0,0,0,0,0,8,8,8,8,8,8,8,8];
var level3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,3,null,null,null,null,null,null,null,null,null,null,null,null,1,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,8,8,8,8,8,8,8,8,8,9,null,null,null,null,null,null,null,null,null,null,null,null,7,8,8,8,8,8,8,8,8,8,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,null,null,null,null,null,null,null,null,0,6,14,14,14,14,14,14,14,14,14,14,14,14,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,8,8,8,8,8,8,8,8,8,8,8,8,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var level4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,25,null,null,null,null,null,null,null,null,null,null,null,null,600,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,8,8,8,8,8,8,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,8,8,8,8,8,8,null,null,null,null,null,null,null,6,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0];
var level5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,2,2,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,null,null,0,null,null,null,null,null,7,8,8,8,8,8,8,8,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,0,0,25,0,null,4,0,null,null,null,null,null,null,0,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,4,0,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,0,null,null,null,null,null,null,0,8,8,8,8,8,8,8,8,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,null,null,null,null,null,null,null,0,0,6,null,null,null,null,null,null,null,null,null,null,null,null,null,4,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,6,14,14,14,14,14,14,14,14,14,14,14,14,14,4,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0];
var level6 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,2,2,2,2,2,2,2,2,2,2,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,4,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,4,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,500,null,null,null,null,null,null,null,null,null,0,4,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,0,4,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,8,8,8,8,9,0,0,null,null,0,4,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,0,null,null,0,4,null,0,null,null,null,null,null,null,0,0,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,6,null,0,null,null,0,4,null,0,null,null,null,null,null,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,4,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,null,null,0,null,null,6,null,0,null,null,0,4,0,0,0,0,0,0,0,6,0,null,null,null,null,null,null,null,null,null,null,600,null,null,null,0,0,6,null,0,null,null,null,1,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,600,null,null,0,0,0,6,0,0,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,0,0,0,0,0,0,600,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,600,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,7,8,8,8,8,8,8,null,null,null,null,null,6,null,0,null,0,0,0,0,0,0,0,null,null,0,0,null,0,null,0,null,4,0,0,null,0,0,0,null,null,null,null,null,6,null,0,null,null,0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,4,0,0,0,0,0,0,null,null,null,null,null,6,14,14,14,14,14,14,14,14,0,0,0,0,0,0,null,null,null,null,null,4,0,0,0,0,0,0,null,null,null,null,null,0,8,8,8,8,8,8,8,9,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,0,0,6,14,14,14,14,14,14,14,14,14,14,14,4,null,null,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,8,8,8,8,8,8,8,8,8,8,8];
var level7 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,null,null,null,null,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,null,0,0,0,0];
var level8 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,24,24,0,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,0,0,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,2,2,2,2,2,2,2,3,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,null,null,null,null,null,null,0,0,0,0,0,4,null,null,null,null,null,null,null,null,0,null,0,0,0,0,0,null,null,null,null,500,null,null,null,null,null,null,null,0,null,null,0,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,8,8,8,8,8,8,8,9,0,0,0,4,0,null,null,null,2,2,2,2,2,2,2,2,2,2,null,null,null,null,null,null,null,null,null,null,null,null,0,6,0,0,0,4,0,null,null,6,24,24,0,0,0,0,0,0,0,0,4,0,0,0,0,null,null,2,2,2,null,null,0,3,null,0,10,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,null,6,0,24,24,4,null,6,24,null,0,0,0,0,null,null,null,0,0,null,null,null,null,null,null,null,null,0,0,0,0,600,null,6,0,0,0,1,2,3,0,0,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,null,6,null,null,null,null,null,0,null,null,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,null,6,0,18,0,0,null,0,null,null,null,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,7,8,8,8,8,null,6,null,null,null,14,null,0,null,null,0,0,0,null,null,null,null,10,12,null,null,null,null,null,null,null,null,4,0,0,0,0,null,null,8,8,8,8,8,8,8,8,9,0,null,null,null,0,0,0,null,null,null,null,null,null,null,null,null,4,null,null,null,null,null,null,null,null,null,null,null,0,0,0,6,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,4,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,null,null,null,null,null,null,null,null,null,null,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0];
//var level9 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//var level10 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var help1 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,20,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,1,14,6,null,16,null,11,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0];
var help3 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,17,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,0,10,0,13,0,16,0,7,15,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,0,0,0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0];

var levelTest = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,0,0,0,0,5,5,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,3,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,3,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0,6,23,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,0,2,2,2,2,2,2,2,3,23,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,6,23,21,21,21,21,21,21,21,0,0,0,25,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,22,7,8,8,8,8,8,8,8,9,0,0,0,0,4,5,0,0,6,23,0,25,0,0,0,0,25,0,0,0,0,0,22,4,5,5,5,5,5,5,5,6,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,22,4,5,5,5,0,5,5,5,6,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,6,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,14,14,14,14,14,14,14,14,4,5,5,5,5,5,5,5,6,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,10,20,20,20,20,20,20,20,2,2,2,2,2,2,2,2,3,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,12,0,0,0,0,4,5,0,0,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,2,2,3,23,0,0,0,0,0,0,0,0,0,0,0,0,10,12,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,0,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,30,31,0,0,0,0,0,0,0,0,0,10,12,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,12,0,0,0,0,0,0,0,0,0,0,0,0,0,4,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0];

// blank level = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var levelGrid = [];
var helpGrid = [];

	const LEVEL_PLATFORM_SW = 1;
	const LEVEL_PLATFORM_S = 2;
	const LEVEL_PLATFORM_SE = 3;
	const LEVEL_PLATFORM_W = 4;
	const LEVEL_PLATFORM_BLANK = 5;
	const LEVEL_PLATFORM_E = 6;
	const LEVEL_PLATFORM_NW = 7;
	const LEVEL_PLATFORM_N = 8;
	const LEVEL_PLATFORM_NE = 9;
	const LEVEL_PLATFORM_W_PILLAR = 10;
	const LEVEL_PLATFORM_N_PILLAR = 11;
	const LEVEL_PLATFORM_E_PILLAR = 12;
	const LEVEL_PLATFORM_S_PILLAR = 13;
	const LEVEL_PLATFORM_VERTICAL_MIDDLE = 19;
	const LEVEL_PLATFORM_HORIZONTAL_MIDDLE = 20;

	const LEVEL_FALLING_PLATFORM_W = 30;
	const LEVEL_FALLING_PLATFORM_E = 31;

	const LEVEL_SPIKE_N = 14;
	const LEVEL_SPIKE_S = 21;
	const LEVEL_SPIKE_W = 22;
	const LEVEL_SPIKE_E = 23;
	const LEVEL_SPIKE_S_FALLING = 24;
	const LEVEL_ENTER_PORTAL_1 = 16;
	const LEVEL_EXIT_PORTAL_1 = 17;
	const LEVEL_COLLECTIBLE = 18;
	const LEVEL_DASH_POWERUP = 25;
	const LEVEL_SHOOTER_W = 26;
	const LEVEL_SHOOTER_E = 27;
	const LEVEL_SHOOTER_N = 28;
	const LEVEL_SHOOTER_S = 29;
	const LEVEL_START = 500;
	const LEVEL_END = 600;


	const LEVEL_HELP_A_KEY = 1;
	const LEVEL_HELP_ARROW_DOWN = 2;
	const LEVEL_HELP_ARROW_LEFT = 3;
	const LEVEL_HELP_ARROW_RIGHT = 4;
	const LEVEL_HELP_ARROW_UP = 5;
	const LEVEL_HELP_D_KEY = 6;
	const LEVEL_HELP_DA = 7;
	const LEVEL_HELP_HORIZONTAL_LINE = 8;
	const LEVEL_HELP_JU = 9;
	const LEVEL_HELP_LEFT_ARROWKEY = 10;
	const LEVEL_HELP_MO = 11;
	const LEVEL_HELP_MP = 12;
	const LEVEL_HELP_RIGHT_ARROWKEY = 13;
	const LEVEL_HELP_S_KEY = 14;
	const LEVEL_HELP_SH = 15;
	const LEVEL_HELP_TO = 16;
	const LEVEL_HELP_UP_ARROWKEY = 17;
	const LEVEL_HELP_VE = 18;
	const LEVEL_HELP_VERTICAL_LINE = 19;
	const LEVEL_HELP_W_KEY = 20;

var obstacleTileArray = [	LEVEL_PLATFORM_SW,
							LEVEL_PLATFORM_S,
							LEVEL_PLATFORM_SE,
							LEVEL_PLATFORM_W,
							LEVEL_PLATFORM_BLANK,
							LEVEL_PLATFORM_E,
							LEVEL_PLATFORM_NW,
							LEVEL_PLATFORM_N,
							LEVEL_PLATFORM_NE,
							LEVEL_PLATFORM_W_PILLAR,
							LEVEL_PLATFORM_N_PILLAR,
							LEVEL_PLATFORM_E_PILLAR,
							LEVEL_PLATFORM_S_PILLAR,
							LEVEL_PLATFORM_VERTICAL_MIDDLE,
							LEVEL_PLATFORM_HORIZONTAL_MIDDLE,
							LEVEL_FALLING_PLATFORM_W,
							LEVEL_FALLING_PLATFORM_E,
							LEVEL_SHOOTER_W,
							LEVEL_SHOOTER_E,
							LEVEL_SHOOTER_N,
							LEVEL_SHOOTER_S];

var triggerTileArray = [LEVEL_SPIKE_W,
						LEVEL_SPIKE_E,
						LEVEL_SPIKE_N,
						LEVEL_SPIKE_S,
						LEVEL_SPIKE_S_FALLING,
						LEVEL_FALLING_PLATFORM_W,
						LEVEL_FALLING_PLATFORM_E,
						LEVEL_ENTER_PORTAL_1,
						LEVEL_EXIT_PORTAL_1,
						LEVEL_COLLECTIBLE,
						LEVEL_DASH_POWERUP,
						LEVEL_SHOOTER_W,
						LEVEL_SHOOTER_E,
						LEVEL_SHOOTER_N,
						LEVEL_SHOOTER_S,
						LEVEL_END];

function loadLevel(whichLevel) {
	// clears help grid so it doesn't run on maps we don't specify
	helpGrid = [];

	if (whichLevel == 1) {
		levelGrid = level1.slice();
		helpGrid = help1.slice();
	} else if (whichLevel == 2) {
		levelGrid = level2.slice();
	} else if (whichLevel == 3) {
		levelGrid = level3.slice();
		helpGrid = help3.slice();
	} else if (whichLevel == 4) {
		levelGrid = level4.slice();
	} else if (whichLevel == 5) {
		levelGrid = level5.slice();
	} else if (whichLevel == 6) {
		levelGrid = level6.slice();
	} else if (whichLevel == 7) {
		levelGrid = level7.slice();
	} else if (whichLevel == 8) {
		levelGrid = level8.slice();
	} /*else if (whichLevel == 9) {
		levelGrid = level9.slice();
	} else if (whichLevel == 10) {
		levelGrid = level10.slice();
	}*/else {
		console.log ('cannot find level to load, add to loadLevel()!');
		levelGrid = levelTest.slice();
	}
	player.reset();
	playerDeathLeftAnim.reset();
	playerDeathRightAnim.reset();
	collectibleObtainedAnim.reset();
	getTriggersAndAddToArray();
}

function getTriggersAndAddToArray() {
	allTriggersArray = [];

	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileIndex = colRowToArrayIndex(eachCol, eachRow);

			for (var i = 0; i < triggerTileArray.length; i++) {
				if (levelGrid[tileIndex] == triggerTileArray[i]) {

					var thisTrigger = new triggerClass(eachCol, eachRow, tileIndex, levelGrid[tileIndex]);
					allTriggersArray.push(thisTrigger);

				}
			}
		}
	}

	loadedTriggers = true;
}

function drawLevel() {

	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileX = eachCol * TILE_WIDTH;
			var tileY = eachRow * TILE_HEIGHT;
			var levelIndex = colRowToArrayIndex(eachCol, eachRow);
			var tileTypeToPlace = levelGrid[levelIndex];
			var useImg = levelPics[tileTypeToPlace];
			var colorHere;

			switch (tileTypeToPlace) {

				case LEVEL_PLATFORM_SW :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_S :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_SE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_W :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_BLANK :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_E :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_NW :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_N :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_NE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_W_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_N_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_E_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_S_PILLAR :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_VERTICAL_MIDDLE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_PLATFORM_HORIZONTAL_MIDDLE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_FALLING_PLATFORM_W :
					colorRect(tileX,tileY, TILE_WIDTH,TILE_HEIGHT, 'blue');
					break;

				case LEVEL_FALLING_PLATFORM_E :
					colorRect(tileX,tileY, TILE_WIDTH,TILE_HEIGHT, 'blue');
					break;

				case LEVEL_SPIKE_S_FALLING:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_N:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_S:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_W:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SPIKE_E:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_ENTER_PORTAL_1:
					enterPortalAnim.render(tileX, tileY);
					break;

				case LEVEL_EXIT_PORTAL_1:
					exitPortalAnim.render(tileX, tileY);
					break;

				case LEVEL_COLLECTIBLE:
					collectibleAnim.render(tileX, tileY);
					break;

				case LEVEL_DASH_POWERUP:
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

				case LEVEL_SHOOTER_W:
					colorRect(tileX,tileY, TILE_WIDTH,TILE_HEIGHT, 'purple');
					colorRect(tileX, tileY + TILE_HEIGHT/2 - 2.5, TILE_WIDTH/2, 5, 'red');
					break;

				case LEVEL_SHOOTER_E:
					colorRect(tileX,tileY, TILE_WIDTH,TILE_HEIGHT, 'purple');
					colorRect(tileX + TILE_WIDTH/2, tileY + TILE_HEIGHT/2 - 2, TILE_WIDTH/2, 5, 'red');
					break;

				case LEVEL_SHOOTER_N:
					colorRect(tileX,tileY, TILE_WIDTH,TILE_HEIGHT, 'purple');
					colorRect(tileX + TILE_WIDTH/2 - 2.5, tileY, 5, TILE_HEIGHT/2, 'red');
					break;

				case LEVEL_SHOOTER_S:
					colorRect(tileX,tileY, TILE_WIDTH,TILE_HEIGHT, 'purple');
					colorRect(tileX + TILE_WIDTH/2 - 2.5, tileY + TILE_HEIGHT/2, 5, TILE_HEIGHT/2, 'red');
					break;

				case LEVEL_START :
					if (mapEditorEnabled) {
						colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, 'yellow', 0.5);
					}
					break;

				case LEVEL_END :
					if (mapEditorEnabled) {
						colorRect(tileX, tileY, TILE_WIDTH,TILE_HEIGHT, '#42f46b');
					}
					break;


			}

		}
	}
}

function drawHelpBG() {

	for (var eachRow = 0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < LEVEL_COLS; eachCol++) {

			var tileX = eachCol * TILE_WIDTH;
			var tileY = eachRow * TILE_HEIGHT;
			var levelIndex = colRowToArrayIndex(eachCol, eachRow);
			var tileTypeToPlace = helpGrid[levelIndex];
			var useImg = helpPics[tileTypeToPlace];
			var colorHere;

			switch (tileTypeToPlace) {
				case LEVEL_HELP_A_KEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_ARROW_DOWN :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_ARROW_LEFT :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_ARROW_RIGHT :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_ARROW_UP :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_D_KEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_DA :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_HORIZONTAL_LINE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_JU :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_LEFT_ARROWKEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_MO :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_MP :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_RIGHT_ARROWKEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_S_KEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_SH :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_TO :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_UP_ARROWKEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_VE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_VERTICAL_LINE :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;
				case LEVEL_HELP_W_KEY :
					canvasContext.drawImage(useImg, tileX, tileY);
					break;

			}
		}
	}
}

/*
LEVELS FOR LATER IN THE GAME 

var powerupfastfingers = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0,5,5,5,5,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5,0,0,0,0,0,5,5,5,6,21,21,21,21,0,0,0,0,0,0,0,0,0,0,600,5,5,5,5,5,5,5,0,0,2,2,2,0,5,5,5,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,600,5,5,5,5,5,5,5,5,6,21,21,21,4,5,5,5,6,23,0,0,0,0,0,0,0,0,0,0,0,0,0,600,5,5,5,5,5,5,5,5,3,0,0,0,1,2,2,2,3,23,0,0,0,0,0,0,0,0,0,0,0,0,0,600,5,5,5,5,5,5,5,6,23,0,0,0,21,21,21,21,21,0,0,0,0,7,8,8,8,8,8,8,8,8,8,8,5,5,5,5,5,5,5,6,23,0,25,0,0,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,0,25,0,0,0,25,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,0,14,14,14,14,14,14,14,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,25,0,22,7,8,8,8,8,8,8,8,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,25,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,3,23,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,500,0,0,0,0,0,0,0,0,0,0,0,22,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,14,14,14,14,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,8,8,8,8,8,8,8,8,8,8,8,8,8,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];

*/
/* LOST LEVELS 

var lostLevel1 = [6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,22,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,14,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,22,11,0,0,0,19,0,0,0,0,0,0,14,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,18,0,19,0,0,0,19,0,0,0,0,0,0,7,8,9,0,0,0,0,0,0,0,0,14,0,0,0,14,5,6,0,0,0,19,0,11,0,19,0,0,0,0,0,0,4,5,6,0,0,0,14,0,14,0,0,11,14,0,14,7,5,6,0,0,0,19,0,19,0,19,0,0,0,0,0,0,4,5,6,0,0,0,7,8,9,0,0,4,9,0,7,0,5,6,0,11,0,19,0,19,0,19,0,0,0,0,0,0,4,5,6,0,0,0,4,5,6,0,0,4,3,0,1,5,5,6,0,19,0,19,0,19,0,19,0,0,0,0,0,0,4,5,6,0,0,0,4,5,6,0,0,19,0,0,0,4,5,6,14,19,14,19,14,19,14,19,14,14,14,14,14,14,4,5,6,14,14,14,4,5,6,14,14,19,600,600,600,4];

var sadistic = [5,2,2,2,0,0,0,2,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,24,0,0,1,2,3,0,0,0,22,4,5,2,2,2,2,2,5,2,2,2,5,2,2,2,2,2,2,5,5,5,6,0,0,0,24,21,21,0,0,0,22,4,6,0,0,0,0,0,13,0,24,0,13,0,24,0,0,0,22,1,5,5,6,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,0,21,0,0,0,21,0,0,0,0,0,0,22,1,5,6,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,14,0,0,0,0,22,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,4,6,0,0,0,0,11,23,0,0,0,22,4,6,17,0,0,0,0,14,0,0,0,14,0,0,0,14,0,0,0,0,4,6,0,0,0,0,19,23,0,0,0,22,4,6,0,0,0,0,0,11,0,0,0,11,0,0,0,11,0,0,0,0,4,5,12,0,0,0,19,23,0,0,0,22,4,5,8,9,0,0,0,19,0,0,14,19,0,0,14,19,0,0,0,0,4,6,24,0,0,0,19,23,0,0,0,22,4,5,5,5,8,8,8,5,8,8,8,5,8,8,8,5,9,23,0,0,4,6,0,0,0,0,19,23,0,0,0,22,4,5,5,5,0,0,0,0,0,0,0,0,5,5,5,5,6,23,0,0,4,6,0,0,0,7,6,23,0,0,0,0,4,5,5,2,2,2,2,2,2,2,2,2,2,2,5,5,6,0,0,0,4,6,0,0,0,4,6,23,0,0,0,0,4,5,3,24,24,24,24,24,21,21,24,24,24,24,1,5,6,0,0,0,4,6,0,0,0,1,6,23,0,0,0,0,4,3,24,0,0,0,0,0,0,0,0,0,0,0,24,4,6,0,0,0,4,6,0,0,0,24,19,23,0,0,0,0,19,24,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,10,20,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,14,0,0,0,0,0,0,0,0,4,6,0,0,22,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,7,8,8,9,14,14,14,0,0,4,6,0,0,22,4,5,12,0,0,0,19,23,0,0,0,22,19,0,0,0,0,0,4,5,2,2,20,8,8,9,0,4,6,0,0,0,4,6,0,0,0,0,19,23,0,0,0,22,19,0,0,0,0,7,5,6,0,0,0,1,2,3,0,4,6,0,0,0,4,6,0,0,0,0,4,23,0,0,0,22,19,0,0,0,10,5,0,6,0,18,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,10,6,23,0,0,0,0,19,0,0,0,24,4,0,6,0,0,0,0,0,0,0,4,6,0,0,0,4,6,0,0,0,0,19,14,14,0,0,0,1,12,0,0,0,4,0,0,8,8,8,8,8,8,8,5,6,23,0,0,4,3,0,0,0,0,4,20,12,0,0,0,24,24,0,0,0,4,0,5,2,2,2,2,2,2,2,2,3,23,0,0,4,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,4,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,500,0,0,0,0,19,16,0,0,0,0,0,0,0,0,0,4,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,4,0,6,0,0,0,0,0,0,0,0,0,0,0,7,5,8,8,8,8,8,5,8,8,8,8,8,8,8,8,8,8,0,5,6,600,600,600,7,8,8,8,8,8,8,8,5,5];

*/
