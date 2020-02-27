const koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init.js')
const catchError = require('./widdlewares/exception.js')

require('./app/models/user.js')
require('./app/models/classic.js')
require('./app/models/flow.js')

const app = new koa()

app.use(parser())
app.use(catchError)
InitManager.initCore(app)


app.on('error', (err, ctx) => {
    console.log('捕获到了!', err.message);
});

app.listen(8080)