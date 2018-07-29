'use strict'

//const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')

function signUp(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save((err) => {
        if (err) res.status(500).send({message: `Error creating user: ${err}`})
        return res.status(200).send({message: 'User has been saved: ', token: service.createToken(user)})
    })
}

function signIn(req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        console.log(req.body.username)
        if (err) return res.status(500).send({message: err})
        if (!user) return res.status(404).send({message: 'The user does not exist'})
        req.user = user
        user.comparePassword(req.body.password, function (err, cb) {
            if (err) res.status(500).send({message: 'Error comparing passwords'})
            if (cb) {
                res.status(200).send({
                    message:'Log in successful',
                    token: service.createToken(user)
        
                })
            }
            else {
                return res.status(400).send({message: 'Incorrect password'})
            }
        })
    })
}

module.exports = {
    signUp,
    signIn
}