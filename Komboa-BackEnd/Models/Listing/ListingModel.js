const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    listingDescription: String,
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    listingType: String,
    listingStatus: String,
    listingBedrooms: String,
    listingBathrooms: String,
    listingFloors: String,
    listingArea: Number,
    listingSize: Number,
    listingPrice: Number,
    listingVideo: String,
    listingFeatures: [],
    listingGallery: [],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    billing: {
      monthly: {
        rent: Number,
        water: Number,
        electricity: Number,
      },
      entry: {
        rent: Number,
        deposit: Number,
        water: Number,
        electricity: Number,
        other: Number,
      },
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = { Listing };
