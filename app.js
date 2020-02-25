const koa = require('koa')
const InitManager = require('./core/init.js')
const app = new koa()


InitManager.initCore(app)

console.log(process.cwd());


app.listen(8080)