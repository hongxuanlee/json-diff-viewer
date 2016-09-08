'use strict';

const jsonViewer = require('../index');

var lhs = {
    name: 'my object',
    description: 'it\'s an object!',
    details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'elements']
    }
};

var rhs = {
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

jsonViewer({
    left: lhs,
    right: rhs
});


