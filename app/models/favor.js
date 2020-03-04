const { sequelize } = require('../../core/db')

const { Sequelize, Model, Op } = require('sequelize')
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

    static async getMyClassicFavors(uid) {
        // 查询不包括 400的 收藏
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })

        if (!arts) {
            throw new global.errors.NotFound()
        }

        // 数组 arts 循环查询数据库? ->危险
        // for (const art of arts) {
        //     Art.getData()
        // }

        // sql in 查询
        return await Art.getList(arts)
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