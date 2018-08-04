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

router.get('/getCategoryList', async ctx => {
  try {
    const Category = mongoose.model('Category')
    const result = await Category.find().exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

router.post('/getCategorySubList', async ctx => {
  try {
    const { categoryId } = ctx.request.body
    const CategorySub = mongoose.model('CategorySub')
    const result = await CategorySub.find({MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

router.get('/getGoodsListByCategorySubID', async ctx => {
  try {
    const { categorySubId, page } = ctx.body
    const num = 10
    const start = (page - 1) * num
    const Goods = mongoose.model('Goods')
    const result = await Goods.find({SUB_ID: categorySubId})
                              .skip(start)
                              .limit(num)
                              .exec()
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router
