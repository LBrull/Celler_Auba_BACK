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
    temporada.active = req.body.active
    temporada.save((err, temporadaStored) => {
        if (err) res.status(500).send('Could not save the temporada')
        res.status(200).send({temporada: temporadaStored})
    })
}

function deleteTemporada(req, res) {
    console.log('DELETE /api/temporada/:temporadaId')
    console.log('TEMPORADA ID: '+req.params.temporadaId)
    let temporadaId = req.params.temporadaId
    Temporada.findById(temporadaId, (err, temporada) => {
        if (err) res.status(500).send({message: "Error finding temporada"})
        temporada.remove(err => {
            if (err) res.status(500).send({message: "Error deleting temporada"})
            res.status(200).send({message: "Temporada deleted successfully"})
        })
    })
}

function updateTemporada(req, res) {
    let newTemporadaId = req.params.temporadaId
    let body = req.body
    Temporada.findOneAndUpdate({active: true}, {$set:{active:false}}, function(err, doc){
        if(err){
            console.log("Could not change the old active temporada to inactive");
        }
        console.log(doc);
    });

    Temporada.findByIdAndUpdate(temporadaId, body, (err, updatedTemporada) => {
        if (err) res.status(500).send('Could not update the temporada')
        let newTemporada = new Temporada()
        newTemporada.temporadaId = temporadaId
        newtemporada.type = req.body.type
        newTemporada.date = req.body.date
        newTemporada.active = req.body.active
        res.status(200).send({temporada: newTemporada})
    })
}

module.exports = {
    getTemporades,
    saveTemporada,
    deleteTemporada,
    updateTemporada
}