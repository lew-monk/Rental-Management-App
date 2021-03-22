const { Listing } = require("../../Models/Listing/ListingModel");

const multer = require("multer");

const fs = require("fs");
const { response } = require("express");

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
      buying: {
        deposit: {
          amount: 0,
          refNo: null,
          confirmation: null,
        },
        installments: {
          refNo: null,
          confirmation: null,
          amount: 0,
        },
      },
      paidBills: {
        entry: {
          total: 0,
          refNo: null,
          confirmation: null,
        },
        monthly: {
          rent: 0,
          water: 0,
          electricity: 0,
          refNo: null,
          confirmation: null,
        },
      },
      billing: {
        monthly: {
          rent: 0,
          water: 0,
          electricity: 0,
        },
        entry: {
          rent: req.body.Price,
          deposit: req.body.Price,
          water: 0,
          electricity: 0,
          other: 0,
        },
      },
      rentedBy: null,
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
    .populate(["bookedBy", "rentedBy"])
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
        res.send(200);
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
  console.log(req.body);

  try {
    Listing.findByIdAndUpdate(
      id,

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
    );
  } catch (error) {
    console.log(error.message);
  }
};

const getBooked = (req, res) => {
  const { id } = req.params;
  Listing.find({ bookedBy: id })
    .then((response) => res.send(response))
    .catch((err) => console.log(err.message));
};

const addMonthlyBilling = (req, res) => {
  const { id } = req.params;

  Listing.findByIdAndUpdate(
    { _id: id },
    {
      $inc: {
        "billing.monthly.rent": req.body.Rent,
        "billing.monthly.water": req.body.Water,
        "billing.monthly.electricity": req.body.Electricity,
      },
    },
    { useFindAndModify: false },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        // res.sendStatus(200);
      }
    }
  );
};
const addEntryBilling = (req, res) => {
  const { id } = req.params;

  Listing.findByIdAndUpdate(
    { _id: id },
    {
      $inc: {
        "billing.entry.rent": req.body.Rent,
        "billing.entry.water": req.body.Water,
        "billing.entry.electricity": req.body.Electricity,
        "billing.entry.other": req.body.Other,
        "billing.entry.deposit": req.body.Deposit,
      },
    },
    { useFindAndModify: false },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        // res.sendStatus(200);
      }
    }
  );
};

const getBilling = (req, res) => {
  const { id } = req.params;
  console.log("reached");
  Listing.findById(id)
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => console.log(err.message));
};

const rentListing = (req, res) => {
  const { id } = req.params;
  Listing.findByIdAndUpdate(
    id,
    {
      rentedBy: req.body.id,
    },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        // console.log(doc);
        // res.sendStatus(200);
      }
    }
  );
};
const endLease = (req, res) => {
  const { id } = req.params;
  Listing.findByIdAndUpdate(
    id,
    {
      rentedBy: null,
    },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        // console.log(doc);
        // res.sendStatus(200);
      }
    }
  );
};

const addDeposit = (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  Listing.findByIdAndUpdate(
    id,
    {
      "buying.deposit.amount": req.body.Deposit,
      "buying.deposit.refNo": req.body.reference,
      "buying.deposit.paidAt": new Date(),
      "buying.deposit.confirmation": "Pending",
    },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(doc);
      }
    }
  );
};

const addInstallment = (req, res) => {
  const { id } = req.params;
  const obj = {
    amount: req.body.installment,
    refNo: req.body.reference,
    paidAt: new Date(),
    confirmation: "Pending",
  };

  Listing.findByIdAndUpdate(
    id,
    {
      $push: {
        "buying.installments": obj,
      },
    },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(doc);
      }
    }
  );
};

const addMonthlyBill = (req, res) => {
  const { id } = req.params;
  const obj = {
    amount: req.body.installment,
    refNo: req.body.reference,
    paidAt: new Date(),
    confirmation: "Pending",
  };

  Listing.findByIdAndUpdate(
    id,
    {
      $push: {
        "buying.installments": obj,
      },
    },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(doc);
      }
    }
  );
};

const confirmPayment = (req, res) => {
  const { id } = req.params;
  Listing.updateOne(
    { "buying.installments._id": req.body.id },
    { $set: { "buying.installments.$.confirmation": "Confirmed" } },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(doc);
        res.sendStatus(200);
      }
    }
  );
};
const confirmMonthlyPayment = (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  Listing.updateOne(
    { "paidBills.monthly._id": req.body.id },
    { $set: { "paidBills.monthly.$.confirmation": "Confirmed" } },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(doc);
        res.sendStatus(200);
      }
    }
  );
};

const addEntryPayment = (req, res) => {
  const { id } = req.params;
  const rent = parseInt(req.body.Rent);
  const deposit = parseInt(req.body.Deposit);
  const water = parseInt(req.body.Water);
  const electricity = parseInt(req.body.Electricity);

  const total = rent + water + deposit + electricity;

  Listing.findByIdAndUpdate(
    id,
    {
      "paidBills.entry.total": total,
      "paidBills.entry.refNo": req.body.reference,
      "paidBills.entry.confirmation": "Pending",
      paidAt: new Date(),
    },
    (err, doc) => {
      if (err) {
        console.log(err.message);
      } else {
        res.sendStatus(200);
      }
    }
  );
};

const addMonthlyPayment = (req, res) => {
  const { id } = req.params;
  const obj = {
    rent: req.body.Rent,
    water: req.body.Water,
    electricity: req.body.Electricity,
    refNo: req.body.reference,
    paidAt: new Date(),
    confirmation: "Pending",
  };
  Listing.findByIdAndUpdate(id, { $push: { "paidBills.monthly": obj } })
    .then((response) => res.sendStatus(200))
    .catch((err) => console.log(err.message));
};

const confirmEntryPayment = (req, res) => {
  const { id } = req.params;
  Listing.findByIdAndUpdate(
    id,
    {
      "paidBills.entry.confirmation": "Confirmed",
    },
    { useFindAndModify: false }
  )
    .then((response) => res.sendStatus(200))
    .catch((err) => console.log(err.message));
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
  getBooked,
  addMonthlyBilling,
  addEntryBilling,
  getBilling,
  rentListing,
  endLease,
  addDeposit,
  addInstallment,
  confirmPayment,
  addEntryPayment,
  addMonthlyPayment,
  confirmMonthlyPayment,
  confirmEntryPayment,
};
