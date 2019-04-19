const mongoose = require('mongoose')

// 管理员表
let AdminSchema = new mongoose.Schema({
  admin_name: String,
  admin_pwd: String, 
  token: {
    type: String,
    default: ''
  }, 
})

exports.Admin = mongoose.model('Admin', AdminSchema)