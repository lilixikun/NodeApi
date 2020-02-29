//模拟枚举
function isThisType(val) {
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
    isThisType
}


const ArtType = {
    MOVIE: 100,
    MUSIC: 200,
    SENTENCE: 300,
    BOOK: 400,
    isThisType
}

module.exports = {
    LoginType,
    ArtType
}