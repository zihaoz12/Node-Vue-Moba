module.exports = app =>{
    const router = require('express').Router()
    const mongoose = require('../../models/Article')
    // const Article = require('../../models/Article')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    router.get('/news/init', async(req,res)=>{
        const parent = await Category.findOne({
            name: 'News'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles =  ["天后张靓颖倾情献唱，王者荣耀西施主打歌《幻纱之灵》正式上线", "西施主打歌《幻纱之灵》即将上线，张靓颖携手KPL明星轰炸斗鱼直播间", "新晋越剧女小生，王者荣耀·上官婉儿全息首演！", "峡谷四美明星集结，给你一个免费COS的机会！", "全民赢官方周边", "11月12日全服不停机更新公告", "【已重新开启】翻牌达人活动暂时关闭公告", "11月14日体验服不停机更新公告", "11月12日体验服停机更新公告", "亲密度道具使用异常说明", "KPL季后赛开赛 参与活动送好礼", "【翻牌达人】抢SNK机器人", "告别孤单 浪漫峡谷陪你狂欢 秒杀皮肤限时返场", "感恩有你 李白新星元登场 峡谷全新福利来袭", "【周年许愿树】活动公告", "高校赛区域联赛线下赛周末打响，王者少年的英雄梦时刻！", "王者荣耀高校联赛海选赛步入第四周，峡谷追梦就是此刻", "竞猜城市赛总决赛冠军，线上“城市探秘”加码送好礼！", "2019年KPL秋季赛季后赛11月14日开战，冬季冠军杯选拔赛即将来袭", "你是赛评师：YTG再次被TS阻击倒在季后赛门外，TS真的天克YTG吗？"]
        const newsList = newsTitles.map(title=>{
            const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
            return{
                categories:randomCats.slice(0, 2),
                title:title
            }
        }) 
        await Article.deleteMany({}) //delete previouse data  
        await Article.insertMany(newsList) //insert this random newsTitles
        res.send(newsList)
    }) 


    router.get('/news/list', async(req, res)=>{
        // const parent = await Category.findOne({
        //     name: 'News'
        // })
        // .populate({
        // path:'children',
        // populate:{
        //     path:'newsList'
        // }
        // }).lean()
        const parent = await Category.findOne({
            name: 'News'
        })
        const cats = await Category.aggregate([
            {$match: {parent: parent._id} },
            {$lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: 'categories',
                as:'newsList'
                }
            },
            {$addFields: {
                newsList:{ $slice: ['$newsList', 5]}
            }}
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name:'Hot',
            newsList: await Article.find().where({
                categories:{ $in: subCats}
            }).populate('categories').limit(5).lean()
        })
        cats.map( cat => {
            cat.newsList.map(news =>{
                news.categoryName = ( cat.name === 'Hot') 
                 ? news.categories[0].name : cat.name

                return news
            })
            return cat
        })

        res.send(cats)
    })

    app.use('/web/api', router)
}