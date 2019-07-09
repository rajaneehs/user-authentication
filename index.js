const express = require('express')
const { mongoose } = require('./config/database')

const {usersRouter} = require('./app/controllers/UsersControllers')
const app = express()
const port = 3000

app.use(express.json())

app.use('/users',usersRouter)

app.listen(port, function(){
    console.log('listening to port', port)
})