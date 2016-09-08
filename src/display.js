'use strict';
const _ = require('./util');

let SPACE = 10;

let getIndentStyle = space => `margin-left: ${space}px`;

let getColorStyle = color => {
    if(color === 'delete'){
        return 'color: red';
    }else if(color === 'add'){
        return 'color: green';
    }
};

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
    let indentStyle = getIndentStyle(curSpace);
    let style = indentStyle;
    let colorStyle = '';
    if(color){
        colorStyle = `style = "${getColorStyle(color)}"`;
        // style += ';' + colorStyle;
    }
    line = replaceIndent(line);
    let label = '&nbsp;&nbsp';
    if (color === 'add') {
        label = '+';
    } else if (color === 'delete') {
        label = '-';
    }
    return `<div ${colorStyle}><span>${label}</span><span style="${style}">${line}</span></div>`;
};

let formatObj = (k = null, obj, path, isLast = false, color = null) => {
    let deep = getDeepByPath(path);
    let stJson = JSON.stringify(obj, null, 2).split('\n');
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
    let seq = k ? `"${k}": ${v}` : `${v}`;
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
    }else{
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

let wrapJson = (json, token, style = '', k = null) => {
    let key = k ? `"${k}": ` : '';
    if (_.isArray(json)) {
        token.push(`<div><span>&nbsp;&nbsp;</span><span style="${style}">]</span></div>`);
        token.unshift(`<div><span>&nbsp;&nbsp;</span><span style="${style}">${key}[</span></div>`);
    } else if (_.isObject(json)) {
        token.push(`<div><span>&nbsp;&nbsp;</span><span style="${style}">}</span></div>`);
        token.unshift(`<div><span>&nbsp;&nbsp;</span><span style="${style}">${key}{</span></div>`);
    }
};

let run = (json, diff, options = {}) => {
    if(options.space){
        SPACE = options.space;
    }
    let tokens = display(json, diff);
    wrapJson(json, tokens);
    return tokens.join('');
};

module.exports = run;
