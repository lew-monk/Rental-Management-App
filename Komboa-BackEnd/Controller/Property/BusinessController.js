const Business = require('../../Models/Property/BusinessModel')

const registerBusiness = async (req, res) => {
    console.log(req.body)
    try {
        const business = {
            businessName: req.body.data.businessName,
            OwnerId: req.body.OwnerId
        }
        const businessReg = new Business(business)
        const saveBusiness = await businessReg.save()
        res.send({ businessReg: true, saveBusiness })
    } catch (error) {
        console.log(error.message)
        res.send({ businessReg: false })
    }
}

const allBusinesses = async (req, res) => {
    try {
        await Business.find()
            .then(response => {
                res.send(response)
            })
            .catch(err => {
                console.log(err)
                res.send(null)
            })
    } catch (error) {
        console.log(error)
    }

}

module.exports = { registerBusiness, allBusinesses }