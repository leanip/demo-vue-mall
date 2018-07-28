const BASEURL = 'https://www.easy-mock.com/mock/5b346843a20d3765be60e541/svue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL,
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register',
  login: LOCALURL + 'user/login',
  getGoodsDetail: LOCALURL + 'goods/getGoodsDetail',
  getCategoryList: LOCALURL + 'goods/getCategoryList'
}

module.exports = URL
