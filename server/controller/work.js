const Work = require('../db/models/work').Work
const workQuery = require('../db/query/work')

module.exports = {
  async get_works(ctx) {
    let {current_page = 1, page_size = 10} = ctx.query
    try {
      let options = {
        sort: {'works_time': '-1'},
        skip: Number((current_page-1)*page_size),
        limit: Number(page_size)
      }

      let res = await workQuery.find_all({options})
      ctx.body = {
        code: 200,
        msg: '查询成功！',
        data: res
      }
      
    } catch (e){
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '查询失败'
      }
    }
  },
  async add_work(ctx) {
    let msg = "添加作品失败!"
    let {
      works_name = '',
      works_desc = '',
      works_time = '',
      works_website = '',
      works_cover = ''
    } = ctx.request.body
    try {
      let work = new Work({
        works_name,works_desc,works_time,works_website,works_cover
      })
      let res = await work.save()
      if(res){
        ctx.body = {
          code: 200,
          msg: '添加作品成功！',
          data: res
        }
      }else {
        ctx.body = {
          code: 500,
          msg: "添加作品失败!"
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: "添加作品失败!"
      }
    }
  },
  async edit_work(ctx) {
    let _id = ctx.params.id
    let {
      works_name = '',
      works_desc = '',
      works_time = '',
      works_website = '',
      works_cover = ''
    } = ctx.request.body

    try {
      if(_id.length != 24){
        ctx.body = {
          code: 401,
          msg: '修改作品失败，作品id号不正确！'
        }
        return
      }

      let res = await workQuery.find_all({
        querys: {_id}
      })
      if(res.length == 0){
        ctx.body = {
          code: 401,
          msg: '修改作品失败，作品id号不正确！'
        }
        return
      }

      res = await workQuery.update(_id,{
        works_name,works_desc,works_time,works_website,works_cover
      })
      if(res){
        ctx.body = {
          code: 200,
          msg: '修改作品成功！'
        }
      }else {
        ctx.body = {
          code: 500,
          msg: '修改作品失败！'
        }
      }
    } catch (e) {
    console.log(e)
    ctx.body = {
      code: 500,
      msg: '修改作品失败！'
    }
    }
  },
  async del_work(ctx) {
    let _id = ctx.params.id
    try{
      if(_id.length != 24){
        ctx.body = {
          code: 401,
          msg: '作品删除失败，作品id有误!'
        }
        return
      }
      let res = await workQuery.delete(_id)
      ctx.body = {
        code: 200,
        msg: '作品删除成功！'
      }
    }catch(e){
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '删除作品失败！'
      }
    }
  }
}