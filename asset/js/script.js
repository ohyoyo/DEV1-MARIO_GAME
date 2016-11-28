//flèche haut = 38
//flèche bas = 40
//entréé = 13

function gotogame(){
	location.href='http://www.google.com';
}
	
function select(k) {
	if(k.keyCode === 13)
		gotogame();

	if (k.keyCode !== 40 && k.keyCode !== 38)
		return;

	var e = document.getElementsByClassName('player_selected')[0],
	id = e.getAttribute('id');

	e.classList.remove('player_selected');

	if(id == 'ply1'){
		document.getElementById('ply2').classList.add('player_selected');
	} else {
		document.getElementById('ply1').classList.add('player_selected');
	}
}

document.addEventListener('keydown', select);


function hover(){
	var id = this.getAttribute('id');

	var e = document.getElementsByClassName('player_selected')[0];
	e.classList.remove('player_selected');

	if(id == 'ply2'){
		document.getElementById('ply2').classList.add('player_selected');
	} else {
		document.getElementById('ply1').classList.add('player_selected');
	}
}

var lis = document.getElementsByTagName('li');

for(var i=0; i<lis.length; i++){
	lis[i].addEventListener('mouseover', hover);
}