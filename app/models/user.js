const bcryptjs = require('bcryptjs')
const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {
    static async verifyEmailPassword(email, password) {
        const user = await User.findOne({
            where: {
                email,
            }
        })
        if (!user) {
            throw new global.errors.NotFound('账号不存在!')
        }
        const correct = bcryptjs.compareSync(password, user.password)
        if (!correct) {
            throw new global.errors.AuthFailed('密码不正确!')
        }
        return user
    }
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
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            //生成盐
            const salt = bcryptjs.genSaltSync(10);
            //加密密码
            const pwd = bcryptjs.hashSync(val, salt);
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}