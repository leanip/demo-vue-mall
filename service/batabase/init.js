const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://localhost/svue'

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)

  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 数据库断开时
    mongoose.connection.on('disconnect', () => {
      console.log('****************** 数据库断开 ******************')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
  
    // 数据库出错时
    mongoose.connection.on('error', err => {
      console.log('****************** 数据库错误 ******************')
      console.log(err)
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
  
    // 数据库连接打开时
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected Successfully!')
      resolve()
    })
  })
}

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
