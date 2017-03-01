function showPic(whichPic){
	if (!document.getElementById("placeholder")) return false;
	var source = whichPic.getAttribute("href");
	if (placeholder.nodeName != "IMG") return false;
	var placeHolder = document.getElementById("placeholder");
	if (document.getElementById("description")) {
		var description = document.getElementById("description");
		var text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
		placeHolder.setAttribute("src",source);
		if (description.childNodes[0].nodeType == 3) 
		{
			description.childNodes[0].nodeValue = text;
		}
	}
		return true;
}
function prepareGallery(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function (){
			console.log(2);
			return showPic(this) ? false : true; 
		};
	}
};
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
addLoadEvent(prepareGallery);
