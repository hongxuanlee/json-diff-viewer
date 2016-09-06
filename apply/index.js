require("../src/style/main.css");
// const diff = require('./diff');

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

jsonViewer(lhs, rhs);


