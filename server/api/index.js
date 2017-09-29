import {Router} from 'express'

//引用mongoose模块
var mongoose = require('mongoose');
//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vue_test', {
  useMongoClient: true,
})

var db = mongoose.connection;

// 连接成功
db.once('open', function (callback) {
  // yay!
  console.log('连接数据库成功了！')
});
// 连接失败
db.on('error', console.error.bind(console, 'connection error:'));

import users from './users'

const router = Router()

// Add USERS Routes
router.use(users)

export default router
