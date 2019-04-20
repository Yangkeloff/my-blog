const router = require('koa-router')()
const controller = require('../controller')
router.prefix('/admin')

router
  .get('/', function (ctx, next) {
    ctx.body = 'this is a admin response!'
  })
  .post('/reg', controller.admin.api_admin_reg)
  .post('/login', controller.admin.api_admin_login)
  .get('/tags/get', controller.article.get_tags)
  .post('/tags/add', controller.article.add_tag)
  .patch('/tags/edit/:id', controller.article.edit_tag)
  .delete('/tags/del/:id', controller.article.del_tag)
  .post('/article/add', controller.article.add_article)
module.exports = router