const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    hoursOfWork: {
        type: Number,
        required: true
    },
    rateOfWork: {
        type: Number,
        required: true
    },
    labourNeeded: {
        type: Number,
        required: true
    },
    material: {
        type: Array,
        required: true
    },
    workExpense: {
        type: Number,
        required: true
    },
    status: {
        type: String,
    },
    notes: {
        type: Object
    }
})

module.exports = mongoose.model('Invoice', invoiceSchema)