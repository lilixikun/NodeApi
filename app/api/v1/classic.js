const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})

const { Flow } = require('../../models/flow')

const { Auth } = require('../../validators/auth')
const { Art } = require('../../models/art')
router.get('/latest', new Auth().m, async (ctx, next) => {
    // 找 index 最大 max
    // 排序 1 2 3 ... max
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)

    //  返回的都是模型 dataValues 下的值
    // art.dataValues.xx=xx
    art.setDataValue('index', flow.index)
    ctx.body = art
})

module.exports = router