// ==UserScript==
// @name           AEM View HiddenFields
// @version        1.4.0
// @namespace      http://jlmarzio.fr/
// @description    Show Hidden field labbel on AEM Authoring
// @include        https://author.prod.heliosrenault.net/*
// @include        https://author.uat.heliosrenault.net/*
// @include        https://author.stg.heliosrenault.net/*
// @include        https://*.heliosrenault.net/*
// @include        https://*.heliosdacia.net/*
// @author         JLM
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    $( document ).ready(function() {
        //$('#cdx').after('<div><div style="position:relative;">testJL</div></div>');
        var postManBody = "";
        $('.cq-wcm-edit input, .cq-wcm-edit select, .cq-wcm-edit textarea, .formBuilder input, .formBuilder select, .formBuilder textarea').each(function() { // [id^=hidden]
            var hiddenName = jQuery(this).attr("name");
            var hiddenValue = jQuery(this).attr("value");
            jQuery(this).parent().append("<span class='heliosKeyHack' style='color: red;'> -> "+hiddenName+"</span>");
            postManBody += '"'+hiddenName+'":"'+hiddenValue+'",\n';
        });
        console.log(postManBody);
    });
});

