// ==UserScript==
// @name         屏蔽知乎无意义回答
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  屏蔽知乎无意义回答, 包括刷屏与大量复读的回答, 嘲讽类定型文等.
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

    window.onload=function(){
        Ana();
    }

    function Ana(){
        var richContentList = document.getElementsByClassName("RichContent-inner");
        for (var k = 0; k < richContentList.length; ++k) {
            var needRemove = false;
            var contentText = richContentList[k];
            var contentInnerText = "";
            if(contentText.parentElement.classList.contains('is-collapsed') && !contentText.parentElement.classList.contains('RichContent--unescapable')) {
                contentInnerText = contentText.innerText.substring(contentText.innerText.indexOf('：') + 1).trim();
            }else {
                contentInnerText = contentText.innerText.trim();
            }
            needRemove = Res1(contentInnerText) || Res2(contentInnerText);

            if(needRemove) {
                var contentEleTemp = contentText;
                while (!contentEleTemp.classList.contains('TopstoryItem') && !contentEleTemp.classList.contains('List-item') && !contentEleTemp.classList.contains('ContentItem') && !contentEleTemp.classList.contains('AnswerItem')){
                    contentEleTemp = contentEleTemp.parentNode;
                }
                contentEleTemp.parentNode.removeChild(contentEleTemp)
            }
        }
    }

    function Res1(contentInnerText) {
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
                return true;
            }
        }
        return false;
    }

    function Res2(contentInnerText) {
        if(contentInnerText.startsWith("世界卫生组织（WHO）根据智商将精神发育迟滞分为以下四个等级")
          || contentInnerText.startsWith("脑栓塞是指因异常的固态、液态、气态物体(被称作栓子)沿血循环进入脑动脉系统，引起动脉管腔闭塞，导致该动脉供血区局部脑组织的坏死，临床上表现为偏瘫、偏身麻木、讲话不清等突然发生的局源性神经功能缺损症状。")) {
            return true;
        } else {
            return false;
        }
    }
})();
