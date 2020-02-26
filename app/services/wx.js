const util = require('util')
const axios = require('axios')

const { appid, secret, loginUrl } = require('../../config/config').wx

const { User } = require('../models/user')
const { generateToken } = require('../../core/utils')
const { Auth } = require('../validators/auth')

class WXManager {

    static async codeToToken(code) {

        const url = util.format(loginUrl, appid, secret, code);

        // 发起 http 请求
        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errors.AuthFailed('openid获取失败')
        }

        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode) {
            throw new global.errors.AuthFailed('openid获取失败:' + errmsg)
        }

        //获取 openid
        const openid = result.data.openid
        const user = await User.getUserByOpenid(openid)
        if (!user) {
            user = await User.registerByOpenid(openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}