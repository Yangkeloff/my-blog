const mongoose = require('mongoose')

// 管理员表
const AdminSchema = new mongoose.Schema({
  admin_name: String,
  admin_pwd: String, 
  token: {
    type: String,
    default: ''
  }, 
})

// 全局设置表
const settingSchema = new mongoose.Schema({
  myInfo:{
    about_me_page: String
  },
  website_cover:{
	  home: String,
    production: String,
    archives: String,
    about: String
  },
  other: {
    ICP:String, 
    blog_website:String 
  }
})

exports.Admin = mongoose.model('Admin', AdminSchema)
exports.Setting = mongoose.model('Setting', settingSchema)