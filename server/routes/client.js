const router = require('koa-router')()
const controller = require('../controller')

router.prefix('/client')

router
  .get('/', function (ctx, next) {
    ctx.body = 'this is a client response!'
  })
  .get('/article_list', controller.article.get_article_list)
  .get('/get_tags', controller.article.get_tags)


module.exports = router
