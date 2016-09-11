'use strict';

const jsonViewer = require('../index');

let lhs = {
    name: 'my object',
    description: 'it\'s an object!',
    details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'elements']
    }
};

let rhs = {
    name: 'updated object',
    description: 'it\'s an object!',
    details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'more', 'elements', {
            than: 'before'
        }]
    }
};

let x = [{
    a: 1,
    b: 2,
    f: {
        x: 1
    }
}];
let y = [{
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
        x: 1
    }
}];

let {left, right} = require('../test/feature/diff_obj1');
let res = jsonViewer({
    left: left,
    right: right
});

let body = document.body;
body.appendChild(res);




