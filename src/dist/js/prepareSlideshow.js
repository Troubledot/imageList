function prepareSlideshow(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("preview")) return false;
	if (!document.getElementById("linklist")) return false;
	var preview = document.getElementById("preview");
	preview.style.position = "absolute";
	preview.style.left = "0";
	preview.style.top = "0";
	var linklist = document.getElementById("linklist");
	var links = linklist.getElementsByTagName("a");
	links[0].onmouseover = function(){
		moveElement("preview",-100,0,10)
	};
	links[1].onmouseover = function(){
		moveElement("preview",-200,0,10)
	};
	links[2].onmouseover = function(){
		moveElement("preview",-300,0,10)
	}
}
addLoadEvent(prepareSlideshow);
