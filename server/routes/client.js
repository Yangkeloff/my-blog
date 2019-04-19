const router = require('koa-router')()

router.prefix('/client')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a client response!'
})

module.exports = router
