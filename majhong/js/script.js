'use strict';

var layout1 = [
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1]
];

var layout2 = [
	[0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0]
];

var layout3 = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,1,1,1,1,0,0],
	[0,0,1,1,1,1,0,0],
	[0,0,1,1,1,1,0,0],
	[0,0,1,1,1,1,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]
];

var grid = [layout1, layout2, layout3];

var images = {};
function generateImages(){
	for(var i = 1; i <= 34; i++){
		for (var j = 0; j < 4; j++) {
			images[i] = Piece(i, i);
		}
	}
}

function Piece(group_id, key){
	var piece = {
		group_id: group_id,
		path: 'images/p_' + key + '.png';
	};
	return piece;
};

generateImages();
console.log(images);

var cssgrid = document.getElementById('grid');
var bloc = '<div class="block"></div>';






// function Piece(image){
// 	this.image = image;
// }

// function Cellule(x, y, Piece){
// 	this.x = x;
// 	this.y = y;
// 	this.piece = Piece;
// }

// function Grid(){
// 	this.grid = new Array();

// 	this.init = function initGrid(x, y){
// 		var grid = new Array();
// 		for(var i = 0; i < x; i++){
// 			grid[i] = new Array();
// 			for(var j = 0; j < y; j++){
// 				grid[i][j] = new Cellule(i, j, new Piece('images/' + this.random()));
// 			}
// 		}
// 		this.grid.push(grid);
// 	}

// 	this.random = function random(){
// 		return images[Math.floor(Math.random() * images.length)];
// 	}

// 	this.render = function render(){

// 		for(var i = 0; i < this.grid.length; i++){
// 			for(var j = 0; j < this.grid[i].length; j++){
// 				var cellule = this.grid[i][j];
// 				for(var index in cellule){
// 					cssgrid.innerHTML += '<div class="block"><img src="' + cellule[index].piece.image + '" style="width:25px;height: auto;"/></div>';
// 				}
// 			}
// 		}

// 	}
// }


// var grid = new Grid();
// grid.init(10,10);
// grid.init(5,5);

// grid.render();



