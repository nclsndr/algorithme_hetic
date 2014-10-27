'use strict';

/**
*	Majhong
*	34 pièces
*	136 pièces en jeu car 4 fois la même pièce
*	34 * 4 = 136
**/

// var layout1 = [
// 	[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
// 	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
// 	[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
// 	[0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
// 	[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
// 	[0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],
// 	[0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
// ];

// var layout2 = [
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
// 	[0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
// 	[0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
// 	[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
// 	[0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
// ];

// var layout3 = [
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
// 	[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
// 	[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// ];

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
[0,0,1,1,1,1,0,0],
[0,0,1,1,1,1,0,0],
[0,0,1,1,1,1,0,0],
[0,0,1,1,1,1,0,0],
[0,0,1,1,1,1,0,0],
[0,0,1,1,1,1,0,0],
[0,0,0,0,0,0,0,0]
];

var grid = [layout1, layout2, layout3];
var pieces = new Array();
var cssgrid = document.getElementById('grid');
var bloc = '<div class="block" style="visibility: hidden;"></div>';

var select1;
var select2;

function Image(key){
	var image = {
		number: 0,
		path: 'images/p_' + key + '.png'
	};
	return image;
}

function generateImages(){
	for(var i = 1; i <= 34; i++){
		for(var j = 0; j < 4; j++){
			pieces.push('images/p_' + i + '.png');
		}
	}
}

function initGrid(){
	var count = 0;
	// layouts
	for(var i = 0; i < grid.length; i++){
		// grille
		for(var j = 0; j < grid[i].length; j++){
			// valeur dans grille
			for(var k = 0; k < grid[i][j].length; k++){
				// si il doit y avoir une pièce à cette position
				if(grid[i][j][k] == 1){
					grid[i][j][k] = pieces[count];
					count++;
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

		cssgrid.appendChild(layout);

		for(var j = 0; j < grid[i].length; j++){
			for(var k = 0; k < grid[i][j].length; k++){
				if(grid[i][j][k] == 0){
					document.querySelector('.layout-' + i).innerHTML +=  '<div class="block" data-x="' + k + '" data-y="' + j + '" data-z="' + i + '"></div>';
				}else{
					document.querySelector('.layout-' + i).innerHTML += '<div class="block" data-x="' + k + '" data-y="' + j + '" data-z="' + i + '"><img class="piece" src="' + grid[i][j][k] + '"></div>';
				}

			}
		}
	}
	addEvents();
}

function addEvents(){
	var block = document.getElementsByClassName('block');

	for(var i = 0; i < block.length; i++){
		block[i].addEventListener('click', function(e){
			getGridElement(e);
		}, false);
	}
}

function getGridElement(event){
	var block;
	var find;
	if(event.target.nodeName == "IMG"){
		block = event.target.parentNode;
	}else{
		block = event.target;
	}

	if(block.firstElementChild != null){
		select1 = block.firstElementChild;
	}else{
		for (var i = grid.length - 1; i != -1; i--) {

			var blocks = document.getElementsByClassName('layout-'+i)[0].childNodes;
			for(var j = 0; j < blocks.length; j++){
				if(blocks[j].firstElementChild != null){
					if(block.getAttribute('data-x') == blocks[j].getAttribute('data-x') && block.getAttribute('data-y') == blocks[j].getAttribute('data-y')){
						select1 = blocks[j].firstElementChild;
						find = true;
						break;
					}
				}
			}
			if(find) { break; }
		}
	}
	select1.style.boxShadow = "none";
	select1.style.border = '1px solid black';
	console.log(select1);
}

function compareElement(select1, select2){

}


generateImages();
melanger();
initGrid();
render();
