// ==UserScript==
// @name         Romania analytics autocomplete
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ro-ro.dark.prod.heliosrenault.net/*
// ==/UserScript==


    $( document ).ready(function() {
        $("input[name='DEVICE']").val("large");
    });
