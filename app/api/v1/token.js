
const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/httpException')

const { generateToken } = require('../../../core/utils')
const { Auth } = require('../../validators/auth')
const { WXManager } = require('../../services/wx')
const router = new Router({
    prefix: '/v1/token'
})


router.post('/', async (ctx) => {
    const body = ctx.request.body;
    if (!LoginType.isLoginType(body.type)) {
        throw new ParameterException('type 类型不对')
    }
    let token;
    switch (body.type) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(body.account, body.secret)
            break;
        case LoginType.USER_XCX:
            token = await WXManager.codeToToken(body.code)
            break;

        default:
            throw new global.errors.ParameterException('没有相应的函数处理!')
    }
    ctx.body = {
        token
    }
})


router.post('/verifyToken', async (ctx, next) => {
    const body = ctx.request.body;
    if (!body.token) {
        throw new ParameterException('token 不允许为空!')
    }
    const res = await Auth.verifyToken(body.token)
    
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)

    //生成令牌
    return generateToken(user.id, Auth.USER)
}

module.exports = router

// token 无意义的随机字符串
// jwt 携带数据的token  uid