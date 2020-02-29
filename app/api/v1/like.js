const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/like'
})

const { Auth } = require('../../validators/auth')
const { Favor } = require('../../models/favor')
const { success } = require('../../lib/helper')

router.post('/', new Auth().m, async (ctx, next) => {

    const { art_id, type } = ctx.request.body;
    if (!art_id || !type) {
        throw new global.errors.ParameterException()
    }
    await Favor.like(art_id, type, ctx.auth.uid)
    success()
})


router.post('/cancel', new Auth().m, async (ctx, next) => {

    const { art_id, type } = ctx.request.body;
    if (!art_id || !type) {
        throw new global.errors.ParameterException()
    }
    await Favor.dislike(art_id, type, ctx.auth.uid)
    success()
})

module.exports = router