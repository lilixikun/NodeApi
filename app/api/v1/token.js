
const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/httpException')

const router = new Router({
    prefix: '/v1/token'
})


router.post('/', async (ctx) => {
    const body = ctx.request.body;
    if (!LoginType.isLoginType(body.type)) {
        throw new ParameterException('type 类型不对')
    }
    switch (body.type) {
        case LoginType.USER_EMAIL:
            await emailLogin(body.account, body.secret)
            break;
        case LoginType.USER_XCX:

            break;

        default:
            throw new global.errors.ParameterException('没有相应的函数处理!')
    }
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router

// token 无意义的随机字符串
// jwt 携带数据的token  uid