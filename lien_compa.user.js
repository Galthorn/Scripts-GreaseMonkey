// ==UserScript==
// @name          Ajout Lien Comparateur
// @namespace     http://www.casstoa.fr
// @description   Un script qui ajoute un lien de cr&eacute;ation de dossier SuiviMulti sur le comparateur.
// @include       http://www.kraland.org/main.php?p=7_3_4*
// @grant  	  none

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
	
	var dataip = '';
	var dataid = '';
	var datanom = '';
	var datanom2 = '';
	var lastid = '';
	var link = '';
	var first = 0;
	var i = 0;
	var tabNom = new Array();
	var tabId = new Array();
	var url = document.location.href;
	//<li><a href='"+url+"'>Lien compa</a></li>
	
	$(".forumc tr:contains('Nom') td").each(function(){
		datanom += $(this).text()+';';
		tabNom[i] = $(this).text();
		i++;
	});
	$(".forumc tr:contains('IP (1)') td").each(function(){
		dataip += $(this).text()+';';
	});
	i = 0;
	$(".forumc tr:contains('N°') input:text").each(function(){
		dataid += $(this).attr('value')+';';
		tabId[i] = $(this).attr('value');
		if($(this).attr('value') != '' && first==1){
			link += '+'+$(this).attr('value');
		}
		else{
			link += $(this).attr('value');
			first=1;
		}
		lastid = $(this).attr('value');
		i++;
	});
	
	
	
	var formatCasier = '';
	i = 0;
	while(tabId[i] != '' && tabNom[i] != ''){
		formatCasier += tabNom[i]+' ([url=http://www.kraland.org/main.php?p=6_1&p1='+tabId[i]+']'+tabId[i]+'[/url]) ';
		i++;
	}
	
	$(".sl ul").append("<li><a href='http://kraland.casstoa.fr/SuiviMulti/index.php?ids="+link+"' target='_blank'>Créer un SuiviMulti</a></li>");
	
	url = url.replace(/\[/g,'%5B');
	url = url.replace(/\]/g,'%5D');
	$("#central-text").append("<table><tr><td><b>Format Casier : </b></td><td> <input type='text' value='"+formatCasier+"' size='100' /></td></tr><tr><td><b>Lien Compa : </b></td><td><input type='text' value='"+url+"' size='100' /></td></tr>");


GM_xmlhttpRequest({
  method: "POST",
  url: "http://kraland.casstoa.fr/Scripts/recup-ip.php",
  data: "dataip="+dataip+"&dataid="+dataid+"&datanom="+datanom,
  headers: {
	"Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {
	//alert(response.responseText);
  }
});
/*
var link ='';
var newid = 0;
for(i=1;i<=10;i++) {
	newid = Number(lastid)+i;
	link += '&p1['+i+']='+newid;
}
document.location.href = "main.php?page=6;4;3;0;0"+link;
*/

}
