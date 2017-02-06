function showPic(whichPic){
	var source = whichPic.getAttribute("href");
	var placeHolder = document.getElementById("placeholder");
	var description = document.getElementById("description");
	var text = whichPic.getAttribute("title");
	placeHolder.setAttribute("src",source);
	description.childNodes[0].nodeValue = text;
}