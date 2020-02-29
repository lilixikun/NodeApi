
class HttpException extends Error {
    constructor(errorCode = 10000, msg = '服务区异常', code = 400) {
        super()
        this.errorCode = errorCode;
        this.msg = msg;
        this.code = code
    }
}


class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400;
        this.msg = msg || "参数错误";
        this.errorCode = errorCode || 1000;
    }
}

//操作成功
class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}


class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || '未找到'
        this.errorCode = errorCode || 404
    }
}


class ForBbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 1006
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || '未找到'
        this.errorCode = errorCode || 1004
    }
}


class LikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '您已经点过赞了!'
        this.errorCode = errorCode || 6001
    }
}

class disLikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '您已经取消点赞!'
        this.errorCode = errorCode || 6002
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    ForBbiden,
    LikeError,
    disLikeError
}