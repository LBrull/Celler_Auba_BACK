'use strict'

const Client = require('../models/client')

function getClient(req, res) {
    let clientId = req.params.clientId
    Client.findById(clientId, (err, client) => {
        if (err) return res.status(500).send({message: 'Error looking for client'})
        if (!client) return res.status(404).send({message: 'The client does not exist'})
        res.status(200).send({client})
    })
}

function getClients(req, res) {
    Client.find({}, (err, clients) => {
        if (err) return res.status(500).send({message: "Error getting all clients"})
        //if (clients.length == 0) return res.status(200).send({message: "Empty collection"})
        res.status(200).send(clients)
    })
}

function saveClient(req, res) {
    console.log('POST /api/client')
    console.log(req.body)
    let client = new Client()
    client.name = req.body.name
    client.surname = req.body.surname
    client.telephone = req.body.telephone
    client.email = req.body.email
    client.cp = req.body.cp
    client.town = req.body.town
    client.address = req.body.address
    client.dni_nif = req.body.dni_nif
    client.accountNumber = req.body.accountNumber

    client.save((err, clientStored) => {
        if (err) res.status(500).send('Could not save the client')
        res.status(200).send({client: clientStored})
    })
}

function updateClient(req, res) {
    let clientId = req.params.clientId
    let body = req.body
    Client.findByIdAndUpdate(clientId, body, (err, updatedClient) => {
        if (err) res.status(500).send('Could not update the client')
        res.status(200).send({client: updatedClient})
    })
}

function deleteClient(req, res) {
    let clientId = req.params.clientId
    Client.findById(clientId, (err, client) => {
        if (err) res.status(500).send({message: "provider"})
        client.remove(err => {
            if (err) res.status(500).send({message: "Error deleting client"})
            res.status(200).send({message: "Client deleted successfully"})
        })
    })
}

module.exports = {
    getClient,
    getClients,
    saveClient,
    updateClient,
    deleteClient
}