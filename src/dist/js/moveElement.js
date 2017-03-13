function moveElement(elementId,final_x,final_y,interval){
	if (!document.getElementById) return false;
	if (!document.getElementById(elementId)) return false;
	var element = document.getElementById(elementId);
	if (!element.style.left) {
		element.style.left = "0px";
	};
	if (!element.style.top) {
		element.style.top = "0px";
	};

	if (element.movement) {
		clearTimeout(element.movement)
		console.log(element.movement)
	};

	var xpos = parseInt(element.style.left);
	var ypos = parseInt(element.style.top);
	var dist = 0;
	if (xpos == final_x&&ypos == final_y) {
		return true;
	}
	if (xpos<final_x){
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos>final_x){
		dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos<final_y) {
		dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if (ypos>final_y) {
		dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	element.style.left = xpos+"px";
	element.style.top = ypos+"px";
	var repeat = "moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")"
	element.movement = setTimeout(repeat,interval);

}
