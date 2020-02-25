const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {

    static initCore(app) {
        //入口方法
        InitManager.app = app;
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
    }

    //初始化路由
    static initLoadRouters() {
        //自动加载路由
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, { visit: whenLoadModule })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadHttpException() {
        const errors = require('./httpException');
        global.errors = errors
    }
}

module.exports = InitManager