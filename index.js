const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => { console.log(error) })
db.once('open', () => { console.log("database connection established...") })

app.use(express.json())
const invoiceRouter = require('./routes/invoiceroutes')
app.use('/invoice', invoiceRouter)

app.listen(3000, () => { console.log("server started...") })