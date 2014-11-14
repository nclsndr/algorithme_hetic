var Model = {

	currentStep: 0,
	code: new Array(),
	valide: new Array(),

	put: function(key, color){
		this.code[key] = color;
	},

	nextStep: function(){
		this.code = [];
		this.currentStep++;
	},

	validate: function(key, color){
		this.valide[key] = color;
	}

}