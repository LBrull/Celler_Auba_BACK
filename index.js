'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

const Client = require('./models/client')
const Provider = require('./models/provider')
const Product = require('./models/product')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//////////////////////////ROUTES//////////////////////////////////////////
app.get('/api/clients', (req, res) => {
    Client.find({}, (err, clients) => {
        if (err) return res.status(500).send({message: "Error getting all clients"})
        if (clients.length == 0) return res.status(200).send({message: "Empty collection"})
        res.status(200).send(clients)
    })
})

app.get('/api/providers', (req, res) => {
    Provider.find({}, (err, providers) => {
        if (err) return res.status(500).send({message: "Error getting all clients"})
        if (providers.length == 0) return res.status(200).send({message: "Empty collection"})
        res.status(200).send(providers)
    })
})

app.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: "Error getting all products"})
        if (products.length == 0) return res.status(200).send({message: "Empty collection"})
        res.status(200).send(products)
    })
})

app.post('/api/client', (req, res) => {
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

})

app.post('/api/provider', (req, res) => {
    console.log('POST /api/client')
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
        if (err) res.status(500).send('Could not save the client')
        res.status(200).send({provider: providerStored})
    })
})

app.post('/api/product', (req, res) => {
    console.log('POST /api/product')
    console.log(req.body)
    let product = new Product()
    product.code = req.body.code
    product.description = req.body.description
    product.price = req.body.price

    product.save((err, productStored) => {
        if (err) res.status(500).send('Could not save the product')
        res.status(200).send({product: productStored})
    })
})

app.put('/api/client/:clientId', (req, res) => {

})

app.put('/api/provider/:providerId', (req, res) => {

})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/client/:clientId', (req, res) => {
    let clientId = req.params.clientId
    Client.findById(clientId, (err, client) => {
        if (err) res.status(500).send({message: "Error finding client"})
        client.remove(err => {
            if (err) res.status(500).send({message: "Error deleting client"})
            res.status(200).send({message: "Client deleted successfully"})
        })
    })
})

app.delete('/api/provider/:providerId', (req, res) => {
    let providerId = req.params.providerId
    Provider.findById(providerId, (err, provider) => {
        if (err) res.status(500).send({message: "Error finding provider"})
        provider.remove(err => {
            if (err) res.status(500).send({message: "Error deleting provider"})
            res.status(200).send({message: "Provider deleted successfully"})
        })
    })
})

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: "Error finding product"})
        product.remove(err => {
            if (err) res.status(500).send({message: "Error deleting product"})
            res.status(200).send({message: "Product deleted successfully"})
        })
    })
})

//////////////////////////////////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/celler_aubarcaDB', {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.log('Failed to connect to mongo server')
    }
    console.log('Connected successfully to celler_aubarcaDB')
    
    app.listen(3000, () => {
    console.log(`Server running on http://localhost:${port}`)
    })
})

