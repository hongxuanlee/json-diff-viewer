'use strict';

const jdiff = require('./jdiff');

const display = require('./display');

let appendContent = (lhs, rhs) => {
    let body = document.body;
    let container = document.createElement('div');
    container.className = 'jDiff-container';
    let {merge, diffMap} = jdiff(lhs, rhs);
    container.innerHTML = display(merge, diffMap);
    body.appendChild(container);
};

module.exports = appendContent;
