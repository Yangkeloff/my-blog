const router = require('koa-router')()

router.prefix('/admin')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a admin response!'
})

module.exports = router
