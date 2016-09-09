let x = {
    errorNo: 0,
    errorMsg: '',
    result: {
        hashKey: '4940d2b69a2a7229',
        shopInfo: [{
            shopId: 1,
            shopName: 'shop1'
        }, {
            shopId: 2,
            shopName: 'shop2'
        }, {
            shopId: 3,
            shopName: 'shop3'
        }, {
            shopId: 4,
            shopName: 'shop4'
        }]
    },
    recallInfo: {   
        lat: '3518664.57',
        lng: '13361823.09',
        address: '\u963f\u91cc\u5df4\u5df4\u897f\u6eaa\u56ed\u533a'
    }
};
let y = {
    errorNo: 0,
    errorMsg: 'error',
    result: {
        hashKey: '4940d2b69a2a7229',
        shopInfo: [{
            shopId: 3,
            shopName: 'shop3'
        }, {
            shopId: 4,
            shopName: 'shop4'
        }, {
            shopId: 5,
            shopName: 'shop5'
        }, {
            shopId: 6,
            shopName: 'shop6'
        }]
    },
    recallInfo: {
        lat: '3521187',
        lng: '13361823.09',
        address: '\u963f\u91cc\u5df4\u5df4\u897f\u6eaa\u56ed\u533a'
    }
};

module.exports = {
    left: x,
    right: y
};
