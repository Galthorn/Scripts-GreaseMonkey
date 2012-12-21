// ==UserScript==
// @name          Tracker d'IP KI
// @namespace     http://www.casstoa.fr
// @description   Un script qui enregistre les IPs, les IDs et les noms sur la page.
// @include       http://www.kraland.org/main.php?page=4;*
// ==/UserScript==


var $;

// Add jQuery
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {

var datas = '';
$(".post_container").each(function(){
	var ip= '';
	var name= '';
	var idcomp= '';
    ip=$(this).children(".post_foot").children("font").children("a").text();
	name=$(this).children(".post_left").children("p:first-child").children("a").text();
	idcomp=$(this).children(".post_left").children("p:first-child").children("a").attr("href");
	idcomp = idcomp.replace(/main.php\?page=1;(.+)p1=(.+)/g, "$2");
	datas+=idcomp+","+name+","+ip+";";
	
	// on balance l'upload
	/*
	main.php?page=1;4;3;263884;0&p1=61154
	
	
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://kraland.casstoa.fr/Scripts/upload.php",
	  onload: function(response) {
		alert(response.responseText);
	  }
	});
	*/
	
  });
	

	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://kraland.casstoa.fr/Scripts/upload.php",
	  data: "datas="+datas,
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		//alert(response.responseText);
	  }
	});
	


}
