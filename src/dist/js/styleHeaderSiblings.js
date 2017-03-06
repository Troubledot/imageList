
function styleHeaderSiblings(){
	var headers = document.getElementsByTagName('h1');
	var elem;
	for (var i = 0; i < headers.length; i++) {
		elem = getNextElement(headers[i].nextSibling);
		elem.style.fontSize = "2em";
	}
	console.log(elem);

	function getNextElement(node){
		if (node.nodeType == 1) {
			return node;
		}
		if (node.nextSibling){
			return getNextElement(node.nextSibling);
		}
		return null;
	}
}
addLoadEvent(styleHeaderSiblings);