function showPic(whichPic){
	var source = whichPic.getAttribute("href");
	var placeHolder = document.getElementById("placeholder");
	placeHolder.setAttribute("src",source);
}