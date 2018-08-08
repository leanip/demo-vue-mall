<template lang='pug'>
  .cart
    van-nav-bar(title='购物车')
</template>

<script>
  export default {
    data () {
      return {
        cartInfo: [],
        isEmpty: false
      }
    },
    created () {
      this.getCartInfo()
    },
    methods: {
      getCartInfo () {
        if (localStorage.cartInfo) {
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
        console.log('cartInfo: ', this.cartInfo)
        this.isEmpty = this.cartInfo.length ? true : false
      }
    }
  }
</script>

<style scoped>

</style>
