var Model = {

	currentStep: 0,
	code: new Array(),

	put: function(key, color){
		this.code[key] = color;
	},

	nextStep: function(){
		this.code = [];
		this.currentStep++;
	}

}