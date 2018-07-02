const mongoose = require('mongoose')
const Router = require('koa-router')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo', async ctx => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')

    data.map((val, index) => {
      let newGoods = new Goods(val)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功插入 ' + saveCount + ' 条数据')
      })
        .catch(error => {
          console.log('失败: ' + error)
        })
    })
  })

  ctx.body = '开始导入数据……'
})

router.get('/insertAllCategory', async () => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    if (err) {
      console.log('读取文件错误')
      return
    }

    data = JSON.parse(data)
    let count = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((val, index) => {
      const newCategory = new Category(val)
      newCategory.save().then(() => {
        count++
        console.log('成功插入 ' + count + ' 条数据')
      })
        .catch(() => {
          console.log('插入失败')
        })
    })
  })
})

router.get('/insertAllCategorySub', async () => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    if (err) {
      console.log('读入文件错误')
      return
    }

    data = JSON.parse(data)
    let i = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((val, index) => {
      const newCategorySub = new CategorySub(val)
      newCategorySub.save().then(() => {
        i++
        console.log('成功插入' + i + ' 条数据')
      })
        .catch(err => {
          console.log('插入失败')
        })
    })
  })
})

router.post('/getGoodsDetail', async ctx => {
  try {
    let { goodsId } = ctx.request.body
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ ID: goodsId }).exec()
    console.log(result)
    ctx.body = {
      code: 200,
      data: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

module.exports = router