
// Jaune : #f3c227
// Orange : #f26711
// Bleu : #bdc9f2
// Bleu2 (vert) : #5d9593
// Vert : #003e08
// Rouge Bordeaux :#631826
// Bleu Marine : #101125 // #130A75
// Beige : #F1CAAB

var Settings ={
	range : 4,
	possibilities : 10,
	colors : ['#f3c227', '#f26711', '#bdc9f2', '#5d9593','#003e08', '#631826', '#130A75', '#F1CAAB']
}
var instanceOfGame;

var Game;

function Game(username){
	this.username = username;
	this.combination = [];

	this.init = function(){
		self.newGame();
		UI.init(username);
	}

	this.newGame = function(){
		for (var i = 0; i < Settings.range; i++) {
			// console.log(Math.floor(Math.random()*Settings.colors.length));
			self.combination.push(Settings.colors[Math.floor(Math.random()*Settings.colors.length)]);
		}
		console.log(self.combination);
	}

	this.nextStep = function(){
		var code = Model.code;
		var  right_place = 0;

		console.log(Game.combination);
		console.log(code);

		if(code.length == Settings.range){

			for(var i = 0; i < code.length; i++){
				var occurance = Game.combination.indexOf(code[i]);
				if(occurance != -1){

					if(occurance == i){
						Model.validate(i, code[i]);
						UI.render.helper(i, 'green');
					}else{
						UI.render.helper(i, 'red');
					}

				}else{
					console.log('faux');
					UI.render.helper(i, 'black');
				}
			}

			if(right_place == Settings.range){

			}else{
				Model.nextStep();
				UI.moveValidate();
				UI.putValidate();
			}
		}
	},

	this.nextStepV2 = function(){
		var code = Model.code;
		var  right_place = 0;

		console.log(Game.combination);
		console.log(code);

		if(code.length == Settings.range){

			for(var i = 0; i < code.length; i++){

				for(var j = 0; j < Game.combination.length; j++){
					// occurance
					if(code[i] == Game.combination[j]){
						// occurance et bonne position
						if( i == j){
							Model.validate(j, code[j]);
							UI.render.helper(j, 'green');
							right_place++;
							break;
						// occurance mais mauvaise position
						}else if(typeof Model.valide[j] == 'undefined'){
							UI.render.helper(i, 'red');
							break;
						}
					// mauvaise piece
					}else{
						UI.render.helper(i, 'black');
					}
				}
			}
			console.log('Validate');
			console.log(Model.valide);
			if(right_place == Settings.range){
				UI.win();
				console.log('Vous avez gagné');
			}else{
				Model.nextStep();
				UI.moveValidate();
				UI.putValidate();
			}
		}
	}


	var self = this;
	return this;
}

document.getElementById('start_bt').addEventListener('click', function(){
	document.getElementById('start').classList.add("hide");
	document.getElementById('game').classList.remove("hide");

	Game = new Game('Paul fatigué');
	Game.init();

}, false);
