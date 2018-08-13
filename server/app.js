const express    = require('express')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')

const mongoURI = require('./db')

mongoose.connect(mongoURI, { useNewUrlParser: true });

const userRoutes       = require('./routes/userRoutes')
const ingredientRoutes = require('./routes/ingredientRoutes')
const productRoutes    = require('./routes/productRoutes')
const orderRoutes      = require('./routes/orderRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const authRoutes       = require('./routes/authRoutes')

const auth = require("./helpers/auth")();  
const app  = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(auth.initialize());

app.use('/users', userRoutes)
app.use('/ingredients', ingredientRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/restaurants', restaurantRoutes)
app.use('/auth', authRoutes)

module.exports = app