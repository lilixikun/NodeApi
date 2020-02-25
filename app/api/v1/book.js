const Router = require('koa-router')
const router = new Router()
const { ParameterException } = require('../../../core/httpException')

router.get('/v1/book/latest', (ctx, next) => {
    if (true) {
        const error = new ParameterException();
        throw error
    }
})

module.exports = router