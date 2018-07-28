<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="类别列表"/>
    </div>
    <van-row>
      <van-col span='6'>
        <div class="left-nav">左侧导航</div>
      </van-col>
      <van-col span='18'>
        右侧列表
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config'

  export default {
    created () {
      this.getCategory()
    },
    methods: {
      getCategory () {
        axios({
          url: url.getCategoryList,
          method: 'get'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message) {} else {
            Toast('获取列表错误')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
