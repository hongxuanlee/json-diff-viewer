'use strict';

const diff = require('./diff');

const display = require('./display');

let appendContent = ({ left = {}, right = {} }, selector, options) => {
    let {merge, diffMap} = diff(left, right);
    let content = display(merge, diffMap, options).join('');
    if(selector){
        selector.innerHTML = content;
    }else{
        let body = document.body;
        let container = document.createElement('div');
        container.className = 'jDiff-container';
        container.innerHTML = content;
        body.appendChild(container);
    }
};

module.exports = appendContent;
