
function styleElementSiblings(tag,theclass){
	var Elements = document.getElementsByTagName(tag);
	var elem;
	for (var i = 0; i < Elements.length; i++) {
		elem = getNextElement(Elements[i].nextSibling);
		addClass(elem,theclass);
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
addLoadEvent(function(){
	styleElementSiblings("h1","intro")
});