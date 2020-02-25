
const { HttpException } = require('../core/httpException.js')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (global.config.environment === 'dev') {
            throw error;
        }
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            //未知异常
            ctx.body = {
                msg: '服务端异常',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
    }
}

module.exports = catchError 