<template lang='pug'>
  section
    // search area
    .search-bar
      van-row(gutter='5')
        van-col(span='3')
          img.location-icon(:src='locationIcon')
        van-col(span='16')
          input.search-input(type='text')
        van-col(span='5')
          van-button(size='mini') 查找
    // swiper
    .swiper-area
      van-swipe(:autoplay='3000')
        van-swipe-item(v-for='(banner, index) in bannerPicArray' :key='index')
          img(:src='banner.image' width='100%')
    // type bar
    .gray-wrapper
      .type-bar
        .type-item(v-for='(item,index) in category' :key='index')
          img(v-lazy='item.image' width='90%')
          span {{item.mallCategoryName}}
      // ad banner
      .ad-banner2
        img(:src='adBanner' width='100%')
    
    // Recommend goods area
    .recommend-area
      .recommend-title 商品推荐
      .recommend-body
        swiper(:options='swiperOption')
          swiper-slide(v-for='(item,index) in recommendGoods' :key='index')
            .recommend-item
              img(v-lazy='item.image' width='100%')
              .name {{item.goodsName}}
              .price ￥{{item.price | moneyFilter}}
              .mall-price ￥{{item.mallPrice | moneyFilter}}
    // 楼层
    floor(:floorData='floor1' :floorTitle='floorName.floor1' :floorLevel='1')
    floor(:floorData='floor2' :floorTitle='floorName.floor2' :floorLevel='2')
    floor(:floorData='floor3' :floorTitle='floorName.floor3' :floorLevel='3')
    // hot
</template>

<script>
  import axios from 'axios'
  import floor from '../component/Floor'
  import { toMoney } from '../../filter/money.js'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 3
        },
        locationIcon: require('../../assets/img/location.png'),
        bannerPicArray: [],
        category: [],
        adBanner: '',
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {}
      }
    },
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    created() {
      axios({
        url: ' https://www.easy-mock.com/mock/5b346843a20d3765be60e541/svue/',
        method: 'get'
      })
      .then(res => {
        console.log(res.data.data)
        if (res.status === 200) {
          let data = res.data.data
          this.category = data.category
          this.bannerPicArray = data.slides
          this.adBanner = data.advertesPicture.PICTURE_ADDRESS
          this.recommendGoods = data.recommend
          this.floor1 = data.floor1
          this.floor2 = data.floor2
          this.floor3 = data.floor3
          this.floorName = data.floorName
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    components: {
      swiper,
      swiperSlide,
      floor
    }
  }
</script>

<style lang='sass' scoped>
  .gray-wrapper
    padding: .3rem
    background-color:#efefef

  .search-bar
    height: 2.2rem
    line-height: 2.2rem
    text-align: center
    background-color: #e5017d

    @at-root
      .location-icon
        width: 80%
        margin-top: .2rem

      .search-input
        width: 100%
        height: 1.3rem
        border-top: none
        border-left: none
        border-right: none
        border-bottom: 1px solid #fff
        background-color: #e5017d
        color: #fff
  
  .swiper-area
    max-height: 15rem
    overflow: hidden
    clear: both

  .type-bar
    display: flex
    margin-bottom: .3rem
    text-align: center
    border-radius: .3rem
    background-color: #fff
    
    .type-item
      flex: 1
      padding: .3rem
      font-size: 12px
      text-align: center

  .recommend-area
    margin-top: .3rem

    @at-root
      .recommend-title
        padding: .2rem
        font-size: 14px
        border-bottom: 1px solid #eee
        color: #e5017d

      .recommend-body
        border-bottom: 1px solid #eee

        @at-root
          .recommend-item
            width: 99%
            padding-top: .3rem
            padding-bottom: .3rem
            font-size: 12px
            text-align: center
            border-right: 1px solid #eee

            &:last-child
              border-right: none

            .name
              margin: .3rem
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis 
            
            .mall-price
              font-size: 10px
              text-decoration: line-through
              color: #ccc

</style>