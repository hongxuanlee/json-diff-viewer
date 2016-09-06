'use strict';
const _ = require('./util');

const SPACE = 2;

let getIndentStyle = space => 'indent-' + space;

let getDeepByPath = path => path.split('.').length + 1;

let matchPrefix = (paths, path) => {
    let matchPath = [];
    for (let i = 0; i < paths.length; i++) {
        let p = paths[i];
        let regpath = path.replace('.', '\.');
        let reg = new RegExp(`^${regpath}`);
        if (reg.test(p)) {
            return true;
        }
    }
    return false;
};

let getStringifyIndent = str => {
    let match = str.match(/^(\s*)\S*/);
    if (match) {
        return match[1].length;
    }
    return 0;
};

let replaceIndent = str => {
    return str.replace(/^(\s*)/, '');
};

let htmlLine = (line, deep, color) => {
    let curSpace = deep * SPACE + getStringifyIndent(line);
    let style = getIndentStyle(curSpace);
    style = color ? `${style} ${color}` : style;
    line = replaceIndent(line);
    let label = '';
    if (color === 'add') {
        label = '+';
    } else if (color === 'delete') {
        label = '-';
    }
    return `<span class="${style}">${label} ${line}</span>`;
};

let formatObj = (k = null, obj, path, isLast = false, color = null) => {
    let deep = getDeepByPath(path);
    let stJson = JSON.stringify(obj, null, SPACE).split('\n');
    if (k) {
        let label = stJson[0];
        stJson[0] = `"${k}" : ${label}`;
    }
    if (!isLast) {
        let endLine = stJson.length - 1;
        stJson[endLine] = stJson[endLine] + ',';
    }
    return stJson.map(item => htmlLine(item, deep, color));
};

let formatStr = (k, val, path, isLast = false, color = null) => {
    let deep = getDeepByPath(path);
    let v = _.isNumber(val) ? val : `\"${val}\"`;
    if (!isLast) {
        v = v + ',';
    }
    let seq = k ? `${k}: ${v}` : `${v}`;
    return htmlLine(seq, deep, color);
};

let format = (k, val, path, isLast, color = null) => {
    // avoid array key
    if (!isNaN(k)) {
        k = null;
    }
    if (_.isObjorArr(val)) {
        return formatObj(k, val, path, isLast, color);
    } else {
        return [formatStr(k, val, path, isLast, color)];
    }
};

let formatDiff = (diffItem, k, val, path, isLast) => {
    let type = diffItem.type;
    if (type === 'add') {
        return format(k, val, path, isLast, 'add');
    } else if (type === 'delete') {
        return format(k, val, path, isLast, 'delete');
    } else if (type === 'edit') {
        let modify = diffItem.modify;
        return format(k, val, path, isLast, 'delete').concat(format(k, modify, path, isLast, 'add'));
    }
};

let findDiff = (diff, k, val, path, isLast) => {
    if (diff[path]) {
        return formatDiff(diff[path], k, val, path, isLast);
    } else {
        let deep = getDeepByPath(path);
        let style = getIndentStyle(deep * SPACE);
        let tokens = display(val, diff, path);
        if (!isNaN(k)) {
            k = null;
        }
        wrapJson(val, tokens, style, k);
        return tokens;
    }
};

let display = (json, diff, root = null) => {
    let tokens = [];
    let keys = Object.keys(json);
    let paths = Object.keys(diff);
    keys.forEach((k, idx) => {
        let val = json[k];
        let path = root ? `${root}.${k}` : k;
        let isLast = idx === keys.length - 1;
        let token;
        if (matchPrefix(paths, path)) {
            token = findDiff(diff, k, val, path, isLast);
        } else {
            token = format(k, val, path, isLast);
        }
        [].push.apply(tokens, token);
    });
    return tokens;
};

let wrapJson = (json, token, className = '', k = null) => {
    let key = k ? `${k}: ` : '';
    if (_.isArray(json)) {
        token.push(`<span class="${className}">]</span>`);
        token.unshift(`<span class="${className}">${key}[</span>`);
    } else if (_.isObject(json)) {
        token.push(`<span class="${className}">}</span>`);
        token.unshift(`<span class="${className}">${key}{</span>`);
    }
};

let run = (json, diff) => {
    let tokens = display(json, diff);
    wrapJson(json, tokens);
    return tokens.join('');
};

module.exports = run;