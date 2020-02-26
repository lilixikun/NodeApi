
const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { ParameterException } = require('../../../core/httpException')

const router = new Router({
    prefix: '/v1/token'
})


router.post('/', async (ctx) => {
    if (!LoginType.isLoginType(ctx.request.body.type)) {
        throw new ParameterException('type 类型不对')
    }
})

module.exports = router

// token 无意义的随机字符串
// jwt 携带数据的token  uid