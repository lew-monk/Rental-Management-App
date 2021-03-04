const House = require('../../Models/Property/HouseModel')

const multer = require('multer')

const fs = require('fs')

const bodyParser = require('body-parser')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split("/")
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({ storage: storage })
const houseUploads = upload.fields([{ name: 'propImage1', maxCount: 1 }, { name: 'propImage2', maxCount: 1 }, { name: 'propImage3', maxCount: 1 }])

const addProperty = (req, res) => {
    const obj = {
        category: req.body.houseCategory,
        Image1: {
            data: fs.readFileSync('./uploads/' + req.files['propImage1'][0].filename),
            contentType: 'image/png'
        },
        Image2: {
            data: fs.readFileSync('./uploads/' + req.files['propImage2'][0].filename),
            contentType: 'image/png'
        },
        Image3: {
            data: fs.readFileSync('./uploads/' + req.files['propImage3'][0].filename),
            contentType: 'image/png'
        },
        price: req.body.price,
        contact: req.body.contact
    }
    House.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/home');
        }
    })
}

const displayImages = (req, res) => {
    House.find()
        .then((result) => {
            res.render('./Tenant/View', { 'items': result })
            // res.send({ 'items': result })
            // res.send(JSON.stringify(result))
        })
        .catch(() => console.log(err))
}
const houseDetails = (req, res) => {
    const id = req.params._id
    House.findById(id)
        .then((result) => {
            res.render('./Tenant/Details', { result })
        })
        .catch((err) => {
            console.log(err)
        })

}


module.exports = { addProperty, houseUploads, displayImages, houseDetails }