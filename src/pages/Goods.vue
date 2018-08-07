<template lang='pug'>
  .goods
    van-nav-bar(
      title='商品详情'
      left-text='返回'
      left-arrow
      @click-left='onClickLeft'
    )
    .top-image
      img(:src='goods.IMAGE1' width='100%')
    .goods-name {{goods.NAME}}
    .goods-price 价格：￥{{goods.PRESENT_PRICE | moneyFilter}}
    .detail-wrap
      van-tabs(swipeable stiky)
        van-tab(title='商品详情')
          .detail(v-html='goods.DETAIL')
        van-tab(title='评价') 开发中……
    // 底部按钮
    .goods-bottom
      div
        van-button(size='large' type='primary') 加入购物车
      div
        van-button(size='large' type='danger') 直接购买
</template>

<script>
  import axios from 'axios'
  import { Toast } from 'vant'
  import url from '../serviceAPI.config'
  import { toMoney } from '../filters/money.js'

  export default {
    data() {
      return {
        goodsId: '',
        goods: {}
      }
    },
    created() {
      this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
      this.getInfo()
    },
    filters: {
      moneyFilter (money) {
        return toMoney(money)
      }
    },
    methods: {
      getInfo() {
        axios({
          url: url.getGoodsDetail,
          method: 'post',
          data: {goodsId: this.goodsId}
        })
        .then(res => {
          if (res.status === 200 && res.data.code === 200) {
            console.log(res.data.data)
            this.goods = res.data.data
          } else {
            Toast('数据获取失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      onClickLeft() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang='sass' scoped>
.detail-wrap
  padding-bottom: 60px
  .detail
    font-size: 0px
.goods-name
  background-color: #fff
.goods-price
  background-color: #fff
.goods-bottom
  position: fixed
  bottom: 0px
  left: 0px
  background-color: #FFF
  width: 100%
  display: flex
  flex-direction: row
  flex-flow: nowrap

  & > div
    flex: 1
    padding: 5px
</style>
