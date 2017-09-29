const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// 定义Schema
const UserSchema = new mongoose.Schema({
  username: {// 真实姓名
    type: String,
    required: true
  },
  password: { // 密码
    type: String,
    required: true
  }
})

// 定义Model
var UserModel = mongoose.model('User', UserSchema)

// 暴露接口
module.exports = UserModel
