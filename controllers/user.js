'use strict'

//const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })
    user.save((err) => {
        if (err) res.status(500).send({message: 'Error creating user'})
        return res.status(200).send({message: 'This is your token: ', token: service.createToken(user)})
    })
}

function signIn(req, res) {
    User.find({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({message: err})
        if (!user) return res.status(404).send({message: 'The user does not exist'})
        req.user = user
        res.status(200).send({
            message:'Log in successful',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}