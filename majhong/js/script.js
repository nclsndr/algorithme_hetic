'use strict';

/**
*	Majhong
*	34 pièces
*	136 pièces en jeu car 4 fois la même pièce
*	34 * 4 = 136
**/

var layout1 = [
	[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
	[0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
	[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
	[0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
];

var layout2 = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
	[0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
	[0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
	[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
	[0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
];

var layout3 = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
	[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
	[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// var layout1 = [
// 	[1,1,1,1,1,1,1,1],
// 	[1,1,1,1,1,1,0,0],
// 	[0,0,1,1,1,1,1,1],
// 	[1,1,1,1,1,1,1,1],
// 	[1,1,1,1,1,1,1,1],
// 	[1,1,1,1,1,0,0,0],
// 	[0,0,1,1,1,1,1,1],
// 	[1,1,1,1,1,1,1,1]
// ];

// var layout2 = [
// 	[0,0,0,0,0,0,0,0],
// 	[0,1,1,1,1,1,1,0],
// 	[0,1,1,1,1,1,1,1],
// 	[0,1,1,1,1,1,1,0],
// 	[0,1,1,1,1,1,1,0],
// 	[0,1,1,1,1,1,1,0],
// 	[0,1,1,1,1,1,1,0],
// 	[0,0,0,0,0,0,0,0]
// ];

// var layout3 = [
// 	[0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0],
// 	[0,0,1,1,1,1,0,0],
// 	[0,0,1,1,1,1,1,1],
// 	[0,0,1,1,1,1,0,0],
// 	[1,1,1,1,1,1,0,0],
// 	[0,0,1,1,1,1,0,0],
// 	[0,0,0,0,0,0,0,0]
// ];

var grid = [layout1, layout2, layout3];
var pieces = new Array();
var cssgrid = document.getElementById('grid');
var bloc = '<div class="block" style="visibility: hidden;"></div>';

function Image(key){
	var image = {
		number: 0,
		path: 'images/p_' + key + '.png'
	};
	return image;
}

function generateImages(){
	for(var i = 1; i <= 34; i++){
		pieces.push(Image(i));
	}
}

function initGrid(){
	// layouts
	for(var i = 0; i < grid.length; i++){
		// grille
		for(var j = 0; j < grid[i].length; j++){
			// valeur dans grille
			for(var k = 0; k < grid[i][j].length; k++){
				// si il doit y avoir une pièce à cette position
				if(grid[i][j][k] == 1){

					for(var p = 0; p < pieces.length; p++){
						if(pieces[p].number < 4){
							grid[i][j][k] = pieces[p].path;
							pieces[p].number++;
							break;
						}
					}

				}
			}
		}
	}
}

function melanger()
{
	var random, temp;
	for( var a = 0; a<pieces.length; a++)
	{
		random = Math.floor((Math.random() * pieces.length) + 0);
		temp = pieces[a];
		pieces[a] = pieces[random];
		pieces[random] = temp;
	}
}

function randomPiece(){
	return Math.floor((Math.random() * pieces.length));
}

function render(){
	for(var i = 0; i < grid.length; i++){
		var layout = document.createElement('div');
		layout.className = 'layout layout-' + i;
		layout.style.clear = 'both';
		layout.style.zIndex = i;

		if(i == 1){
			layout.style.top = '15px';
			layout.style.left = '15px';
		}else if(i == 2){
			layout.style.top = '-15px';
			layout.style.left = '-15px';
		}

		cssgrid.appendChild(layout);

		for(var j = 0; j < grid[i].length; j++){
			for(var k = 0; k < grid[i][j].length; k++){
				if(grid[i][j][k] == 0){
					document.querySelector('.layout-' + i).innerHTML += bloc;
				}else{
					document.querySelector('.layout-' + i).innerHTML += '<div class="block"><img src="' + grid[i][j][k] + '"></div>';
				}

			}
		}
	}
}

function clickPiece(e){
	console.log(e.target);
}

cssgrid.addEventListener('click', clickPiece, true);

generateImages();
melanger();
initGrid();
render();

