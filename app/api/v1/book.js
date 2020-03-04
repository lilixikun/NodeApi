const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/book'
})

const { HotBook } = require('../../models/hot-book')

router.get('/hot_list', (ctx, next) => {

    HotBook.getAll()
})

// 调用外部服务

// Node.js 中间层 微服务

module.exports = router