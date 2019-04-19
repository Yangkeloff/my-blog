const mongoose = require('mongoose')
const Admin = require('../db/models/adminInfo').Admin
const {create_token} = require('../utils/token')

module.exports = {
  async api_admin_reg(ctx, next) {
    let {
      admin_name = '',
      admin_pwd = ''
    } = ctx.request.body
    try {
      if(admin_name == '' || admin_pwd == '' || admin_pwd.length < 5) {
        ctx.body = {
          code: 401,
          msg: "注册失败，请填写完整表单!"
        }
        return
      }
      let res = await Admin.find({admin_name})
      if(res.length != 0 ) {
        ctx.body = {
          code: 409,
          msg: "注册失败，用户名重复!"
        }
        return
      }
      let token = create_token(admin_name)
      let admin = new Admin({
        admin_name,
        admin_pwd,
        token
      })
      res = await admin.save()
      if(res._id != null){
        ctx.body = {
          code: 200,
          msg: '注册成功',
          data: {
            _id: res._id,
            admin_name,
            token
          }
        }
      }else{
        ctx.body = {
          code: 500,
          msg: "注册失败，服务器异常！"
        }
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error
      }
    }
  },
  async api_admin_login(ctx, next) {
    let {
      admin_name = '',
      admin_pwd = ''
    } = ctx.request.body
    try {
      if(admin_name == '' || admin_pwd == '' || admin_pwd.length < 5) {
        ctx.body = {
          code: 401,
          msg: "登录失败，请填写完整表单!"
        }
        return
      }
      let res = await Admin.find({admin_name, admin_pwd})
      if(res.length == 0){
        ctx.body = {
          code: 401,
          msg: '登录失败，用户名或密码错误!'
        }
        return
      }
      let token = create_token(admin_name)
      res[0].token = token
      res[0].save()
      ctx.body = {
        code: 200,
        msg: "登录成功!",
        data: {
          _id: res[0]._id,
          admin_name: res[0].admin_name,
          token
        }
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error
      }
    }
  }
}