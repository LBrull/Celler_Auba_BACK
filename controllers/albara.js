'use strict'

const Client = require('../models/albara')

function getAlbaransIn(req, res) {
    Albara.find({in: true}, (err, albarans) => {
        if (err) return res.status(500).send({message: 'Error getting in albarans'})
        res.status(200).send({albarans})
    })
}

function getAlbaransOut(req, res) {
    Client.find({in: false}, (err, albarans) => {
        if (err) return res.status(500).send({message: "Error getting out albarans"})
        res.status(200).send(albarans)
    })
}