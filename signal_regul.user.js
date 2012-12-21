// ==UserScript==
// @name        Bouton signalement Régul
// @namespace   http://www.casstoa.fr
// @description Un script qui ajoute un bouton signalement aux KM qui permet l'ouverture d'un nouveau sujet sur régulation.
// @include     http://www.kraland.org/main.php?p=8_1_1259&p1=*
// @include     *&signalregul=1*
// @grant       none
// @require     https://gist.github.com/raw/3123124/grant-none-shim.user.js
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
	
	var pattForum = /main.php\?p=8_1_1259/;
	var pattPost = /&signalregul=1/;
	var urlDoc = document.location;
	
	if (pattPost.test(urlDoc)) {
		var titre = GM_getValue('titre');
		var msgFinal = GM_getValue('message');
		msgFinal = msgFinal.replace(/\\/g,'');
		$('.forum-top input[name=p2]').val(titre);
		$('.forum-message textarea').val(msgFinal);
	}
	else if(pattForum.test(urlDoc)) {
		
		//Var importantes
		var linkPost = 'http://www.kraland.org/main.php?p=5_5_6&p0=3&signalregul=1';
		var preMsg = ''; //Text avant le spoiler contenant le message
		var postMsg = ''; //Text après le spoiler
		
		
		//Vars osef
		var titre = '[Signalement] '+$(".forum-top").children("strong").text();
		var text = '';
		var linkMsg = '';
		var msgFinal = '';
		
		var balises = {'<a href="([^<]*)" target="_blank">':'[url=$1]', '<\/a>':'[/url]', '<b>':'[b]', '</b>':'[/b]', '<i>':'[i]', '</i>':'[/i]', '<div class="spoiler" style="display: none;">':'[spoiler]', '</div></div></div>':'[/spoiler]', '<img src="([^"]*)">':'[img]$1[/img]', '<img src="[^"]*" alt="([^"]*)" align="middle" border="0">':'$1',  '<br>':'\n'}; 
		
		$("tr.forum-c2").each(function(){
			
			$(this).children("td").append(" | <a href='#' class='signalregul'>Signaler sur Régulation</a>");
			
			
			
		});
		
		$(".signalregul").click(function() {
			text = $(".forum-message").html();
			//text = text.replace(/\<br>/g,'\\\n');
			
			var linkProfil = $("td.forum-cartouche img").parent().attr("href");
			var nameKM = $("td.forum-cartouche p:first-child").children().text();
			var dateKM = $("td.forum-cartouche p:nth-child(2)").text();
			//linkMsg = $(this).parent().children("a:contains('Lien')").attr("href");
			
			//alert(text);
			for (var val in balises) {
			  text = text.replace(new RegExp(val, "gi"), balises[val]);
			}
			text = text.replace(/\<div>\<div class=\"pre\-spoiler\">\<span style=\"float:left; padding-top: 2px;\">Spoiler\<\/span> \<input value=\"Voir\" class=\"see\-spoiler\" onclick=\"spoiler\(this\);\" type=\"button\">\<\/div>\<div>/g, '');
			//alert(text);
			
			//msgFinal = preMsg+"\n\nSujet : [url="+linkMsg+"]"+titre+"[/url]\n[quote]"+text+"[/quote]\n\n"+postMsg;
			msgFinal = preMsg+"[url=http://www.kraland.org/"+linkProfil+"]"+nameKM+"[/url]\n"+dateKM+"\n[quote]"+text+"[/quote]\n\n"+postMsg;
			
			
			GM_setValue('titre', titre);
			GM_setValue('message', msgFinal);
			document.location = linkPost;
		});
	}
}
/*
text = $(this).children(".forum-message").text();
		if(text != '') {
			alert('ok');
			$(this).next().children(".forum-footer").prepend("test - ");
		}
		*/
