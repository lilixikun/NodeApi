
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

module.exports = {
    HttpException,
    ParameterException
}