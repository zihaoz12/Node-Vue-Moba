module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-vue-moba', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

    require('require-all')(__dirname + '/../models')
}