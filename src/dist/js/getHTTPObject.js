function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined") {
		try {return new ActiveXobjcet("Msxml2.XMLHTTP.6.0");}
			catch(e){}
		try {return new ActiveXobjcet("Msxml2.XMLHTTP.3.0");}
			catch(e){}
		try {return new ActiveXobjcet("Msxml2.XMLHTTP");}
			catch(e){}
		return false;
	} else {
		return new XMLHttpRequest();
	}
}