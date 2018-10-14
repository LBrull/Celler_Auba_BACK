'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const clientController = require('./controllers/client')
const providerController = require('./controllers/provider')
const productController = require('./controllers/product')
const userController = require('./controllers/user')
const temporadaController = require('./controllers/temporada')
const albaraController = require('./controllers/albara')

const auth = require('./middlewares/auth')
const authAdmin = require('./middlewares/authAdmin')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

////////////////////////// ROUTES /////////////////////////////
app.get('/api/clients', auth, clientController.getClients)
app.get('/api/client/:clientId', auth, clientController.getClient)
app.post('/api/client', auth, clientController.saveClient)
app.put('/api/client/:clientId', auth, clientController.updateClient)
app.delete('/api/client/:clientId', auth, clientController.deleteClient)

app.get('/api/providers', auth, providerController.getProviders)
app.get('/api/provider/:providerId', auth, providerController.getProvider)
app.post('/api/provider', auth, providerController.saveProvider)
app.put('/api/provider/:providerId', auth, providerController.updateProvider)
app.delete('/api/provider/:providerId', auth, providerController.deleteProvider)

app.get('/api/products', auth, productController.getProducts)
app.get('/api/product/:productId', auth, productController.getProduct)
app.post('/api/product', auth, productController.saveProduct)
app.put('/api/product/:productId', auth, productController.updateProduct)
app.delete('/api/product/:productId', auth, productController.deleteProduct)

app.get('/api/temporades', auth, temporadaController.getTemporades)
app.post('/api/temporada', auth, temporadaController.saveTemporada)
app.put('/api/temporada/:temporadaId', auth, temporadaController.updateTemporada)
app.delete('/api/temporada/:temporadaId', auth, temporadaController.deleteTemporada)

app.get('/api/albaransIn', auth, albaraController.getAlbaransIn)
app.get('/api/albaransOut', auth, albaraController.getAlbaransOut)

app.get('/api/private', auth, (req,res) => {
    res.status(200).send({message: 'Authorized'})
})

// Only admin can signup a new user to the system.
// Admin has to enter his username and his password to get authorization
app.post('/api/signup',authAdmin, userController.signUp)
app.post('/api/signIn', userController.signIn)

///////////////////////////// DB CONNECTION /////////////////////////////////////////
mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.log('Failed to connect to mongo server')
    }
    console.log('Connected successfully to celler_aubarcaDB')
    app.listen(config.port, () => {
    })
})

