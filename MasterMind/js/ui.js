var UI = {
	init:function(){
		UI.items(function(singleRow){
			UI.row(singleRow, function(rows){
				UI.render.mapper(rows);
			});
		});
		var mapper = 
		console.log(mapper);
	},
	items:function(callback){
		var elems = document.createElement('div');
		for (var i = 0; i <= Settings.range; i++) {
			var elem = document.createElement('span');
			elem.setAttribute('data-pos', i);
			elems.appendChild(elem);
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
		}
		return callback.call(this, rows);
	},
	render:{
		mapper: function(domElem){
			document.getElementById('mapper').appendChild(domElem);
		}
	}

}