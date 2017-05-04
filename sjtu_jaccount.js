// ==UserScript==
// @name         SJTU
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ChenJian
// @include      https://jaccount.sjtu.edu.cn/jaccount/jalogin*
// @require      https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js
// @grant        none
// ==/UserScript==

var image = document.querySelector(".captcha-input img");
Tesseract.recognize(image)
    .then(function(result){
        document.querySelector("input[name=captcha]").value = result.text; //写入目标文本框
    });