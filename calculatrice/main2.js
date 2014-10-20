
// Déclaration des var d'environnement pour le stokage des val user
var first = '', second = '', res = 0, operator = '';

// Récupération du container clavier calculatrice
var keys = document.getElementById('keys');

// Ajout de l'écouteur event
keys.addEventListener('click', getKey, false);

// récupération de la valeur du bt cible
function getKey(e){
	// recuperation de la valeur
	var val = e.target.innerText;

	// log console de la valeur touche
	console.log('key : '+val);

	// Test de la touche egale
	if(e.target.className == 'eval'){
		prepareCalc();
		return;
	}

	// Si le resultat existe, la première valeur est le resultat precedent
	if (res != 0) {
		if (e.target.className == '' && operator == '') {
			reset();
		}else{
			second = '';
		}
		first = res;
	}

	// elimination des opérateurs pour l'enregistrement des opérandes
	if (operator == '' && e.target.className == '' && res == 0) {
		// console.log(val);
		first += val; // first = first + val;
		display(first);
	}else if(e.target.className == 'operator'){
		operator = val;
	}else{
		second += val;
		prepareCalc();
		// display(second);
	}
}


function prepareCalc(){

	if (first != '' && second != '') {
		first = parseFloat(first);
		second = parseFloat(second);
		calc();
	}else{
		alert('Veuillez entrer deux opérandes');
	}
}

function calc(){
	switch(operator){
		case '+':
			res = first+second;
		break;
		case '-':
			res = first-second;
		break;
		case 'x':
			res = first+second;
		break;
		case '÷':
			if (second != 0) {
				res = first/second;
			}else{
				alert('pas de division par 0');
			}
		break;
	}
	console.log('res : '+res);
	display(res);
	// second = '';
	operator = '';
}

// Fonction pour gérer l'affichage
function display(value){
	// récupération de la valeur du screen
	if (value) {
		document.getElementById('screen').innerText = value;
	}else{
		// si le param est vide -> val = ''
		document.getElementById('screen').innerText = '';
	}
}

document.getElementById('clear').addEventListener('click', reset, false);

function reset(){
	console.log('reset');
	res = 0;
	first = '';
	second = '';
	operator = '';
	display();
}




