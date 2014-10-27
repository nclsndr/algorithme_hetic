var Gameplay = {
	ui : {
		DOMId : 'gameplay',
		width : 600,
		height : 600,
		canvasRes : 10
	},
	diamonds : []
}

function Game(rate){
	var self = this;
	this.isPlay = false;
	this.rate = rate?rate:200;
	this.joueur1 = new Snake('joueur1', 0, 0);
	this.joueur2 = new Snake('joueur2', 0, Gameplay.ui.height-Gameplay.ui.canvasRes);
	this.start = function(){
		Gameplay.ui.rate = self.rate;

		setInterval(function(){
			self.joueur1.move();
			self.joueur2.move();
		}, self.rate);
		setInterval(function(){
			var diamond = new Diamond(self.rate*60);
			var toStore = diamond.posX+'_'+diamond.posY;
			Gameplay.diamonds.push(toStore);
			diamond.display(Gameplay.ui.DOMId);
		}, self.rate * 40);
	}
}

function Snake(name, posX, posY){
	this.name = name;
	this.posX = posX;
	this.posY = posY;
	this.points = 0;
	this.direction = 'right';
	this.lenght = 1;
}

Snake.prototype.render = function() {
$('.snake.'+this.name).remove();
$('#gameplay').append('<div class="snake '+this.name+'"></div>');
$('.snake.'+this.name).css({
	left:this.posX+'px',
	top:this.posY+'px'
});
};

Snake.prototype.move = function() {
	switch(this.direction) {
		case 'right':
			this.posX+=Gameplay.ui.canvasRes;
			break;
		case 'left':
			this.posX-=Gameplay.ui.canvasRes;
			break;
		case 'top':
			this.posY+=Gameplay.ui.canvasRes;
			break;
		case 'bottom':
			this.posY-=Gameplay.ui.canvasRes;
			break;
	}
	this.render();
};

function Diamond(validity){
	var self = this;
	this.posX = Math.floor(Math.random()*Gameplay.ui.width-Gameplay.ui.canvasRes);
	this.posY = Math.floor(Math.random()*Gameplay.ui.height-Gameplay.ui.canvasRes);
	this.isDisplayed = false;
	this.validity = validity?validity:10000;
}
Diamond.prototype.display = function(elemID) {
	var self = this;
	var diamond = document.createElement('div');
	diamond.setAttribute('class', 'diamond');
	var resDom = document.getElementById(elemID).appendChild(diamond);
	diamond.style.top = this.posY+'px';
	diamond.style.left = this.posX+'px';
	setTimeout(function(){
		self.delete(resDom);
	}, this.validity);
};
Diamond.prototype.delete = function(domElem){
	domElem.parentElement.removeChild(domElem);
};


var gg = new Game(200);
console.log(gg);
gg.start();

// var dTest = new Diamond(2000);
// dTest.display('gameplay');

$(document).ready(function() {
	// var joueur1 = new Snake('joueur1', 30, 0);
	// var joueur2 = new Snake('joueur2', 0, 30);

	// joueur2.render();
	// joueur1.render();

	// setInterval(function(){
	// 	joueur1.move();
	// 	joueur2.move();
	// }, 200);

	 $(document).keypress(function(event)
	 {
		var keydown=String.fromCharCode(event.keyCode);
		if(keydown=="z"){joueur1.direction="top";}
		else if(keydown=="q"){joueur1.direction="left";}
		else if(keydown=="d"){joueur1.direction="right";}
		else if(keydown=="s"){joueur1.direction="bottom";}

		if(keydown=="o"){joueur2.direction="top";}
		else if(keydown=="k"){joueur2.direction="left";}
		else if(keydown=="m"){joueur2.direction="right";}
		else if(keydown=="l"){joueur2.direction="bottom";}
	});	

});