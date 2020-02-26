const basicAuth = require('basic-auth')

class Auth {
    constructor() {

    }

    get m() {
        return async (ctx, next) => {
            // token 检测
            // token 开发者传递 ->header
            const token = basicAuth(ctx.req);
        
            ctx.body=token
        }
    }
}

module.exports={
    Auth
}