var UI = {

	init:function(username){
		Model.currentStep = 0;
		// creation item
		UI.items(function(singleRow){
			// creation ligne
			UI.row(singleRow, function(rows){
				// affichage pion
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
		document.getElementById('validate').addEventListener('click', Game.nextStep, false);
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

		for (var i = 0; i < Settings.range; i++) {
			var span = document.createElement('span');
			span.setAttribute('id', 'result-'+i);
			span.setAttribute('class', 'result');
			span.setAttribute('data-result', i);
			results.appendChild(span);
		}

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
			newRow.setAttribute('data-row', i);
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
		},
		helper: function(key, color){
			var row = document.getElementById('row_' + Model.currentStep);
			var results = row.childNodes[1].childNodes;
			results[key].style.backgroundColor = color;
		}
	},

	clickMapper:function(e){
		e.target
	},
	showMove: function(status){
		var container_pion = document.getElementById('row_' + Model.currentStep).childNodes[0];
		var pions = container_pion.childNodes;
		for(var i = 0; i < pions.length; i++){
			if(pions[i].getAttribute('data-color') == null){
				if(status == 'on'){
					pions[i].style.backgroundColor = "#7f8c8d";
				}else if(status == 'off'){
					pions[i].style.backgroundColor = "#000";
				}

			}
		}
	},
	moveValidate: function(){
		var validate = document.getElementById('validate');

		style = window.getComputedStyle(validate),
		topCss = style.getPropertyValue('top');
		var top = parseInt(topCss, 10) + 60;
		validate.style.top = top + 'px';

		// validate.style.top = parseFloat(validate.style.top) + 60 + 'px';

	},

	clickColor:function(e){
		var from = e.target.getAttribute('data-color');
		var targetColors = document.getElementById('row_'+Model.currentStep)
			.getElementsByClassName('pions')[0]
			.getElementsByClassName('mapper_elem');

		for (var i = 0; i < targetColors.length; i++) {
			if (!targetColors[i].getAttribute('data-color')) {
				targetColors[i].setAttribute('data-color', from);
				targetColors[i].style.backgroundColor = from;
				return
			}
		};
	},
	dragColor: function(e){
		//console.log('Drag start');
		//console.log(e.target);

		UI.showMove('on');

		var span = e.target;
		if(span.getAttribute('data-color') != null){
			e.dataTransfer.setData('text', span.getAttribute('data-color'));
			Model.item = e.target;
		}

	},
	dragOver: function(e){
		e.preventDefault();
	},
	dropColor: function(e){
		e.preventDefault();
		//console.log('Drop');
		//console.log(e.target);

		UI.showMove('off');

		var color = e.dataTransfer.getData('text');

		if(e.target.className == 'mapper_elem'){
			var row = e.target.parentNode.parentNode;
			if(row.getAttribute('data-row') != Model.currentStep){
				return false;
			}
			e.target.setAttribute('data-color', color);
			e.target.style.backgroundColor = color;
			Model.drop = true;
			Model.put(e.target.getAttribute('data-pos'), color);

		}else if(e.target.className == 'color'){
			console.log(color);
			if(e.target.getAttribute('data-color') == color){
				Model.drop = true;
			}else{
				Model.drop = false;
				alert('mauvaise couleur');
			}
		}
	},
	dragEnd: function(e){
		if(Model.drop == true){
			console.log('drag end');
			console.log(e.target);
			e.target.removeAttribute('data-color');
			e.target.style.backgroundColor = '#000';
		}
	}

}