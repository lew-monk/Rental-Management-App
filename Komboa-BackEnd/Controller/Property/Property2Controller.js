const { Property, Image } = require("../../Models/Property/PropertyModel");
const { Listing } = require("../../Models/Listing/ListingModel");

const multer = require("multer");

const fs = require("fs");
const { response } = require("express");

const url = "mongodb://127.0.0.1:27017";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/property");
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/");
    cb(null, `${file.originalname}-${Date.now()}.${parts[1]}`);
  },
});

const upload = multer({ storage: storage }).array("file");

// const propertyUpload = upload.fields([{ name: 'files', maxCount: 6 }])

const registerProperty2 = (req, res) => {
  const images = () => {
    const read = [];
    for (let x = 0; x < req.files.length; x++) {
      const image = fs.readFileSync(
        "./uploads/property/" + req.files[x].filename
      );
      const Image = {
        data: image,
        contentType: "image/png",
      };
      read.push(Image);
    }
    return read;
  };

  const allFeatures = [];
  const features = req.body.Features;
  const feature = features.split(",");
  for (let val of feature) {
    allFeatures.push(val);
  }

  try {
    const propertyObj = {
      propertyName: req.body.Name,
      propertyDescription: req.body.Description,
      propertyLocation: {
        lat: req.body.LocationLat,
        lng: req.body.LocationLng,
      },
      propertyStatus: req.body.Status,
      propertyType: req.body.Type,
      propertyGallery: [images()],
      floors: req.body.Floors,
      propertyFeatures: allFeatures,
      postedBy: req.body.id,
    };
    const propertyInstance = new Property(propertyObj);

    propertyInstance.save();
    res.send(propertyInstance._id);
  } catch (error) {
    res.send(error.message);
  }
};

const test = async (req, res) => {
  const prop = await Property.find();
  res.send(prop);
};

const propertyDetails = (req, res) => {
  const { id } = req.params;
  try {
    Property.findById(id)
      .populate("postedBy")
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const userProperty = async (req, res) => {
  const { id } = req.params;
  try {
    await Property.find({ postedBy: id })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => err.message);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Listing.deleteMany({ postedBy: id }, (err, docs) => {
      if (err) {
        console.log(err.message);
      }
      Property.findByIdAndDelete(id, (err, docs) => {
        if (err) {
          console.log(err.message);
        } else {
          res.send("deleted");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

const editProperty = (req, res) => {
  const images = () => {
    const read = [];
    for (let x = 0; x < req.files.length; x++) {
      const image = fs.readFileSync(
        "./uploads/property/" + req.files[x].filename
      );
      const Image = {
        data: image,
        contentType: "image/png",
      };
      read.push(Image);
    }
    return read;
  };

  const allFeatures = [];
  const features = req.body.Features;
  const feature = features.split(",");
  for (let val of feature) {
    allFeatures.push(val);
  }

  const { id } = req.params;

  try {
    Property.findByIdAndUpdate(
      id,
      {
        propertyName: req.body.Name,
        propertyDescription: req.body.Description,
        propertyLocation: {
          lat: req.body.LocationLat,
          lng: req.body.LocationLng,
        },
        propertyStatus: req.body.Status,
        propertyType: req.body.Type,
        propertyGallery: [images()],
        floors: req.body.Floors,
        propertyFeatures: allFeatures,
        postedBy: req.body.id,
      },

      (err, doc) => {
        if (err) {
          console.log(err.message);
        }
      }
    )
      .then((response) => res.send(response._id))
      .catch((err) => console.log(err.message));
  } catch (error) {
    console.log(error.message);
  }
};

const findProperty = (req, res) => {
  try {
    Property.find({ propertyType: req.body.type }).then((response) =>
      res.send(response)
    );
  } catch (error) {
    console.log(error.message);
  }
};
const findPropertyName = (req, res) => {
  try {
    Property.find({ propertyName: req.body.title }).then((response) =>
      res.send(response)
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerProperty2,
  upload,
  test,
  propertyDetails,
  userProperty,
  deleteProperty,
  editProperty,
  findProperty,
  findPropertyName,
};
