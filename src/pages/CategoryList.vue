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
              @click='clickCategory(index, item.ID)'
              :class='{"category-active": categoryIndex === index}'
            ) {{item.MALL_CATEGORY_NAME}}
      van-col(span='18')
        .tabCategorySub
          van-tabs(v-model='active')
            van-tab(v-for='(item, index) in categorySub' :key='index' :title='item.MALL_SUB_NAME')
        #list-div
          van-pull-refresh(v-model='isRefresh' @refresh='onRefresh')
            van-list(
              v-model='loading'
              :finished='finished'
              @load='onLoad'
            )
              .list-item(v-for='item in list' :key='item') {{item}}
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
        categoryIndex: 0,
        list: [],
        loading: false,
        finished: false,
        isRefresh: false
      }
    },
    created () {
      this.getCategory(() => {
        this.getCategorySubByCategoryId(this.category[0].ID)
      })
    },
    mounted () {
      let winHeight = document.documentElement.clientHeight
      document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
      document.getElementById('list-div').style.height = winHeight - 90 + 'px'
    },
    methods: {
      clickCategory (index, id) {
        this.categoryIndex = index
        this.getCategorySubByCategoryId(id)
      },
      getCategory (cb) {
        axios({
          url: url.getCategoryList,
          method: 'get'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message) {
            this.category = res.data.message
            cb && cb()
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
        .catch(err => {
          console.log(err)
        })
      },
      onLoad () {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          this.loading = false
          if (this.list.length >= 40) {
            this.finished = true
          }
        }, 500)
      },
      onRefresh () {
        setTimeout(() => {
          this.isRefresh = false
          this.list = []
          this.onLoad()
        }, 500)
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

.list-item
  text-align: center
  line-height: 80px
  border-bottom: 1px solid #f0f0f0
  background-color: #fff

#list-div
  overflow: scroll
</style>
