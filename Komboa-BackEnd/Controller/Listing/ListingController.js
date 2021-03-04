const { Listing } = require("../../Models/Listing/ListingModel");

const multer = require("multer");

const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/listing");
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/");
    cb(null, `${file.originalname}-${Date.now()}.${parts[1]}`);
  },
});

const uploadListing = multer({ storage: storage }).array("file");

const addListing = (req, res) => {
  const images = () => {
    const read = [];
    for (let x = 0; x < req.files.length; x++) {
      const image = fs.readFileSync(
        "./uploads/listing/" + req.files[x].filename
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
    const obj = {
      listingDescription: req.body.Description,
      listingType: req.body.Type,
      listingStatus: req.body.Status,
      listingBedrooms: req.body.Bedrooms,
      listingBathrooms: req.body.Bathrooms,
      listingFloors: req.body.Floors,
      listingArea: req.body.Areas,
      listingSize: req.body.Size,
      listingPrice: req.body.Price,
      listingVideo: req.body["Video-URL"],
      listingFeatures: allFeatures,
      listingGallery: [images()],
      postedBy: req.params.id,
      bookedBy: null,
    };

    const objInstances = new Listing(obj);
    objInstances.save();
    res.send(objInstances._id);
  } catch (error) {
    console.log(error.message);
  }
};

const getListings = (req, res) => {
  const { id } = req.params;
  const listings = Listing.find({ postedBy: id })
    .populate("bookedBy")
    .then((response) => res.send(response))
    .catch((err) => res.send(err.message));
};

const getDetails = (req, res) => {
  const { id } = req.params;
  const listing = Listing.findById(id)
    .populate("bookedBy")
    .then((response) => res.send(response))
    .catch((err) => console.log(err.message));
};

const bookListing = (req, res) => {
  const { id } = req.params;
  try {
    Listing.findByIdAndUpdate(
      id,
      { bookedBy: req.body.id },
      { useFindAndModify: false },
      (err, doc) => {
        if (err) {
          console.log(err.message);
        }
        res.send("booked");
        console.log("booked");
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const deleteListing = (req, res) => {
  const { id } = req.params;

  try {
    Listing.findByIdAndRemove(id, (err, docs) => {
      if (err) {
        console.log(err.message);
      }
      res.send("deleted");
    });
  } catch (error) {
    console.log(error.message);
  }
};

const removeBooking = (req, res) => {
  const { id } = req.params;
  const bookedBy = null;

  try {
    Listing.findByIdAndUpdate(
      id,
      { bookedBy },
      { useFindAndModify: false },

      (err, doc) => {
        if (err) {
          console.log(err);
        }
        res.send.Status(200);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const updateListing = (req, res) => {
  const images = () => {
    const read = [];
    for (let x = 0; x < req.files.length; x++) {
      const image = fs.readFileSync(
        "./uploads/listing/" + req.files[x].filename
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
    Listing.findByIdAndUpdate(
      id,
      { useFindAndModify: false },

      {
        listingDescription: req.body.Description,
        listingType: req.body.Type,
        listingStatus: req.body.Status,
        listingBedrooms: req.body.Bedrooms,
        listingBathrooms: req.body.Bathrooms,
        listingFloors: req.body.Floors,
        listingArea: req.body.Areas,
        listingSize: req.body.Size,
        listingPrice: req.body.Price,
        listingVideo: req.body["Video-URL"],
        listingFeatures: allFeatures,
        listingGallery: [images()],
      },

      (err, doc) => {
        if (err) {
          console.log(err);
        }
        res.send(doc._id);
      }
    ).then((response) => console.log(response));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addListing,
  uploadListing,
  getListings,
  getDetails,
  bookListing,
  deleteListing,
  removeBooking,
  updateListing,
};
