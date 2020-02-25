const Sequelize = require('sequelize')

const { dbName, user, password, host, port } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid:true,
        //und
    }
})

sequelize.sync({
    force: true
})

module.exports = {
    sequelize
}