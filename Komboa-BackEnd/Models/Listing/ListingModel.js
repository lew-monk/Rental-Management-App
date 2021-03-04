const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
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
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = { Listing };
