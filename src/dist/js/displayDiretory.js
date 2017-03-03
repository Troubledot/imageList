function displayDirectory(){
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var dir = document.getElementsByTagName("h1");
	var dirul = document.createElement("ul");
	for (var i = 0; i < dir.length; i++) {
		var head_text = dir[i].lastChild.nodeValue;
		var dirli = document.createElement("li");
		var li_text = document.createTextNode(head_text);
		dirli.appendChild(li_text);
		dirul.appendChild(dirli);
	}
	console.log(dirul);
	document.body.insertBefore(dirul,dir[0]);
}
addLoadEvent(displayDirectory);