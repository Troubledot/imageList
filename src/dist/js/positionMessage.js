function positionMessage(){
	if (!document.getElementById) return false;
	if (!document.getElementById("message")) return false;
	var elem = document.getElementById("message");
	var elem2 = document.getElementById("message2");
	elem.style.position = "absolute";
	elem.style.top = "100px";
	elem.style.left = "400px";
	elem2.style.position = "absolute";
	elem2.style.top = "300px";
	elem2.style.left = "100px";
	moveElement("message",600,800,2);
	moveElement("message2",600,800,2);
}
// function moveMessage(){
// 	if (!document.getElementById) return false;
// 	if (!document.getElementById("message")) return false;
// 	var elem = document.getElementById("message");
// 	var xpos = parseInt(elem.style.left);
// 	var ypos = parseInt(elem.style.top);
// 	if(xpos == 800&&ypos == 400) {
// 		return true;
// 	}	 
// 	if(xpos < 800){
// 		xpos++
// 	}
// 	if(xpos > 800){
// 		xpos--
// 	}
// 	if(ypos < 400){
// 		ypos++
// 	}
// 	if(ypos > 400){
// 		ypos--
// 	}
// 	elem.style.top = ypos+"px";
// 	elem.style.left = xpos+"px";
// 	movement = setTimeout("moveMessage()",10);
// }
addLoadEvent(positionMessage);
