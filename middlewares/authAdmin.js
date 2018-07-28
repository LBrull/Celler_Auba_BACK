'use strict'

const User = require('../models/user')

function isAuthAdmin(req, res, next) {
    const username = req.body.adminusername
    const password = req.body.adminpassword
    User.findOne({ username: username }, function (err, user) {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'The user does not exist' })
        req.user = user
        user.comparePassword(password, function (err, cb) {
            if (err) res.status(500).send({ message: 'Error comparing passwords' })
            if (cb) {
                console.log('Authorization success')
                return next()
            }
            else {
                return res.status(400).send({ message: 'Incorrect password' })
            }
        })
    })
}
module.exports = isAuthAdmin