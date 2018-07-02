<template>
  <div>
    商品详情页面
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '../serviceAPI.config'

  export default {
    data() {
      return {
        goodsId: '0032862950ca44d397e58a6fb10a3e38'
      }
    },
    created() {
      this.getInfo()
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
          } else {
            console.log('error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>