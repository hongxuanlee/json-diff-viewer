const expect = require('chai').expect;
const diff = require('../src/diff');

describe('diff json', () => {
    it('should merge 2 number', () => {
        let {merge, diffMap} = diff(10, 11);
        expect(merge).to.equal(10);
        expect(diffMap).to.deep.equal({type: 'edit', modify: 11 });
    });
    it('should merge number and object', () => {
        let x = {x: 1};
        let y = 11;
        let {merge, diffMap} = diff(x, y);
        expect(merge).to.deep.equal({x: 1});
        expect(diffMap).to.deep.equal({type: 'edit', modify: 11 });
    });
    it('should merge object and string', () => {
        let x = 'hello';
        let y = {x: 1};
        let {merge, diffMap} = diff(x, y);
        expect(merge).to.deep.equal('hello');
        expect(diffMap).to.deep.equal({type: 'edit', modify: {x: 1} });
    });
    it('should merge object and array', () => {
        let x = [1, 2, 3];
        let y = {x: 1};
        let {merge, diffMap} = diff(x, y);
        let res = [1, 2, 3];
        res.x = 1;
        expect(merge).to.deep.equal(res);
        expect(diffMap).to.deep.equal({ 
          '0': { type: 'delete' },
          '1': { type: 'delete' },
          '2': { type: 'delete' },
          'x': { type: 'add' } 
        });
    });
    it('should merge array and get diff path map', () => {
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
    it('should merge object', () => {
        let {left, right} = require('./feature/diff_obj1');
        let {merge, diffMap} = diff(left, right); 
        let res = require('./feature/merge_obj1');
        expect(merge).to.deep.equal(res.merge);
        expect(diffMap).to.deep.equal(res.diffMap);
    });
});



