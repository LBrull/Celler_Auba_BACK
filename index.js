'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const clientController = require('./controllers/client')
const providerController = require('./controllers/provider')
const productController = require('./controllers/product')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

////////////////////////// ROUTES /////////////////////////////
app.get('/api/clients', clientController.getClients)
app.get('/api/client/:clientId', clientController.getClient)
app.post('/api/client', clientController.saveClient)
app.put('/api/client/:clientId', clientController.updateClient)
app.delete('/api/client/:clientId', clientController.deleteClient)

app.get('/api/providers', providerController.getProviders)
app.get('/api/provider/:providerId', providerController.getProvider)
app.post('/api/provider', providerController.saveProvider)
app.put('/api/provider/:providerId', providerController.updateProvider)
app.delete('/api/provider/:providerId', providerController.deleteProvider)

app.get('/api/products', productController.getProducts)
app.get('/api/product/:productId', productController.getProduct)
app.post('/api/product', productController.saveProduct)
app.put('/api/product/:productId', productController.updateProduct)
app.delete('/api/product/:productId', productController.deleteProduct)

///////////////////////////// DB CONNECTION /////////////////////////////////////////
mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.log('Failed to connect to mongo server')
    }
    console.log('Connected successfully to celler_aubarcaDB')
    app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
    })
})

