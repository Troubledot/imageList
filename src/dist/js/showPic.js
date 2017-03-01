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
function preparePlaceholder(){
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","dist/img/placeholder.jpg");
	placeholder.setAttribute("alt","My image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var descText = document.createTextNode("Choose an image");
	description.appendChild(descText);
	document.body.appendChild(placeholder);
	document.body.appendChild(description);
}
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
