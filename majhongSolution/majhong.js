$(document).ready(function(){

var pyramide = new Array(); // notre variable qui contiendra le jeu.


/*************************************


	Etape 1 : création du modèle de remplissage de la pyramide


**************************************/

var modelePyramide = new Array();
modelePyramide=[
	[
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1
	],
	[
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,1,0,0,0,0,
		0,0,1,1,1,1,1,0,0,
		0,0,1,1,1,1,1,0,0,
		0,1,1,1,1,1,1,1,0,
		0,0,1,1,1,1,1,0,0,
		0,0,1,1,1,1,1,0,0,
		0,0,0,0,1,0,0,0,0,
		0,0,0,0,0,0,0,0,0
	],
	[
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,1,0,0,0,0,
		0,0,0,1,1,1,0,0,0,
		0,0,1,1,1,1,1,0,0,
		0,0,0,1,1,1,0,0,0,
		0,0,0,0,1,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0
	],
	[
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,1,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0
	]
];


/*************************************


	Etape 2 : création d'un tableau contenant la liste de toutes les pièces à utiliser

**************************************/
var listePiece=new Array(); // la liste de toutes les pièces à utiliser
for(var i=0; i<4;i++)
{
	for(var j=1; j<32; j++)
	{
		var nomPiece;
		if(j<10){nomPiece="0"+j;}else{nomPiece=""+j;}

		listePiece[listePiece.length]=nomPiece;
		
	}
}

/*************************************


	Etape 3 : création d'une fonction récursive pour mélanger un tableau. 
				Très bon exemple d'utilisation d'une fonction récursive sur un tableau


**************************************/



function melangeTableauRecursif(tableau,longueur)
{
	if(longueur==1)
	{
		//condition pour sortir de notre fonction récursive
		return tableau;
	}
	else
	{
		// on choisit une position au hasard
		var positionAEchanger= Math.floor(Math.random()*longueur);

		// on intervertit avec la dernière position
		var temp=tableau[longueur-1];
		tableau[longueur-1]=tableau[positionAEchanger];
		tableau[positionAEchanger]=temp;

		console.log(tableau);
		return melangeTableauRecursif(tableau,longueur-1);
	}
}
// melangeTableauRecursif([1,2,3,4,5,6,7,8,9],9);



/*************************************


	Etape 4 : on utilise notre fonction pour mélanger la liste.


**************************************/

var listePieceMelangee=melangeTableauRecursif(listePiece,listePiece.length);



/*************************************


	Etape 5 : on remplit notre pyramide avec les pieces


**************************************/

var numeroPiece=0;

for(var i=0 ; i< modelePyramide.length; i++)
{
	pyramide[i]=new Array();
	for (var j=0 ; j< modelePyramide[i].length; j++)
	{
		if(modelePyramide[i][j]==0)
		{
			pyramide[i][j]=0;
		}
		else
		{
			pyramide[i][j]=listePieceMelangee[numeroPiece];
			numeroPiece++;
		}
	}

}


/*************************************


	Etape 6 : on s'occuper de l'affichage en HTML


**************************************/


for(var i=0 ; i < pyramide.length ; i++)
{
	$("#jeu").append("<div id='couche_"+i+"'  class='couche' style='z-index:"+i+"'></div>")
	for (var j=0 ; j< pyramide[i].length; j++)
	{
		if(pyramide[i][j]!=0)
		{
			$("#couche_"+i+"").append("<div class='piece pieceJouable piece_"+pyramide[i][j]+"' data-position='"+j+"' data-couche='"+i+"' data-piece='"+pyramide[i][j]+"' style='left:"+(((j%9)*79)-i*9)+"px;top:"+((Math.floor(j/9)*107)-i*9)+"px;'></div>");
		}
	}
}


/*************************************


	Etape 7 : fonctionnement du jeu avec gestion du clic sur les pièces.


**************************************/

var idPiece='';
var piecePosition;
var pieceCouche;

$(".pieceJouable").on( "click", function() {
	
	// on teste si la piece est jouable
	if($(this).attr( "data-position" )%9==0 || $(this).attr( "data-position" )%9==8 || pyramide[$(this).attr( "data-couche" )][$(this).attr( "data-position" )-1]=='0' || pyramide[$(this).attr( "data-couche" )][parseInt($(this).attr( "data-position" ))+1]=='0')
	{
			$(this).addClass("pieceEnCours");
			if(idPiece=='')
			{
				idPiece=$(this).attr( "data-piece" );
				piecePosition=$(this).attr( "data-position" );
				pieceCouche=$(this).attr( "data-couche" );
			}
			else if(idPiece == $(this).attr( "data-piece" ) && ($(this).attr("data-couche")!=pieceCouche || piecePosition!=$(this).attr( "data-position" ) ))
			{
				$(".pieceEnCours").remove();
				pyramide[pieceCouche][piecePosition]=0;
				pyramide[$(this).attr( "data-couche" )][$(this).attr( "data-position" )]=0;
				idPiece='';
				piecePosition='';
				pieceCouche='';
			}
			else
			{
				$(".pieceEnCours").removeClass("pieceEnCours");
				idPiece='';
				piecePosition='';
				pieceCouche='';
			}
	}
});



});








