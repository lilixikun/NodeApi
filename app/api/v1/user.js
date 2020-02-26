
const Router = require('koa-router')
const { User } = require('../../models/user.js')
const { success } = require('../../lib/helper')
const router = new Router({
    prefix: '/v1/user'
})


router.post('/register', async (ctx) => {

    const parms = ctx.request.body;
    const user = {
        nickname: parms.nickname,
        email: parms.email,
        password: parms.password,
        openid: parms.openid
    }



    const rs = await User.findOne({
        where: {
            email: parms.email
        }
    })
    console.log(rs);

    //  参数校验
    // const r = await User.create(user);
    // console.log(r);

    // 用抛出异常的方式返回Success
    throw new global.errors.Success()

    // 定义方法返回
    // success()
})

module.exports = router