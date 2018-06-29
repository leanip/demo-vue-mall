const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const { connect, initSchema } = require('./batabase/init')
const user = require('./appApi/user')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

// 装载子路由
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 连接数据库
; (async () => {
  await connect()
  initSchema()

  // const User = mongoose.model('User')
  // let userName = 'username' + Math.floor(Math.random() * 100000)
  // let oneUser = new User({ userName: userName, password: '123456' })
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })
})()

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})