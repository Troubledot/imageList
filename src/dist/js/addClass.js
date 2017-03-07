function addClass(element,value){
	if (!element.className) {
		element.className = value;
	}
	else {
		newClassname  = element.className;
		newClassname += " ";
		newClassname += value;
		element.className = newClassname;

	}
}
