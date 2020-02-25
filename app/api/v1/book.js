const Router = require('koa-router')
const router = new Router()
const { ParameterException } = require('../../../core/httpException')
const { PositiveIntegerValidator } = require('../../validators/validators')
router.get('/v1/:id/book/latest', (ctx, next) => {

    //const res = new PositiveIntegerValidator().validate()

    // if (true) {
    //     const error = new ParameterException();
    //     throw error
    // }
})

module.exports = router