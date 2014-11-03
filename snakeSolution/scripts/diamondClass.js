var diamond= function()
	{
		this.posX=Math.floor(Math.random()*64)*10+"px";
		this.posY=Math.floor(Math.random()*35)*10+"px";
	}

	diamond.prototype.afficherDiamond=function()
	{
		$("#jeu").append("<div class='bijou' style='left:"+this.posX+";top:"+this.posY+"'></div>");
	}
	diamond.prototype.enleverDiamond=function()
	{
		$(".bijou").remove();
	}