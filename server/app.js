const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const db = require('./db')
const index = require('./routes/index')
const admin = require('./routes/admin')
const client = require('./routes/client')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//db connection
mongoose.connect(db.uri, {useNewUrlParser: true}, (err) => {
  if(!err) {
    console.log('connected')
  } else {
    console.error(err)
  }
})
// routes
app.use(index.routes(), index.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(client.routes(), client.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
