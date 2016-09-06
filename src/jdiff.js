'use strict';
/**
 * {
 *   path: {
 *     type: add/delete/edit,
 *     modify: ''
 *   }
 * }
 * @type {Object}
 */
const _ = require('./util');

let deepEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

let diffMap = {};

let mergeJson = (left, right, root = null) => {
    let merge = {};
    if (deepEqual(left, right)) {
        return left;
    }
    let lKeys = Object.keys(left);
    let rKeys = Object.keys(right);
    lKeys.forEach(k => {
        let rItem = right[k];
        let lItem = left[k];
        let path = root ? `${root}.${k}` : k;
        if (rItem) {
            if (_.isObjorArr(rItem) && _.isObjorArr(lItem)) {
                left[k] = mergeJson(lItem, rItem, path);
            } else {
                if(lItem !== rItem) {
                    diffMap[path] = {
                        type: 'edit',
                        modify: rItem
                    };
                }
            }
        } else {
            diffMap[path] = {
                type: 'delete'
            };
        }
    });
    // add node
    let remainKeys = rKeys.filter(rk => lKeys.indexOf(rk) === -1);
    remainKeys.forEach(ak => {
        left[ak] = right[ak];
        let path = root ? `${root}.${ak}` : ak;
        diffMap[path] = {
            type: 'add'
        };
    });
    return left;
};

let run = (left, right) => {
    let merge = mergeJson(left, right);
    console.log(diffMap);
    return {
        merge,
        diffMap
    };
};

module.exports = run;