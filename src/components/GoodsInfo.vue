<template lang='pug'>
  .goods-info
    .goods-image
      img(v-lazy='image' width='90%')
    .goods-name {{name}}
    .goods-price ￥{{price | moneyFilter}}
</template>

<script>
  import { toMoney } from '@/filters/money.js'

  export default {
    props: [
      'image',
      'name',
      'price'
    ],
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    }
  }
</script>

<style lang='sass' scoped>
.goods-name
  padding: 0 8px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>