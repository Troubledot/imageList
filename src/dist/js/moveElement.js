function moveElement(elementId,final_x,final_y,interval){
	if (!document.getElementById) return false;
	if (!document.getElementById(elementId)) return false;
	var element = document.getElementById(elementId);
	var xpos = parseInt(element.style.left);
	var ypos = parseInt(element.style.top);
	if (xpos == final_x&&ypos == final_y) {
		return true;
	}
	if (xpos<final_x){
		xpos++
	}
	if (xpos>final_x){
		xpos--
	}
	if (ypos<final_y) {
		ypos++
	}
	if (ypos>final_y) {
		ypos--
	}
	element.style.left = xpos+"px";
	element.style.top = ypos+"px";
	var repeat = "moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")"
	movement = setTimeout(repeat,interval);
}
