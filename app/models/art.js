const { Op } = require('sequelize')

const { Movie, Sentence, Music } = require('./classic')

class Art {

    static async getList(atrInfoList) {
        // 三种 类型 三次 in 查询
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }

        for (const artInfo of atrInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }

        const arts = []
        for (const key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }
            arts.concat(await Art._getListByType(ids, parseInt(key)))
        }
        return arts
    }


    static async _getListByType(ids, type) {
        let arts = null
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }

        switch (type) {
            case 100:
                arts = await Movie.findOne(finder)
                break;
            case 200:
                arts = await Music.findOne(finder)
                break;
            case 300:
                arts = await Sentence.findOne(finder)
                break;
            case 400:

                break;
            default:
                return arts

        }
    }

    static async getData(art_id, type) {
        const finder = {
            where: {
                id: art_id
            }
        }
        let art = null
        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break;
            case 200:
                art = await Music.findOne(finder)
                break;
            case 300:
                art = await Sentence.findOne(finder)
                break;
            case 400:

                break;
            default:
                return art

        }
    }
}

module.exports = {
    Art
}