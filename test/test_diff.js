const expect = require('chai').expect;
const diff = require('../src/diff');

describe('diff json', () => {
    it('should merge 2 number', () => {
        let x = 10;
        let y = 11;
        let {merge, diffMap} = diff(10, 11);
        expect(merge).to.equal(10);
        expect(diffMap).to.deep.equal({type: 'edit', modify: 11 });
    });
    it('should merge json and get diff path map', () => {
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
        let {merge, diffMap} = diff(x, y);
        expect(diffMap).to.deep.equal({
            '0.f': {type: 'delete'},
            '0.c': {type: 'add'},
            '0.d': {type: 'add'},
            '0.e': {type: 'add'} 
        });
        expect(merge).to.deep.equal([{
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
        }]);
    });
});



