### json-diff-viewer
[![npm version](https://badge.fury.io/js/json-diff-viewer.svg)](https://badge.fury.io/js/json-diff-viewer)
[![Build Status](https://travis-ci.org/hongxuanlee/json-diff-viewer.svg?branch=master)](https://travis-ci.org/hongxuanlee/json-diff-viewer)
[![Coverage Status](https://coveralls.io/repos/github/hongxuanlee/json-diff-viewer/badge.svg?branch=master)](https://coveralls.io/github/hongxuanlee/json-diff-viewer?branch=master)

#### install 
```
 npm install json-diff-viewer --save
```

#### usage
`jsonViewer({ left = {}, right = {} }, selector, options)`
* {left, right} 需要diff的2个json
* selector 元素选择器，default 追加到body下
* options 
   - indent int 缩进 default 2
   - space  int 空格大小 default 5px， 

#### example
```
    const jsonViewer = require('json-diff-viewer');
    const x = [{
        a: 1,
        b: 2,
        f: {
            x: 1
        }
    }];
    const y = [{
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: {
            x: 1
        }
    }];
    jsonViewer({
        left: x,
        right: y
    });
```

#### test 
```
    npm test
```
