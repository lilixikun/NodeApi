const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})

const { Auth } = require('../../validators/auth')

router.get('/latest', new Auth().m, (ctx, next) => {
    ctx.body = 'classic'
})

module.exports = router