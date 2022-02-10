const { Router } = require("express");
const Invoice = require("../models/Invoice")

const router = Router()

router.get("/", async (req, res) => {
    try {
        const invoices = await Invoice.find()
        res.json(invoices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/", async (req, res) => {
    const invoice = new Invoice({
        dueDate: req.body.dueDate,
        hoursOfWork: req.body.hoursOfWork,
        rateOfWork: req.body.rateOfWork,
        labourNeeded: req.body.labourNeeded,
        material: req.body.material,
        workExpense: req.body.workExpense,
        status: req.body.status,
        notes: req.body.notes
    })
    try {
        const newInvoice = await invoice.save()
        res.status(201).json(newInvoice)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get details of individual invoice
router.get("/:id", getInvoice, (req, res) => {
    res.status(200).json(res.invoice)
})

//update individual invoice status and other details
router.patch("/:id", getInvoice, async (req, res) => {
    if (req.body.dueDate != null) {
        res.invoice.dueDate = req.body.dueDate
    }
    if (req.body.hoursOfWork != null) {
        res.invoice.hoursOfWork = req.body.hoursOfWork
    }
    if (req.body.rateOfWork != null) {
        res.invoice.rateOfWork = req.body.rateOfWork
    }
    if (req.body.labourNeeded != null) {
        res.invoice.labourNeeded = req.body.labourNeeded
    }
    if (req.body.material != null) {
        res.invoice.material = req.body.material
    }
    if (req.body.workExpense != null) {
        res.invoice.workExpense = req.body.workExpense
    }
    if (req.body.status != null) {
        res.invoice.status = req.body.status
    }
    if (req.body.notes != null) {
        res.invoice.notes = req.body.notes
    }
    try {
        const updatedInvoice = await res.invoice.save()
        res.status(200).json(updatedInvoice)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete particular invoice
router.delete("/:id", getInvoice, async (req, res) => {
    try {
        await res.Invoice.remove()
        res.status(200).json({ message: "deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getInvoice(req, res, nxt) {
    let invoice
    try {
        invoice = await Invoice.findById(req.params.id)
        if (invoice == null) {
            return res.status(400).json({ message: "invoice does not exist" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.invoice = invoice
    nxt()
}


module.exports = router