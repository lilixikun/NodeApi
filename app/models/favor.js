const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

class Favor extends Model {

    static async like(arr_id, type, uid) {
        // 1. 加入数据
        // 2. 统计总数
        const favor = await Favor.findOne({
            where: {
                arr_id,
                type,
                uid
            }
        })

        if (favor) {
            throw new global.errors.LikeError()
        }
        //数据库事务
        return sequelize.transaction(async t => {
            await Favor.create({
                arr_id,
                type,
                uid
            }, { transaction: t })
            const art = await Art.getData(arr_id, type);
            await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    static async dislike(arr_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                arr_id,
                type,
                uid
            }
        })

        if (!favor) {
            throw new global.errors.disLikeError()
        }
        //数据库事务
        return sequelize.transaction(async t => {
            // force :false 软删除
            await Favor.destroy({
                force: true,
                transaction: t
            }, {})
            const art = await Art.getData(arr_id, type);
            await art.decrement('fav_nums', { by: 1, transaction: t })
        })
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}