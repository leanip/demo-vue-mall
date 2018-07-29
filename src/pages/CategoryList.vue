<template lang='pug'>
  .category
    .navbar
      van-nav-bar(title='类别列表')
    van-row
      van-col(span='6')
        .left-nav#leftNav
          ul
            li(
              v-for='(item, index) in category'
              :key='item.ID'
              @click='clickCategory(index)'
              :class='{"category-active": categoryIndex === index}'
            ) {{item.MALL_CATEGORY_NAME}}
      van-col(span='18')
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config'

  export default {
    data () {
      return {
        active: 0,
        category: [],
        categorySub: [],
        categoryIndex: 0
      }
    },
    created () {
      this.getCategory()
    },
    mounted () {
      let winHeight = document.documentElement.clientHeight
      document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    },
    methods: {
      clickCategory (index) {
        this.categoryIndex = index
      },
      getCategory () {
        axios({
          url: url.getCategoryList,
          method: 'get'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message) {
            this.category = res.data.message
          } else {
            Toast('获取列表错误')
          }
        })
      },
      getCategorySubByCategoryId (id) {
        axios({
          url: url.getCategorySubList,
          method: 'post',
          data: {categoryId: id}
        })
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.data.message) {
            this.categorySub = res.data.message
            this.active = 0
          } else {
            Toast('服务器错误，获取数据失败')
          }
        })
      }
    }
  }
</script>

<style lang='sass' scoped>
.left-nav
  background-color: #38a38a
  li
    line-height: 2rem
    border-bottom: 1px solid #E4E7ED
    padding: 3px
    font-size: 0.8rem
    text-align: center

  .category-active
    background-color: #fff
</style>
