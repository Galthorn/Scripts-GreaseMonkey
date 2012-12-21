// ==UserScript==
// @name          Tracker d'IP KI (Activation)
// @namespace     http://www.casstoa.fr
// @description   Un script qui enregistre les IPs, les IDs et les noms sur la page d'activation.
// @include       http://www.kraland.org/main.php?p=7_3_1*
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


var list_asurveiller = '86.68.30.95,86.68.30.46';
var list_h2 = '90.17.192.144,90.17.193.129,90.17.195.179,90.23.245.28,90.23.247.198,90.51.133.230,90.51.198.153,81.249.73.202,81.249.99.75,88.181.228.220,88.166.203.103,134.214.238.242,62.39.144.154,92.144.98.203,85.171.238.156,85.171.226.117,82.125.132.165,90.13.237.220,193.52.24.125,90.13.237.220,82.125.132.165,90.13.237.220,85.171.238.156,85.171.226.117,217.108.225.35,90.55.163.2,88.85.22.226,62.34.88.46';
var list_exexclus = '';
var dictionnary = {'88.181.228.220':'Ernie','88.166.203.103':'Ernie','134.214.238.242':'Ernie','90.17.192.144':'Giorgio Addams' , '90.17.193.129':'Giorgio Addams' ,
		'90.17.195.179':'Giorgio Addams' , '90.23.245.28':'Giorgio Addams' , '90.23.247.198':'Giorgio Addams' , '90.51.133.230':'Giorgio Addams' , '90.51.198.153':'Giorgio Addams' ,
		'81.249.73.202':'Giorgio Addams' , '81.249.99.75':'Giorgio Addams','62.39.144.154':'Bahamut' , '92.144.98.203':'Bahamut','85.171.238.156':'Hypérion' , '85.171.226.117':'Hypérion',
		'82.125.132.165':'Urza' , '90.13.237.220':'Urza' , '149.6.166.214':'Urza' , '82.125.151.190':'Urza','193.52.24.125':'Jetro' , '90.13.237.220':'Jetro','82.125.132.165':'Eden' ,
		'90.13.237.220':'Eden','85.171.238.156':'Merhzin' , '85.171.226.117':'Merhzin','217.108.225.35':'Schneider','0.0.0.0':'Luc TNT','90.55.163.2':'La Crampe VampiriKra',
		'88.85.22.226':'Tip Ardono','80.13.85.104':'Coyote','88.165.249.109':'Merlin'}
		
var tab_asurveiller    = list_asurveiller.split(',');
var tab_h2 = list_h2.split(',');
var tab_exexclus = list_exexclus.split(',');

		
var datas = '';
$(".forum-c1, .forum-c2").each(function(){
	
	var ip= '';
	var name= '';
	var idcomp= '';
	
    ip=$(this).children("td:last-child").children("a").text();
	if (ip != '') {
		for (j=0; j<tab_h2.length; j++){
			if (tab_h2[j] == ip){
				alert('Un H2 a posté ici : ' + dictionnary[tab_h2[j]]);
			}
		}
		for (j=0; j < tab_asurveiller.length; j++){
			if (tab_asurveiller[j]== ip){
				alert('Une personne a surveiller a posté ici : '+ dictionnary[tab_asurveiller[j]]);

			}
		}
		for (j=0; j < tab_exexclus.length; j++){
			if (tab_exexclus[j] == ip){
				alert('Une personne exclu a posté ici : ' + dictionnary[tab_exexclus[j]]);

			}
		}
	}
	
	
	name=$(this).children("td:first").next().text();
	
	//order.php?p1=7310&p3=7444
	idcomp=$(this).children("td:first").next().next().children("a").attr("href");
	
	idcomp = idcomp.replace(/order.php\?p1=(.+)p3=(.+)/g, "$2");
	
	datas+=idcomp+","+name+","+ip+";";
	$(this).children("td:last-child").append(" <a href='http://kraland.casstoa.fr/IPtrack/index.php?ip="+ip+"' target='_blank'><img src='http://www.eurolocation.fr/images/icon_loupe.gif' /></a><a href='http://www.ip-adress.com/ip_tracer/"+ip+"' target='_blank'><img src='http://cdn.whatismyipaddress.com/favicon.ico' /></a>");
	//http://whatismyipaddress.com/ip/ 
	
	//on balance l'upload
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
