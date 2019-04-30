const mongoose = require('mongoose')
const Admin = require('../db/models/adminInfo').Admin
const sha1 = require('sha1')
const SHA1_ADD_STR = "yang_blog_encrypted_string"
const adminQuery = require('../db/query/admin')
const {
  create_token
} = require('../utils/token')

module.exports = {
  async api_admin_reg(ctx, next) {
    let {
      admin_name = '',
        admin_pwd = ''
    } = ctx.request.body
    try {
      if (admin_name == '' || admin_pwd == '' || admin_pwd.length < 5) {
        ctx.body = {
          code: 401,
          msg: "注册失败，请填写完整表单!"
        }
        return
      }
      let res = await Admin.find({
        admin_name
      })
      if (res.length != 0) {
        ctx.body = {
          code: 409,
          msg: "注册失败，用户名重复!"
        }
        return
      }
      let token = create_token(admin_name)
      let admin = new Admin({
        admin_name,
        admin_pwd: sha1(sha1(admin_pwd + SHA1_ADD_STR)),
        token
      })
      res = await admin.save()
      if (res._id != null) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
          data: {
            _id: res._id,
            admin_name,
            token
          }
        }
      } else {
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
      if (admin_name == '' || admin_pwd == '' || admin_pwd.length < 5) {
        ctx.body = {
          code: 401,
          msg: "登录失败，请填写完整表单!"
        }
        return
      }
      let res = await Admin.find({
        admin_name,
        admin_pwd
      })
      if (res.length == 0) {
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
  },
  async edit_admin(ctx, next) {
    let {
      admin_name = '', ori_pwd = '', new_pwd = '', re_pwd = ''
    } = ctx.request.body
    try {
      if (admin_name == '' || ori_pwd == '' || new_pwd == '' || re_pwd == '') {
        ctx.body = {
          code: 401,
          msg: '修改密码失败,请填写完所有信息且新密码不能为空'
        }
        return
      }
      if (new_pwd != re_pwd) {
        ctx.body = {
          code: 401,
          msg: '修改密码失败,2次密码输入不一致！'
        }
        return
      }
      let res = await adminQuery.find_by_admin_name(admin_name)
      if (res.length == 0) {
        ctx.body = {
          code: 401,
          msg: '修改密码失败,没有此管理员!'
        }
        return
      }
      if (res[0].admin_pwd == sha1(sha1(ori_pwd + SHA1_ADD_STR))) {
        res = await adminQuery.update(res[0]._id, {
          admin_pwd: sha1(sha1(re_pwd + SHA1_ADD_STR))
        })
        console.log(res)
        if (res) {
          ctx.body = {
            ctx,
            code: 200,
            msg: '密码修改成功!'
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '密码修改失败！'
          }
        }
      } else {
        ctx.body = {
          code: 401,
          msg: '修改密码失败,原始密码错误!'
        }
        return
      }

    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '修改密码失败!'
      }
    }
  }
}