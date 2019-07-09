const express = require('express')
const router = express.Router()
const {User} = require('../models/User')
const { authenticateUser } = require('../middlewares/authentication') 

// localhost:3000/users/register
router.post('/register', function(req,res) {
    const body = req.body
    // console.log(body)
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

// localhost:3000/users/login
router.post('/login', function(req,res) {
    const body = req.body
    // static method // own method
    User.findByCredentials(body.email, body.password)
        .then(function(user){
            return user.generateToken()
        })
        .then(function(token){
            res.setHeader('x-auth', token).send({})
        })
        .catch(function(err){
            res.send(err)
        })
})

// localhost:3000/users/account
router.get('/account', function(req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.status('401').send(err)
        })
})

// localhost:3000/users/logout
router.delete('/logout', authenticateUser, function(req,res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token }}})
        .then(function(){
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    usersRouter : router
}