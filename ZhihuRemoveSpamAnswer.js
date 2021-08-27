// ==UserScript==
// @name         屏蔽知乎刷屏与大量复读的回答
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽知乎刷屏与大量复读的回答
// @author       ZjzMisaka
// @match        https://www.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?domain=zhihu.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ZjzMisaka/ZhihuRemoveSpamAnswer/master/ZhihuRemoveSpamAnswer.js
// ==/UserScript==

(function() {
    'use strict';
    window.onscroll = function() {
        Ana();
    }

    Ana();

    function Ana(){
        var richContentList = document.getElementsByClassName("RichContent-inner");
        for (var k = 0; k < richContentList.length; ++k) {
            var contentText = richContentList[k];
            var contentInnerText = contentText.innerText.substring(contentText.innerText.indexOf('：') + 2);
            var contentFirstText = contentInnerText[0];
            var contentSplitList = contentInnerText.split(contentFirstText);

            var contentCount = 0;
            var contentTemp = contentSplitList[1];
            for (var jj = 1; jj < contentSplitList.length; ++jj) {
                if(contentSplitList[jj] == contentTemp){
                    ++contentCount;
                } else {
                    break;
                }
                if(contentCount == 6){
                    var contentEleTemp = contentText;
                    while (!contentEleTemp.classList.contains('TopstoryItem') && !contentEleTemp.classList.contains('List-item')){
                        contentEleTemp = contentEleTemp.parentNode;
                    }
                    contentEleTemp.parentNode.removeChild(contentEleTemp)

                    break;
                }
            }

        }

        var richTextList = document.getElementsByClassName("CopyrightRichText-richText");
        for (var i = 0; i < richTextList.length; ++i) {
            var richText = richTextList[i];
            var firstText = richText.innerText[0];
            var innerText = richText.innerText;
            var splitList = innerText.split(firstText);

            var count = 0;
            var temp = splitList[1];
            for (var j = 1; j < splitList.length; ++j) {
                if(splitList[j] == temp){
                    ++count;
                } else {
                    break;
                }
                if(count == 6){
                    var eleTemp = richText;
                    while (!eleTemp.classList.contains('TopstoryItem') && !eleTemp.classList.contains('List-item')){
                        eleTemp = eleTemp.parentNode;
                    }
                    eleTemp.parentNode.removeChild(eleTemp)

                    break;
                }
            }

        }
    }
})();
