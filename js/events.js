
function onKeyDown(e){

	switch(e.keyCode)
	{
		case 32:
			ssg.player.shoot();
			break;
		case 37:
			ssg.player.velocity.x = -5;
			break;
		case 38:
			ssg.player.velocity.y = -5;
			break;
		case 39:
			ssg.player.velocity.x = 5;
			break;
		case 40:
			ssg.player.velocity.y = 5;
			break;
	}
}

function onKeyUp(e){

	switch(e.keyCode)
	{
		case 32: //reserved for beam weapon shooting
			break;
		case 37:
		case 39:
			ssg.player.velocity.x = 0;
			break;
		case 38:
		case 40:
			ssg.player.velocity.y = 0;
			break;
	}
}

window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onKeyUp, true);
