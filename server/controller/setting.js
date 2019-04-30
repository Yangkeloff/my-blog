const mongoose = require('mongoose')
const Setting = require('../db/models/adminInfo').Setting
const {judge_source} = require('../utils/token')

module.exports = {
  async get_setting(ctx, next) {
    try {
      let res = await Setting.find({})
      ctx.body = {
        code: 200,
        msg: '获取设置成功!',
        data: res
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '请求失败!'
      }
    }
  },
  async edit_setting(ctx, next) {
    let {
      myInfo = null,
      website_cover = null,
      other = null
    } = ctx.request.body
    let setJson = {}
    global.console.log(myInfo,website_cover,other)
    try {
      // 如果数据库中没有数据，创建一个数据
      let res = await Setting.find({})
      if(res.length == 0){
        await new Setting().save()
      }
      
      // 更新我的信息
      if(myInfo != null){
        let {about_me_page = ''} = myInfo
        setJsonFn(setJson,'myInfo',{about_me_page})
      }
      // 更新网站封面
      if(website_cover != null){
        let {
          home = '',
          production = '',
          archives = '',
          about = ''
        } = website_cover
        setJsonFn(setJson,'website_cover',{home,production,archives,about})
      }
      // 更新其他选项
      if(other != null){
        let {
          ICP = '', 
          blog_website = '' 
        } = other
        setJsonFn(setJson,'other',{ICP,blog_website})
      }
      res = await Setting.findOneAndUpdate({},{
        '$set':setJson
      },{new:true})
      ctx.body = {
        code: 200,
        msg: '更新设置成功!',
        data: res
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '更新设置失败!'
      }
    }
    function setJsonFn(target, prefix, valJson){
      for(let item in valJson){
        valJson[item]!=''?target[prefix+'.'+item]=valJson[item]:''
      }
    }
  },
}
