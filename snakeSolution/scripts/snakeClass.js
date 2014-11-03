snake=function(nom,posX,posY){

		this.nom=nom;
		this.direction="right";
		this.posY=posY;
		this.posX=posX;
		this.points=0;
		this.queue=new Array();
		this.allongementQueue=3;

	}

	snake.prototype.afficherSnake=function(){

		$("."+this.nom).remove();
		$("#jeu").append("<div class='snake "+this.nom+"'></div>");
		$(".snake."+this.nom).css({
			left:this.posX,
			top:this.posY,
		});
	}

	snake.prototype.afficherQueue= function(){

		$(".queue."+this.nom).remove();

		$("#jeu").append("<div class='queue "+this.nom+"'></div>");
		for(var i=0; i<this.queue.length; i++)
		{
			infos=this.queue[i];
			var info=infos.split("_");
			var posXq=info[0];
			var posYq=info[1];
			$(".queue."+this.nom).append('<div class="elemQueue" style="left:'+posXq+'px;top:'+posYq+'px;"></div>');

		}
	}




	snake.prototype.bougerSnake=function()
	{

		oldPosX=this.posX;
		oldPosY=this.posY;

		if(this.direction=="right")
		{
			this.posX=(parseInt(this.posX)+10)+"px";
		}
		else if(this.direction=="left")
		{
			this.posX=(parseInt(this.posX)-10)+"px";
		}
		else if(this.direction=="top")
		{
			this.posY=(parseInt(this.posY)-10)+"px";
		}
		else if(this.direction=="bottom")
		{
			this.posY=(parseInt(this.posY)+10)+"px";
		}

		if(parseInt(this.posX)>=640){this.posX="0px";}
		else if(parseInt(this.posX)<0){this.posX="630px";}

		if(parseInt(this.posY)>=350){this.posY="0px";}
		else if(parseInt(this.posY)<0){this.posY="340px";}

		$(".snake."+this.nom).css({
			left:this.posX,
			top:this.posY,
		});


		if(this.posX==rubis.posX && this.posY==rubis.posY)
		{
			this.allongementQueue=this.allongementQueue+3;
			rubis.enleverDiamond();
			rubis= new diamond();
			rubis.afficherDiamond();
		}

		this.bougerQueue(oldPosX,oldPosY);

		if(inArray( parseInt(this.posX)+"_"+parseInt(this.posY), joueur1.queue) || inArray( parseInt(this.posX)+"_"+parseInt(this.posY), joueur2.queue))
		{
			alert("partie perdue pour le joueur "+ this.nom);
		}	

	}

	snake.prototype.bougerQueue=function(oldPosX,oldPosY)
	{

		if(this.allongementQueue>0)
		{
			this.allongementQueue--;
		}
		else
		{
			this.queue.shift();
			$(".queue."+this.nom+ " .elemQueue:first-child").remove();
			
		}
		
		this.queue.push(parseInt(oldPosX)+"_"+parseInt(oldPosY));
		$(".queue."+this.nom).append('<div class="elemQueue" style="left:'+oldPosX+';top:'+oldPosY+'"></div>');

		
	}