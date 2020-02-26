const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMID = 16
        Auth.SUPER_ADMID = 32
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


            //权限判断
            if (decode.scope < this.level) {
                throw new global.errors.ForBbiden('权限不足!')
            }

            // 返回 uid decode
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }

    static async verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}