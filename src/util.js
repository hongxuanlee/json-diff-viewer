'use strict';

const _ = {};

_.isArray = arr => Array.isArray(arr);

_.isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

_.isObjorArr = val => _.isArray(val) || _.isObject(val);

_.isNumber = num => typeof num === 'number';

module.exports = _;
