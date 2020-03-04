const { Sequelize, Model, Op } = require('sequelize')

const { sequelize } = require('../../core/db')
const { Favor } = require('./favor')

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })

        let ids = []
        books.forEach(item => ids.push(item.item.id))
        const favor = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids
                }
            },
            group: ['art_id'],
            //求和
            attributes: ['art_id', Sequelize.fn('COUNT', '*'), 'count']
        })
        return favor
    }
}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}