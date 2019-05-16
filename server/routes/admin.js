const router = require('koa-router')()
const controller = require('../controller')
router.prefix('/admin')

router
  .get('/', function (ctx, next) {
    ctx.body = 'this is a admin response!'
  })
  .post('/reg', controller.admin.api_admin_reg)
  .post('/login', controller.admin.api_admin_login)
  .patch('/edit', controller.admin.edit_admin)
  .get('/tags/get', controller.article.get_tags)
  .post('/tags/add', controller.article.add_tag)
  .patch('/tags/edit/:id', controller.article.edit_tag)
  .delete('/tags/del/:id', controller.article.del_tag)
  .post('/article/add', controller.article.add_article)
  .get('/article/list', controller.article.get_article_list)
  .get('/article/get/:id', controller.article.get_article)
  .patch('/article/edit/:id', controller.article.edit_article)
  .delete('/article/del/:id', controller.article.del_article)
  .get('/setting/get', controller.setting.get_setting)
  .patch('/setting/edit', controller.setting.edit_setting)
  .patch('/edit_work', controller.work.edit_work)
  .post('/add_work', controller.work.add_work)
  .delete('/del_work', controller.work.del_work)
module.exports = router