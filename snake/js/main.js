var Gameplay = {
	ui : {
		DOMId : 'gameplay',
		width : 600,
		height : 600,
		canvasRes : 10
	},
	diamondsList : [],
	diamonds : {},
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
			self.joueur1.checkDiamond();
			self.joueur2.move();
			self.joueur2.checkDiamond();
		}, self.rate);
		setInterval(function(){
			var diamond = new Diamond(self.rate*60);
			var toStore = diamond.posX+'x'+diamond.posY;
			Gameplay.diamondsList.push(toStore);
			Gameplay.diamonds[toStore] = diamond;
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
	this.length = 1;
}

Snake.prototype.render = function() {
	$('.snake.'+this.name).remove();
	for (var i = 0; i < this.length; i++) {
		var delta = i*Gameplay.ui.canvasRes;
		$('#gameplay').append('<div class="snake '+this.name+'" id="'+this.name+'_'+i+'" ></div>');
		var moveX = this.posX, moveY = this.posY;
		switch(this.direction) {
			case 'right':
				moveX = this.posX-delta;
				break;
			case 'left':
				moveX = this.posX+delta;
				break;
			case 'top':
				moveY = this.posY-delta;
				break;
			case 'bottom':
				moveY = this.posY+delta;
				break;
		}
		$('.snake#'+this.name+'_'+i).css({
			left:moveX+'px',
			top:moveY+'px'
		});
	};
};

Snake.prototype.checkDiamond = function(){
	var toCheck = this.posX+'x'+this.posY;
	for (var i = 0; i < Gameplay.diamondsList.length; i++) {
		if (Gameplay.diamondsList[i] == toCheck) {
			Gameplay.diamonds[toCheck].eaten(toCheck);
			this.length++
		}
	};
}

Snake.prototype.move = function() {
	switch(this.direction) {
		case 'right':
			if (this.posX<Gameplay.ui.width-Gameplay.ui.canvasRes) {
				this.posX+=Gameplay.ui.canvasRes;
			}else{
				this.posX=0;
			}
			break;
		case 'left':
			if (this.posX<=0) {
				this.posX=Gameplay.ui.width-Gameplay.ui.canvasRes;
			}else{
				this.posX-=Gameplay.ui.canvasRes;
			}
			break;
		case 'top':
			if (this.posY<=0) {
				this.posY=Gameplay.ui.height-Gameplay.ui.canvasRes;
			}else{
				this.posY-=Gameplay.ui.canvasRes;
			}
			break;
		case 'bottom':
			if (this.posY>=Gameplay.ui.height-Gameplay.ui.canvasRes) {
				this.posY=0;
			}else{
				this.posY+=Gameplay.ui.canvasRes;
			}
			break;
	}
	this.render();
};

function Diamond(validity){
	var self = this;
	this.posX = Math.floor((Math.random()*Gameplay.ui.width-Gameplay.ui.canvasRes)%1000/10)*10;
	this.posY = Math.floor((Math.random()*Gameplay.ui.height-Gameplay.ui.canvasRes)%1000/10)*10;
	this.isDisplayed = false;
	this.validity = validity?validity:10000;
}
Diamond.prototype.display = function(elemID) {
	var self = this;
	var diamond = document.createElement('div');
	diamond.setAttribute('class', 'diamond');
	diamond.setAttribute('id', this.posX+'x'+this.posY);
	var resDom = document.getElementById(elemID).appendChild(diamond);
	diamond.style.top = this.posY+'px';
	diamond.style.left = this.posX+'px';
	this.isDisplayed = true;
	setTimeout(function(){
		self.delete(resDom);
	}, this.validity);
};
Diamond.prototype.delete = function(domElem){
	if (domElem.getAttribute('id')) {
		this.isDisplayed = false;
		var id = domElem.getAttribute('id');
		var index = Gameplay.diamondsList.indexOf(id);
		if (domElem.parentElement.removeChild) {
			domElem.parentElement.removeChild(domElem);
		}
		delete Gameplay.diamonds[id];
		Gameplay.diamondsList.splice(index,1);
	}
};
Diamond.prototype.eaten = function(key){
	this.isDisplayed = false;
	var domElem = document.getElementById(key);
	var index = Gameplay.diamondsList.indexOf(key);
	domElem.parentElement.removeChild(domElem);
	delete Gameplay.diamonds[key];
	Gameplay.diamondsList.splice(index,1);
}


var gg = new Game(300);
console.log(gg);
gg.start();


$(document).ready(function() {

	 $(document).keypress(function(event)
	 {
		var keydown=String.fromCharCode(event.keyCode);

		if(keydown=="z"){
			if (gg.joueur1.direction != 'bottom') {
				gg.joueur1.direction="top";
			}
		}
		else if(keydown=="q"){
			if (gg.joueur1.direction !="right" ) {
				gg.joueur1.direction="left";
			}
		}
		else if(keydown=="d"){
			if (gg.joueur1.direction !="left" ) {
				gg.joueur1.direction="right";
			}
		}
		else if(keydown=="s"){
			if (gg.joueur1.direction !="top" ) {
				gg.joueur1.direction="bottom";
			}
		}

		if(keydown=="o"){
			if (gg.joueur2.direction != 'bottom') {
				gg.joueur2.direction="top";
			}
		}
		else if(keydown=="k"){
			if (gg.joueur2.direction !="right" ) {
				gg.joueur2.direction="left";
			}
		}
		else if(keydown=="m"){
			if (gg.joueur2.direction !="left" ) {
				gg.joueur2.direction="right";
			}
		}
		else if(keydown=="l"){
			if (gg.joueur2.direction !="top" ) {
				gg.joueur2.direction="bottom";
			}
		}

	});	

});