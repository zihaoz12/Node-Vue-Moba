const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name:{
        type:String
    },
    icon:{
        type:String
    }
})

module.exports =  mongoose.model('Item',ItemSchema)