'use strict';

const diff = require('./diff');

const display = require('./display');

let appendContent = ({ left = {}, right = {} }, options) => {
    let {merge, diffMap} = diff(left, right);
    let content = display(merge, diffMap, options).join('');
    let body = document.body;
    let container = document.createElement('div');
    container.className = 'jDiff-container';
    container.innerHTML = content;
    return container;
};

module.exports = appendContent;
