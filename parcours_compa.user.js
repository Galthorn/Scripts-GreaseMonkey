// ==UserScript==
// @name          Parcours Compa
// @namespace     http://www.casstoa.fr
// @description   Un script qui parcours automatiquement le comparateur.
// @include       http://www.kraland.org/main.php?page=6;*
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

	var url = document.location.href;
	url = url.replace('http://www.kraland.org/', '');
	var url_act = '';
	//idcomp=$(this).children(".post_left").children("p:first-child").children("a").attr("href");
	url_act = url.replace(/main.php\?page=4;(.+);0;0;0/g, "$1");
	url_act++;
	document.location.href = "main.php?page=4;"+url_act+";0;0;0";
	//alert(url_act);

	
/*
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
*/


}
