// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://xuanke.tongji.edu.cn
// @grant        none
// ==/UserScript==

var pageType;
var myurl = window.location.href;
if (myurl.indexOf("xuanke.tongji.edu.cn") != -1) {
    pageType = false;
} //false 为详情页面

if (pageType === false) {
    var image = document.querySelectorAll("tr td img").item(1);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var numbers = ["110000111000000100011000001111000011110000111000001111000011110000101000001111000001100010000001100000111111111011101110","011100111110001111000011100100011010001101110011111100101111001011110011111100011111001101100001011000111101111110110110","110000111000000100010000001111000111010011111101111110011110000111000011100011111001111100000000000000001111111101111101","110001111000001100111001101110010111100111100011111000011111110001111100001111000011110010000001010000110111111111111111","111100111110001111100011110000111001001110010011001000110111001100000000000000000111001111110011011100111111111111111111", "100000001000000110011111001111110010001100000000001111001001110011110100001111000001110000000000110000111111111111110111","100000111000000110011100001111110011111100100011000000010001110000001000001011001000110010000001110000011001111111111011","000000000000000011111100111110011111000101110011111001111110011111100111111001111100111101001111010011111101111111011110","110000111000000100111100001111000011110010000001100000010011110000110000001111000011110010000000110000110111111111101110","110000101000000100111100001111000001110000111000100000001100010011111100111111000011100110000000110001111110111111111101"];
    var captcha = "";                         //存放识别后的验证码
    canvas.width = image.width;
    canvas.height = image.height;
    document.body.appendChild(canvas);
    ctx.drawImage(image, 0, 0);
    for (var i = 0; i < 4; i++) {
        var pixels = ctx.getImageData(10 * i + 3, 2, 8, 15).data;
        var ldString = "";
        for (var j = 0, length = pixels.length; j < length; j += 4) {
            ldString = ldString + (+(pixels[j] * 0.3 + pixels[j + 1] * 0.59 + pixels[j + 2] * 0.11 >= 140));
        } 
        var comms = numbers.map(function (value) {                     //为了100%识别率,这里不能直接判断是否和模板字符串相等,因为可能有个别0被计算成1,或者相反
            return ldString.split("").filter(function (v, index) {
                return value[index] === v;
            }).length;
        });
        captcha += comms.indexOf(Math.max.apply(null, comms));          //添加到识别好的验证码中
    }  
    document.querySelector("input[name=T3]").value = captcha; //写入目标文本框
}
