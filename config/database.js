const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost:27017/user-authentication-initial`, {useNewUrlParser : true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('erroe connecting to db')
    })

module.exports = { mongoose }
