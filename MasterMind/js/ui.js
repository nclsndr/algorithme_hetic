var UI = {
	currentStep:0,
	init:function(username){
		UI.currentStep = 0;
		UI.items(function(singleRow){
			UI.row(singleRow, function(rows){
				UI.render.mapper(rows, function(){
					 var spans = document.getElementsByClassName('mapper_elem');
					 for (var i = 0; i < spans.length; i++) {
					 	spans[i].addEventListener('click',UI.clickMapper, false);
					 	spans[i].addEventListener('dragstart', UI.dragColor, false);
					 	spans[i].addEventListener('dragover', UI.dragOver, false);
					 	spans[i].addEventListener('drop', UI.dropColor, false);
					 	spans[i].addEventListener('dragend', UI.dragEnd, false);
					 };
				});
			});
		});
		UI.render.colors(function(){
			var spans = document.getElementsByClassName('color');
			 for (var i = 0; i < spans.length; i++) {
			 	spans[i].addEventListener('click',UI.clickColor, false);
			 	spans[i].addEventListener('dragstart', UI.dragColor, false);
			 	spans[i].addEventListener('dragover', UI.dragOver, false);
				spans[i].addEventListener('drop', UI.dropColor, false);
			 };
		});
		UI.render.username(username);
		// console.log(mapper);
	},
	items:function(callback){
		var elems = document.createElement('div');

		var pions = document.createElement('div');
		pions.setAttribute('class', 'pions');

		for (var i = 0; i < Settings.range; i++) {
			var pawn = document.createElement('span');
			pawn.setAttribute('class', 'mapper_elem');
			pawn.setAttribute('data-pos', i);
			pawn.setAttribute('draggable', true);
			pions.appendChild(pawn);
			if (i == Settings.range-1) {
				var clear = document.createElement('div');
				clear.setAttribute('class', 'clearfix');
				pions.appendChild(clear);
			}
		}
		var results = document.createElement('div');
		results.setAttribute('class', 'results');

		elems.appendChild(pions);
		elems.appendChild(results);

		return callback.call(this, elems);
	},
	row:function(singleRow, callback){
		var rows = document.createElement('div');
		for (var i = 0; i < Settings.possibilities; i++) {
			var newRow = singleRow.cloneNode(true);
			newRow.setAttribute('id', 'row_'+i);
			newRow.setAttribute('class', 'row');
			rows.appendChild(newRow);
			if (i == Settings.possibilities-1) {
				var clear = document.createElement('div');
				clear.setAttribute('class', 'clearfix');
				rows.appendChild(clear);
			}
		}
		return callback.call(this, rows);
	},
	render:{
		mapper: function(domElem, callback){
			document.getElementById('mapper').appendChild(domElem);
			return callback.call(this);
		},
		colors:function(callback){
			var colorsBox = document.getElementById('colors');
			for (var i = 0; i < Settings.colors.length; i++) {
				var color = document.createElement('span');
				color.setAttribute('class', 'color');
				color.setAttribute('data-color', Settings.colors[i]);
				color.setAttribute('draggable', true);
				color.style.backgroundColor = Settings.colors[i];
				colorsBox.appendChild(color);
			};
			callback.call(this);
		},
		username:function(username){
			document.getElementById('username').innerHTML = username;
		}
	},
	clickMapper:function(e){
		e.target
	},
	clickColor:function(e){
		var from = e.target.getAttribute('data-color');
		var targetColors = document.getElementById('row_'+UI.currentStep).getElementsByClassName('pions')[0].getElementsByClassName('mapper_elem');

		for (var i = 0; i < targetColors.length; i++) {
			if (!targetColors[i].getAttribute('data-color')) {
				targetColors[i].setAttribute('data-color', from);
				targetColors[i].style.backgroundColor = from;
				return
			}
		};
	},
	dragColor: function(e){
		console.log('Drag start');
		console.log(e.target);
		var span = e.target;
		if(span.getAttribute('data-color') != null){
			e.dataTransfer.setData('text', span.getAttribute('data-color'));
		}

	},
	dragOver: function(e){
		e.preventDefault();
	},
	dropColor: function(e){
		e.preventDefault();
		console.log('Drop');
		console.log(e.target);
		var color = e.dataTransfer.getData('text');

		if(e.target.className == 'mapper_elem'){
			e.target.setAttribute('data-color', color);
			e.target.style.backgroundColor = color;
		}else if(e.target.className == 'color'){
			if(e.target.getAttribute('data-color') == color){

			}else{
				alert('mauvaise couleur');
			}
		}
	},
	dragEnd: function(e){
		console.log('drag end');
		console.log(e.target);
		e.target.removeAttribute('data-color');
		e.target.style.backgroundColor = '#000';
	}

}