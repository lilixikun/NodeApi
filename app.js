const koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init.js')
const catchError = require('./widdlewares/exception.js')
const app = new koa()

app.use(catchError)
InitManager.initCore(app)

app.use(parser())
app.on('error', (err, ctx) => {
    console.log('捕获到了!', err.message);
});

app.listen(8080)