'use strict'

const Temporada = require('../models/temporada')

function getTemporades(req, res) {
    Temporada.find({}, (err, temporades) => {
        if (err) return res.status(500).send({message: "Error getting all temporades"})
        res.status(200).send(temporades)
    })
}

function saveTemporada(req, res) {
    console.log('POST /api/temporada')
    console.log(req.body)
    let temporada = new Temporada()
    temporada.type = req.body.type
    temporada.date = req.body.date
    temporada.save((err, temporadaStored) => {
        if (err) res.status(500).send('Could not save the temporada')
        res.status(200).send({temporada: temporadaStored})
    })
}

function deleteTemporada(req, res) {
    let temporadaId = req.params.temporadaId
    Temporada.findById(temporadaId, (err, temporada) => {
        if (err) res.status(500).send({message: "Error finding temporada"})
        temporada.remove(err => {
            if (err) res.status(500).send({message: "Error deleting temporada"})
            res.status(200).send({message: "Temporada deleted successfully"})
        })
    })
}

module.exports = {
    getTemporades,
    saveTemporada,
    deleteTemporada
}