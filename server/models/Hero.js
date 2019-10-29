const mongoose = require('mongoose')

const HeroSchema = new mongoose.Schema({
    name:{
        type:String
    },
    avatar:{
        type:String
    }
})

module.exports =  mongoose.model('Hero',HeroSchema)