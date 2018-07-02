const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const SALT_WORK_FACTOR = 10
let ObjectId = Schema.Types.ObjectId

// 创建用户Schema
const userSchema = new Schema({
  userId: { type: ObjectId },
  username: { unique: true, type: String },
  password: String,
  createdAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
}, {
    collection: 'user'
  })

userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (err) reject(err)
        resolve(isMatch)
      })
    })
  }
}

mongoose.model('User', userSchema)