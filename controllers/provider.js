'use strict'

const Provider = require('../models/provider')

function getProvider(req, res) {
    let providerId = req.params.providerId
    Client.findById(providerId, (err, provider) => {
        if (err) return res.status(500).send({message: 'Error looking for provider'})
        if (!provider) return res.status(404).send({message: 'The provider does not exist'})
        res.status(200).send({provider})
    })
}

function getProviders(req, res) {
    Provider.find({}, (err, providers) => {
        if (err) return res.status(500).send({message: "Error getting all providers"})
        res.status(200).send(providers)
    })
}

function saveProvider(req, res) {
    console.log('POST /api/provider')
    console.log(req.body)
    let provider = new Provider()
    provider.name = req.body.name
    provider.surname = req.body.surname
    provider.telephone = req.body.telephone
    provider.email = req.body.email
    provider.cp = req.body.cp
    provider.town = req.body.town
    provider.address = req.body.address
    provider.dni_nif = req.body.dni_nif
    provider.accountNumber = req.body.accountNumber

    provider.save((err, providerStored) => {
        if (err) res.status(500).send('Could not save the provider')
        res.status(200).send({client: providerStored})
    })
}

function updateProvider(req, res) {
    let providerId = req.params.providerId
    let body = req.body
    Provider.findByIdAndUpdate(providerId, body, (err, updatedProvider) => {
        if (err) res.status(500).send('Could not update the provider')
        let newProvider = new Provider()
        newProvider.providerId = providerId
        newProvider.name = req.body.name
        newProvider.surname = req.body.surname
        newProvider.telephone = req.body.telephone
        newProvider.email = req.body.email
        newProvider.cp = req.body.cp
        newProvider.town = req.body.town
        newProvider.address = req.body.address
        newProvider.dni_nif = req.body.dni_nif
        newProvider.accountNumber = req.body.accountNumber
        res.status(200).send({provider: newProvider})
    })
}

function deleteProvider(req, res) {
    let providerId = req.params.providerId
    Provider.findById(providerId, (err, provider) => {
        if (err) res.status(500).send({message: "Error finding provider"})
        provider.remove(err => {
            if (err) res.status(500).send({message: "Error deleting provider"})
            res.status(200).send({message: "Provider deleted successfully"})
        })
    })
}

module.exports = {
    getProvider,
    getProviders,
    saveProvider,
    updateProvider,
    deleteProvider
}