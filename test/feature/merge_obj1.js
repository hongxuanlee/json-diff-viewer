let diffMap = {
    errorNo: {
        type: 'delete'
    },
    errorMsg: {
        type: 'edit',
        modify: 'error'
    },
    'result.shopInfo.0.shopId': {
        type: 'edit',
        modify: 3
    },
    'result.shopInfo.0.shopName': {
        type: 'edit',
        modify: 'shop3'
    },
    'result.shopInfo.1.shopId': {
        type: 'edit',
        modify: 4
    },
    'result.shopInfo.1.shopName': {
        type: 'edit',
        modify: 'shop4'
    },
    'result.shopInfo.2.shopId': {
        type: 'edit',
        modify: 5
    },
    'result.shopInfo.2.shopName': {
        type: 'edit',
        modify: 'shop5'
    },
    'result.shopInfo.3.shopId': {
        type: 'edit',
        modify: 6
    },
    'result.shopInfo.3.shopName': {
        type: 'edit',
        modify: 'shop6'
    },
    'recallInfo.lat': {
        type: 'edit',
        modify: '3521187'
    }
};

let merge = {
  "errorNo": 0,
  "errorMsg": "",
  "result": {
    "hashKey": "4940d2b69a2a7229",
    "shopInfo": [
      {
        "shopId": 1,
        "shopName": "shop1"
      },
      {
        "shopId": 2,
        "shopName": "shop2"
      },
      {
        "shopId": 3,
        "shopName": "shop3"
      },
      {
        "shopId": 4,
        "shopName": "shop4"
      }
    ]
  },
  "recallInfo": {
    "lat": "3518664.57",
    "lng": "13361823.09",
    "address": "阿里巴巴西溪园区"
  }
};

module.exports = {
    diffMap,
    merge
};
