'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

UserSchema.pre('save', function (next) {

  if (!this.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

UserSchema.methods.checkPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        console.log(candidatePassword)
        //console.log(this.password)
        //if (err) return false
        //if (isMatch) return true
        //return false
        console.log(this.model('User').find({ username: 'LauraBrull' }, cb))
    });
}

module.exports = mongoose.model('User', UserSchema)