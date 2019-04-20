const mongoose = require('mongoose')
const tagQuery = require('../db/query/tags')
const Article = require('../db/models/article').Article
const Tag = require('../db/models/article').Tag
const {
  judge_source
} = require('../utils/token')
module.exports = {
  async get_tags(ctx, next) {
    try {
      let res = await tagQuery.find_all()
      let arr = [{
          '$unwind': "$article_tags"
        },
        {
          '$group': {
            "_id": "$article_tags",
            "count": {
              '$sum': 1
            }
          }
        }
      ]
      let mark = await judge_source(ctx)
      if (!mark) {
        arr.unshift({
          '$match': {
            "article_state": 1
          }
        })
      }

      let article_num_list = await Article.aggregate(arr)
      ctx.body = {
        code: 200,
        msg: '获取标签列表成功！',
        data: res,
        data: {
          tags_list: res,
          article_num_list
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '获取标签列表失败,服务器繁忙!'
      }
    }
  },
  async add_tag(ctx, next) {
    let {
      tags_name,
      tags_desc
    } = ctx.request.body
    try {
      let res = await tagQuery.find_by_tagName(tags_name)
      if (res.length !== 0) {
        ctx.body = {
          code: 409,
          msg: '此标签名已经被创建了，请换一个名字吧！'
        }
        return
      }
      let tag = await new Tag({
        tags_name,
        tags_desc
      }).save()
      if (tag) {
        ctx.body = {
          code: 200,
          msg: '创建新标签成功！',
          data: tag
        }
      } else {
        ctx.body = {
          code: 200,
          msg: '创建标签失败！'
        }
      }

    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '添加标签失败'
      }
    }
  },
  async edit_tag(ctx, next) {
    let _id = ctx.params.id
    let {
      tags_name,
      tags_desc
    } = ctx.request.body

    try {
      if (_id.length != 24) {
        ctx.body = {
          code: 401,
          msg: '_id有误！'
        }
        return
      }
      let res = await tagQuery.find_by_id(_id)
      if (res.length === 0) {
        ctx.body = {
          code: 401,
          msg: '_id有误！'
        }
        return
      }
      if (res[0].tags_name != tags_name) {
        // 验证名字是否重复
        res = await tagQuery.find_by_tagName(tags_name)
        if (res.length !== 0) {
          ctx.body = {
            code: 409,
            msg: '此标签名已经被创建了，请换一个名字吧！'
          }
          return
        }
      }
      res = await tagQuery.update(_id, {
        tags_name,
        tags_desc
      })
      if (res) {
        ctx.body = {
          code: 200,
          msg: '修改成功！',
          data: res
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '修改失败！'
        }
      }

    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '修改标签失败'
      }
    }
  },
  async del_tag(ctx, next) {
    let _id = ctx.params.id
    try {
      if (_id.length != 24) {
        ctx.body = {
          code: 401,
          msg: '_id有误！'
        }
        return
      }
      let res = await tagQuery.delete(_id)
      ctx.body = {
        code: 200,
        msg: '删除标签成功！'
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '删除标签失败'
      }
    }
  },
  async add_article(ctx, next) {
    let {
      article_title = '',
      article_tags = [],
      article_state = 0,
      article_cover = '',
      article_desc = '',
      article_content = ''
    } = ctx.request.body
    try {
      if(article_title == '' || article_content == ''){
        ctx.body = {
          code: 401,
          msg: '文章标题和文章内容不能为空！'
        }
        return
      }
  
      let article = new Article({
        article_title,
        article_tags,
        article_state,
        article_cover,
        article_desc,
        article_content
      })
      let res = await article.save()
      if(res){
        ctx.body = {
          code: 200,
          msg: '添加文章成功！'
        }
      }else {
        ctx.body = {
          code: 500,
          msg: '添加文章失败！'
        }
      }
    }catch(e){
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '添加文章失败！'
      }
    }
  }
}