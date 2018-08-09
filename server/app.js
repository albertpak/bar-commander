const express      = require('express')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const mongoose     = require('mongoose')

const mongoURI = require('./db')

mongoose.connect(mongoURI, { useNewUrlParser: true });

const userRoutes       = require('./routes/userRoutes')
const orderRoutes      = require('./routes/orderRoutes')
const ingredientRoutes = require('./routes/ingredientRoutes')
const productRoutes    = require('./routes/productRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', userRoutes)
app.use('/ingredients', ingredientRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/restaurants', restaurantRoutes)

module.exports = app