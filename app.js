const koa = require('koa')
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const app = new koa()

//自动加载路由
requireDirectory(module, './api', { visit: whenLoadModule })

const book = require('./api/v1/book')
const classic = require('./api/v1/classic')

function whenLoadModule(obj) {
    if (obj instanceof Router) {
        app.use(obj.routes())
    }
}

// app.use(book.routes())
// app.use(classic.routes())

app.listen(8080)