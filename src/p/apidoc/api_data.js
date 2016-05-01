define({ "api": [
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/address",
    "title": "获取收货地址接口",
    "name": "address",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回收货地址</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\",\n    \"data\" : {\n        \"list\" : [\n            {\n                \"address\" : \"迎宾大道锦绣香江俱乐部香江集团一楼\",\n                \"addressID\" : \"251906\",\n                \"areaID\" : \"440113\",\n                \"areaName\" : \"番禺区\",\n                \"cityID\" : \"440100\",\n                \"cityName\" : \"广州市\",\n                \"def\" : 1,\n                \"mobile\" : \"18825180292\",\n                \"name\" : \"张振胜\",\n                \"proID\" : \"440000\",\n                \"proName\" : \"广东省\",\n                \"telphone\" : \"\"\n           }\n       ]\t\n    }\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n    //后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/ad",
    "title": "加载热销单品接口",
    "name": "cart_ad",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/cash",
    "title": "获取现金券接口",
    "name": "cart_cash",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回现金券数据</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\",\n    \"data\" : {\n        \"msg\" : \"暂无可使用的优惠券\"\n    }  \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/coupon",
    "title": "获取优惠券接口",
    "name": "cart_coupon",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回优惠券数据</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\",\n    \"data\" : {\n        \"msg\" : \"暂无可使用的优惠券\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/delete/cartID",
    "title": "删除购物车接口",
    "name": "delete_cart",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/integral",
    "title": "使用积分接口",
    "name": "integral",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/setdefault/addressID",
    "title": "设置默认地址接口",
    "name": "setdefault_address",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/cart/ship/cityID",
    "title": "获取物流信息接口",
    "name": "ship",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回收货地址</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\",\n    \"data\" : {\n        \"list\" : [\n            {\n                \"name\" : \"送货上门并安装\",\n                \"price\" : 150,\n                \"shipType\" : 1\n            },\n            {\n                \"name\" : \"物流点自提\",\n                \"price\" : 24,\n                \"shipType\" : 2\n            }\n       ]\t\n    }\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n    //后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://cart.kinhom.com/update/cartID/num",
    "title": "更新购物车数量接口",
    "name": "update_itemnum",
    "group": "cart",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/cart/minilist",
    "title": "获取购物车列表接口",
    "group": "comment",
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment",
    "name": "GetHttpApiKinhomComCartMinilist"
  },
  {
    "type": "get",
    "url": "http://api.kinhom/com/login/status",
    "title": "获取登录状态接口",
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>服务器状态码,用于标示服务器状态</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>obj</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回对应登录状态的信息</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>服务器返回的状态</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"code\" : 200,                                //服务器返回200状态码\n    \"data\" : {\n         \"isLogin\"     : true,                   //已经登录\n         \"member_id\"   : \"1342227\",              //用户的ID号\n         \"member_name\" : \"wwwlinyandi@126.com\"   //用户登录名\n    },\n    \"status\" : \"succ\"                            //成功返回数据\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"code\" : 400,                              //服务器返回400状态码\n     \"data\" : {\n         \"isLogin\" : false,                     //用户未登录\n         \"msg\"     : \"暂无数据\"                  //返回提示信息\n     },\n     \"status\" : \"succ\"                          //成功返回数据\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment",
    "name": "GetHttpApiKinhomComLoginStatus"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/checkphone",
    "title": "检验手机是否已经被绑定接口",
    "name": "_member_checkphone",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "h",
            "description": "<p>安全码Val值</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "m",
            "description": "<p>安全码Key值</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示手机号码未被绑定;否则，手机已被绑定。</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": "<p>返回的安全码;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": \"\",\n     \"pin\": [8928529,4346573]\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     \"status\": \"failed\",\n     \"msg\": {\n         \"status\": \"failed\"\n     },\n     \"pin\": [7730824,8691575]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "post",
    "url": "http://api.kinhom.com/member/defauleaddress",
    "title": "设置默认收货地址接口",
    "name": "_member_defauleaddress",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "address_id",
            "description": "<p>对应地址的data-value值（省，市，区）</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示设置默认收货地址成功;否则，表示设置失败。</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": \"\",\n     \"pin\": []\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     // 后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/gette",
    "title": "获取特权图标接口",
    "name": "_member_gette",
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": {\n          \"list\": [          // 返回数组列表\n               {\n                    \"imgURL\":\"http:\\/\\/img.jjcdn.com\\/g1\\/M00\\/02\\/57\\/CvoBNFVAlzaAHiD9AAAGZKWFlfc051.png!small\",     // 图标链接\n                    \"linkURL\":\"http:\\/\\/my.kinhom.com\\/club\\/value\",                                                  // 图标跳转链接\n                    \"name\":\"\\u4f1a\\u5458\\u6298\\u6263\"                                                                 // Unicode(图标名称)\n               }\n     ]},\n     \"pin\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/sendphonecode",
    "title": "发送手机验证码接口",
    "name": "_member_sendphonecode",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p> "
          },
          {
            "group": "comment",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>4</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "h",
            "description": "<p>安全码Val值</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "m",
            "description": "<p>安全码Key值</p> "
          },
          {
            "group": "comment",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "n",
            "description": "<p>发送手机验证码次数（页面刷新后重新计算）</p> "
          },
          {
            "group": "comment",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "r",
            "description": "<p>随机码</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示验证码已发送到手机;否则，手机验证码发送失败。</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": "<p>返回的安全码;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": {\n         \"phonecode\": \"\"\n     },\n     \"pin\": [3497972,8027551]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/updatemem",
    "title": "修改昵称接口",
    "name": "_member_updatemem",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "member_nicheng",
            "description": "<p>昵称</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示修改成功;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/validateemailcode",
    "title": "检验邮箱验证码接口",
    "name": "_member_validateemailcode",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "emailcode",
            "description": "<p>邮箱验证码</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示输入的邮箱验证码正确;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": {\n             \"phonecode\": \"847005\"     // 邮箱验证码\n     },\n     \"pin\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/validateiphonecode",
    "title": "检验手机验证码接口",
    "name": "_member_validateiphonecode",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phoneNum",
            "description": "<p>手机号码</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phonecode",
            "description": "<p>手机验证码</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示输入的手机验证码正确;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": "<p>返回的安全码;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": {\n     \t\"phonecode\": \"\"\n     },\n     \"pin\": [1133224, 9901983]\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     \"status\": \"failed\",\n     \"msg\": \"\",\n     \"pin\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/validatepwd",
    "title": "检验输入的登录密码接口",
    "name": "_member_validatepwd",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "old_passwd",
            "description": "<p>登录密码值</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "{\n     \"status\": \"succ\",\n     \"data\": \"\",\n     \"pin\": []\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     \"status\": \"failed\",\n     \"msg\": \"\",\n     \"pin\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "ttp://api.kinhom.com/favorite/add/sku",
    "title": "购物车加入收藏接口",
    "name": "favorite_add",
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示发送成功，&quot;failed&quot;表示发送失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回数据</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : {\n         \"status\" : \"succ\",\n         \"msg\" : \"收藏成功\"\n     }\n }",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : {\n         \"status\" : \"succ\",\n         \"msg\" : \"您已收藏了此商品\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/region/area/:parent_id",
    "title": "获取区/县列表接口",
    "name": "region_area",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "parent_id",
            "description": "<p>城市ID,作为区/县列表的父ID</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_id",
            "description": "<p>区/县ID号</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父ID号,为城市ID号</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_name",
            "description": "<p>区/县名称</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_type",
            "description": "<p>类型,1为获取省份列表,2为获取城市列表,3为获取区/县列表</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "获取成功:",
          "content": "[\n     {\n         \"region_id\"   : \"440106\",      //区/县ID\n         \"parent_id\"   : \"440100\",      //城市ID,作为区/县列表父ID\n         \"region_name\" : \"天河区\",       //区/县名称\n         \"region_type\" : \"3\"            //获取列表类型,1为省份,2为城市,3为区/县\n     }\n]",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "\n[ ]  //返回空数组",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/region/city/:parent_id",
    "title": "获取城市列表接口",
    "name": "region_city",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "parent_id",
            "description": "<p>省份ID,作为城市列表的父ID</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_id",
            "description": "<p>城市ID号</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父ID号,为省份ID号</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_name",
            "description": "<p>城市名称</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_type",
            "description": "<p>类型,1为获取省份列表,2为获取城市列表,3为获取区/县列表</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "获取成功:",
          "content": "[\n     {\n         \"region_id\"   : \"440100\",      //城市ID\n         \"parent_id\"   : \"440000\",      //省份ID,作为城市列表父ID\n         \"region_name\" : \"广州市\",       //城市名称\n         \"region_type\" : \"2\"            //获取列表类型,1为省份,2为城市,3为区/县\n     }\n]",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "\n[ ]  //返回空数组",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/region/pro",
    "title": "获取省份列表接口",
    "name": "region_pro",
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_id",
            "description": "<p>省份ID号</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父ID号,获取省份时默认为100000,不变.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_name",
            "description": "<p>省份名称</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "region_type",
            "description": "<p>类型,1为获取省份列表,2为获取城市列表,3为获取区/县列表</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "获取成功:",
          "content": "[\n     {\n         \"region_id\"   : \"440000\",      //省份ID\n         \"parent_id\"   : \"100000\",      //父ID\n         \"region_name\" : \"广东省\",       //省份名称\n         \"region_type\" : \"1\"            //获取列表类型,1为省份,2为城市,3为区/县\n     }\n]",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "\n[ ]  //返回空数组",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/sendphonecode",
    "title": "发送短信验证码接口",
    "name": "sendphonecode",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "h",
            "description": "<p>安全码的值</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "m",
            "description": "<p>安全码的名</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "n",
            "description": "<p>发送验证码的次数</p> "
          },
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "r",
            "description": "<p>随机数</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示发送成功，&quot;failed&quot;表示发送失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据，如status状态为succ返回正确的数据</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的数据，如status状态为failed返回错误的信息</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>array</p> ",
            "optional": false,
            "field": "pin",
            "description": "<p>返回的数据</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\",\n    \"data\" : {\n        \"phonecode\" : \"\"\n    },\n    \"pin\" : [8292879,4273622]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\",\n    \"msg\" : \"rekey有误\",\n    \"pin\" : []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/sendphonecode",
    "title": "发送短信验证码接口",
    "name": "sendphonecode",
    "group": "comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "h",
            "description": "<p>安全码的值</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "m",
            "description": "<p>安全码的名</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "n",
            "description": "<p>发送验证码的次数</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "r",
            "description": "<p>随机数</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示发送成功，&quot;failed&quot;表示发送失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>object</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据，如status状态为succ返回正确的数据</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的数据，如status状态为failed返回错误的信息</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>array</p> ",
            "optional": false,
            "field": "pin",
            "description": "<p>返回的数据，表示</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\",\n    \"data\" : {\n        \"phonecode\" : \"\"\n    },\n    \"pin\" : [8292879,4273622]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\",\n    \"msg\" : \"rekey有误\",\n    \"pin\" : []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com//member/validateiphonecode",
    "title": "验证短信验证码接口",
    "name": "validateiphonecode",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phonecode",
            "description": "<p>手机短信验证码</p> "
          }
        ]
      }
    },
    "group": "comment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示发送成功，&quot;failed&quot;表示发送失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    //后续补充\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    //后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "comment"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/comments/:sku",
    "title": "获取商品评论接口",
    "name": "comments",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>对应商品的sku ID号</p> "
          },
          {
            "group": "item",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>要获取评论的类型,全部--all,好评--goods,中评--normal,差评--bad</p> "
          },
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "curPage",
            "description": "<p>当前页码,默认为1</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   :  {\n         \"curPage\" : 1,   //当前页数\n         \"list\" : [\n                 {\n                     \"buyer\"     : \"0******13\",                                               //购买者\n                     \"content\"   : \"服务号,物流配送及时,赞一个!\",                                //评论内容\n                     \"imgURL\"    :  \"//misc.jjcdn.com/p/images/default_user_portrait.gif\",    //用户头像\n                     \"time\"      : \"2015-11-08 19:51:00\"                                      //购买时间\n                 }\n             ],\n         \"pages\" : 77     //总页数\n     }\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/congeneric/:sku",
    "title": "获取同类推荐数据",
    "name": "congeneric",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>对应商品的sku ID号</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   :  [        //返回数组列表\n         {\n             \"imgURL\"     : \"//img0.jjcdn.com/...\",         //商品图片链接\n             \"linkURL\"    : \"//item.kinhom.com/332.html\",   //商品链接\n             \"saleNum\"    :  \"1\",                           //购买数量\n             \"salePrice\"  : \"1599.00\",                      //购买时间\n             \"skuId\"      : \"443\",                          //商品sku\n             \"storePrice\" : \"5100.00\",                      //市场价\n             \"title\"      : \"商品标题\"                       //商品标题\n         }\n     ]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/recommend/getyoulike",
    "title": "获取猜你喜欢数据",
    "name": "getyoulike",
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : [                                           //返回数组列表\n         {\n             \"commentNum\" : \"611\",                          //商品评论数量\n             \"title\"      : \"标题\",                         //商品标题\n             \"linkURL\"    : \"//item.kinhom.com/149.html\",  //商品链接\n             \"imgURL\"     :  \"img0.jjcdn.com/...\",         //商品图片链接\n             \"salePrice\"  : \"1599.00\",                     //商品售价\n             \"saleNum\"    : \"34182\"                        //商品销售数量\n         }\n     ]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/rank",
    "title": "获取热销排行榜数据",
    "name": "rank",
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : [                                           //返回数组列表\n         {\n             \"title\"      : \"标题\",                         //商品标题\n             \"linkURL\"    : \"//item.kinhom.com/149.html\",  //商品链接\n             \"imgURL\"     :  \"img0.jjcdn.com/...\",         //商品图片链接\n             \"salePrice\"  : \"1599.00\",                     //商品售价\n             \"saleNum\"    : \"34182\"                        //商品销售数量\n         }\n     ]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/relevance/sku",
    "title": "获取人气搭配数据",
    "name": "relevance",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>对应商品的sku ID号</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   :  [        //返回数组列表\n         {\n             \"imgURL\"     : \"//img0.jjcdn.com/...\",         //商品图片链接\n             \"linkURL\"    : \"//item.kinhom.com/332.html\",   //商品链接\n             \"saleNum\"    :  \"1\",                           //购买数量\n             \"salePrice\"  : \"1599.00\",                      //购买时间\n             \"skuId\"      : \"443\",                          //商品sku\n             \"storePrice\" : \"5100.00\",                      //市场价\n             \"title\"      : \"商品标题\"                       //商品标题\n         }\n     ]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/salelog/:sku",
    "title": "获取成交记录数据",
    "name": "salelog",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>对应商品的sku ID号</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : {\n         \"list\" : [                                  //返回数组列表\n             {\n                 \"buyer\"    : \"153*****564\",         //购买者\n                 \"title\"    : \"商品标题\",             //商品标题\n                 \"num\"      :  \"1\",                  //购买数量\n                 \"time\"     : \"2015-11-19 21:50:09\"  //购买时间\n             }\n         ],\n         \"curPage\" : \"1\",      //当前页\n         \"pages\"   : \"2282\"    //总页数\n     }\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : {\n         \"list\" : []  //返回空数组\n     }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/ship/:sku",
    "title": "获取对应商品的物流信息",
    "name": "ship",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>商品sku ID号</p> "
          },
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "regionId",
            "description": "<p>城市ID号</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : {\n         \"list\"   : [\n             {\n                 \"name\"   : \"物流点自提\",\n                 \"price\"  : 0\n             },\n             {\n                 \"name\"   : \"送货上门并安装\",\n                 \"price\"  : 1\n             }\n         ]\n     }\n }",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : {\n         \"list\" : []\n     }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/static/:sku",
    "title": "获取成交数量、评论数量",
    "name": "static",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>商品sku ID号</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : {\n         \"commentsTotal\"   : \"500\",    //全部评论数量\n         \"comGoodTotal\"    : \"500\",    //好评数\n         \"comNormalTotal\"  : \"1\",      //中评数\n         \"comBadTotal\"     : \"0\",      //差评数\n         \"bidTotal\"        : \"17343\"   //成交记录\n     }\n }",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/stock/:sku",
    "title": "获取对应商品的库存",
    "name": "stock",
    "parameter": {
      "fields": {
        "item": [
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "sku",
            "description": "<p>商品sku ID号</p> "
          },
          {
            "group": "item",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "regionId",
            "description": "<p>城市ID号</p> "
          }
        ]
      }
    },
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : {\n         \"name\"   : \"仅剩2件\",    //提示文字\n         \"sell\"   : true,        //是否可售\n         \"stock\"  : \"2\",         //库存数量\n     }\n }",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "get",
    "url": "http://item.kinhom.com/viewed",
    "title": "获取历史浏览数据",
    "name": "viewed",
    "group": "item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;failed表示获取失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功 :",
          "content": "{\n     \"status\" : \"succ\",\n     \"data\"   : [                                           //返回数组列表\n         {\n             \"title\"      : \"标题\",                         //商品标题\n             \"linkURL\"    : \"//item.kinhom.com/149.html\",  //商品链接\n             \"imgURL\"     :  \"img0.jjcdn.com/...\",         //商品图片链接\n             \"salePrice\"  : \"1599.00\",                     //商品售价\n             \"saleNum\"    : \"34182\"                        //商品销售数量\n         }\n     ]\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n     \"status\" : \"failed\",\n     \"data\"   : []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "item"
  },
  {
    "type": "post",
    "url": "http://www.kinhom.com/index/sendofflineaddress",
    "title": "发送体验馆地址接口",
    "name": "sendofflineaddress",
    "parameter": {
      "fields": {
        "offline": [
          {
            "group": "offline",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phone",
            "description": "<p>手机</p> "
          },
          {
            "group": "offline",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>地址信息ID</p> "
          },
          {
            "group": "offline",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>手机验证码</p> "
          }
        ]
      }
    },
    "group": "offline",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示发送成功，&quot;failed&quot;表示发送失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "offline"
  },
  {
    "type": "post",
    "url": "http://passport.kinhom.com/passport/index",
    "title": "验证用户名与密码接口",
    "name": "index",
    "group": "passport",
    "parameter": {
      "fields": {
        "passport": [
          {
            "group": "passport",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p> "
          },
          {
            "group": "passport",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>返回操作的状态，200表示用户名或密码正确，400表示用户名或密码不正确</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "url",
            "description": "<p>如果code为200，则url表示要跳转的链接</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "msg",
            "description": "<p>如果code为400，则msg表示登录错误的信息</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"code\" : \"200\",\n    \"url\" : \"http://passport.kinhom.com/\"    //要跳转的链接\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"code\" : \"400\",\n    \"msg\" : \"用户名或密码不正确\"    //登录错误的信息\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "passport"
  },
  {
    "type": "get",
    "url": "http://pay.kinhom.com/order_status",
    "title": "微信支付轮询接口",
    "name": "order_status",
    "group": "pay",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态，&quot;succ&quot;表示提交成功，&quot;failed&quot;表示提交失败</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"status\" : \"succ\"\n    //后续补充\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"status\" : \"failed\"\n    //后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "pay"
  },
  {
    "type": "post",
    "url": "http://www.kinhom.com/articles/index",
    "title": "提交问题接口",
    "name": "askindex",
    "parameter": {
      "fields": {
        "seoask": [
          {
            "group": "seoask",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "m",
            "description": "<p>判断是否为提问页面，值为zxask</p> "
          },
          {
            "group": "seoask",
            "type": "<p>stirng</p> ",
            "optional": false,
            "field": "q",
            "description": "<p>判断是否为提问页面，值为question</p> "
          },
          {
            "group": "seoask",
            "type": "<p>stirng</p> ",
            "optional": false,
            "field": "question",
            "description": "<p>问题标题</p> "
          },
          {
            "group": "seoask",
            "type": "<p>stirng</p> ",
            "optional": false,
            "field": "content",
            "description": "<p>问题内容</p> "
          },
          {
            "group": "seoask",
            "type": "<p>stirng</p> ",
            "optional": false,
            "field": "chk",
            "description": "<p>是否选中匿名框</p> "
          }
        ]
      }
    },
    "group": "seoask",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "code",
            "description": "<p>返回操作的状态，&quot;&quot;表示提交成功，&quot;400&quot;表示提交失败</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的信息</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "url",
            "description": "<p>返回的信息，要跳转的链接</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功:",
          "content": "{\n    \"code\" : \"200\",\n    \"msg\" : \"操作成功\",\n    \"url\" : \"http://www.kinhom.com/articles/ask/ask-668236.html\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败:",
          "content": "{\n    \"code\" : \"400\",\n    \"msg\" : \"请先登录\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "seoask"
  },
  {
    "type": "get",
    "url": "http://api.kinhom.com/member/sendemailcode",
    "title": "发送邮箱验证码接口",
    "name": "_member_sendemailcode",
    "parameter": {
      "fields": {
        "comment": [
          {
            "group": "comment",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱地址</p> "
          },
          {
            "group": "comment",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>3</p> "
          }
        ]
      }
    },
    "group": "user_account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示发送邮箱验证码成功;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "pin",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": {\n             \"emailcode\": \"\"\n     },\n     \"pin\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_account"
  },
  {
    "type": "post",
    "url": "http://my.kinhom.com/user/bindinfo",
    "title": "修改用户邮箱信息接口",
    "name": "_user_bindinfo",
    "parameter": {
      "fields": {
        "user/account": [
          {
            "group": "user/account",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>修改类型,email为修改邮箱</p> "
          },
          {
            "group": "user/account",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "val",
            "description": "<p>邮箱地址</p> "
          }
        ]
      }
    },
    "group": "user_account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示修改用户邮箱信息成功;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_account"
  },
  {
    "type": "post",
    "url": "http://my.kinhom.com/user/bindinfo",
    "title": "修改用户手机信息接口",
    "name": "_user_bindinfo",
    "parameter": {
      "fields": {
        "user/account": [
          {
            "group": "user/account",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>修改类型,phone为修改手机</p> "
          },
          {
            "group": "user/account",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "val",
            "description": "<p>手机号码</p> "
          }
        ]
      }
    },
    "group": "user_account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示修改用户手机信息成功;否则失败。</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据;1 代表手机已经被绑定过;2 代表修改/设置手机失败。</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": \"\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     \"status\": \"\",\n     \"data\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_account"
  },
  {
    "type": "post",
    "url": "http://my.kinhom.com/user/updatemem",
    "title": "提交修改登录密码表单接口",
    "name": "_user_updatemem",
    "parameter": {
      "fields": {
        "user/account": [
          {
            "group": "user/account",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "old_passwd",
            "description": "<p>原登录密码</p> "
          },
          {
            "group": "user/account",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "new_passwd",
            "description": "<p>新登录密码</p> "
          },
          {
            "group": "user/account",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "confirmNewPass",
            "description": "<p>再次确认新密码</p> "
          }
        ]
      }
    },
    "group": "user_account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,success表示提交表单成功;</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据。data[&quot;code&quot;]分别代表：1 代表参数错误;2 代表尚未登录;3 代表原密码错误;4 代表两次输入密码不一致;5 代表新密码不符合规则;6 代表修改失败;200 代表修改成功;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\",\n     \"data\": [\n             \"code\": 1    // 返回的code\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_account"
  },
  {
    "type": "post",
    "url": "http://my.kinhom.com/user/presellorderinfo",
    "title": "获取预售信息",
    "name": "_user_presellorderinfo",
    "parameter": {
      "fields": {
        "user/orderlist": [
          {
            "group": "user/orderlist",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "order_id",
            "description": "<p>对应订单的order ID号</p> "
          },
          {
            "group": "user/orderlist",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p> "
          },
          {
            "group": "user/orderlist",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "pro_id",
            "description": "<p>当前页码,默认为1</p> "
          }
        ]
      }
    },
    "group": "user_orderlist",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取成功;</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "{\n     \"status\" : \"succ\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_orderlist"
  },
  {
    "type": "get",
    "url": "http://my.kinhom.com/app/?app=upload&class=ajaxUpload",
    "title": "退款凭证上传图片接口",
    "name": "app_app_upload_class_ajaxUpload",
    "group": "user_refund_______",
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_refund_______"
  },
  {
    "type": "post",
    "url": "http://my.kinhom.com/user/api/cancelApply.php",
    "title": "取消退款申请，获取状态接口",
    "name": "api_cancelApply",
    "parameter": {
      "fields": {
        "api/cancelApply": [
          {
            "group": "api/cancelApply",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>&quot;123&quot;</p> "
          }
        ]
      }
    },
    "group": "user_refund",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示取消退款申请成功;否则，表示取消退款申请失败。</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     // 后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_refund"
  },
  {
    "type": "post",
    "url": "http://my.kinhom.com/user/api/getRefundDetail.php",
    "title": "获取对应的退款单详情接口",
    "name": "api_getRefundDetail",
    "parameter": {
      "fields": {
        "api/getRefundDetail": [
          {
            "group": "api/getRefundDetail",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>&quot;14&quot;</p> "
          }
        ]
      }
    },
    "group": "user_refund",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "status",
            "description": "<p>返回操作的状态,succ表示获取退款单详情成功;否则，表示获取失败。</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功",
          "content": "\n{\n     \"status\": \"succ\"\n}",
          "type": "json"
        },
        {
          "title": "返回失败",
          "content": "{\n     // 后续补充\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apidoc/src/api.js",
    "groupTitle": "user_refund"
  }
] });