'use strict'

const Albara = require('../models/albara')

function getAlbaransIn(req, res) {
    Albara.find({in: true}, (err, albarans) => {
        if (err) return res.status(500).send({message: 'Error getting in albarans'})
        res.status(200).send({albarans})
    })
}

function getAlbaransOut(req, res) {
    Albara.find({in: false}, (err, albarans) => {
        if (err) return res.status(500).send({message: "Error getting out albarans"})
        res.status(200).send(albarans)
    })
}
module.exports = {
    getAlbaransIn,
    getAlbaransOut
}