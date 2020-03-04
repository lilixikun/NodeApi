const { Sequelize, Model } = require('sequelize')
const { IsArray, clone, unset } = require('lodash')
const { dbName, user, password, host, port } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        //und
    }
})

sequelize.sync({
    force: false
})


// 全局控制返回字段
Model.prototype.toJSON = function () {
    let data = clone(this.getDataValues)
    unset(data, 'update+at')

    if (IsArray(this.exclude)) {
        this.exclude.forEach(value => {

        })
    }
}

module.exports = {
    sequelize
}