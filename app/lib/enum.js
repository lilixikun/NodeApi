//模拟枚举
function isLoginType(val) {
    for (const key in this) {
        if (this[key] == val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_XCX: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMID_EMAIL: 103,
    isLoginType
}

module.exports = {
    LoginType
}