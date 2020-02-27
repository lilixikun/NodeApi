const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})

const { Flow } = require('../../models/flow')

const { Auth } = require('../../validators/auth')

router.get('/latest', new Auth().m, async (ctx, next) => {
    // 找 index 最大 max
    // 排序 1 2 3 ... max
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    console.log(flow);

    ctx.body = flow
})

module.exports = router