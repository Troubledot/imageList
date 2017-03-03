function displayCitations(){
	//测试浏览器支持DOM方法
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	//获取所有引用
	var quote = document.getElementsByTagName("blockquote");
	//遍历引用
	for (var i = 0; i < quote.length; i++) {
		//如果没有site 属性继续循环
		if (!quote[i].getAttribute("cite")) continue;
		//保存site 属性
		var url = quote[i].getAttribute("cite");
		//取得引用中的所有节点	
		var quoteChildren = quote[i].getElementsByTagName("*");
		//如果引用中没有节点 继续往下执行
		if (quoteChildren.length < 1) continue;
		//取到引用中的最后一个节点
		var elem = quoteChildren[quoteChildren.length-1];
		//创建a标签
		var link = document.createElement("a");
		//创建文本节点sourece
		var link_text = document.createTextNode("blog");
		//将文本节点source 添加到节点a 中
		link.appendChild(link_text);
		//设置a的链接
		link.setAttribute("href",url);
		//创建新的节点sup
		var superScript = document.createElement("sup");
		//把节点a 添加到新节点sup中	
		superScript.appendChild(link);
		//将sup节点添加到引用的最后一个节点中
		elem.appendChild(superScript);
	}
}

//用addLoadEvent函数调用displayCitations 函数
	addLoadEvent(displayCitations);