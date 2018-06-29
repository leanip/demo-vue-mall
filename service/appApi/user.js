const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async ctx => {
  ctx.body = '用户操作首页'
})

router.post('/register', async ctx => {
  const User = mongoose.model('User')

  let newUser = new User(ctx.request.body)

  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

router.post('/login', async ctx => {
  const User = mongoose.model('User')

  let { username, password } = ctx.request.body

  await User.findOne({username})
  .exec()
  .then(async result => {
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password)
      .then(isMatch => {
        if (isMatch) {
          ctx.body = {
            code: 200,
            message: isMatch
          }
        } else {
          ctx.body = {
            code: 300,
            message: '密码错误'
          }
        }
      })
      .catch(err => {
        ctx.body = {
          code: 500,
          message: '内部错误'
        }
      })
    } else {
      ctx.body = {
        code: 400,
        message: '用户名不存在'
      }
    }
  })
  .catch(err => {
    ctx.body = {
      code: 500,
      message: '服务器内部错误'
    }
  })
})

module.exports = router
