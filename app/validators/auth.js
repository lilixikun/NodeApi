const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor() {

    }

    get m() {
        return async (ctx, next) => {
            //获取token
            const token = basicAuth(ctx.req);
            console.log(token);

            let errMsg = "token 不合法"
            if (!token || !token.name) {
                throw new global.errors.ForBbiden(errMsg)
            }

            // tokon严重
            try {
                var decode = jwt.verify(token.name, global.config.security.secretKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = "token 已过期"
                }
                throw new global.errors.ForBbiden(errMsg)
            }

            // 返回 uid decode
            ctx.auth = {
                uid: decode.uid,
                scope: decode.decode
            }

            await next()
        }
    }
}

module.exports = {
    Auth
}