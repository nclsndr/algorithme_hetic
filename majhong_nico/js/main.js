"use strict";

var layout = [
	[
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1]
	],
	[
		[0,0,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,0],	
		[0,1,1,1,1,1,1,0],	
		[0,1,1,1,1,1,1,0],	
		[0,1,1,1,1,1,1,0],	
		[0,1,1,1,1,1,1,0],	
		[0,1,1,1,1,1,1,0],	
		[0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,1,1,1,1,0,0],
		[0,0,1,1,1,1,0,0],
		[0,0,1,1,1,1,0,0],
		[0,0,1,1,1,1,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0]
	]
];
var pieces = [];
var totalPiece = 0;


function Piece(number, depth, y, x){
	var Piece = {
		number : number,
		img_url : 'img/p_'+number+'.png',
		depth : depth?depth:-1,
		y : y?y:-1,
		x : x?x:-1,
		isRemoveable : false
	}
	return Piece;
}





for (var depth = 0; depth < layout.length; depth++) {
	for (var y = 0; y < layout[depth].length; y++) {
		for (var x = 0; x < layout[depth][y].length; x++) {
			// console.log('value : %d ', depth, y, x, layout[depth][y][x]);
			if (layout[depth][y][x] == 1) {
				totalPiece++;
			}
		};
	};
};

// Is abble to make 2 pairs of each piece
if (totalPiece%4 == 0) {

	var iteration = totalPiece/4;
	for (var i = 0; i < iteration; i++) {
		for (var j = 0; j < 4; j++) {
			var piece = new Piece(i+1);
			pieces.push(piece);
		};
	};
console.log(pieces);

	// var pieceNumber = Math.floor(Math.random() * var.length) + 1;

	// for (var depth = 0; depth < layout.length; depth++) {
	// 	var divLayout = document.createElement('div');
	// 	divLayout.setAttribute('id','layer_'+depth);
	// 	divLayout.setAttribute('class','layer');
	// 	for (var y = 0; y < layout[depth].length; y++) {
	// 		var rowLayout = document.createElement('ul');
	// 		rowLayout.setAttribute('id','layer_'+depth+'_row_'+y);
	// 		rowLayout.setAttribute('class','row');
	// 		for (var x = 0; x < layout[depth][y].length; x++) {
	// 			var cellLayout = document.createElement('li');
	// 			cellLayout.setAttribute('id','layer_'+depth+'_row_'+y+'_cell_'+x);
	// 			// console.log('value : %d ', depth, y, x, layout[depth][y][x]);
	// 			if (layout[depth][y][x] == 1) {
	// 				var indexOfpieces = Math.floor(Math.random() * pieces.length);
	// 				setPieceOnGrid(cellLayout, indexOfpieces);
	// 				cellLayout.setAttribute('class','piece');
	// 				// cellLayout.innerHTML = '<p>piece</p>';
	// 			}else{
	// 				cellLayout.setAttribute('class','hidden');
	// 			}
	// 			rowLayout.appendChild(cellLayout);
	// 		};
	// 		divLayout.appendChild(rowLayout);
	// 	};
	// 	document.getElementById('mapper').appendChild(divLayout);
	// };

	for (var depth = 0; depth < layout.length; depth++) {
		for (var y = 0; y < layout[depth].length; y++) {
			for (var x = 0; x < layout[depth][y].length; x++) {
				var cellLayout = document.createElement('div');
				// console.log('value : %d ', depth, y, x, layout[depth][y][x]);
				if (layout[depth][y][x] == 1) {
					var indexOfpieces = Math.floor(Math.random() * pieces.length);
					setPieceOnGrid(cellLayout, indexOfpieces);
					cellLayout.setAttribute('class','cell piece layer_'+depth);
					// cellLayout.innerHTML = '<p>piece</p>';
				}else{
					cellLayout.setAttribute('class','cell hidden');
				}
				document.getElementById('mapper').appendChild(cellLayout);
			};
		};
	};
}

function setPieceOnGrid(elem, index){
	var piece = pieces[index];
	pieces.splice(index,1);
	var content = '<img src="'+piece.img_url+'">';
	elem.innerHTML = content;
}

var pieceElem = document.getElementsByClassName('piece');

for (var i = 0; i < pieceElem.length; i++) {
	pieceElem[i].addEventListener('click', function(e){
		console.log(e.target);
	}, false);
};





