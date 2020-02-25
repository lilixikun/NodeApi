//重命名
const { sequelize } = require('../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {

}

User.init({
    // id 编号最好数字 不要用随机数 GUID   也不要用字符串
    // 并发 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //主键
        autoIncrement: true //自增
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})