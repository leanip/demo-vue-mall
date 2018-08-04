const BASEURL = 'https://www.easy-mock.com/mock/5b346843a20d3765be60e541/svue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL,
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register',                                  // 用户注册
  login: LOCALURL + 'user/login',                                            // 用户登录
  getGoodsDetail: LOCALURL + 'goods/getGoodsDetail',                         // 商品详细数据
  getCategoryList: LOCALURL + 'goods/getCategoryList',                       // 获取大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList',                 // 获取小类信息
  getGoodsListByCategorySubID:LOCALURL + 'goods/getGoodsListByCategorySubID' // 得到小类商品信息
}

module.exports = URL
