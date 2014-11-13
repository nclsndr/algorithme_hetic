
// Jaune : #f3c227
// Orange : #f26711
// Bleu : #bdc9f2
// Bleu2 (vert) : #5d9593
// Vert : #003e08
// Rouge Bordeaux :#631826
// Bleu Marine : #101125
// Beige : #F1CAAB

var Settings ={
	range : 4,
	possibilities : 10,
	colors : ['#f3c227', '#f26711', '#bdc9f2', '#5d9593','#003e08', '#631826', '#101125', '#F1CAAB']
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

		console.log(Game.combination);
		console.log(code);

		if(code.length == Settings.range){

			for(var i = 0; i < code.length; i++){
				var occurance = Game.combination.indexOf(code[i]);
				if(occurance != -1){
					if(occurance == i){
						UI.render.helper(i, 'green');
					}else{
						UI.render.helper(i, 'red');
					}
				}else{
					console.log('faux');
					UI.render.helper(i, 'black');
				}
			}


			Model.nextStep();
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
