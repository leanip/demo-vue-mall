<template lang='pug'>
  .floor(v-if='floorData')
    .floor-title
      span.level {{floorLevel}}F
      span.title {{floorTitle}}
    .floor-anomaly
      .floor-1
        img(v-lazy='floorData1.image' width='100%')
      div
        .floor-2
          img(v-lazy='floorData2.image' width='100%')
        div
          img(v-lazy='floorData3.image' width='100%')
    .floor-rule
      .item(v-for='(item,index) in floorData.slice(3)' :key='index')
        img(v-lazy='item.image' width='100%')
</template>

<script>
  export default {
    props: [
      'floorData',
      'floorTitle',
      'floorLevel'
    ],
    data() {
      return {
        floorData1: {},
        floorData2: {},
        floorData3: {}
      }
    },
    watch: {
      floorData() {
        this.floorData1 = this.floorData[0]
        this.floorData2 = this.floorData[1]
        this.floorData3 = this.floorData[2]
      }
    }
  }
</script>

<style lang='sass' scoped>
  .floor-title
    height: 2.2rem
    line-height: 2rem
    text-align: center
    background-color: #efefef
    .level
      width: 1rem
      height: 1rem
      line-height: 1rem
      display: inline-block
      margin-right: .3rem
      font-size: 10px
      border-radius: 50%
      background-color: #dd2c07
      color: #fff
    .title
      font-size: 14px
      color: #dd2c07
  .floor-anomaly
    display: flex
    border-bottom: 1px solid #ddd
    div
      width: 10rem
      box-sizing: border-box
      -webkit-box-sizing: border-box
  .floor-1
    border-right: 1px solid #ddd
  .floor-2
    border-bottom: 1px solid #ddd
  .floor-rule
    display: flex
    .item
      width: 10rem
      border-bottom: 1px solid #ddd
      box-sizing: border-box
      -webkit-box-sizing: border-box
      &:nth-child(odd)
        border-right: 1px solid #ddd
</style>