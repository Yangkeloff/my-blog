const router = require('koa-router')()
const controller = require('../controller')
router.prefix('/admin')

router
  .get('/', function (ctx, next) {
    ctx.body = 'this is a admin response!'
  })
  .post('/reg', controller.admin.api_admin_reg)
  .post('/login', controller.admin.api_admin_login)

module.exports = router