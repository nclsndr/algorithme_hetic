var UI = {
	init:function(username){
		UI.items(function(singleRow){
			UI.row(singleRow, function(rows){
				UI.render.mapper(rows, function(){
					 var spans = document.getElementsByClassName('mapper_elem');
					 for (var i = 0; i < spans.length; i++) {
					 	spans[i].addEventListener('click',UI.clickMapper, false);
					 };
				});
			});
		});
		UI.render.colors();
		UI.render.username(username);
		// console.log(mapper);
	},
	items:function(callback){
		var elems = document.createElement('div');
		for (var i = 0; i <= Settings.range; i++) {
			var elem = document.createElement('span');
			elem.setAttribute('class', 'mapper_elem');
			elem.setAttribute('data-pos', i);
			elems.appendChild(elem);
			if (i == Settings.range) {
				var clear = document.createElement('div');
				clear.setAttribute('class', 'clearfix');
				elems.appendChild(clear);
			}
		}
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
		colors:function(){
			var colorsBox = document.getElementById('colors');
			for (var i = 0; i < Settings.colors.length; i++) {
				var color = document.createElement('span');
				color.setAttribute('class', 'color');
				color.style.backgroundColor = Settings.colors[i];
				colorsBox.appendChild(color);
			};
		},
		username:function(username){
			document.getElementById('username').innerHTML = username;
		}
	},
	clickMapper:function(e){
		e.target
	}

}