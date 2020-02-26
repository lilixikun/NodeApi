
const Router = require('koa-router')
const { User } = require('../../models/user.js')
const { success } = require('../../lib/helper')
const router = new Router({
    prefix: '/v1/user'
})


router.post('/register', async (ctx) => {

    const { nickname, email, password, openid } = ctx.request.body;
    const user = {
        nickname,
        email,
        password,
        openid
    }

    if (!nickname || !email || !password) {
        throw new global.errors.ParameterException('参数不全!')
    }

    const rs = await User.findOne({
        where: {
            email: email
        }
    })
    if (!!rs) {
        throw new global.errors.ParameterException('该账户已注册!')
    }

    await User.create(user);

    // 用抛出异常的方式返回Success
    throw new global.errors.Success()

    // 定义方法返回
    // success()
})

module.exports = router

// token 无意义的随机字符串
// jwt 携带数据的token  uid