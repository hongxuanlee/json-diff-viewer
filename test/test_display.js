const expect = require('chai').expect;
const display = require('../src/display');

describe('diff display', () => {
    it('should get display option', () => {
        let merge = {
            a: 1,
            b: {
              c: 1
            }
        };
        let diffMap = {
            'b': {
                type: 'add'
            }
        };
        let tokens = display(merge, diffMap, {
            space: 5,
            indent: 4
        });
        let res = ['<div><span>&nbsp;&nbsp;</span><span style="">{</span></div>',
                      '<div ><span>&nbsp;&nbsp</span><span style="margin-left: 20px">"a": 1,</span></div>',
                      '<div style = "color: green"><span>+</span><span style="margin-left: 20px">"b" : {</span></div>',
                      '<div style = "color: green"><span>+</span><span style="margin-left: 40px">"c": 1</span></div>',
                      '<div style = "color: green"><span>+</span><span style="margin-left: 20px">}</span></div>',
                      '<div><span>&nbsp;&nbsp;</span><span style="">}</span></div>' ];
        expect(tokens).to.deep.equal(res);
    });
    it('should get display tokens1', () => {
        let merge = [{
            'a': 1,
            'b': 2,
            'f': {
                'x': 1
            },
            'c': 3,
            'd': 4,
            'e': {
                'x': 1
            }
        }];
        let diffMap = {
            '0.f': {
                type: 'delete'
            },
            '0.c': {
                type: 'add'
            },
            '0.d': {
                type: 'add'
            },
            '0.e': {
                type: 'add'
            }
        };
        let tokens = display(merge, diffMap);
        let results = ['<div><span>&nbsp;&nbsp;</span><span style="">[</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 20px">{</span></div>',
            '<div ><span>&nbsp;&nbsp</span><span style="margin-left: 40px">"a": 1,</span></div>',
            '<div ><span>&nbsp;&nbsp</span><span style="margin-left: 40px">"b": 2,</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 40px">"f" : {</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 60px">"x": 1</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 40px">},</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 40px">"c": 3,</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 40px">"d": 4,</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 40px">"e" : {</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 60px">"x": 1</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 40px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 20px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="">]</span></div>'
        ];
        expect(tokens).to.deep.equal(results);
    });
    it('should get display tokens2', () => {
        let {
            merge,
            diffMap
        } = require('./feature/merge_obj1');
        let tokens = display(merge, diffMap);
        let results = ['<div><span>&nbsp;&nbsp;</span><span style="">{</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 20px">"errorNo": 0,</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 20px">"errorMsg": "",</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 20px">"errorMsg": "error",</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 20px">"result": {</span></div>',
            '<div ><span>&nbsp;&nbsp</span><span style="margin-left: 40px">"hashKey": "4940d2b69a2a7229",</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 40px">"shopInfo": [</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">{</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopId": 1,</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopId": 3,</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopName": "shop1"</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopName": "shop3"</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">{</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopId": 2,</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopId": 4,</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopName": "shop2"</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopName": "shop4"</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">{</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopId": 3,</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopId": 5,</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopName": "shop3"</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopName": "shop5"</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">{</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopId": 4,</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopId": 6,</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 80px">"shopName": "shop4"</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 80px">"shopName": "shop6"</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 60px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 40px">]</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 20px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 20px">"recallInfo": {</span></div>',
            '<div style = "color: red"><span>-</span><span style="margin-left: 40px">"lat": "3518664.57",</span></div>',
            '<div style = "color: green"><span>+</span><span style="margin-left: 40px">"lat": "3521187",</span></div>',
            '<div ><span>&nbsp;&nbsp</span><span style="margin-left: 40px">"lng": "13361823.09",</span></div>',
            '<div ><span>&nbsp;&nbsp</span><span style="margin-left: 40px">"address": "阿里巴巴西溪园区"</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="margin-left: 20px">}</span></div>',
            '<div><span>&nbsp;&nbsp;</span><span style="">}</span></div>'
        ];
        expect(tokens).to.deep.equal(results);
    });
});
