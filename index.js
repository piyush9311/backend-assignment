// Import the required packages
const express = require('express')
const mongoose = require('mongoose')
const app = express()   // configure an express app
require('dotenv').config()

// mongodb database connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => { console.log(error) })
db.once('open', () => { console.log("database connection established...") })

app.use(express.json())
const invoiceRouter = require('./routes/invoiceroutes')
app.use('/invoice', invoiceRouter)

app.listen(3000, () => { console.log("server started...") })