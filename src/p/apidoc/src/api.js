/**
 * Created by landy on 15/11/23.
 * PC官网api接口汇总
 */

/* ======================================================================
 全站通用接口api
 ====================================================================== */
/**
 * @api {get} http://api.kinhom.com/region/pro 获取省份列表接口
 * @apiName region_pro
 * @apiGroup comment
 * @apiSuccess {string} region_id 省份ID号
 * @apiSuccess {string} parent_id 父ID号,获取省份时默认为100000,不变.
 * @apiSuccess {string} region_name 省份名称
 * @apiSuccess {string} region_type 类型,1为获取省份列表,2为获取城市列表,3为获取区/县列表
 * @apiSuccessExample {json} 获取成功:
 * [
 *      {
 *          "region_id"   : "440000",      //省份ID
 *          "parent_id"   : "100000",      //父ID
 *          "region_name" : "广东省",       //省份名称
 *          "region_type" : "1"            //获取列表类型,1为省份,2为城市,3为区/县
 *      }
 * ]
 * @apiSuccessExample {json} 返回失败:
 *
 * [ ]  //返回空数组
 *
 */

/**
 * @api {get} http://api.kinhom.com/region/city/:parent_id 获取城市列表接口
 * @apiName region_city
 * @apiParam (comment) {string} parent_id 省份ID,作为城市列表的父ID
 * @apiGroup comment
 * @apiSuccess {string} region_id 城市ID号
 * @apiSuccess {string} parent_id 父ID号,为省份ID号
 * @apiSuccess {string} region_name 城市名称
 * @apiSuccess {string} region_type 类型,1为获取省份列表,2为获取城市列表,3为获取区/县列表
 * @apiSuccessExample {json} 获取成功:
 * [
 *      {
 *          "region_id"   : "440100",      //城市ID
 *          "parent_id"   : "440000",      //省份ID,作为城市列表父ID
 *          "region_name" : "广州市",       //城市名称
 *          "region_type" : "2"            //获取列表类型,1为省份,2为城市,3为区/县
 *      }
 * ]
 * @apiSuccessExample {json} 返回失败:
 *
 * [ ]  //返回空数组
 *
 */

/**
 * @api {get} http://api.kinhom.com/region/area/:parent_id 获取区/县列表接口
 * @apiName region_area
 * @apiParam (comment) {string} parent_id 城市ID,作为区/县列表的父ID
 * @apiGroup comment
 * @apiSuccess {string} region_id 区/县ID号
 * @apiSuccess {string} parent_id 父ID号,为城市ID号
 * @apiSuccess {string} region_name 区/县名称
 * @apiSuccess {string} region_type 类型,1为获取省份列表,2为获取城市列表,3为获取区/县列表
 * @apiSuccessExample {json} 获取成功:
 * [
 *      {
 *          "region_id"   : "440106",      //区/县ID
 *          "parent_id"   : "440100",      //城市ID,作为区/县列表父ID
 *          "region_name" : "天河区",       //区/县名称
 *          "region_type" : "3"            //获取列表类型,1为省份,2为城市,3为区/县
 *      }
 * ]
 * @apiSuccessExample {json} 返回失败:
 *
 * [ ]  //返回空数组
 *
 */

/**
 * @api {get} http://api.kinhom.com/cart/minilist 获取购物车列表接口
 * @apiGroup comment
 *
 *
 */

/**
 * @api {get} http://api.kinhom/com/login/status 获取登录状态接口
 * @apiGroup comment
 * @apiSuccess {string} code   服务器状态码,用于标示服务器状态
 * @apiSuccess {obj}    data   返回对应登录状态的信息
 * @apiSuccess {string} status 服务器返回的状态
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "code" : 200,                                //服务器返回200状态码
 *     "data" : {
 *          "isLogin"     : true,                   //已经登录
 *          "member_id"   : "1342227",              //用户的ID号
 *          "member_name" : "wwwlinyandi@126.com"   //用户登录名
 *     },
 *     "status" : "succ"                            //成功返回数据
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "code" : 400,                              //服务器返回400状态码
 *      "data" : {
 *          "isLogin" : false,                     //用户未登录
 *          "msg"     : "暂无数据"                  //返回提示信息
 *      },
 *      "status" : "succ"                          //成功返回数据
 * }
 */

/**
 * Added by zhangzhensheng on 2015-11-26
 * PC官网api接口汇总
 */

/**
 * @api {get} http://api.kinhom.com/member/sendphonecode 发送短信验证码接口
 * @apiName sendphonecode
 * @apiGroup comment
 * @apiParam {string} phone 手机号码
 * @apiParam {string} h 安全码的值
 * @apiParam {string} m 安全码的名
 * @apiParam {string} n 发送验证码的次数
 * @apiParam {string} r 随机数
 * @apiSuccess {string} status 返回操作的状态，"succ"表示发送成功，"failed"表示发送失败
 * @apiSuccess {object} data 返回的数据，如status状态为succ返回正确的数据
 * @apiSuccess {string} msg 返回的数据，如status状态为failed返回错误的信息
 * @apiSuccess {array} pin 返回的数据，表示
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ",
 *     "data" : {
 *         "phonecode" : ""
 *     },
 *     "pin" : [8292879,4273622]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed",
 *     "msg" : "rekey有误",
 *     "pin" : []
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/sendphonecode 发送短信验证码接口
 * @apiName sendphonecode
 * @apiParam (comment) {string} phone 手机号码
 * @apiParam (comment) {string} h 安全码的值
 * @apiParam (comment) {string} m 安全码的名
 * @apiParam (comment) {string} n 发送验证码的次数
 * @apiParam (comment) {string} r 随机数
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态，"succ"表示发送成功，"failed"表示发送失败
 * @apiSuccess {object} data 返回的数据，如status状态为succ返回正确的数据
 * @apiSuccess {string} msg 返回的数据，如status状态为failed返回错误的信息
 * @apiSuccess {array} pin 返回的数据
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ",
 *     "data" : {
 *         "phonecode" : ""
 *     },
 *     "pin" : [8292879,4273622]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed",
 *     "msg" : "rekey有误",
 *     "pin" : []
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/validateiphonecode 验证短信验证码接口
 * @apiName validateiphonecode
 * @apiParam (comment) {string} phonecode 手机短信验证码
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态，"succ"表示发送成功，"failed"表示发送失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     //后续补充
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     //后续补充
 * }
 */

/**
 * @api {get} ttp://api.kinhom.com/favorite/add/sku 购物车加入收藏接口
 * @apiName favorite_add
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态，"succ"表示发送成功，"failed"表示发送失败
 * @apiSuccess {object} data 返回数据
 * @apiSuccessExample {json} 返回成功:
 * {
 *      "status" : "succ",
 *      "data"   : {
 *          "status" : "succ",
 *          "msg" : "收藏成功"
 *      }
 *  }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : {
 *          "status" : "succ",
 *          "msg" : "您已收藏了此商品"
 *      }
 *  }
 */

/**
 * End by zhangzhensheng
 */

/* ======================================================================
 详情页(item)接口api
 ====================================================================== */
/**
 * 本页api接口汇总
 *
 * @api {get} http://item.kinhom.com/static/:sku 获取成交数量、评论数量
 * @apiName  static
 * @apiParam (item) {number} sku 商品sku ID号
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功:
 * {
 *      "status" : "succ",
 *      "data"   : {
 *          "commentsTotal"   : "500",    //全部评论数量
 *          "comGoodTotal"    : "500",    //好评数
 *          "comNormalTotal"  : "1",      //中评数
 *          "comBadTotal"     : "0",      //差评数
 *          "bidTotal"        : "17343"   //成交记录
 *      }
 *  }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : {}
 * }
 */

/**
 * @api {get} http://item.kinhom.com/viewed 获取历史浏览数据
 * @apiName  viewed
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   : [                                           //返回数组列表
 *          {
 *              "title"      : "标题",                         //商品标题
 *              "linkURL"    : "//item.kinhom.com/149.html",  //商品链接
 *              "imgURL"     :  "img0.jjcdn.com/...",         //商品图片链接
 *              "salePrice"  : "1599.00",                     //商品售价
 *              "saleNum"    : "34182"                        //商品销售数量
 *          }
 *      ]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : []
 * }
 */

/**
 * @api {get} http://item.kinhom.com/stock/:sku 获取对应商品的库存
 * @apiName  stock
 * @apiParam (item) {number} sku 商品sku ID号
 * @apiParam (item) {number} regionId 城市ID号
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功:
 * {
 *      "status" : "succ",
 *      "data"   : {
 *          "name"   : "仅剩2件",    //提示文字
 *          "sell"   : true,        //是否可售
 *          "stock"  : "2",         //库存数量
 *      }
 *  }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : {}
 * }
 */

/**
 * @api {get} http://item.kinhom.com/ship/:sku 获取对应商品的物流信息
 * @apiName  ship
 * @apiParam (item) {number} sku 商品sku ID号
 * @apiParam (item) {number} regionId 城市ID号
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功:
 * {
 *      "status" : "succ",
 *      "data"   : {
 *          "list"   : [
 *              {
 *                  "name"   : "物流点自提",
 *                  "price"  : 0
 *              },
 *              {
 *                  "name"   : "送货上门并安装",
 *                  "price"  : 1
 *              }
 *          ]
 *      }
 *  }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : {
 *          "list" : []
 *      }
 * }
 */

/**
 * @api {get} http://item.kinhom.com/recommend/getyoulike 获取猜你喜欢数据
 * @apiName  getyoulike
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   : [                                           //返回数组列表
 *          {
 *              "commentNum" : "611",                          //商品评论数量
 *              "title"      : "标题",                         //商品标题
 *              "linkURL"    : "//item.kinhom.com/149.html",  //商品链接
 *              "imgURL"     :  "img0.jjcdn.com/...",         //商品图片链接
 *              "salePrice"  : "1599.00",                     //商品售价
 *              "saleNum"    : "34182"                        //商品销售数量
 *          }
 *      ]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed"
 * }
 */

/**
 * @api {get}  http://item.kinhom.com/rank 获取热销排行榜数据
 * @apiName  rank
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   : [                                           //返回数组列表
 *          {
 *              "title"      : "标题",                         //商品标题
 *              "linkURL"    : "//item.kinhom.com/149.html",  //商品链接
 *              "imgURL"     :  "img0.jjcdn.com/...",         //商品图片链接
 *              "salePrice"  : "1599.00",                     //商品售价
 *              "saleNum"    : "34182"                        //商品销售数量
 *          }
 *      ]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : []
 * }
 */

/**
 * @api {get} http://item.kinhom.com/salelog/:sku 获取成交记录数据
 * @apiName  salelog
 * @apiParam (item) {number} sku 对应商品的sku ID号
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   : {
 *          "list" : [                                  //返回数组列表
 *              {
 *                  "buyer"    : "153*****564",         //购买者
 *                  "title"    : "商品标题",             //商品标题
 *                  "num"      :  "1",                  //购买数量
 *                  "time"     : "2015-11-19 21:50:09"  //购买时间
 *              }
 *          ],
 *          "curPage" : "1",      //当前页
 *          "pages"   : "2282"    //总页数
 *      }
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed",
 *      "data"   : {
 *          "list" : []  //返回空数组
 *      }
 * }
 */

/**
 * @api {get} http://item.kinhom.com/relevance/sku 获取人气搭配数据
 * @apiName  relevance
 * @apiParam (item) {number} sku 对应商品的sku ID号
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   :  [        //返回数组列表
 *          {
 *              "imgURL"     : "//img0.jjcdn.com/...",         //商品图片链接
 *              "linkURL"    : "//item.kinhom.com/332.html",   //商品链接
 *              "saleNum"    :  "1",                           //购买数量
 *              "salePrice"  : "1599.00",                      //购买时间
 *              "skuId"      : "443",                          //商品sku
 *              "storePrice" : "5100.00",                      //市场价
 *              "title"      : "商品标题"                       //商品标题
 *          }
 *      ]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed"
 * }
 */

/**
 * @api {get} http://item.kinhom.com/congeneric/:sku 获取同类推荐数据
 * @apiName  congeneric
 * @apiParam (item) {number} sku 对应商品的sku ID号
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   :  [        //返回数组列表
 *          {
 *              "imgURL"     : "//img0.jjcdn.com/...",         //商品图片链接
 *              "linkURL"    : "//item.kinhom.com/332.html",   //商品链接
 *              "saleNum"    :  "1",                           //购买数量
 *              "salePrice"  : "1599.00",                      //购买时间
 *              "skuId"      : "443",                          //商品sku
 *              "storePrice" : "5100.00",                      //市场价
 *              "title"      : "商品标题"                       //商品标题
 *          }
 *      ]
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed"
 * }
 */

/**
 * @api {get} http://item.kinhom.com/comments/:sku 获取商品评论接口
 * @apiName  comments
 * @apiParam (item) {number} sku 对应商品的sku ID号
 * @apiParam (item) {string} type 要获取评论的类型,全部--all,好评--goods,中评--normal,差评--bad
 * @apiParam (item) {number} curPage 当前页码,默认为1
 * @apiGroup item
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;failed表示获取失败
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据,如为failed返回失败信息
 * @apiSuccessExample {json} 返回成功 :
 * {
 *      "status" : "succ",
 *      "data"   :  {
 *          "curPage" : 1,   //当前页数
 *          "list" : [
 *                  {
 *                      "buyer"     : "0******13",                                               //购买者
 *                      "content"   : "服务号,物流配送及时,赞一个!",                                //评论内容
 *                      "imgURL"    :  "//misc.jjcdn.com/p/images/default_user_portrait.gif",    //用户头像
 *                      "time"      : "2015-11-08 19:51:00"                                      //购买时间
 *                  }
 *              ],
 *          "pages" : 77     //总页数
 *      }
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *      "status" : "failed"
 * }
 */

/**
 * Added by zhangzhensheng on 2015-11-26.
 * PC官网api接口汇总
 */

/* ======================================================================
 登录页(passport)接口api
 ====================================================================== */
/**
 * @api {post} http://passport.kinhom.com/passport/index 验证用户名与密码接口
 * @apiName index
 * @apiGroup passport
 * @apiParam (passport) {string} username 用户名
 * @apiParam (passport) {string} password 密码
 * @apiSuccess {string} code 返回操作的状态，200表示用户名或密码正确，400表示用户名或密码不正确
 * @apiSuccess {string} url 如果code为200，则url表示要跳转的链接
 * @apiSuccess {string} msg 如果code为400，则msg表示登录错误的信息
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "code" : "200",
 *     "url" : "http://passport.kinhom.com/"    //要跳转的链接
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "code" : "400",
 *     "msg" : "用户名或密码不正确"    //登录错误的信息
 * }
 */

/* ======================================================================
 体验馆(offline)接口api
 ====================================================================== */
/**
 * @api {post} http://www.kinhom.com/index/sendofflineaddress 发送体验馆地址接口
 * @apiName sendofflineaddress
 * @apiParam (offline) {string} phone 手机
 * @apiParam (offline) {string} id 地址信息ID
 * @apiParam (offline) {string} code 手机验证码
 * @apiGroup offline
 * @apiSuccess {string} status 返回操作的状态，"succ"表示发送成功，"failed"表示发送失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 * }
 */

/* ======================================================================
 问答系统(seoask)接口api
 ====================================================================== */
/**
 * @api {post} http://www.kinhom.com/articles/index 提交问题接口
 * @apiName askindex
 * @apiParam (seoask) {string} m 判断是否为提问页面，值为zxask
 * @apiParam (seoask) {stirng} q 判断是否为提问页面，值为question
 * @apiParam (seoask) {stirng} question 问题标题
 * @apiParam (seoask) {stirng} content 问题内容
 * @apiParam (seoask) {stirng} chk 是否选中匿名框
 * @apiGroup seoask
 * @apiSuccess {string} code 返回操作的状态，""表示提交成功，"400"表示提交失败
 * @apiSuccess {string} msg 返回的信息
 * @apiSuccess {string} url 返回的信息，要跳转的链接
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "code" : "200",
 *     "msg" : "操作成功",
 *     "url" : "http://www.kinhom.com/articles/ask/ask-668236.html"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "code" : "400",
 *     "msg" : "请先登录"
 * }
 */

/* ======================================================================
 购物车(cart)接口api
 ====================================================================== */
/**
 * @api {get} http://cart.kinhom.com/cart/ad 加载热销单品接口
 * @apiName cart_ad
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/update/cartID/num 更新购物车数量接口
 * @apiName update_itemnum
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/delete/cartID 删除购物车接口
 * @apiName delete_cart
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/cart/integral 使用积分接口
 * @apiName integral
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/cart/address 获取收货地址接口
 * @apiName address
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccess {object} data 返回收货地址
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ",
 *     "data" : {
 *         "list" : [
 *             {
 *                 "address" : "迎宾大道锦绣香江俱乐部香江集团一楼",
 *                 "addressID" : "251906",
 *                 "areaID" : "440113",
 *                 "areaName" : "番禺区",
 *                 "cityID" : "440100",
 *                 "cityName" : "广州市",
 *                 "def" : 1,
 *                 "mobile" : "18825180292",
 *                 "name" : "张振胜",
 *                 "proID" : "440000",
 *                 "proName" : "广东省",
 *                 "telphone" : ""
 *            }
 *        ]	
 *     }
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 *     //后续补充
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/cart/ship/cityID 获取物流信息接口
 * @apiName ship
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccess {object} data 返回收货地址
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ",
 *     "data" : {
 *         "list" : [
 *             {
 *                 "name" : "送货上门并安装",
 *                 "price" : 150,
 *                 "shipType" : 1
 *             },
 *             {
 *                 "name" : "物流点自提",
 *                 "price" : 24,
 *                 "shipType" : 2
 *             }
 *        ]	
 *     }
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 *     //后续补充
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/cart/setdefault/addressID 设置默认地址接口
 * @apiName setdefault_address
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/cart/cash 获取现金券接口
 * @apiName cart_cash
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccess {object} data 返回现金券数据
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed",
 *     "data" : {
 *         "msg" : "暂无可使用的优惠券"
 *     }  
 * }
 */

/**
 * @api {get} http://cart.kinhom.com/cart/coupon 获取优惠券接口
 * @apiName cart_coupon
 * @apiGroup cart
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccess {object} data 返回优惠券数据
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed",
 *     "data" : {
 *         "msg" : "暂无可使用的优惠券"
 *     }
 * }
 */

/* ======================================================================
 支付(pay)接口api
 ====================================================================== */

/**
 * @api {get} http://pay.kinhom.com/order_status 微信支付轮询接口
 * @apiName order_status
 * @apiGroup pay
 * @apiSuccess {string} status 返回操作的状态，"succ"表示提交成功，"failed"表示提交失败
 * @apiSuccessExample {json} 返回成功:
 * {
 *     "status" : "succ"
 *     //后续补充
 * }
 * @apiSuccessExample {json} 返回失败:
 * {
 *     "status" : "failed"
 *     //后续补充
 * }
 */

/**
 * End by zhangzhensheng
 */

/**
 * Added by winsy on 2015-11-27.
 * 会员系统api接口汇总
 */

/* ======================================================================
 会员系统(会员俱乐部)接口api
 ====================================================================== */
/**
 * @api {get} http://api.kinhom.com/member/gette 获取特权图标接口
 * @apiName  /member/gette
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;
 * @apiSuccess {string} data   返回的数据,如status状态为succ返回正确的数据;
 * @apiSuccess {string} pin
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": {
 *           "list": [          // 返回数组列表
 *                {
 *                     "imgURL":"http:\/\/img.jjcdn.com\/g1\/M00\/02\/57\/CvoBNFVAlzaAHiD9AAAGZKWFlfc051.png!small",     // 图标链接
 *                     "linkURL":"http:\/\/my.kinhom.com\/club\/value",                                                  // 图标跳转链接
 *                     "name":"\u4f1a\u5458\u6298\u6263"                                                                 // Unicode(图标名称)
 *                }
 *      ]},
 *      "pin": []
 * }
 */

/* ======================================================================
 会员系统(订单信息)接口api
 ====================================================================== */
/**
 * @api {post} http://my.kinhom.com/user/presellorderinfo 获取预售信息
 * @apiName  /user/presellorderinfo
 * @apiParam (user/orderlist) {number} order_id 对应订单的order ID号
 * @apiParam (user/orderlist) {string} phone 手机号码
 * @apiParam (user/orderlist) {number} pro_id 当前页码,默认为1
 * @apiGroup user/orderlist
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;
 * @apiSuccessExample {json} 返回成功
 * {
 *      "status" : "succ"
 * }
 */

/* ======================================================================
 会员系统(用户账户信息管理)接口api
 ====================================================================== */

/**
 * @api {get} http://api.kinhom.com/member/updatemem 修改昵称接口
 * @apiName  /member/updatemem
 * @apiParam (comment) {string} member_nicheng 昵称
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示修改成功;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ"
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/validatepwd 检验输入的登录密码接口
 * @apiName  /member/validatepwd
 * @apiParam (comment) {string} old_passwd 登录密码值
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示获取成功;
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccess {string} pin
 * @apiSuccessExample {json} 返回成功
 * {
 *      "status": "succ",
 *      "data": "",
 *      "pin": []
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "status": "failed",
 *      "msg": "",
 *      "pin": []
 * }
 */

/**
 * @api {post} http://my.kinhom.com/user/updatemem 提交修改登录密码表单接口
 * @apiName  /user/updatemem
 * @apiParam (user/account) {string} old_passwd 原登录密码
 * @apiParam (user/account) {string} new_passwd 新登录密码
 * @apiParam (user/account) {string} confirmNewPass 再次确认新密码
 * @apiGroup user/account
 * @apiSuccess {string} status 返回操作的状态,success表示提交表单成功;
 * @apiSuccess {string} data 返回的数据。data["code"]分别代表：1 代表参数错误;2 代表尚未登录;3 代表原密码错误;4 代表两次输入密码不一致;5 代表新密码不符合规则;6 代表修改失败;200 代表修改成功;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": [
 *              "code": 1    // 返回的code
 *      ]
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/sendemailcode 发送邮箱验证码接口
 * @apiName  /member/sendemailcode
 * @apiParam (comment) {string} email 邮箱地址
 * @apiParam (comment) {number} type 3
 * @apiGroup user/account
 * @apiSuccess {string} status 返回操作的状态,succ表示发送邮箱验证码成功;
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccess {string} pin
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": {
 *              "emailcode": ""
 *      },
 *      "pin": []
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/validateemailcode 检验邮箱验证码接口
 * @apiName  /member/validateemailcode
 * @apiParam (comment) {string} emailcode 邮箱验证码
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示输入的邮箱验证码正确;
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccess {string} pin
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": {
 *              "phonecode": "847005"     // 邮箱验证码
 *      },
 *      "pin": []
 * }
 */

/**
 * @api {post} http://my.kinhom.com/user/bindinfo 修改用户邮箱信息接口
 * @apiName  /user/bindinfo
 * @apiParam (user/account) {number} type 修改类型,email为修改邮箱
 * @apiParam (user/account) {string} val  邮箱地址
 * @apiGroup user/account
 * @apiSuccess {string} status 返回操作的状态,succ表示修改用户邮箱信息成功;
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": ""
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/checkphone 检验手机是否已经被绑定接口
 * @apiName  /member/checkphone
 * @apiParam (comment) {string} phone 手机号码
 * @apiParam (comment) {string} h 安全码Val值
 * @apiParam (comment) {string} m 安全码Key值
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示手机号码未被绑定;否则，手机已被绑定。
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccess {string} pin 返回的安全码;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": "",
 *      "pin": [8928529,4346573]
 * }
 * @apiSuccessExample {json} 返回失败
 * {
 *      "status": "failed",
 *      "msg": {
 *          "status": "failed"
 *      },
 *      "pin": [7730824,8691575]
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/sendphonecode 发送手机验证码接口
 * @apiName  /member/sendphonecode
 * @apiParam (comment) {string} phone 手机号码
 * @apiParam (comment) {number} type  4
 * @apiParam (comment) {string} h 安全码Val值
 * @apiParam (comment) {string} m 安全码Key值
 * @apiParam (comment) {number} n 发送手机验证码次数（页面刷新后重新计算）
 * @apiParam (comment) {number} r 随机码
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示验证码已发送到手机;否则，手机验证码发送失败。
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccess {string} pin 返回的安全码;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": {
 *          "phonecode": ""
 *      },
 *      "pin": [3497972,8027551]
 * }
 */

/**
 * @api {get} http://api.kinhom.com/member/validateiphonecode 检验手机验证码接口
 * @apiName  /member/validateiphonecode
 * @apiParam (comment) {string} phoneNum 手机号码
 * @apiParam (comment) {string} phonecode 手机验证码
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示输入的手机验证码正确;
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccess {string} pin 返回的安全码;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": {
 *      	"phonecode": ""
 *      },
 *      "pin": [1133224, 9901983]
 * }
 * @apiSuccessExample {json} 返回失败
 * {
 *      "status": "failed",
 *      "msg": "",
 *      "pin": []
 * }
 */

/**
 * @api {post} http://my.kinhom.com/user/bindinfo 修改用户手机信息接口
 * @apiName  /user/bindinfo
 * @apiParam (user/account) {number} type 修改类型,phone为修改手机
 * @apiParam (user/account) {string} val  手机号码
 * @apiGroup user/account
 * @apiSuccess {string} status 返回操作的状态,succ表示修改用户手机信息成功;否则失败。
 * @apiSuccess {string} data 返回的数据;1 代表手机已经被绑定过;2 代表修改/设置手机失败。
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "status": "",
 *      "data": 1
 * }
 */

/* ======================================================================
 会员系统(收货地址管理)接口api
 ====================================================================== */
/**
 * @api {post} http://api.kinhom.com/member/defauleaddress 设置默认收货地址接口
 * @apiName  /member/defauleaddress
 * @apiParam (comment) {number} address_id 对应地址的data-value值（省，市，区）
 * @apiGroup comment
 * @apiSuccess {string} status 返回操作的状态,succ表示设置默认收货地址成功;否则，表示设置失败。
 * @apiSuccess {string} data 返回的数据;
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ",
 *      "data": "",
 *      "pin": []
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      // 后续补充
 * }
 */

/* ======================================================================
 会员系统(售后管理)接口api
 ====================================================================== */
/**
 * @api {post} http://my.kinhom.com/user/api/cancelApply.php 取消退款申请，获取状态接口
 * @apiName  api/cancelApply
 * @apiParam (api/cancelApply) {number} ID "123"
 * @apiGroup user/refund
 * @apiSuccess {string} status 返回操作的状态,succ表示取消退款申请成功;否则，表示取消退款申请失败。
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ"
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      // 后续补充
 * }
 */

/**
 * @api {post} http://my.kinhom.com/user/api/getRefundDetail.php 获取对应的退款单详情接口
 * @apiName  api/getRefundDetail
 * @apiParam (api/getRefundDetail) {number} ID "14"
 * @apiGroup user/refund
 * @apiSuccess {string} status 返回操作的状态,succ表示获取退款单详情成功;否则，表示获取失败。
 * @apiSuccessExample {json} 返回成功
 *
 * {
 *      "status": "succ"
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      // 后续补充
 * }
 */

/**
 * @api {get} http://my.kinhom.com/app/?app=upload&class=ajaxUpload 退款凭证上传图片接口
 * @apiName  app?app=upload&class=ajaxUpload
 * @apiGroup user/refund
 * //后续补充
 */


/* ======================================================================
 会员系统(安全中心)接口api
 ====================================================================== */

/* ======================================================================
 会员系统(安全中心--修改密码)接口api
 ====================================================================== */
/**
 * @api {post} http://my.kinhom.com/ajax/checkoldpwd 修改密码：判断输入的原登录密码
 * @apiName  ajax/checkoldpwd
 * @apiParam (security) {string} old_passwd 原登录密码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示输入的原登录密码正确;400表示输入的原登录密码错误。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": "原密码输入正确"
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": "原密码输入错误"
 * }
 */

/**
 * @api {post} http://my.kinhom.com/security/editpwd 修改登录密码表单提交
 * @apiName  security/editpwd
 * @apiParam (security) {string} old_passwd 原登录密码
 * @apiParam (security) {string} new_passwd 新密码
 * @apiParam (security) {string} confirm_passwd 与新密码一致的确认密码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示修改登录密码成功;400表示修改登录密码失败。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": "修改密码成功"
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/* ======================================================================
 会员系统(安全中心--检测手机以及短信发送)接口api
 ====================================================================== */
/**
 * @api {post} http://my.kinhom.com/ajax/checkphone 检验手机号码是否已被绑定
 * @apiName  ajax/checkphone
 * @apiParam (security) {number} phone 支付密码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示手机未被绑定;400表示手机已被绑定。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": "手机号验证通过"
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/ajax/sendsms 发送手机短信验证码
 * @apiName  ajax/sendsms
 * @apiParam (security) {number} phone 手机号码
 * @apiParam (security) {string} type 设置/修改/重置支付密码页面标志，1表示重置页，2表示修改页，3表示重置页
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示发送验证码成功;400表示发送验证码失败或提示60秒内只能获取一次验证码。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": "发送短信成功"
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/ajax/checkphonecode 检验短信验证码
 * @apiName  ajax/checkphonecode
 * @apiParam (security) {number} phone_code 短信验证码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示验证码正确;400表示验证码过期。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": "短信验证码错误"
 * }
 */

/* ======================================================================
 会员系统(安全中心--支付密码部分)接口api
 ====================================================================== */
/**
 * @api {post} http://my.kinhom.com/ajax/checkpaypwd 设置/修改/重置支付密码：判断输入的支付密码是否与登陆密码一致
 * @apiName  ajax/checkpaypwd
 * @apiParam (security) {string} new_paypasswd 新支付密码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示支付密码与登录密码不一致;400表示支付密码与登录密码一致。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/ajax/checkoldpaypwd 修改支付密码：判断输入的原/旧支付密码
 * @apiName  ajax/checkoldpaypwd
 * @apiParam (security) {string} old_paypasswd 原/旧支付密码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示旧的支付密码输入正确;400表示旧支付密码输入错误。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/ajax/editpaypwd 设置/修改/重置支付密码表单提交
 * @apiName  ajax/editpaypwd
 * @apiParam (security) {number} phone_code 短信验证码
 * @apiParam (security) {string} old_pay_psw 旧支付密码
 * @apiParam (security) {string} new_pay_psw 新支付密码
 * @apiParam (security) {string} confirm_pay_psw 确认支付密码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示表单提交成功;400表示表单提交失败。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */
/* ======================================================================
 会员系统(安全中心--绑定/修改手机)接口api
 ====================================================================== */

/**
 * @api {post} http://my.kinhom.com/security/bindphone 绑定手机
 * @apiName  security/bindphone
 * @apiParam (security) {number} phone 手机号码
 * @apiParam (security) {number} phone_code 短信验证码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示绑定成功;400表示绑定失败。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/security/editbindphoneone 修改绑定的手机第一步（验证身份）
 * @apiName  security/bindphone
 * @apiParam (security) {number} phone 手机号码
 * @apiParam (security) {number} phone_code 短信验证码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示验证身份成功;400表示验证身份失败。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/security/editbindphonetwo 修改绑定的手机第二步（修改手机号码）
 * @apiName  security/bindphone
 * @apiParam (security) {number} phone 新手机号码
 * @apiParam (security) {number} phone_code 短信验证码
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示修改绑定新手机号码成功;400表示修改绑定新手机号码失败。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */
/* ======================================================================
 会员系统(安全中心--绑定/修改邮箱)接口api
 ====================================================================== */
/**
 * @api {post} http://my.kinhom.com/ajax/checkemail 绑定邮箱（检测邮箱是否被绑定）
 * @apiName  ajax/checkemail
 * @apiParam (security) {number} email 邮箱地址
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示邮箱未被绑定;400表示邮箱已被绑定。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/security/bindemail 绑定邮箱表单提交
 * @apiName  security/bindemail
 * @apiParam (security) {number} email 邮箱地址
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示邮箱绑定成功;400表示邮箱未被绑定。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/security/editbindemailone 修改绑定邮箱第一步——发送验证邮件
 * @apiName  security/editbindemailone
 * @apiParam (security) {number} email 邮箱地址
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示发送邮件成功;400表示发送邮件失败或提示120秒内只能获取一封邮件。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * @api {post} http://my.kinhom.com/security/editbindemailtwo 修改绑定邮箱第二步——发送验证邮件
 * @apiName  security/editbindemailtwo
 * @apiParam (security) {number} email 邮箱地址
 * @apiGroup security
 * @apiSuccess {string} code 返回操作的状态,200表示发送邮件成功;400表示发送邮件失败或提示120秒内只能获取一封邮件。
 * @apiSuccessExample {json} 返回成功
 * {
 *      "code": 200,
 *      "message": ""
 * }
 *
 * @apiSuccessExample {json} 返回失败
 * {
 *      "code": 400,
 *      "message": ""
 * }
 */

/**
 * End by winsy
 */

